'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Media from '@/components/ui/Media';
import { BuyPair } from '@/components/ui/BuyButton';
import PackMarquee from '@/components/PackMarquee';
import GwaliorSkyline from '@/components/art/GwaliorSkyline';
import {
  ArrowCurve,
  CurryLeaf,
  Peanut,
  Rays,
  SevStrands,
  Sparkle,
  SpiceScatter,
} from '@/components/art/Doodles';
import { Boondi, CornFlake, GreenPeas, SevStrand, Wafer } from '@/components/art/IngredientIcons';
import { Floater } from '@/components/art/Decor';

/**
 * The three lines of the headline. `wrap` styles the clipping mask (margins and
 * the padding that stops descenders being shaved); `className` styles the type
 * that travels inside it.
 */
const HERO_LINES = [
  {
    text: 'From the heart of',
    wrap: 'pb-[0.12em]',
    className:
      'font-script text-[clamp(1.9rem,5vw,2.9rem)] leading-[0.95] text-saffron',
  },
  {
    text: 'Gwalior',
    wrap: 'mt-1 pb-[0.06em]',
    className:
      'font-display text-[clamp(3.4rem,11.5vw,6.6rem)] leading-[0.86] font-semibold tracking-[-0.035em] text-maroon',
  },
  {
    text: 'to your home.',
    wrap: 'mt-2 pb-[0.08em]',
    className:
      'font-display text-[clamp(1.15rem,3.4vw,1.9rem)] leading-[1.1] font-normal tracking-[0.09em] text-ink uppercase',
  },
] as const;

const TRUST = [
  { label: 'Traditional recipes', icon: 'recipe' },
  { label: 'Made in Gwalior', icon: 'gwalior' },
  { label: 'Loved for generations', icon: 'generations' },
  { label: 'Hygienically packed', icon: 'packed' },
] as const;

function TrustIcon({ kind }: { kind: (typeof TRUST)[number]['icon'] }) {
  const s = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;
  switch (kind) {
    case 'recipe':
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden {...s}>
          <path d="M5 4.5h9a2.5 2.5 0 0 1 2.5 2.5v12H7.5A2.5 2.5 0 0 1 5 16.5v-12Z" />
          <path d="M16.5 7H19v12.5H7.5" opacity={0.6} />
          <path d="M8 9h6M8 12h6M8 15h4" />
        </svg>
      );
    case 'gwalior':
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden {...s}>
          <path d="M4 20V11h16v9" />
          <path d="M3 11h18" />
          <path d="M8 11V8.5a4 4 0 0 1 8 0V11" />
          <path d="M12 4.5V3" />
          <path d="M9 20v-4a3 3 0 0 1 6 0v4" />
        </svg>
      );
    case 'generations':
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden {...s}>
          <path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9Z" />
        </svg>
      );
    case 'packed':
      return (
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden {...s}>
          <path d="M6 4h12l-1 16H7L6 4Z" />
          <path d="M6 8h12" opacity={0.6} />
          <path d="M9.5 12.5l2 2 3.5-4" />
        </svg>
      );
  }
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Restrained parallax. The three packs run at different speeds so the group
  // reads as depth; the back pack lags, the front one leads.
  const packY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '14%']);
  const backY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '6%']);
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '22%']);
  const archY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-7%']);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  return (
    <section
      ref={ref}
      className="grain relative isolate overflow-hidden bg-parchment"
      aria-labelledby="hero-heading"
    >
      {/* ---------- ambient light ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-14%] size-[52rem] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(240,168,48,0.30), rgba(240,168,48,0.05) 62%, transparent)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20rem] left-[-14rem] size-[40rem] rounded-full opacity-60 blur-3xl"
        style={{
          background: 'radial-gradient(closest-side, rgba(109,20,32,0.13), transparent 70%)',
        }}
      />

      {/* ---------- heritage line art, along the base ---------- */}
      <motion.div
        style={{ y: archY }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[7rem] z-0 text-ink/[0.13] mix-blend-multiply"
      >
        <GwaliorSkyline className="h-auto w-full min-w-[64rem] sm:min-w-0" idPrefix="hero" />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-y-4 px-5 pt-10 pb-4 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pt-12 lg:pb-10">
        {/* ================= LEFT ================= */}
        <div className="relative lg:col-span-5 lg:pr-6">
          {/* Each line rises out from behind its own clipping mask, one after
              the next, so the headline sets itself rather than fading on. */}
          {/* An h2, not an h1: the horizon hero above this one opens the page
              and carries its only h1. */}
          <motion.h2
            id="hero-heading"
            initial="hidden"
            animate="shown"
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: reduced ? 0 : 0.11 } },
            }}
            className="relative"
          >
            {HERO_LINES.map((line) => (
              <span key={line.text} className={`block overflow-hidden ${line.wrap}`}>
                <motion.span
                  variants={{
                    // `opacity: 0` alongside the mask — see the note in
                    // TextReveal: it keeps the no-JS fallback selector uniform.
                    hidden: { y: reduced ? 0 : '105%', opacity: 0 },
                    shown: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: reduced ? 0.25 : 0.95, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className={`block ${line.className}`}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}

            <Floater
              className="-top-8 right-4 hidden w-24 text-saffron/50 xl:block"
              y={-8}
              rot={6}
              duration={9}
            >
              <SevStrands className="w-full" />
            </Floater>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-[0.98rem] lg:max-w-md leading-relaxed text-ink-soft md:text-[1.05rem]"
          >
            Authentic namkeen made with timeless recipes and carefully selected
            ingredients — fried, seasoned and packed in the same Gwalior kitchen
            it has always come from.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-8"
          >
            <BuyPair size="lg" magnetic />
            <p className="mt-3 text-[0.75rem] text-ink-faint">
              Prefer to visit?{' '}
              <a href="/stores" className="link-underline font-medium text-ink">
                Find a store in Gwalior
              </a>
            </p>
            <ArrowCurve
              aria-hidden
              className="pointer-events-none absolute -right-2 -bottom-10 hidden w-16 -scale-x-100 text-ink/20 xl:block"
            />
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="shown"
            variants={{
              hidden: {},
              shown: {
                transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.36 },
              },
            }}
            className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-ink/10 pt-7 sm:max-w-md"
          >
            {TRUST.map((t) => (
              <motion.li
                key={t.label}
                variants={{
                  hidden: { opacity: 0, y: reduced ? 0 : 10 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: reduced ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="group/t flex items-center gap-2.5 text-[0.73rem] leading-tight font-medium text-ink-soft transition-colors hover:text-ink"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/12 bg-ivory/70 text-maroon transition-[transform,border-color,background-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/t:-translate-y-0.5 group-hover/t:scale-110 group-hover/t:border-maroon/35 group-hover/t:bg-saffron/15">
                  <TrustIcon kind={t.icon} />
                </span>
                {t.label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ================= RIGHT ================= */}
        {/* No opacity or z-index between here and the section: `mix-blend-mode`
            on the pack composites against the section's own background, and any
            isolated ancestor in between would leave it with nothing to blend
            against (it would render as a white box). */}
        <div className="relative lg:col-span-7">
          <div className="relative mx-auto max-w-[34rem] lg:max-w-none">
            {/* soft plate, so the pack's white sweep has clean ground to blend into */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 size-[30rem] -translate-x-1/2 -translate-y-[52%] rounded-full opacity-90 blur-2xl sm:size-[38rem] lg:size-[42rem]"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(255,253,248,0.95), rgba(255,253,248,0.45) 58%, transparent)',
              }}
            />

            {/* dashed heritage ring */}
            <svg
              aria-hidden
              viewBox="0 0 400 400"
              className="pointer-events-none absolute top-1/2 left-1/2 w-[22rem] -translate-x-1/2 -translate-y-[54%] text-maroon/18 sm:w-[27rem] lg:w-[31rem]"
              fill="none"
            >
              <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 9" />
              <circle cx="200" cy="200" r="168" stroke="currentColor" strokeWidth="1" opacity={0.5} />
            </svg>

            {/* ---------- the products ---------- */}
            {/* Three packs, each on its own parallax speed so the group has
                depth rather than sliding as one flat card. Transform and blend
                ride on the SAME element every time — a transformed parent would
                isolate the blend and the pack would render as a white box. */}
            <div className="relative">
              {/* The entrance animates `scale` only. `y` is already driven by
                  the parallax motion value on this same element, and nothing
                  may animate `opacity` here — see the blend note above. */}

              {/* back left — Indori, tucked behind the hero pack */}
              <motion.div
                style={{ y: backY }}
                initial={{ scale: reduced ? 1 : 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="blend-pack absolute bottom-[6%] left-0 z-0 w-[38%] max-w-[11rem] sm:max-w-[12.5rem] lg:max-w-[14rem]"
              >
                <Media
                  name="pack-indori-khatta-meetha"
                  alt="A pack of Bapu Best Bites Indori Khatta Meetha"
                  sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 16vw"
                  className="h-auto w-full"
                />
              </motion.div>

              {/* the hero pack */}
              <motion.figure
                style={{ y: packY }}
                initial={{ scale: reduced ? 1 : 0.92 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="blend-pack relative z-10 px-10 sm:px-16 lg:px-12"
              >
                <Media
                  name="pack-ratlami-sev"
                  alt="A 400 g pack of Bapu Best Bites Ratlami Sev"
                  priority
                  sizes="(max-width: 640px) 66vw, (max-width: 1024px) 52vw, 38vw"
                  className="mx-auto h-auto w-full max-w-[21rem] sm:max-w-[24rem] lg:max-w-[26rem]"
                />
              </motion.figure>

              {/* front right — Kadipatta, overlapping the hero pack */}
              <motion.div
                style={{ y: frontY }}
                initial={{ scale: reduced ? 1 : 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="blend-pack absolute right-0 bottom-0 z-20 w-[42%] max-w-[12rem] sm:max-w-[13.5rem] lg:max-w-[15rem]"
              >
                <Media
                  name="pack-kadipatta-mix"
                  alt="A pack of Bapu Best Bites Kadipatta Mix"
                  sizes="(max-width: 640px) 34vw, (max-width: 1024px) 24vw, 17vw"
                  className="h-auto w-full"
                />
              </motion.div>
            </div>

            {/* ---------- heritage badge ---------- */}
            {/* Stamped on a beat after the packs settle, and it leans in when
                you point at it — the one piece of the hero that answers back. */}
            <motion.div
              initial={{ opacity: 0, scale: reduced ? 1 : 0.7, rotate: reduced ? 0 : -14 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduced ? undefined : { scale: 1.06, rotate: 4 }}
              className="group/badge absolute top-2 right-2 z-20 sm:top-0 sm:right-6 lg:top-4 lg:right-2"
            >
              <div className="grid size-24 place-items-center rounded-full border border-saffron/45 bg-ivory/92 text-center shadow-[0_18px_34px_-20px_rgba(43,26,18,0.6)] backdrop-blur-sm transition-shadow duration-500 group-hover/badge:shadow-[0_26px_48px_-22px_rgba(43,26,18,0.7)] sm:size-28">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-saffron/0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/badge:scale-110 group-hover/badge:border-saffron/40"
                />
                <div>
                  <Rays className="mx-auto mb-0.5 w-8 text-saffron transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/badge:scale-110" />
                  <span className="block font-display text-[0.62rem] leading-[1.15] font-semibold tracking-[0.13em] text-maroon uppercase sm:text-[0.68rem]">
                    Heritage
                    <br />
                    of taste
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ---------- floating snack pieces ---------- */}
            <Floater className="top-[12%] left-[2%] w-11 text-maroon/45 sm:w-14" y={-14} rot={-12} duration={7.5}>
              <SevStrand className="w-full" />
            </Floater>

            <Floater className="top-[30%] right-[4%] w-9 text-saffron/70 sm:w-11" y={12} rot={14} duration={9} delay={0.6}>
              <Wafer className="w-full" />
            </Floater>

            <Floater className="bottom-[22%] left-[6%] w-10 text-olive/55 sm:w-12" y={-10} rot={8} duration={8.5} delay={1.2}>
              <GreenPeas className="w-full" />
            </Floater>

            <Floater className="bottom-[10%] right-[10%] w-11 text-ink/30 sm:w-14" y={-16} rot={-6} duration={10} delay={0.3}>
              <Boondi className="w-full" />
            </Floater>

            <Floater className="top-[52%] left-[-1%] hidden w-10 text-saffron/60 sm:block" y={13} rot={18} duration={8} delay={1.8}>
              <CornFlake className="w-full" />
            </Floater>

            <Floater className="top-[6%] left-[26%] hidden w-7 text-saffron lg:block" y={-9} rot={0} spin={12} duration={6.5}>
              <Sparkle className="w-full" />
            </Floater>

            <Peanut
              aria-hidden
              className="pointer-events-none absolute bottom-[4%] left-[24%] w-12 rotate-[-14deg] text-ink/22 sm:w-14"
            />
            <CurryLeaf
              aria-hidden
              className="pointer-events-none absolute right-[2%] bottom-[34%] hidden w-9 rotate-[16deg] text-olive/40 lg:block"
            />
            <SpiceScatter
              aria-hidden
              className="pointer-events-none absolute right-[18%] -bottom-2 hidden w-28 text-ink/16 sm:block"
            />
          </div>
        </div>
      </div>

      {/* ================= MARQUEE ================= */}
      <div className="relative mt-4 pb-7 lg:mt-0">
        <div className="mx-auto mb-1 flex w-full max-w-[88rem] items-center justify-between px-5 sm:px-8">
          <p className="text-[0.66rem] font-semibold tracking-[0.2em] text-ink-faint uppercase">
            The whole shelf
          </p>

          {/* Scroll cue. Fades out over the first fifth of the hero, so it
              never lingers once the visitor has taken the hint. */}
          <motion.span
            aria-hidden
            style={{ opacity: cueOpacity }}
            className="pointer-events-none hidden items-center gap-2.5 text-[0.6rem] font-semibold tracking-[0.22em] text-ink-faint uppercase lg:flex"
          >
            Scroll
            <span className="flex h-7 w-4.5 justify-center rounded-full border border-ink/20 pt-1.5">
              <span className="scroll-cue size-1 rounded-full bg-maroon" />
            </span>
          </motion.span>
        </div>
        <PackMarquee />
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-ink/12 to-transparent" />
    </section>
  );
}
