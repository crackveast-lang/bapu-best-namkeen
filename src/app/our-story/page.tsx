import type { Metadata } from 'next';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import Timeline from '@/components/Timeline';
import ProcessSection from '@/components/ProcessSection';
import MarketplaceCTA from '@/components/MarketplaceCTA';
import { Copy, Eyebrow, Placeholder, SectionHeading } from '@/components/ui/Bits';
import { STORY_INTRO } from '@/data/story';
import { LEGAL } from '@/data/site';
import GwaliorSkyline from '@/components/art/GwaliorSkyline';
import { CircleScribble } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Bapu Best has made namkeen in Phalka Bazar, Lashkar, Gwalior since 1960. The story of the family behind Bapu Best and Bapu Best Bites.',
  alternates: { canonical: '/our-story' },
};

export default function OurStoryPage() {
  return (
    <>
      {/* ---------------- opening ---------------- */}
      <section className="grain relative overflow-hidden bg-maroon-deep pt-16 pb-20 text-ivory md:pt-24 md:pb-28">
        <Decor variant="header" tone="dark" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 text-ivory/[0.07]"
        >
          <GwaliorSkyline className="w-full" idPrefix="storypage" />
        </div>

        <div className="relative mx-auto w-full max-w-[88rem] px-5 sm:px-8">
          <Eyebrow className="text-saffron">Our story</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,7.5vw,5rem)] leading-[0.98] text-ivory">
            It started in{' '}
            <span className="relative inline-block">
              Gwalior.
              <CircleScribble
                aria-hidden
                className="pointer-events-none absolute -inset-x-5 -inset-y-4 h-[calc(100%+2rem)] w-[calc(100%+2.5rem)] text-saffron/55"
              />
            </span>
          </h1>
          <p className="mt-8 max-w-2xl font-display text-[1.2rem] leading-relaxed text-ivory/85 italic md:text-[1.4rem]">
            {STORY_INTRO.standfirst}
          </p>
        </div>
      </section>

      {/* ---------------- the story ---------------- */}
      <section className="bg-ivory py-16 md:py-24" aria-labelledby="founding-heading">
        <div className="mx-auto grid w-full max-w-[88rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <figure>
              <div className="relative aspect-4/5 overflow-hidden rounded-[1.5rem] border border-ink/10 bg-cream">
                <Media
                  name={STORY_INTRO.image}
                  alt="The counter of a Bapu Best shop in Gwalior"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 46vw"
                />
              </div>
              <figcaption className="mt-3 text-[0.72rem] tracking-[0.08em] text-ink-faint uppercase">
                Our shop, Gwalior
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:pt-6">
            <h2 id="founding-heading" className="text-[clamp(1.8rem,4.2vw,2.8rem)] leading-tight">
              The part only the family can tell.
            </h2>
            <div className="mt-6 space-y-5 text-[0.98rem] leading-relaxed text-ink-soft">
              <p>
                We know where it is made: {LEGAL.addressLine}, {LEGAL.city}. We know the year on
                the pack: 1960. Everything after that — who lit the first stove, whose recipe it
                was, what the shop was called before it was called Bapu Best — belongs to the
                family, and we would rather print it right than print it soon.
              </p>
              <div>
                <Copy value={STORY_INTRO.body} />
              </div>
            </div>

            <div className="mt-9 rounded-[1.1rem] border border-dashed border-crimson/35 bg-crimson/[0.04] p-5">
              <p className="text-[0.78rem] leading-relaxed text-ink-soft">
                <strong className="font-semibold text-ink">A note on this page.</strong> Every
                bracketed block is a gap waiting on the business. Nothing about the founding
                has been invented to fill space — see{' '}
                <code className="rounded bg-ink/8 px-1 py-0.5 text-[0.72rem]">
                  CONTENT-TODO.md
                </code>{' '}
                in the project for the full list.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- timeline ---------------- */}
      <section className="grain bg-parchment py-16 md:py-24" aria-labelledby="timeline-heading">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The long version"
              title={<span id="timeline-heading">Six decades, in order.</span>}
              lede="Two of these dates come off the packs themselves. The rest are marked, and stay marked, until the family fills them in."
              align="center"
            />
          </Reveal>
          <Timeline />
          <Reveal className="mt-4 text-center">
            <Placeholder>Add founding story &amp; dates</Placeholder>
          </Reveal>
        </div>
      </section>

      <ProcessSection />
      <MarketplaceCTA />
    </>
  );
}
