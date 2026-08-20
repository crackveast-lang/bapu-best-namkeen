'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import Parallax from '@/components/ui/Parallax';
import Pattern from '@/components/art/Pattern';
import { HOUSE, type HouseBrand } from '@/data/story';
import { LEGAL } from '@/data/site';
import { Rays, SevStrands, Sparkle } from '@/components/art/Doodles';

/* ------------------------------------------------------------------ *
 * Act I — the house
 * ------------------------------------------------------------------ */

/**
 * Three screens of scroll spent on one idea: there is a house above the two
 * brands, and the two names come out of it.
 *
 * The stage is pinned while the page travels past it, so the house name is
 * still on screen when the line beneath it forks — the fork has to be seen
 * *leaving* the name or it says nothing. Everything the visitor must read is
 * laid out in one ordinary column inside the pin: the scroll drives opacity
 * and stroke, never position in the document, so the composition still holds
 * together if the animation never runs.
 */
function Stage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  /**
   * One scroll-driven value, timed as a slice of the pin.
   *
   * The input range is always padded out to the full 0–1 of the scroll before
   * it is handed over. This is not decoration: given a partial range, this
   * version of `useTransform` runs the mapping BACKWARDS once the input passes
   * the end of it, so a step written as [0.4, 0.56] → [0, 1] fades in on cue
   * and then quietly fades back out again over the rest of the section. Held
   * at both ends, it stays where it was put.
   *
   * Under reduced motion every step collapses to its settled state, so the
   * stage renders as a static composition rather than as a pile of invisible
   * layers waiting for a scroll that will not move them.
   */
  const useStep = (input: number[], output: number[]) => {
    const last = output[output.length - 1];
    const inp = [...input];
    const out = [...output];
    if (inp[0] > 0) {
      inp.unshift(0);
      out.unshift(out[0]);
    }
    if (inp[inp.length - 1] < 1) {
      inp.push(1);
      out.push(last);
    }
    return useTransform(
      scrollYProgress,
      reduced ? [0, 1] : inp,
      reduced ? [last, last] : out,
    );
  };

  // Nothing that carries the headline starts at zero. The pin does not begin
  // until the stage has already filled the screen, so progress sits at 0 for
  // the whole of its approach — anything hidden at 0 would arrive as a blank
  // maroon screen. The house name is the title card; only the fork below it,
  // and the names the fork produces, are on the scroll.
  const photoOpacity = useStep([0, 0.7, 1], [0.34, 0.2, 0.14]);
  // The column reserves the height the fork and the two names will need, so on
  // arrival the title alone sits high with a hole under it. Dropping the whole
  // column while that space is still empty centres what is actually visible,
  // and it rises back into place as the fork fills the gap in.
  const columnY = useStep([0, 0.3], [86, 0]);
  const trunk = useStep([0.06, 0.24], [0, 1]);
  const branches = useStep([0.2, 0.46], [0, 1]);
  const knotOpacity = useStep([0.14, 0.24], [0, 1]);
  const labelsOpacity = useStep([0.4, 0.56], [0, 1]);
  const labelsY = useStep([0.4, 0.56], [18, 0]);
  const explainerOpacity = useStep([0.6, 0.78], [0, 1]);

  return (
    <div ref={ref} className={reduced ? '' : 'pin-track'}>
      {/* NO `grain` on this one.
          `.grain::after` is a viewport-sized `mix-blend-mode: multiply` layer.
          A blend layer has to read the backdrop back out of the compositor
          every frame it is painted, and on a pinned element with a moving
          photograph behind it that is every frame of the scroll. Two of those
          stacked over a re-rastering full-screen image is what made the whole
          screen drop to white for a second at a time on a real machine: the
          compositor evicts the tiles it cannot keep up with, and there is
          nothing behind them but the page's own ivory. Every other section on
          the site is static, so `grain` is free there and stays. */}
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-maroon-deep px-5 text-center text-ivory sm:px-8 ${
          reduced ? 'py-24' : 'pin-stage sticky top-0'
        }`}
      >
        {/* ---------- the ground ---------- */}
        {/* A photograph, not a colour field: the house is a food business and
            the first thing under its name should be food. Held well back so
            the type never has to fight it.

            IT FADES, IT DOES NOT ZOOM. This began as a slow scroll-driven
            scale, which is what made the section flicker: Chromium re-rasters
            a composited layer whenever its transform scale changes, so that
            zoom was re-rasterising a full-screen photograph over and over for
            three screens of scroll, and the frames it could not finish in time
            showed as white. Opacity has no such problem — it is settled
            entirely on the compositor, with no repaint at all — so the layer
            is promoted once, rastered once, and only faded from here on. */}
        <motion.div
          aria-hidden
          style={{
            opacity: photoOpacity,
            willChange: 'opacity',
            backfaceVisibility: 'hidden',
          }}
          className="pointer-events-none absolute inset-0"
        >
          <Media
            name={HOUSE.image}
            alt=""
            fill
            sizes="100vw"
            imgClassName="object-cover"
          />
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 40%, rgba(74,13,22,0.55), rgba(74,13,22,0.94) 68%, #4a0d16 100%)',
          }}
        />
        {/* Plain opacity, no blend — see the note on `grain` above. This faint,
            over a photograph, the difference from soft-light is not visible. */}
        <Pattern tone="maroon" scale={0.9} opacity={0.07} />

        {/* ---------- the composition ---------- */}
        <motion.div
          style={{ y: columnY, willChange: 'transform' }}
          className="relative w-full max-w-3xl py-6"
        >
          <p className="eyebrow flex items-center justify-center gap-2.5 text-saffron">
            <span className="h-px w-6 bg-current opacity-45" />
            {HOUSE.eyebrow}
          </p>

          <div className="mt-5">
            <Rays aria-hidden className="mx-auto w-10 text-saffron/80" />
            <h2
              id="house-heading"
              className="mt-3 font-display text-[clamp(2.6rem,10vw,6rem)] leading-[0.9] font-semibold tracking-[0.02em] text-ivory uppercase"
            >
              {HOUSE.name}
            </h2>
            <p className="mt-3 text-[0.6rem] font-semibold tracking-[0.3em] text-ivory/45 uppercase sm:text-[0.66rem]">
              {LEGAL.entity} · {LEGAL.city}
            </p>
          </div>

          <p className="mx-auto mt-6 max-w-md font-display text-[1.1rem] leading-snug text-ivory/85 italic sm:text-[1.3rem]">
            {HOUSE.tagline}
          </p>

          {/* ---------- the fork ---------- */}
          {/* The whole argument of this section, drawn in one gesture: a single
              line comes down out of the house name and splits in two. It is
              decorative — the labels below carry the meaning — so it can be
              left behind entirely by a browser that never runs the script. */}
          <svg
            aria-hidden
            viewBox="0 0 420 150"
            fill="none"
            className="mx-auto mt-7 w-full max-w-xs sm:max-w-lg"
          >
            <motion.path
              d="M210 0V54"
              stroke="var(--color-saffron)"
              strokeWidth="1.4"
              strokeLinecap="round"
              style={{ pathLength: trunk }}
            />
            <motion.path
              d="M210 54C210 108 105 96 105 150"
              stroke="var(--color-saffron)"
              strokeOpacity="0.75"
              strokeWidth="1.4"
              strokeLinecap="round"
              style={{ pathLength: branches }}
            />
            <motion.path
              d="M210 54C210 108 315 96 315 150"
              stroke="var(--color-saffron)"
              strokeOpacity="0.75"
              strokeWidth="1.4"
              strokeLinecap="round"
              style={{ pathLength: branches }}
            />
            {/* Opacity only. A scale on a bare <circle> has to be given a
                transform-box before it grows about its own centre rather than
                about the SVG origin, and a fading knot says the same thing. */}
            <motion.circle
              cx="210"
              cy="54"
              r="4.5"
              fill="var(--color-saffron)"
              style={{ opacity: knotOpacity }}
            />
          </svg>

          {/* The two names, landing under the branch that made them. The
              columns centre on 25% and 75%, which is exactly where the two
              curves above finish. */}
          <motion.div
            style={{ opacity: labelsOpacity, y: labelsY }}
            className="-mt-1 grid grid-cols-2 gap-3"
          >
            {HOUSE.brands.map((brand) => (
              <div key={brand.id}>
                <p className="font-display text-[0.95rem] leading-none font-semibold tracking-[0.16em] text-ivory uppercase sm:text-[1.15rem]">
                  {brand.label}
                </p>
                <p className="mt-2 text-[0.63rem] leading-snug tracking-[0.06em] text-saffron/85 sm:text-[0.72rem]">
                  {brand.descriptor}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.p
            style={{ opacity: explainerOpacity }}
            className="mx-auto mt-8 max-w-xl border-t border-ivory/15 pt-6 text-[0.9rem] leading-relaxed text-ivory/75 sm:text-[0.98rem]"
          >
            {HOUSE.explainer}
          </motion.p>
        </motion.div>

        <SevStrands
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-8 hidden w-24 text-ivory/12 lg:block"
        />
        <Sparkle
          aria-hidden
          className="pointer-events-none absolute top-12 right-12 hidden w-6 text-saffron/40 lg:block"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Act II — the two brands, each with its own face
 * ------------------------------------------------------------------ */

/**
 * The panels are deliberately NOT the same card twice.
 *
 * Heritage is printed: block-print ground, die-cut corners, a gold hairline
 * frame, serif name, sunburst date. Modern is a clean sheet: ivory, straight
 * edges, a tracked sans name, a single crimson rule. What they hold in common
 * — the photograph's crop, the descriptor line, the spacing rhythm, the shape
 * of the link — is what makes them read as sisters instead of strangers.
 */
function BrandPanel({ brand, index }: { brand: HouseBrand; index: number }) {
  const heritage = brand.tone === 'heritage';

  return (
    <Reveal
      as="article"
      variant={index === 0 ? 'left' : 'right'}
      delay={index * 0.08}
      y={26}
      className="group h-full"
    >
      <Link
        href={brand.href}
        className={`relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${
          heritage
            ? 'notched bg-maroon-deep text-ivory shadow-[0_50px_90px_-60px_rgba(43,26,18,0.9)] hover:shadow-[0_60px_100px_-58px_rgba(43,26,18,0.95)]'
            : 'rounded-[0.5rem] border border-ink/12 bg-ivory text-ink hover:border-ink/25 hover:shadow-[0_44px_74px_-56px_rgba(43,26,18,0.6)]'
        }`}
        style={heritage ? ({ '--notch': '2.2rem' } as React.CSSProperties) : undefined}
      >
        {heritage ? (
          <>
            {/* Well under half strength. At full weight the gold motif reads
                as glitter behind the paragraph and the copy stops being
                readable — the print should be felt at arm's length, not at
                reading distance. */}
            <Pattern tone="maroon" scale={0.85} opacity={0.2} />
            <span
              aria-hidden
              className="notched pointer-events-none absolute inset-3 z-30 border border-gold/40 sm:inset-4"
              style={{ '--notch': '1.6rem' } as React.CSSProperties}
            />
          </>
        ) : (
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 z-30 h-[3px] origin-left scale-x-0 bg-crimson transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          />
        )}

        {/* ---- photograph ---- */}
        <div
          className={`relative z-10 overflow-hidden ${
            heritage ? 'm-4 aspect-4/3 rounded-[1.1rem] sm:m-5' : 'aspect-4/3'
          }`}
        >
          <Parallax
            speed={0.05}
            className="absolute inset-[-5%]"
            innerClassName="relative size-full will-change-transform"
          >
            <Media
              name={brand.image}
              alt={brand.imageAlt}
              fill
              sizes="(max-width: 1024px) 92vw, 44vw"
              imgClassName="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          </Parallax>

          {heritage ? (
            <span className="absolute top-3 left-3 grid size-14 place-items-center rounded-full border border-gold/50 bg-maroon-deep/80 text-center backdrop-blur-sm">
              <span>
                <Rays aria-hidden className="mx-auto w-5 text-saffron" />
                <span className="mt-0.5 block font-display text-[0.6rem] leading-none font-semibold text-ivory">
                  {brand.since}
                </span>
              </span>
            </span>
          ) : (
            <span className="absolute top-3 left-3 rounded-full bg-ivory/92 px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.16em] text-ink uppercase">
              Est. {brand.since}
            </span>
          )}
        </div>

        {/* ---- type ---- */}
        <div
          className={`relative z-10 flex flex-1 flex-col ${
            heritage ? 'px-7 pt-2 pb-9 sm:px-9' : 'p-6 sm:p-8'
          }`}
        >
          {heritage ? (
            <h3 className="font-display text-[clamp(1.7rem,4vw,2.3rem)] leading-none font-semibold tracking-[0.03em] text-ivory uppercase">
              {brand.label}
            </h3>
          ) : (
            <h3 className="font-sans text-[clamp(1.35rem,3.2vw,1.75rem)] leading-none font-semibold tracking-[0.24em] text-ink uppercase">
              {brand.label}
            </h3>
          )}

          <p
            className={`mt-3 text-[0.76rem] font-semibold tracking-[0.1em] ${
              heritage ? 'text-saffron' : 'text-crimson'
            }`}
          >
            {brand.descriptor}
          </p>

          <p
            className={`mt-5 text-[0.92rem] leading-relaxed ${
              heritage ? 'text-ivory/72' : 'text-ink-soft'
            }`}
          >
            {brand.body}
          </p>

          <div
            className={`mt-auto flex items-baseline justify-between gap-4 border-t pt-6 ${
              heritage ? 'border-ivory/15' : 'border-ink/10'
            }`}
          >
            <span
              className={`text-[0.62rem] tracking-[0.14em] uppercase ${
                heritage ? 'text-ivory/45' : 'text-ink-faint'
              }`}
            >
              {brand.packName}
            </span>
            <span
              className={`inline-flex shrink-0 items-center gap-2 text-[0.82rem] font-semibold ${
                heritage ? 'text-ivory' : 'text-ink'
              }`}
            >
              <span className="link-underline">Explore</span>
              <span
                aria-hidden
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ *
 * The section
 * ------------------------------------------------------------------ */

export default function HouseSection() {
  return (
    <section id="house" className="relative scroll-mt-24" aria-labelledby="house-heading">
      <Stage />

      <div className="grain relative overflow-hidden bg-ivory py-20 md:py-28">
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            {HOUSE.brands.map((brand, i) => (
              <BrandPanel key={brand.id} brand={brand} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
