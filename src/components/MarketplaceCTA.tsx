import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
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

      {/* floating namkeen doodles, drifting slowly */}
      <SevStrands
        aria-hidden
        className="pointer-events-none absolute top-16 left-[8%] hidden w-24 rotate-[-8deg] text-ink/20 md:block"
      />
      <Peanut
        aria-hidden
        className="pointer-events-none absolute right-[10%] bottom-20 hidden w-12 rotate-[18deg] text-ink/20 md:block"
      />
      <Sparkle
        aria-hidden
        className="pointer-events-none absolute top-24 right-[16%] hidden w-6 text-saffron/60 lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Eyebrow>Buy online</Eyebrow>
          <h2
            id="cta-heading"
            className="mt-5 max-w-2xl text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1.02]"
          >
            Your favourite namkeen is just a click away.
          </h2>
          <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-ink-soft">
            Now available on Amazon and Flipkart, delivered anywhere in India — the same
            400&nbsp;g packs we sell over the counter in Gwalior.
          </p>
          <BuyPair size="lg" className="mt-9" />
          <MarketplaceLockup className="mt-9 border-t border-ink/12 pt-7" />
          <p className="mt-4 text-[0.75rem] text-ink-faint">
            Bapu Best does not sell directly from this site — every order is fulfilled by the
            marketplace you choose.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-5">
          <figure className="relative mx-auto max-w-md">
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-[0_44px_80px_-52px_rgba(43,26,18,0.6)]">
              <Media
                name="detail-milan-bowl"
                alt="Bapu Best Bites Milan Mixture pack with a bowl of mixture"
                fill
                sizes="(max-width: 1024px) 88vw, 34vw"
                imgClassName="object-cover"
              />
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
