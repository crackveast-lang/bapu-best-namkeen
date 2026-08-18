import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import TextReveal from '@/components/ui/TextReveal';
import { Eyebrow, Placeholder } from '@/components/ui/Bits';
import { TESTIMONIALS } from '@/data/story';
import { SpiceScatter } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

/**
 * No reviews have been supplied. Every slot renders as a visibly empty quote
 * card — the section is laid out and ready, but it never invents a customer.
 */
export default function Testimonials() {
  return (
    <section
      className="grain relative overflow-hidden bg-maroon py-20 text-ivory md:py-28"
      aria-labelledby="love-heading"
    >
      <Decor variant="reviews" tone="dark" />
      <SpiceScatter
        aria-hidden
        className="pointer-events-none absolute top-12 left-8 hidden w-32 text-ivory/10 lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow className="text-saffron">Customer love</Eyebrow>
          <TextReveal
            as="h2"
            id="love-heading"
            text={'Loved by Gwalior.\nShared everywhere.'}
            className="mt-5 text-[clamp(2rem,4.8vw,3.2rem)] leading-[1.04] text-ivory"
          />
          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ivory/70">
            We would rather leave this space open than fill it with words nobody said. Real
            reviews go here as soon as they arrive.
          </p>

          <figure className="mt-10 hidden overflow-hidden rounded-[1.25rem] border border-ivory/12 lg:block">
            <div className="relative aspect-4/3">
              <Media
                name="detail-bowl-khatta-meetha"
                alt="A glass bowl of Bapu Best Khatta Meetha namkeen"
                fill
                sizes="40vw"
                imgClassName="object-cover"
              />
            </div>
          </figure>
        </Reveal>

        <ul className="space-y-4 lg:col-span-7">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 0.08} variant="right" y={16}>
              <blockquote className="rounded-[1.1rem] border border-dashed border-ivory/25 bg-ivory/[0.04] p-6 transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ivory/45 hover:bg-ivory/[0.08] md:p-7">
                <span
                  aria-hidden
                  className="block font-display text-[2.6rem] leading-[0.6] text-saffron/45"
                >
                  &ldquo;
                </span>
                <p className="mt-3 font-display text-[1.1rem] leading-relaxed text-ivory/40 italic md:text-[1.22rem]">
                  A real review from a real customer goes here — nothing has been written for
                  them.
                </p>
                <footer className="mt-5 flex flex-wrap items-center gap-2.5">
                  <span className="h-px w-6 bg-ivory/25" aria-hidden />
                  <Placeholder className="!border-saffron/45 !bg-saffron/10 !text-saffron">
                    {t.quote.replace(/^\[|\]$/g, '')}
                  </Placeholder>
                  <Placeholder className="!border-ivory/25 !bg-ivory/5 !text-ivory/60">
                    Name
                  </Placeholder>
                  <Placeholder className="!border-ivory/25 !bg-ivory/5 !text-ivory/60">
                    City
                  </Placeholder>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
