import { MARKETPLACES } from '@/data/site';

type Marketplace = keyof typeof MARKETPLACES;

type Props = {
  marketplace: Marketplace;
  /** `solid` for the primary CTA, `outline` beside it, `quiet` inside cards. */
  variant?: 'solid' | 'outline' | 'quiet';
  size?: 'sm' | 'md' | 'lg';
  /** Overrides the storefront link with a product-specific listing. */
  href?: string;
  className?: string;
  label?: string;
};

const SIZES = {
  sm: 'h-9 px-3.5 text-[0.78rem] gap-1.5',
  md: 'h-11 px-5 text-[0.85rem] gap-2',
  lg: 'h-13 px-6 text-[0.9rem] gap-2.5',
} as const;

const VARIANTS = {
  solid:
    'bg-ink text-ivory hover:bg-maroon border border-transparent shadow-[0_1px_0_rgba(43,26,18,0.2)]',
  outline:
    'bg-ivory/70 text-ink border border-ink/20 hover:border-ink/45 hover:bg-ivory',
  quiet:
    'bg-transparent text-ink-soft border border-ink/15 hover:text-ink hover:border-ink/35',
} as const;

/**
 * The marketplaces' own marks — Amazon's smile-arrow and Flipkart's bag —
 * derived from the official SVGs by `npm run marks`, not redrawn. Shipped as
 * small WebP because Flipkart's source file is ~135 KB of traced clip paths.
 */
const MARKS = {
  amazon: { src: '/brand/amazon-mark.webp', className: 'size-4 shrink-0' },
  flipkart: { src: '/brand/flipkart-mark.webp', className: 'size-4 shrink-0' },
} as const;

function Mark({ marketplace }: { marketplace: Marketplace }) {
  const m = MARKS[marketplace];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={m.src} alt="" width={16} height={16} aria-hidden className={m.className} />
  );
}

/**
 * The site's one and only purchase action. There is no cart — every one of
 * these hands the visitor to Amazon or Flipkart.
 *
 * The arrow shifts from → to ↗ on hover, which is the whole micro-interaction:
 * the glyph swaps and nudges, nothing bounces.
 */
export default function BuyButton({
  marketplace,
  variant = 'solid',
  size = 'md',
  href,
  className = '',
  label,
}: Props) {
  const shop = MARKETPLACES[marketplace];
  const target = href ?? shop.href;
  const unset = target === '#';

  const classes = `group/buy inline-flex items-center justify-center rounded-full font-semibold tracking-[0.01em] transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  const inner = (
    <>
      <Mark marketplace={marketplace} />
      <span>{label ?? `Buy on ${shop.label}`}</span>
      <span className="relative ml-0.5 grid size-3.5 place-items-center" aria-hidden>
        <span className="absolute transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/buy:-translate-y-1 group-hover/buy:translate-x-1 group-hover/buy:opacity-0">
          →
        </span>
        <span className="absolute translate-y-1 -translate-x-1 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/buy:translate-y-0 group-hover/buy:translate-x-0 group-hover/buy:opacity-100">
          ↗
        </span>
      </span>
    </>
  );

  // Until the storefront URL is set in src/data/site.ts, render an inert
  // button rather than a link to "#" that would jump the page to the top.
  if (unset) {
    return (
      <button
        type="button"
        disabled
        data-placeholder-link
        title={`${shop.label} link not set yet — see CONTENT-TODO.md`}
        className={`${classes} cursor-not-allowed`}
      >
        {inner}
      </button>
    );
  }

  return (
    <a href={target} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  );
}

/** Both buttons, in the order used everywhere on the site. */
export function BuyPair({
  size = 'md',
  className = '',
  amazonHref,
  flipkartHref,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  amazonHref?: string;
  flipkartHref?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <BuyButton marketplace="amazon" variant="solid" size={size} href={amazonHref} />
      <BuyButton marketplace="flipkart" variant="outline" size={size} href={flipkartHref} />
    </div>
  );
}
