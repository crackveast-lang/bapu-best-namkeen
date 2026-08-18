import ProductCarousel from '@/components/ProductCarousel';
import Reveal from '@/components/ui/Reveal';
import { ArrowLink, SectionHeading } from '@/components/ui/Bits';
import { FEATURED_PRODUCTS, PRODUCTS } from '@/data/products';
import { CurryLeaf } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

export default function SignatureSection() {
  return (
    <section
      id="namkeen"
      className="grain relative scroll-mt-24 bg-parchment py-20 md:py-28 overflow-hidden"
      aria-labelledby="signature-heading"
    >
      <Decor variant="products" />
      <CurryLeaf
        aria-hidden
        className="pointer-events-none absolute top-16 right-8 hidden w-14 rotate-12 text-olive/30 lg:block"
      />

      <div className="relative mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our signature namkeen"
              title="Made for every craving."
              titleId="signature-heading"
              lede={`${PRODUCTS.length} mixtures and sevs across our two brands, each with its own pack and its own reason to reach for it.`}
              className="max-w-xl"
            />
            <ArrowLink href="/namkeen" className="pb-2">
              See every namkeen
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ProductCarousel products={FEATURED_PRODUCTS} />
        </Reveal>
      </div>
    </section>
  );
}
