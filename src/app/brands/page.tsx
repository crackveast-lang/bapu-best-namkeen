import type { Metadata } from 'next';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import TextReveal from '@/components/ui/TextReveal';
import DrawIn from '@/components/ui/DrawIn';
import ProductCard from '@/components/ProductCard';
import MarketplaceCTA from '@/components/MarketplaceCTA';
import { ArrowLink, Eyebrow } from '@/components/ui/Bits';
import { BRANDS, productsByBrand } from '@/data/products';
import { Flourish } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

export const metadata: Metadata = {
  title: 'Our Brands',
  description:
    'Bapu Best and Bapu Best Bites — two namkeen brands from one family kitchen in Phalka Bazar, Gwalior.',
  alternates: { canonical: '/brands' },
};

export default function BrandsPage() {
  const brands = Object.values(BRANDS);

  return (
    <>
      <section className="grain relative bg-parchment pt-14 pb-14 md:pt-20 md:pb-16 overflow-hidden">
        <Decor variant="header" />
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
          <Eyebrow>Our brands</Eyebrow>
          <TextReveal
            as="h1"
            text="Two names. One love for great namkeen."
            className="mt-5 max-w-3xl text-[clamp(2.4rem,6.5vw,4.4rem)] leading-[1.0]"
          />
          <Reveal delay={0.2} y={12}>
            <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
              The same family, the same kadhai, the same city. What changes is the pack — and
              how far it travels.
            </p>
          </Reveal>
          <DrawIn delay={320} className="mt-8 block w-40">
            <Flourish aria-hidden className="w-full text-ink/20" />
          </DrawIn>
        </div>
      </section>

      {brands.map((brand, i) => {
        const items = productsByBrand(brand.id);
        const flip = i % 2 === 1;

        return (
          <section
            key={brand.id}
            id={brand.id}
            className={`scroll-mt-24 py-16 md:py-24 ${flip ? 'grain bg-parchment' : 'bg-ivory'}`}
            aria-labelledby={`${brand.id}-title`}
          >
            <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
                  <figure className="relative aspect-4/3 overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-[0_44px_78px_-52px_rgba(43,26,18,0.55)]">
                    <Media
                      name={brand.image}
                      alt={`${brand.name} packaging with a bowl of namkeen`}
                      fill
                      sizes="(max-width: 1024px) 92vw, 46vw"
                    />
                  </figure>
                </Reveal>

                <Reveal delay={0.1} className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[0.6rem] font-semibold tracking-[0.16em] text-ivory uppercase"
                    style={{ background: brand.accent }}
                  >
                    Since {brand.since}
                  </span>
                  <h2
                    id={`${brand.id}-title`}
                    className="mt-4 text-[clamp(2rem,4.6vw,3.1rem)] leading-tight"
                  >
                    {brand.name}
                  </h2>
                  <p className="mt-1 text-[0.72rem] font-semibold tracking-[0.18em] text-ink-faint uppercase">
                    {brand.lockup}
                  </p>
                  <p className="mt-6 font-display text-[1.3rem] leading-snug text-maroon italic">
                    {brand.blurb}
                  </p>
                  <p className="mt-4 max-w-lg text-[0.96rem] leading-relaxed text-ink-soft">
                    {brand.copy}
                  </p>
                  <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/12 pt-6">
                    <div>
                      <dt className="text-[0.62rem] tracking-[0.18em] text-ink-faint uppercase">
                        Pack reads
                      </dt>
                      <dd className="mt-1 text-[0.9rem] text-ink">{brand.packName}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.62rem] tracking-[0.18em] text-ink-faint uppercase">
                        Varieties
                      </dt>
                      <dd className="mt-1 text-[0.9rem] text-ink">{items.length}</dd>
                    </div>
                  </dl>
                  <ArrowLink href={`/namkeen#${brand.id}`} className="mt-8">
                    See all {brand.name} namkeen
                  </ArrowLink>
                </Reveal>
              </div>

              <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {items.slice(0, 4).map((product, pi) => (
                  <Reveal as="li" key={product.slug} delay={pi * 0.06}>
                    <ProductCard product={product} className="h-full" />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <MarketplaceCTA />
    </>
  );
}
