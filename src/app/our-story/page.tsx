import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import DrawIn from '@/components/ui/DrawIn';
import Timeline from '@/components/Timeline';
import LegacySection from '@/components/LegacySection';
import ProcessSection from '@/components/ProcessSection';
import MarketplaceCTA from '@/components/MarketplaceCTA';
import { Eyebrow, Placeholder, SectionHeading } from '@/components/ui/Bits';
import { STORY_INTRO } from '@/data/story';
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
              <DrawIn delay={620} className="pointer-events-none absolute inset-0">
                <CircleScribble className="absolute -inset-x-5 -inset-y-4 h-[calc(100%+2rem)] w-[calc(100%+2.5rem)] text-saffron/55" />
              </DrawIn>
            </span>
          </h1>
          <p className="mt-8 max-w-2xl font-display text-[1.2rem] leading-relaxed text-ivory/85 italic md:text-[1.4rem]">
            {STORY_INTRO.standfirst}
          </p>
        </div>
      </section>

      {/* ---------------- the long version ---------------- */}
      {/* The story in the business's own words, told down the page. Same
          component as the homepage — one copy of the narrative, in story.ts.

          It follows the opening screen directly. There used to be a two-column
          photo-and-paragraph block in between, restating the address and the
          year before the story got to say either — a page that clears its
          throat twice. The facts it carried are all in LEGACY, said better. */}
      <LegacySection />

      {/* ---------------- timeline ---------------- */}
      {/* `overflow-hidden` because the timeline entries slide in from the
          left and right: until each one is scrolled to, it rests at its
          offset, which at narrow widths would sit outside the viewport. */}
      <section
        className="grain overflow-hidden bg-parchment py-16 md:py-24"
        aria-labelledby="timeline-heading"
      >
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="The same story, dated"
              title="Six decades, in order."
              titleId="timeline-heading"
              lede="1960 is confirmed twice over — the sunburst mark on the pack, and the founder named above. The dates between it and today are marked, and stay marked, until the family fills them in."
              align="center"
            />
          </Reveal>
          <Timeline />
          <Reveal className="mx-auto mt-8 max-w-2xl text-center">
            <Placeholder>Add the dates between 1960 and today</Placeholder>
            <p className="mt-5 text-[0.78rem] leading-relaxed text-ink-faint">
              Every bracketed block on this site is a gap waiting on the business, shown as a
              gap rather than filled with something plausible. Nothing about the founding has
              been invented — see{' '}
              <code className="rounded bg-ink/8 px-1 py-0.5 text-[0.72rem]">CONTENT-TODO.md</code>{' '}
              in the project for the full list.
            </p>
          </Reveal>
        </div>
      </section>

      <ProcessSection />
      <MarketplaceCTA />
    </>
  );
}
