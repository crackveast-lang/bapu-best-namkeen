'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Media from '@/components/ui/Media';
import Reveal, { Stagger, StaggerItem } from '@/components/ui/Reveal';
import TextReveal from '@/components/ui/TextReveal';
import Parallax from '@/components/ui/Parallax';
import DrawIn from '@/components/ui/DrawIn';
import { ArrowLink, Copy, isPlaceholder } from '@/components/ui/Bits';
import { STORES, type Store } from '@/data/stores';
import { Bowl, Flourish, Sparkle } from '@/components/art/Doodles';
import GwaliorSkyline from '@/components/art/GwaliorSkyline';

/**
 * Where to find us.
 *
 * The shops are the oldest thing the brand has and they were being shown as
 * four identical grey cards, so this leads with the one photograph that has the
 * name lit over the door and lets the rest follow as a row underneath.
 *
 * Two colours do the work that the copy cannot: **emerald** marks an address we
 * can evidence — the Phalka Bazar counter, which is on the pack and on the
 * licence — and **saffron** marks one that came off a public listing and is
 * still waiting on the family. A visitor reads it as a nice detail; the
 * business reads it as a checklist.
 */

/* ------------------------------------------------------------------ *
 * A pin
 * ------------------------------------------------------------------ */

function StatusDot({ confirmed }: { confirmed: boolean }) {
  return (
    <span className="relative flex size-2 shrink-0">
      {confirmed ? (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald opacity-60" />
      ) : null}
      <span
        className={`relative inline-flex size-2 rounded-full ${
          confirmed ? 'bg-emerald' : 'bg-saffron'
        }`}
      />
    </span>
  );
}

function Directions({ store, tone }: { store: Store; tone: 'dark' | 'light' }) {
  if (!store.mapsUrl) return null;

  return (
    <a
      href={store.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/d inline-flex items-center gap-2 text-[0.82rem] font-semibold transition-colors ${
        tone === 'dark' ? 'text-ivory hover:text-saffron' : 'text-ink hover:text-maroon'
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
        <path
          d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="link-underline">Get directions</span>
      <span
        aria-hidden
        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/d:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * The rest of the shops
 * ------------------------------------------------------------------ */

export function StoreCard({ store, className = '' }: { store: Store; className?: string }) {
  return (
    <div className={className}>
      <StoreCardInner store={store} />
    </div>
  );
}

function StoreCardInner({ store }: { store: Store }) {
  return (
    <article className="group/card relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-ink/10 bg-ivory transition-[transform,box-shadow,border-color] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-olive/35 hover:shadow-[0_40px_70px_-48px_rgba(43,26,18,0.65)]">
      {/* The accent rule takes its colour from whether the address is evidenced. */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-x-100 ${
          store.confirmed ? 'bg-emerald' : 'bg-saffron'
        }`}
      />

      <div className="sheen relative aspect-16/11 overflow-hidden bg-cream">
        <Media
          name={store.image}
          alt={`Bapu Best, ${store.name}, Gwalior`}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 30vw"
          imgClassName="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.06]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <StatusDot confirmed={store.confirmed} />
          <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-ink-faint uppercase">
            {store.area}
          </p>
        </div>

        <h3 className="mt-2.5 text-[1.2rem] leading-snug">{store.name}</h3>

        <p className="mt-2.5 text-[0.84rem] leading-relaxed text-ink-soft">{store.address}</p>

        <p className="mt-2 inline-flex items-center gap-1.5 text-[0.8rem] text-ink-faint">
          {isPlaceholder(store.hours) ? (
            <Copy value={store.hours} />
          ) : (
            <>
              <span aria-hidden className="size-1 rounded-full bg-olive" />
              {store.hours}
            </>
          )}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <Directions store={store} tone="light" />
          {store.source ? (
            <span className="text-right text-[0.6rem] leading-tight text-ink-faint/80">
              {store.source}
              <br />
              to confirm
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * The section
 * ------------------------------------------------------------------ */

export default function StoresSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Translate only, never scale — see the flicker note in the README.
  const skylineX = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : ['-3%', '3%'],
  );

  const flagship = STORES.find((s) => s.flagship) ?? STORES[0];
  const rest = STORES.filter((s) => s !== flagship);

  return (
    <section
      ref={ref}
      id="stores"
      className="grain relative scroll-mt-24 overflow-hidden bg-parchment py-20 md:py-28"
      aria-labelledby="stores-heading"
    >
      {/* Gwalior along the base, drifting against the scroll. */}
      <motion.div
        aria-hidden
        style={{ x: skylineX }}
        className="pointer-events-none absolute inset-x-0 bottom-0 text-ink/[0.06] will-change-transform"
      >
        <GwaliorSkyline className="w-full min-w-[64rem]" idPrefix="stores-sec" />
      </motion.div>

      <Bowl
        aria-hidden
        className="pointer-events-none absolute top-24 right-10 hidden w-20 text-olive/25 lg:block"
      />
      <Sparkle
        aria-hidden
        className="pointer-events-none absolute top-40 left-[6%] hidden w-6 text-saffron/60 xl:block"
      />

      <div className="relative mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        {/* ---------------- heading ---------------- */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal as="p" variant="fade" className="eyebrow flex items-center gap-2.5 text-olive">
              <span className="h-px w-6 bg-current opacity-45" />
              Our stores
            </Reveal>
            <TextReveal
              as="h2"
              id="stores-heading"
              text="Come say namaste."
              className="mt-4 text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.06]"
              delay={0.06}
            />
            <Reveal delay={0.16} y={12}>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft md:text-[1.03rem]">
                Every shop is in Gwalior, and every one of them is a counter you can walk up to.
                The Phalka Bazar kitchen behind the first is where all of it is still made.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <ArrowLink href="/stores" className="pb-2">
              All stores &amp; map
            </ArrowLink>
          </Reveal>
        </div>

        <DrawIn delay={220} className="mt-8 hidden w-40 md:block">
          <Flourish aria-hidden className="w-full text-olive/30" />
        </DrawIn>

        {/* ---------------- the flagship ---------------- */}
        <Reveal variant="scale" className="mt-12">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-ink/10 shadow-[0_50px_90px_-56px_rgba(43,26,18,0.7)]">
            <div className="relative aspect-16/10 md:aspect-21/9">
              <Parallax
                speed={0.06}
                className="absolute inset-[-6%]"
                innerClassName="relative size-full will-change-transform"
              >
                <Media
                  name={flagship.image}
                  alt="The Bapu Best shopfront in Phalka Bazar, Gwalior, with the name lit above the door"
                  fill
                  priority
                  sizes="100vw"
                  imgClassName="object-cover"
                />
              </Parallax>
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 via-55% to-transparent md:bg-gradient-to-r md:from-ink/95 md:via-ink/40 md:via-55% md:to-transparent"
              />
            </div>

            {/* The card sits inside the frame on desktop and under the image on
                a phone, where an overlay would cover the shopfront entirely. */}
            <div className="relative -mt-24 px-6 pb-7 text-ivory sm:px-9 md:absolute md:inset-y-0 md:left-0 md:mt-0 md:flex md:max-w-lg md:flex-col md:justify-center md:px-12 md:pb-0">
              <Reveal variant="left" y={22}>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald/45 bg-emerald/15 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.16em] text-ivory uppercase backdrop-blur-[2px]">
                  <StatusDot confirmed />
                  The original counter
                </span>

                <h3 className="mt-4 font-display text-[clamp(1.7rem,4vw,2.6rem)] leading-[1.05] text-ivory">
                  {flagship.name}
                </h3>

                <p className="mt-3 max-w-sm text-[0.92rem] leading-relaxed text-ivory/80">
                  {flagship.address}
                </p>

                {flagship.note ? (
                  <p className="mt-4 max-w-sm font-display text-[1.02rem] leading-snug text-saffron italic">
                    {flagship.note}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Directions store={flagship} tone="dark" />
                  {flagship.phone ? (
                    <a
                      href={`tel:${flagship.phone.replace(/\s/g, '')}`}
                      className="text-[0.82rem] font-semibold text-ivory/80 transition-colors hover:text-saffron"
                    >
                      <span className="link-underline">{flagship.phone}</span>
                    </a>
                  ) : null}
                </div>

                <p className="mt-5 inline-flex items-center gap-1.5 text-[0.78rem] text-ivory/60">
                  <span aria-hidden className="size-1 rounded-full bg-emerald" />
                  {flagship.hours}
                </p>
              </Reveal>
            </div>
          </div>
        </Reveal>

        {/* ---------------- the rest ---------------- */}
        <Stagger step={0.08} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {rest.map((store) => (
            <StaggerItem key={store.id} as="div" y={24} className="h-full">
              <StoreCardInner store={store} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* The key for the two dots. Small, and it earns its place — it is the
            difference between "we know" and "the internet says". */}
        <Reveal delay={0.1}>
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.72rem] text-ink-faint">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-emerald" />
              Address on the pack and the FSSAI licence
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-saffron" />
              From a public listing, waiting on the family to confirm
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
