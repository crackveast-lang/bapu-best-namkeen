import type { Metadata } from 'next';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import ProductCard from '@/components/ProductCard';
import MarketplaceCTA from '@/components/MarketplaceCTA';
import { Eyebrow } from '@/components/ui/Bits';
import { BRANDS, PACK_LABEL, PRODUCTS, productsByBrand } from '@/data/products';
import { SevStrands } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

export const metadata: Metadata = {
  title: 'Our Namkeen',
  description:
    'Every namkeen made by Bapu Best in Gwalior — Ratlami Sev, Sada Sev, Milan Mixture, Indori Khatta Meetha, Kadipatta Mix, Waffer Mix and more. Order on Amazon or Flipkart.',
  alternates: { canonical: '/namkeen' },
};

export default function NamkeenPage() {
  return (
    <>
      {/* ---------------- header ---------------- */}
      <section className="grain relative overflow-hidden bg-parchment pt-14 pb-16 md:pt-20 md:pb-20">
        <Decor variant="header" />
        <SevStrands
          aria-hidden
          className="pointer-events-none absolute top-16 right-[6%] hidden w-28 text-saffron/35 lg:block"
        />
        <div className="mx-auto grid w-full max-w-[88rem] items-end gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Our namkeen</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.4rem,6.5vw,4.4rem)] leading-[1.0]">
              {PRODUCTS.length} ways to reach
              <br />
              for the pack.
            </h1>
            <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ink-soft">
              Sevs and mixtures across both our brands. Every one is fried and seasoned in
              Gwalior, and every one is on the shelf at our Phalka Bazar counter.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-4/3 overflow-hidden rounded-[1.5rem] border border-ink/10">
              <Media
                name="detail-ratlami-flat"
                alt="Bapu Best Bites Ratlami Sev photographed from above with sev scattered around the pack"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- by brand ---------------- */}
      {Object.values(BRANDS).map((brand, bi) => {
        const items = productsByBrand(brand.id);
        return (
          <section
            key={brand.id}
            id={brand.id}
            className={`scroll-mt-24 py-16 md:py-20 ${bi % 2 === 0 ? 'bg-ivory' : 'bg-parchment grain'}`}
            aria-labelledby={`${brand.id}-heading`}
          >
            <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
              <Reveal>
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-ink/12 pb-6">
                  <h2 id={`${brand.id}-heading`} className="text-[clamp(1.6rem,3.6vw,2.4rem)]">
                    {brand.name}
                  </h2>
                  <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-ink-faint uppercase">
                    {brand.lockup} &middot; Since {brand.since}
                  </p>
                  <p className="ml-auto font-script text-[1.2rem] text-saffron">{brand.blurb}</p>
                </div>
              </Reveal>

              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((product, i) => (
                  <Reveal as="li" key={product.slug} delay={(i % 4) * 0.06}>
                    <ProductCard product={product} className="h-full" />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* ---------------- pack label ---------------- */}
      <section className="bg-ivory py-16 md:py-20" aria-labelledby="label-heading">
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
          <Reveal>
            <div className="rounded-[1.5rem] border border-ink/12 bg-parchment p-7 md:p-10">
              <Eyebrow>Straight off the pack</Eyebrow>
              <h2 id="label-heading" className="mt-4 text-[clamp(1.5rem,3.2vw,2.1rem)]">
                What&rsquo;s printed on the back.
              </h2>
              <p className="mt-3 max-w-2xl text-[0.88rem] leading-relaxed text-ink-soft">
                Transcribed word for word, so nothing here is a paraphrase.
              </p>

              <dl className="mt-8 grid gap-7 md:grid-cols-3">
                <div>
                  <dt className="text-[0.66rem] font-semibold tracking-[0.18em] text-ink-faint uppercase">
                    Ingredients
                  </dt>
                  <dd className="mt-2.5 text-[0.85rem] leading-relaxed text-ink-soft">
                    {PACK_LABEL.ingredients}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.66rem] font-semibold tracking-[0.18em] text-crimson uppercase">
                    Allergen information
                  </dt>
                  <dd className="mt-2.5 text-[0.85rem] leading-relaxed text-ink-soft">
                    {PACK_LABEL.allergens}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.66rem] font-semibold tracking-[0.18em] text-ink-faint uppercase">
                    Storage
                  </dt>
                  <dd className="mt-2.5 text-[0.85rem] leading-relaxed text-ink-soft">
                    {PACK_LABEL.storage}
                  </dd>
                </div>
              </dl>

              <p className="mt-8 border-t border-ink/12 pt-5 text-[0.75rem] leading-relaxed text-ink-faint italic">
                {PACK_LABEL.note}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <MarketplaceCTA />
    </>
  );
}
