import type { Metadata } from 'next';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import StoreMap from '@/components/StoreMap';
import MarketplaceCTA from '@/components/MarketplaceCTA';
import { StoreCard } from '@/components/StoresSection';
import { Eyebrow } from '@/components/ui/Bits';
import { STORES } from '@/data/stores';
import { CONTACT, LEGAL } from '@/data/site';
import { Bowl } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

export const metadata: Metadata = {
  title: 'Our Stores',
  description:
    'Visit Bapu Best in Gwalior. Our namkeen is made and sold at Phalka Bazar, Lashkar, Gwalior, Madhya Pradesh.',
  alternates: { canonical: '/stores' },
};

const GALLERY = ['store-counter', 'store-mithai', 'store-sweets', 'store-shelf'] as const;

export default function StoresPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-parchment pt-14 pb-16 md:pt-20 md:pb-20">
        <Decor variant="header" />
        <Bowl
          aria-hidden
          className="pointer-events-none absolute top-20 right-[8%] hidden w-24 text-ink/12 lg:block"
        />
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
          <Eyebrow>Our stores</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.4rem,6.5vw,4.4rem)] leading-[1.0]">
            Come say namaste.
          </h1>
          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
            Find Bapu Best near you in Gwalior. Our counter at {LEGAL.addressLine} is both the
            shop and the kitchen — the address printed on the back of every pack.
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.85rem] text-ink-soft">
            {CONTACT.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, '')}`}
                className="link-underline font-medium text-ink"
              >
                {p}
              </a>
            ))}
          </p>
        </div>
      </section>

      {/* ---------------- cards ---------------- */}
      <section className="bg-ivory py-16 md:py-20" aria-labelledby="outlets-heading">
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
          <h2 id="outlets-heading" className="sr-only">
            Store locations
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STORES.map((store, i) => (
              <Reveal as="li" key={store.id} delay={i * 0.06}>
                <StoreCard store={store} className="h-full" />
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-[0.8rem] leading-relaxed text-ink-faint">
            Only the Phalka Bazar address has been confirmed by the business. The remaining
            cards show real photographs of our shops, but their names, addresses and hours are
            still to be supplied — so they are shown as gaps rather than guesses.
          </p>
        </div>
      </section>

      <StoreMap />

      {/* ---------------- gallery ---------------- */}
      <section className="bg-ivory py-16 md:py-20" aria-labelledby="gallery-heading">
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
          <Reveal>
            <h2 id="gallery-heading" className="text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight">
              Inside the shop.
            </h2>
          </Reveal>
          <ul className="no-scrollbar mt-9 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
            {GALLERY.map((name, i) => (
              <Reveal
                as="li"
                key={name}
                delay={i * 0.05}
                className="w-[86vw] shrink-0 snap-start sm:w-[62vw] lg:w-[46vw]"
              >
                <div className="group relative aspect-16/9 overflow-hidden rounded-[1.25rem] border border-ink/10 bg-cream">
                  <Media
                    name={name}
                    alt="Inside a Bapu Best shop in Gwalior"
                    fill
                    sizes="(max-width: 640px) 86vw, 50vw"
                    imgClassName="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <MarketplaceCTA />
    </>
  );
}
