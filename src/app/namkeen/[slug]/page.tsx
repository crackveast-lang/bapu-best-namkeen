import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ProductGallery from '@/components/product/ProductGallery';
import Accordion from '@/components/product/Accordion';
import IngredientBreakdown from '@/components/product/IngredientBreakdown';
import ProductFeatures from '@/components/product/ProductFeatures';
import RelatedProducts, { TryThese } from '@/components/product/RelatedProducts';
import MarketplaceLockup from '@/components/ui/MarketplaceLockup';
import MarketplaceCTA from '@/components/MarketplaceCTA';
import BuyButton from '@/components/ui/BuyButton';
import Reveal from '@/components/ui/Reveal';
import TextReveal from '@/components/ui/TextReveal';
import { Placeholder } from '@/components/ui/Bits';
import { Rays, SevStrands, Sparkle } from '@/components/art/Doodles';

import {
  BRANDS,
  PACK_LABEL,
  PRODUCTS,
  productBySlug,
  relatedProducts,
} from '@/data/products';
import { LEGAL, SITE } from '@/data/site';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};

  const brand = BRANDS[product.brand];
  const title = `${product.name} — ${brand.name}`;

  return {
    title,
    description: `${product.description} Made in Gwalior by ${LEGAL.entity}. Order on Amazon or Flipkart.`,
    alternates: { canonical: `/namkeen/${product.slug}` },
    openGraph: {
      type: 'website',
      title,
      description: product.description,
      url: `${SITE.url}/namkeen/${product.slug}`,
      images: [{ url: `/images/${product.gallery[0]}.webp`, alt: `${product.name} pack` }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const brand = BRANDS[product.brand];
  const related = relatedProducts(product);

  /**
   * Product schema. Deliberately carries no `offers` block and no
   * `aggregateRating`: we have neither a price nor a single review, and
   * inventing either would put false data in a rich result.
   */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${brand.name} ${product.name}`,
    description: product.longDescription,
    image: `${SITE.url}/images/${product.gallery[0]}.webp`,
    brand: { '@type': 'Brand', name: brand.name },
    category: 'Namkeen',
    ...(product.netWeight
      ? { weight: { '@type': 'QuantitativeValue', value: 400, unitCode: 'GRM' } }
      : {}),
    manufacturer: {
      '@type': 'Organization',
      name: LEGAL.entity,
      address: {
        '@type': 'PostalAddress',
        streetAddress: LEGAL.addressLine,
        addressLocality: LEGAL.city,
        addressRegion: LEGAL.state,
        postalCode: LEGAL.postalCode,
        addressCountry: LEGAL.country,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= breadcrumb ================= */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto w-full max-w-[88rem] px-5 pt-6 pb-2 sm:px-8"
      >
        <ol className="flex flex-wrap items-center gap-2 text-[0.78rem] text-ink-faint">
          <li>
            <Link href="/" className="link-underline hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/namkeen" className="link-underline hover:text-ink">
              Namkeen
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* ================= main product block ================= */}
      <section className="mx-auto w-full max-w-[88rem] px-5 pb-14 sm:px-8" aria-labelledby="product-title">
        <div className="grain relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-parchment p-5 sm:p-8 lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-[30rem] rounded-full opacity-60 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(240,168,48,0.24), transparent 70%)',
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* ---- gallery ---- */}
            <ProductGallery
              images={[...product.gallery]}
              productName={product.name}
              accent={product.accent}
            />

            {/* ---- info ---- */}
            <div className="lg:pt-2">
              <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-ink-faint uppercase">
                {brand.name}
              </p>
              <TextReveal
                as="h1"
                id="product-title"
                text={product.name}
                className="mt-2 text-[clamp(2rem,5vw,3.1rem)] leading-[1.02]"
              />
              <Reveal delay={0.16} y={10}>
                <p className="mt-1.5 font-script text-[1.35rem] leading-none text-saffron">
                  {product.strapline}
                </p>
              </Reveal>

              {/* weight — no price, because we have no MRP on record */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {product.netWeight ? (
                  <span
                    className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold text-ivory"
                    style={{ background: product.accent }}
                  >
                    Net {product.netWeight}
                  </span>
                ) : (
                  <Placeholder>Add net weight</Placeholder>
                )}
                <span className="text-[0.78rem] text-ink-faint">
                  Price shown on Amazon &amp; Flipkart
                </span>
              </div>

              <p className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-ink-soft">
                {product.longDescription}
              </p>

              {/* ---- the only purchase actions on the site ---- */}
              {/* Not magnetic: these two stretch to fill the row, and the
                  magnetic wrapper's own box would swallow `flex-1`. */}
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <BuyButton
                  marketplace="amazon"
                  variant="solid"
                  size="lg"
                  href={product.amazon}
                  className="flex-1"
                />
                <BuyButton
                  marketplace="flipkart"
                  variant="outline"
                  size="lg"
                  href={product.flipkart}
                  className="flex-1"
                />
              </div>

              <div className="mt-8 border-t border-ink/12 pt-7">
                <TryThese products={related} />
              </div>

              <div className="mt-8 border-t border-ink/12 pt-7">
                <MarketplaceLockup />
              </div>

              {/* ---- accordions ---- */}
              <div className="mt-8 border-t border-ink/12">
                <Accordion title="Ingredients list" defaultOpen>
                  {product.brand === 'best-bites' ? (
                    <>
                      <p>{PACK_LABEL.ingredients}</p>
                      <p className="mt-3 text-crimson">
                        <strong className="font-semibold">Allergens.</strong>{' '}
                        {PACK_LABEL.allergens}
                      </p>
                      <p className="mt-3 text-[0.78rem] text-ink-faint italic">
                        {PACK_LABEL.note}
                      </p>
                    </>
                  ) : (
                    <>
                      <Placeholder>Add the Bapu Best ingredient panel</Placeholder>
                      <p className="mt-3">
                        The declared list for the Bapu Best range has not been supplied. Our
                        transcription belongs to a Bapu Best Bites pouch and is not shown here,
                        because it is a different pack — please read the one you receive.
                      </p>
                    </>
                  )}
                </Accordion>

                <Accordion title="Storage">
                  <p>{PACK_LABEL.storage}</p>
                </Accordion>

                <Accordion title="Manufacturer">
                  <p>
                    {LEGAL.entity}
                    <br />
                    {LEGAL.addressLine}, {LEGAL.city}, {LEGAL.state} {LEGAL.postalCode}
                  </p>
                  <p className="mt-2.5">
                    FSSAI Lic. No. {LEGAL.fssai} &middot; {LEGAL.iso} certified
                  </p>
                </Accordion>
              </div>
            </div>
          </div>

          <SevStrands
            aria-hidden
            className="pointer-events-none absolute bottom-6 left-8 hidden w-24 text-ink/12 lg:block"
          />
        </div>
      </section>

      <ProductFeatures />

      {/* ================= fun fact ================= */}
      {product.funFact ? (
        <section
          className="grain relative overflow-hidden bg-maroon-deep py-16 text-ivory md:py-20"
          aria-labelledby="fact-heading"
        >
          <Sparkle
            aria-hidden
            className="pointer-events-none absolute top-10 right-[12%] hidden w-7 text-saffron/60 md:block"
          />
          <div className="relative mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
            <Rays aria-hidden className="mx-auto w-16 text-saffron" />
            <h2
              id="fact-heading"
              className="mt-4 font-script text-[clamp(1.8rem,4.6vw,2.6rem)] leading-none text-saffron"
            >
              Ek fun fact!
            </h2>
            <p className="mt-6 font-display text-[clamp(1.1rem,2.6vw,1.45rem)] leading-relaxed text-ivory/90 italic">
              {product.funFact}
            </p>
          </div>
        </section>
      ) : null}

      <IngredientBreakdown product={product} />

      {/* ================= reviews ================= */}
      <section className="bg-ivory py-16 md:py-20" aria-labelledby="reviews-heading">
        <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 id="reviews-heading" className="text-[clamp(1.6rem,3.6vw,2.3rem)] leading-tight">
              No reviews yet.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[0.92rem] leading-relaxed text-ink-soft">
              We would rather show none than write our own. Ratings and reviews appear here once
              real customers leave them.
            </p>
            <div className="mt-6">
              <Placeholder>Add customer reviews</Placeholder>
            </div>
          </Reveal>
        </div>
      </section>

      <RelatedProducts products={related} heading="Liked it? Try these!" />

      <MarketplaceCTA />
    </>
  );
}
