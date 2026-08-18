import Link from 'next/link';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { BRANDS, type Product } from '@/data/products';
import { Flourish } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

/**
 * Compact thumbnail switcher, shown inside the buy column — the four packs you
 * might reach for instead. Mirrors the "Liked it? Try these!" row on a
 * conventional product page, but each swatch is a link to that product.
 */
export function TryThese({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <div>
      <h2 className="text-[0.95rem] font-semibold text-ink">Liked it? Try these!</h2>
      <ul className="mt-3 flex flex-wrap gap-3">
        {products.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/namkeen/${p.slug}`}
              className="group block"
              title={`${p.name} — ${BRANDS[p.brand].name}`}
            >
              <span className="relative block size-16 overflow-hidden rounded-[0.75rem] border border-ink/12 bg-cream transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-ink/40">
                <Media
                  name={p.pack ?? p.image}
                  alt=""
                  fill
                  sizes="64px"
                  imgClassName="object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  style={{ background: p.accent }}
                />
              </span>
              <span className="sr-only">{p.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Full-width carousel of related packs, below the product story. */
export default function RelatedProducts({
  products,
  heading = 'More from the shelf',
}: {
  products: Product[];
  heading?: string;
}) {
  if (!products.length) return null;

  return (
    <section className="relative bg-ivory py-16 md:py-20 overflow-hidden" aria-labelledby="related-heading">
      <Decor variant="brands" />
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <h2 id="related-heading" className="text-[clamp(1.6rem,3.6vw,2.4rem)] leading-tight">
            {heading}
          </h2>
          <Flourish aria-hidden className="mt-5 w-36 text-ink/20" />
        </Reveal>

        <ul className="no-scrollbar mt-9 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {products.map((p, i) => (
            <Reveal
              as="li"
              key={p.slug}
              delay={i * 0.06}
              className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto"
            >
              <Link
                href={`/namkeen/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-ink/10 bg-ivory transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_34px_58px_-46px_rgba(43,26,18,0.6)]"
              >
                <span className="relative block aspect-4/5 overflow-hidden bg-cream">
                  <Media
                    name={p.image}
                    alt={`${BRANDS[p.brand].name} ${p.name} pack`}
                    fill
                    sizes="(max-width: 640px) 68vw, (max-width: 1024px) 42vw, 22vw"
                    imgClassName="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[4px] group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    style={{ background: p.accent }}
                  />
                </span>
                <span className="flex flex-1 flex-col p-4">
                  <span className="font-display text-[1.1rem] leading-tight text-ink">
                    {p.name}
                  </span>
                  <span className="mt-1 font-script text-[1rem] leading-none text-saffron">
                    {p.strapline}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.8rem] font-semibold text-ink">
                    View pack
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
