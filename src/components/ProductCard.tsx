import Link from 'next/link';
import Media from '@/components/ui/Media';
import BuyButton from '@/components/ui/BuyButton';
import { BRANDS, type Product } from '@/data/products';
import { Sparkle } from '@/components/art/Doodles';

/**
 * Product card. There is no add-to-cart anywhere on this site — the two
 * marketplace buttons are the only actions.
 */
export default function ProductCard({
  product,
  className = '',
}: {
  product: Product;
  className?: string;
}) {
  const brand = BRANDS[product.brand];

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-ink/10 bg-ivory transition-[transform,box-shadow,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ink/18 hover:bg-parchment hover:shadow-[0_36px_60px_-46px_rgba(43,26,18,0.65)] ${className}`}
    >
      <Link
        href={`/namkeen/${product.slug}`}
        className="relative block aspect-4/5 overflow-hidden bg-cream"
        aria-label={`${product.name} — view pack details`}
      >
        <Media
          name={product.image}
          alt={`${brand.name} ${product.name} pack`}
          fill
          sizes="(max-width: 640px) 74vw, (max-width: 1024px) 40vw, 25vw"
          imgClassName="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[4px] group-hover:scale-[1.05]"
        />

        {/* pack-colour accent, revealed on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          style={{ background: product.accent }}
        />

        <span
          className="absolute top-3.5 left-3.5 rounded-full px-2.5 py-1 text-[0.58rem] font-semibold tracking-[0.14em] text-ivory uppercase"
          style={{ background: product.accent }}
        >
          {brand.name}
        </span>

        <Sparkle
          aria-hidden
          className="pointer-events-none absolute top-4 right-4 w-5 -translate-y-1 text-ivory/0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:text-ivory/75"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[1.16rem] leading-tight">
          <Link href={`/namkeen/${product.slug}`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 font-script text-[1.05rem] leading-none text-saffron">
          {product.strapline}
        </p>
        <p className="mt-2.5 text-[0.83rem] leading-relaxed text-ink-soft">
          {product.description}
        </p>

        {product.netWeight ? (
          <p className="mt-3 text-[0.68rem] font-semibold tracking-[0.14em] text-ink-faint uppercase">
            Net {product.netWeight}
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-2 pt-5">
          <BuyButton
            marketplace="amazon"
            variant="solid"
            size="sm"
            href={product.amazon}
            className="w-full"
          />
          <BuyButton
            marketplace="flipkart"
            variant="outline"
            size="sm"
            href={product.flipkart}
            className="w-full"
          />
        </div>
      </div>
    </article>
  );
}
