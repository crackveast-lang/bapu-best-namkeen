'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Media from '@/components/ui/Media';
import Reveal, { Stagger, StaggerItem } from '@/components/ui/Reveal';
import TextReveal from '@/components/ui/TextReveal';
import Counter from '@/components/ui/Counter';
import Parallax from '@/components/ui/Parallax';
import DrawIn from '@/components/ui/DrawIn';
import { LEGACY } from '@/data/story';
import { Flourish, Rays, SevStrands, Sparkle } from '@/components/art/Doodles';
import Pattern from '@/components/art/Pattern';

/**
 * The legacy story, told down the page.
 *
 * The copy (data/story.ts → LEGACY) is written in short declarative lines, so
 * the section delivers it that way: one beat per screen-ish, each arriving on
 * its own as you reach it, with a thread running down the left that fills as
 * you go. Nothing here is pinned and nothing viewport-sized scales or blends —
 * that is the rule the house stage had to learn the hard way, and this section
 * is longer than that one.
 *
 * Everything moves by opacity, translate and stroke only. Under reduced motion
 * the thread is simply full, the reveals collapse to short fades, and the story
 * reads as an ordinary long-form page.
 */

/* ------------------------------------------------------------------ *
 * The thread
 * ------------------------------------------------------------------ */

/** The line down the left margin, drawn in as the story is read. */
function Thread({ progress }: { progress: MotionValue<number> }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 bottom-0 left-[max(1.25rem,calc(50%-41rem))] hidden w-px bg-ivory/12 lg:block"
    >
      <motion.div
        style={{ scaleY: progress }}
        className="h-full w-full origin-top bg-gradient-to-b from-saffron via-saffron/70 to-transparent"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * A beat
 * ------------------------------------------------------------------ */

/** One movement of the story. `wide` drops the reading measure for a full-bleed moment. */
function Beat({
  children,
  className = '',
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto w-full px-5 sm:px-8 ${
        wide ? 'max-w-[88rem]' : 'max-w-3xl'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * The section
 * ------------------------------------------------------------------ */

export default function LegacySection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 90%'],
  });
  // Padded at both ends. A partial input range runs this mapping backwards once
  // the input passes the end of it — see the note in HouseSection.
  const thread = useTransform(
    scrollYProgress,
    [0, 0.02, 0.98, 1],
    reduced ? [1, 1, 1, 1] : [0, 0, 1, 1],
  );

  return (
    <section
      ref={ref}
      id="legacy"
      className="relative isolate scroll-mt-24 overflow-hidden bg-maroon-deep text-ivory"
      aria-labelledby="legacy-heading"
    >
      <Pattern tone="maroon" scale={1} opacity={0.06} />
      <Thread progress={thread} />

      <SevStrands
        aria-hidden
        className="pointer-events-none absolute top-[8%] right-6 hidden w-28 text-ivory/10 xl:block"
      />

      {/* ---------------- opening ---------------- */}
      <Beat className="pt-20 md:pt-32">
        <Reveal variant="fade">
          <p className="eyebrow flex items-center gap-2.5 text-saffron">
            <span className="h-px w-6 bg-current opacity-45" />
            {LEGACY.eyebrow}
          </p>
        </Reveal>

        <TextReveal
          as="h2"
          id="legacy-heading"
          text={LEGACY.title}
          className="mt-6 text-[clamp(2.3rem,6.4vw,4.4rem)] leading-[1.02] text-ivory"
          delay={0.06}
        />

        {/* Three lines, each landing a beat after the last. The third is the
            point of the whole section, so it gets the weight. */}
        <Stagger step={0.22} delay={0.25} className="mt-12 space-y-3">
          {LEGACY.opening.map((line, i) => (
            <StaggerItem key={line} y={16}>
              <p
                className={
                  i === LEGACY.opening.length - 1
                    ? 'font-display text-[clamp(1.5rem,3.6vw,2.4rem)] leading-snug text-saffron italic'
                    : 'font-display text-[clamp(1.25rem,2.8vw,1.75rem)] leading-snug text-ivory/60 italic'
                }
              >
                {line}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Beat>

      {/* ---------------- 1960 ---------------- */}
      <Beat wide className="pt-20 md:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="left" y={28} className="lg:col-span-5">
            <figure className="relative">
              <div className="relative aspect-4/3 overflow-hidden rounded-[1.4rem] border border-ivory/12 shadow-[0_50px_90px_-50px_rgba(0,0,0,0.85)]">
                <Parallax
                  speed={0.06}
                  className="absolute inset-[-6%]"
                  innerClassName="relative size-full will-change-transform"
                >
                  <Media
                    name={LEGACY.founder.image}
                    alt={LEGACY.founder.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 38vw"
                    imgClassName="object-cover"
                  />
                </Parallax>
              </div>
              <Rays
                aria-hidden
                className="absolute -top-5 -right-4 w-14 text-saffron/70"
              />
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal variant="fade">
              {/* The year counts itself up. It is the one number in the story
                  that everything else hangs off. */}
              <p className="font-display text-[clamp(4rem,13vw,9rem)] leading-[0.82] font-semibold tracking-[-0.03em] text-ivory/95">
                <Counter to={LEGACY.founder.year} from={1900} duration={1.9} />
              </p>
            </Reveal>

            <Reveal delay={0.12} y={16}>
              <p className="mt-7 text-[clamp(1.05rem,2.2vw,1.3rem)] leading-relaxed text-ivory/85">
                <span className="relative inline-block font-semibold text-ivory">
                  {LEGACY.founder.name}
                  <span
                    aria-hidden
                    className="absolute -inset-x-1 -bottom-1 block h-px bg-saffron/70"
                  />
                </span>{' '}
                {LEGACY.founder.lead}
              </p>
            </Reveal>

            <Reveal delay={0.2} y={16}>
              <blockquote className="mt-6 border-l-2 border-saffron/60 pl-5 font-display text-[clamp(1.3rem,3vw,1.9rem)] leading-snug text-saffron italic">
                {LEGACY.founder.belief}
              </blockquote>
            </Reveal>

            <Reveal delay={0.28} y={14}>
              <p className="mt-7 max-w-lg text-[0.98rem] leading-relaxed text-ivory/70">
                {LEGACY.founder.body}
              </p>
            </Reveal>
          </div>
        </div>
      </Beat>

      {/* ---------------- what stayed the same ---------------- */}
      <Beat className="pt-20 md:pt-28">
        <Reveal variant="blur" y={20}>
          <p className="text-[clamp(1.15rem,2.6vw,1.6rem)] leading-relaxed text-ivory/90">
            {LEGACY.constant}
          </p>
        </Reveal>
        <DrawIn delay={260} className="mt-10 block w-40">
          <Flourish aria-hidden className="w-full text-saffron/40" />
        </DrawIn>
      </Beat>

      {/* ---------------- every ingredient, every recipe, every bite ------ */}
      <Beat wide className="pt-16 md:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Stagger step={0.14} className="divide-y divide-ivory/12">
              {LEGACY.every.map((e) => (
                <StaggerItem key={e.lead} y={18} className="py-6 first:pt-0">
                  <p className="text-[clamp(1.2rem,2.8vw,1.7rem)] leading-snug">
                    <span className="font-display font-semibold text-saffron">{e.lead}</span>{' '}
                    <span className="text-ivory/85">{e.line}</span>
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal variant="right" y={28} className="lg:col-span-5">
            <div className="relative aspect-square overflow-hidden rounded-[1.4rem] border border-ivory/12">
              <Parallax
                speed={0.05}
                className="absolute inset-[-6%]"
                innerClassName="relative size-full will-change-transform"
              >
                <Media
                  name={LEGACY.everyImage}
                  alt={LEGACY.everyImageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  imgClassName="object-cover"
                />
              </Parallax>
            </div>
          </Reveal>
        </div>
      </Beat>

      {/* ---------------- not simply something you eat ---------------- */}
      <Beat wide className="pt-20 md:pt-28">
        <Reveal className="mx-auto max-w-3xl px-0 text-center">
          <p className="font-display text-[clamp(1.4rem,3.4vw,2.2rem)] leading-snug text-ivory italic">
            {LEGACY.shared.lead}
          </p>
        </Reveal>

        <Stagger step={0.12} className="mt-12 grid gap-4 md:grid-cols-3">
          {LEGACY.shared.parts.map((part) => (
            <StaggerItem
              key={part}
              variant="scale"
              className="rounded-[1.1rem] border border-ivory/12 bg-ivory/[0.04] p-7 text-center backdrop-blur-[2px] transition-colors duration-500 hover:border-saffron/35 hover:bg-ivory/[0.07]"
            >
              <Sparkle aria-hidden className="mx-auto mb-4 w-5 text-saffron/70" />
              <p className="text-[1rem] leading-snug text-ivory/85">{part}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} variant="scale" className="mt-10">
          <div className="relative aspect-21/9 overflow-hidden rounded-[1.4rem] border border-ivory/12">
            <Parallax
              speed={0.07}
              className="absolute inset-[-8%]"
              innerClassName="relative size-full will-change-transform"
            >
              <Media
                name={LEGACY.shared.image}
                alt={LEGACY.shared.imageAlt}
                fill
                sizes="100vw"
                imgClassName="object-cover"
              />
            </Parallax>
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-maroon-deep/25 to-transparent"
            />
          </div>
        </Reveal>
      </Beat>

      {/* ---------------- the feeling ---------------- */}
      <Beat className="pt-20 md:pt-28">
        <Reveal y={16}>
          <p className="text-[1rem] leading-relaxed text-ivory/65 md:text-[1.05rem]">
            {LEGACY.feeling.setup}
          </p>
        </Reveal>

        {/* The line the whole story has been walking towards. Set as big as the
            heading, and given room on both sides. */}
        <TextReveal
          as="p"
          text={LEGACY.feeling.punch}
          className="mt-8 font-display text-[clamp(2rem,6vw,4rem)] leading-[1.04] font-semibold text-saffron"
          step={0.07}
        />

        <Reveal delay={0.2} y={14}>
          <p className="mt-10 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ivory/15 pt-7 text-[0.95rem] tracking-[0.02em] text-ivory/80">
            <span className="font-semibold text-ivory">Quality you can trust.</span>
            <span>Taste you remember.</span>
          </p>
        </Reveal>
      </Beat>

      {/* ---------------- today ---------------- */}
      <Beat className="pt-20 md:pt-28">
        <Reveal variant="blur" y={20}>
          <p className="text-[clamp(1.05rem,2.3vw,1.35rem)] leading-relaxed text-ivory/85">
            {LEGACY.today}
          </p>
        </Reveal>
      </Beat>

      {/* ---------------- worth preserving ---------------- */}
      <Beat wide className="pt-16 md:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="left" y={26} className="lg:col-span-6">
            <div className="relative aspect-4/3 overflow-hidden rounded-[1.4rem] border border-ivory/12">
              <Parallax
                speed={0.05}
                className="absolute inset-[-6%]"
                innerClassName="relative size-full will-change-transform"
              >
                <Media
                  name={LEGACY.preserve.image}
                  alt={LEGACY.preserve.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  imgClassName="object-cover"
                />
              </Parallax>
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal y={16}>
              <p className="text-[1rem] leading-relaxed text-ivory/70">{LEGACY.preserve.lead}</p>
            </Reveal>

            {/* Three words, one under the next, each heavier than the last. */}
            <Stagger step={0.16} className="mt-8 space-y-2">
              {LEGACY.preserve.three.map((word, i) => (
                <StaggerItem key={word} y={20}>
                  <p
                    className="font-display leading-[1.05] font-semibold text-ivory"
                    style={{ fontSize: `clamp(${1.7 + i * 0.35}rem, ${4 + i}vw, ${2.4 + i * 0.6}rem)` }}
                  >
                    {word}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Beat>

      {/* ---------------- signature ---------------- */}
      <Beat className="pt-20 pb-20 text-center md:pt-28 md:pb-28">
        <Reveal variant="scale">
          <Rays aria-hidden className="mx-auto w-12 text-saffron" />
          <p className="mt-5 font-display text-[clamp(1.8rem,5vw,3rem)] leading-none font-semibold tracking-[0.04em] text-ivory uppercase">
            {LEGACY.sign.brand}
          </p>
          <p className="mt-3 text-[0.7rem] font-semibold tracking-[0.34em] text-saffron uppercase">
            {LEGACY.sign.since}
          </p>
        </Reveal>

        <Reveal delay={0.16} y={14}>
          <p className="mx-auto mt-9 max-w-md font-display text-[1.15rem] leading-snug text-ivory/75 italic md:text-[1.3rem]">
            {LEGACY.sign.line}
          </p>
        </Reveal>

        <DrawIn delay={320} className="mx-auto mt-10 block w-44">
          <Flourish aria-hidden className="w-full text-ivory/25" />
        </DrawIn>
      </Beat>
    </section>
  );
}
