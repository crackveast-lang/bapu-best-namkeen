import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import TextReveal from '@/components/ui/TextReveal';
import Parallax from '@/components/ui/Parallax';
import { Floater } from '@/components/art/Decor';
import { BuyPair } from '@/components/ui/BuyButton';
import { Eyebrow } from '@/components/ui/Bits';
import MarketplaceLockup from '@/components/ui/MarketplaceLockup';
import { Peanut, SevStrands, Sparkle } from '@/components/art/Doodles';

/** The conversion moment. One heading, two buttons, nothing competing. */
export default function MarketplaceCTA() {
  return (
    <section
      className="grain relative isolate overflow-hidden bg-parchment py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(240,168,48,0.26), rgba(240,168,48,0.05) 60%, transparent)',
        }}
      />

      {/* floating namkeen doodles, each on its own rhythm so they never move
          in lockstep */}
      <Floater
        className="top-16 left-[8%] hidden w-24 text-ink/20 md:block"
        y={-11}
        rot={-8}
        duration={9}
      >
        <SevStrands className="w-full" />
      </Floater>
      <Floater
        className="right-[10%] bottom-20 hidden w-12 text-ink/20 md:block"
        y={13}
        rot={18}
        duration={8}
        delay={0.9}
      >
        <Peanut className="w-full" />
      </Floater>
      <Floater
        className="top-24 right-[16%] hidden w-6 text-saffron/60 lg:block"
        y={-9}
        spin={14}
        duration={6.5}
        delay={0.4}
      >
        <Sparkle className="w-full" />
      </Floater>

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Eyebrow>Buy online</Eyebrow>
          <TextReveal
            as="h2"
            id="cta-heading"
            text="Your favourite namkeen is just a click away."
            className="mt-5 max-w-2xl text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1.02]"
          />
          <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-ink-soft">
            Now available on Amazon and Flipkart, delivered anywhere in India — the same
            400&nbsp;g packs we sell over the counter in Gwalior.
          </p>
          <BuyPair size="lg" className="mt-9" magnetic />
          <MarketplaceLockup className="mt-9 border-t border-ink/12 pt-7" />
          <p className="mt-4 text-[0.75rem] text-ink-faint">
            Bapu Best does not sell directly from this site — every order is fulfilled by the
            marketplace you choose.
          </p>
        </Reveal>

        <Reveal delay={0.12} variant="scale" className="lg:col-span-5">
          <figure className="group relative mx-auto max-w-md">
            <div className="sheen relative aspect-square overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-[0_44px_80px_-52px_rgba(43,26,18,0.6)]">
              <Parallax
                speed={0.07}
                className="absolute inset-[-7%]"
                innerClassName="relative size-full"
              >
                <Media
                  name="detail-milan-bowl"
                  alt="Bapu Best Bites Milan Mixture pack with a bowl of mixture"
                  fill
                  sizes="(max-width: 1024px) 88vw, 34vw"
                  imgClassName="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </Parallax>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
