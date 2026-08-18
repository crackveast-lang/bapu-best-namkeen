import Link from 'next/link';
import Media from '@/components/ui/Media';
import { PRODUCTS } from '@/data/products';

/**
 * The continuously scrolling pack strip along the bottom of the hero.
 *
 * Pure CSS: the track holds two identical copies of the list and slides
 * exactly -50%, so the loop is seamless with no JavaScript and no layout
 * thrash. It pauses on hover and on keyboard focus, and stops entirely for
 * anyone who has asked for reduced motion.
 *
 * Only products with a white-sweep studio shot appear — those are the ones
 * that blend cleanly into the page (see `.blend-pack` in globals.css).
 */
const MARQUEE_PRODUCTS = PRODUCTS.filter((p) => p.pack);

function Pack({ product, hidden }: { product: (typeof MARQUEE_PRODUCTS)[number]; hidden?: boolean }) {
  return (
    <li className="shrink-0" aria-hidden={hidden || undefined}>
      <Link
        href={`/namkeen/${product.slug}`}
        tabIndex={hidden ? -1 : undefined}
        className="group relative block w-[6.25rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 sm:w-[7.5rem] lg:w-[8.75rem]"
      >
        <Media
          name={product.pack!}
          alt={hidden ? '' : `${product.name} pack`}
          sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 140px"
          className="h-auto w-full"
        />
        <span
          className="pointer-events-none absolute inset-x-4 -bottom-1 h-[3px] origin-center scale-x-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          style={{ background: product.accent }}
          aria-hidden
        />
      </Link>
    </li>
  );
}

export default function PackMarquee() {
  return (
    <div className="marquee relative w-full overflow-hidden pt-4 pb-2">
      {/* soft fades so packs enter and leave rather than getting chopped */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-parchment to-transparent sm:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-parchment to-transparent sm:w-28"
      />

      {/* The blend sits on the track, not the individual images: the track is
          already a stacking context (it is animated), so blending inside it
          would have nothing to blend against. Applied here it composites the
          whole row against the page. */}
      <ul
        className="marquee-track blend-pack flex w-max items-end gap-7 sm:gap-12"
        style={{ ['--marquee-duration' as string]: '52s' }}
      >
        {MARQUEE_PRODUCTS.map((p) => (
          <Pack key={p.slug} product={p} />
        ))}
        {/* second copy completes the loop; hidden from assistive tech */}
        {MARQUEE_PRODUCTS.map((p) => (
          <Pack key={`dup-${p.slug}`} product={p} hidden />
        ))}
      </ul>
    </div>
  );
}
