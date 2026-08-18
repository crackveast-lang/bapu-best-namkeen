import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { ArrowLink, Copy, Eyebrow } from '@/components/ui/Bits';
import { STORY_INTRO } from '@/data/story';
import { LEGAL } from '@/data/site';
import { CircleScribble } from '@/components/art/Doodles';
import GwaliorSkyline from '@/components/art/GwaliorSkyline';
import Decor from '@/components/art/Decor';

export default function StorySection() {
  return (
    <section
      id="story"
      className="grain relative scroll-mt-24 overflow-hidden bg-maroon-deep py-20 text-ivory md:py-28"
      aria-labelledby="story-heading"
    >
      <Decor variant="story" tone="dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 text-ivory/[0.07]"
      >
        <GwaliorSkyline className="w-full" idPrefix="story" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* ---- image ---- */}
        <Reveal className="lg:col-span-6">
          <figure className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-[1.5rem] border border-ivory/12 shadow-[0_50px_90px_-50px_rgba(0,0,0,0.8)]">
              <Media
                name={STORY_INTRO.image}
                alt="Inside a Bapu Best shop in Gwalior, with namkeen and sweets on the counter"
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                imgClassName="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.72rem] tracking-[0.08em] text-ivory/50 uppercase">
              Our counter in {LEGAL.city}
            </figcaption>
          </figure>
        </Reveal>

        {/* ---- text ---- */}
        <Reveal delay={0.1} className="lg:col-span-6">
          <Eyebrow className="text-saffron">{STORY_INTRO.eyebrow}</Eyebrow>

          <h2
            id="story-heading"
            className="relative mt-5 text-[clamp(2.1rem,5.2vw,3.5rem)] leading-[1.02] text-ivory"
          >
            It started in{' '}
            <span className="relative inline-block">
              Gwalior.
              <CircleScribble
                aria-hidden
                className="pointer-events-none absolute -inset-x-4 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2rem)] text-saffron/55"
              />
            </span>
          </h2>

          <p className="mt-6 max-w-lg font-display text-[1.15rem] leading-relaxed text-ivory/85 italic md:text-[1.25rem]">
            {STORY_INTRO.standfirst}
          </p>

          <div className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-ivory/70">
            <Copy value={STORY_INTRO.body} />
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-2 gap-6 border-t border-ivory/15 pt-8">
            <div>
              <dt className="text-[0.66rem] tracking-[0.18em] text-ivory/45 uppercase">
                On packs since
              </dt>
              <dd className="mt-1 font-display text-[2rem] leading-none text-saffron">1960</dd>
            </div>
            <div>
              <dt className="text-[0.66rem] tracking-[0.18em] text-ivory/45 uppercase">
                Made in
              </dt>
              <dd className="mt-1 font-display text-[1.35rem] leading-tight text-ivory">
                {LEGAL.addressLine}
                <span className="block text-[0.8rem] font-normal tracking-wide text-ivory/55">
                  {LEGAL.city}, {LEGAL.state}
                </span>
              </dd>
            </div>
          </dl>

          <ArrowLink
            href="/our-story"
            className="mt-9 !text-ivory hover:!text-saffron"
          >
            Read our story
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
