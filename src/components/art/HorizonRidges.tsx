/**
 * The Gwalior range, drawn.
 *
 * This is the horizon from the WebGL scene, rebuilt as flat SVG. Same seeded
 * ridge profile, same six layers, same colours and opacities — so the hero
 * keeps its mountains without a renderer running behind it.
 *
 * It is deliberately as dumb as a picture can be: no canvas, no context, no
 * animation frame, no per-frame work of any kind. A server-rendered SVG in the
 * markup cannot flicker, cannot fight the compositor and costs nothing to
 * scroll past — which, after the horizon that could do all three, is the whole
 * point of it.
 *
 * Depth is carried the way a printer would carry it rather than the way a
 * camera does: the near ridge is brand maroon and sits low and large, and each
 * one behind it is paler, higher and shallower until it is barely a stain on
 * the paper.
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
 */
const LAYERS = [
  { height: 210, color: 'var(--color-maroon)', opacity: 0.16, base: 236, amp: 0.30 },
  { height: 170, color: 'var(--color-maroon)', opacity: 0.2, base: 268, amp: 0.36 },
  { height: 130, color: 'var(--color-sand)', opacity: 0.55, base: 300, amp: 0.5 },
  { height: 100, color: 'var(--color-saffron)', opacity: 0.24, base: 338, amp: 0.62 },
  { height: 80, color: 'var(--color-maroon)', opacity: 0.14, base: 382, amp: 0.8 },
  { height: 60, color: 'var(--color-maroon)', opacity: 0.1, base: 430, amp: 1 },
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
      Math.sin(i * 0.1) * height +
      Math.sin(i * 0.05) * height * 0.5 +
      rng() * height * 0.2;
    // Screen y grows downward, the scene's grew upward.
    const y = base - wave * amp;
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  // Closed to well past the foot of the frame, so no layer can show a seam
  // along the bottom however the hero is cropped.
  points.push(`L${VIEW_W} ${VIEW_H + 40}`, `L0 ${VIEW_H + 40}`, 'Z');
  return points.join(' ');
}

export default function HorizonRidges({ className = '' }: { className?: string }) {
  const rng = makeRng(0x1960);
  const paths = LAYERS.map((l) => ridgePath(l.height, l.base, l.amp, rng));

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
    >
      {/* The afternoon sitting on the ridge line — the sun the scene's shader
          used to draw, as a plain radial gradient. */}
      <defs>
        <radialGradient id="ridge-sun" cx="50%" cy="46%" r="34%">
          <stop offset="0%" stopColor="var(--color-saffron-soft)" stopOpacity="0.5" />
          <stop offset="55%" stopColor="var(--color-saffron)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--color-saffron)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ridge-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-parchment)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--color-parchment)" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect width={VIEW_W} height={VIEW_H} fill="url(#ridge-sun)" />

      {paths.map((d, i) => (
        <path key={LAYERS[i].base} d={d} fill={LAYERS[i].color} opacity={LAYERS[i].opacity} />
      ))}

      {/* The range stands in its own light rather than on a hard line: the same
          wash of paper the panels sit on, pulled up over the feet of it. */}
      <rect y={VIEW_H * 0.55} width={VIEW_W} height={VIEW_H * 0.45} fill="url(#ridge-haze)" />
    </svg>
  );
}
