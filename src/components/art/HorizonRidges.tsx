'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * The Gwalior range, drawn — and travelling.
 *
 * This is the horizon from the WebGL scene, rebuilt as flat SVG: same seeded
 * ridge profile, same six layers, same colours and opacities. The scroll effect
 * comes back with it, but built out of the one thing this hero has proved it
 * can do without strobing.
 *
 * THE RULES THIS SECTION LEARNED THE HARD WAY, and why every one of them holds
 * here:
 *
 *  - **Nothing renders per frame.** No canvas, no context, no animation frame.
 *    Six paths of SVG, rasterised once.
 *  - **Translate only. Never scale.** Chromium re-rasterises a composited layer
 *    when its transform *scale* changes; a translate is settled entirely on the
 *    compositor. So depth is carried by three bands moving at three speeds, not
 *    by anything growing.
 *  - **Nothing blends.** No `mix-blend-mode`, no `backdrop-filter`.
 *  - **Nothing here feeds layout.** The scroll drives `transform` and nothing
 *    else; the band the scroll is measured against is re-measured on resize
 *    only, never on scroll.
 *  - **The input range is padded at both ends**, because past a partial range
 *    this version of `useTransform` runs the mapping backwards.
 *
 * Three bands rather than six: two ridges to a band. Six independently moving
 * layers would be six promoted viewport-sized textures for a difference nobody
 * can see, and this hero has already been told once what happens when it asks
 * the compositor for more than it can hold.
 */

/** The same generator the scene used, with the same seed, so the skyline is the
 *  one this site has always had rather than a new one that merely rhymes. */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const VIEW_W = 1200;
const VIEW_H = 520;
const SEGMENTS = 50;

/**
 * `height` is the ridge amplitude from the original scene. `base` is where the
 * ridge line sits in the frame and `amp` scales it for the flat projection —
 * together they stand in for the perspective the camera used to supply.
 *
 * Ordered far to near, which is also the order they are painted in.
 */
const LAYERS = [
  { height: 210, color: 'var(--color-maroon)', opacity: 0.16, base: 236, amp: 0.3 },
  { height: 170, color: 'var(--color-maroon)', opacity: 0.2, base: 268, amp: 0.36 },
  { height: 130, color: 'var(--color-sand)', opacity: 0.55, base: 300, amp: 0.5 },
  { height: 100, color: 'var(--color-saffron)', opacity: 0.24, base: 338, amp: 0.62 },
  { height: 80, color: 'var(--color-maroon)', opacity: 0.14, base: 382, amp: 0.8 },
  { height: 60, color: 'var(--color-maroon)', opacity: 0.1, base: 430, amp: 1 },
];

/**
 * Two ridges to a band, and how far each band travels over the whole hero.
 * The far range barely stirs and the near one runs — which is what reads as
 * flying into it rather than past a painting of it.
 */
const BANDS = [
  { from: 0, to: 2, travel: '-1.5%' },
  { from: 2, to: 4, travel: '-5%' },
  { from: 4, to: 6, travel: '-12%' },
];

/**
 * One ridge, as a closed path down to the foot of the frame.
 *
 * The RNG is threaded through every layer in order rather than restarted per
 * layer — that is how the scene drew it, and restarting it would give all six
 * ridges the same jitter and make them read as one shape repeated.
 */
function ridgePath(height: number, base: number, amp: number, rng: () => number) {
  const points: string[] = [];

  for (let i = 0; i <= SEGMENTS; i++) {
    const x = (i / SEGMENTS) * VIEW_W;
    const wave =
      Math.sin(i * 0.1) * height + Math.sin(i * 0.05) * height * 0.5 + rng() * height * 0.2;
    // Screen y grows downward, the scene's grew upward.
    const y = base - wave * amp;
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  // Closed well past the foot of the frame, so no band can show a seam along
  // the bottom however far it has travelled.
  points.push(`L${VIEW_W} ${VIEW_H + 160}`, `L0 ${VIEW_H + 160}`, 'Z');
  return points.join(' ');
}

export default function HorizonRidges({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  /**
   * The stretch of page the hero occupies, measured from the container this is
   * sticking inside. Measured on mount and on resize — NEVER on scroll. The
   * last time something in this component was recomputed on scroll it fed a
   * `min-height`, and the header and the hero spent the afternoon resizing each
   * other. Nothing here touches layout at all, but the habit is the point.
   */
  const [band, setBand] = useState<[number, number]>([0, 1]);

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;

    const measure = () => {
      const top = host.getBoundingClientRect().top + window.scrollY;
      setBand([top, top + host.offsetHeight - window.innerHeight]);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Padded at both ends. Given a partial input range this `useTransform` runs
  // its mapping BACKWARDS once the input passes the end of it — so the range is
  // held flat either side rather than left to reverse itself down the page.
  const input = [0, band[0], band[1], band[1] + 1e6];
  const travel = (to: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks -- called unconditionally, fixed order
    useTransform(scrollY, input, reduced ? ['0%', '0%', '0%', '0%'] : ['0%', '0%', to, to]);

  const y0 = travel(BANDS[0].travel);
  const y1 = travel(BANDS[1].travel);
  const y2 = travel(BANDS[2].travel);
  const ys = [y0, y1, y2];

  const rng = makeRng(0x1960);
  const paths = LAYERS.map((l) => ridgePath(l.height, l.base, l.amp, rng));

  return (
    <div ref={ref} aria-hidden className={className}>
      {/* The afternoon sitting on the ridge line — the sun the scene's shader
          used to draw, as a plain gradient that never moves. */}
      <span className="hero-ridge-sun" />

      {BANDS.map((b, i) => (
        <motion.div
          key={b.travel}
          // Transform only, and promoted, so the whole band is a single
          // compositor translate rather than a repaint of the SVG inside it.
          style={{ y: ys[i], willChange: 'transform' }}
          className="hero-ridge-band"
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMax slice"
            className="hero-ridge-svg"
          >
            {paths.slice(b.from, b.to).map((d, j) => {
              const layer = LAYERS[b.from + j];
              return <path key={layer.base} d={d} fill={layer.color} opacity={layer.opacity} />;
            })}
          </svg>
        </motion.div>
      ))}

      {/* The range stands in its own light rather than on a hard line: the same
          wash of paper the panels sit on, pulled up over the feet of it. */}
      <span className="hero-ridge-haze" />
    </div>
  );
}
