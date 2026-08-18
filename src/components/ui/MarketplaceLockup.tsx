/* eslint-disable @next/next/no-img-element */
import { MARKETPLACES } from '@/data/site';

/**
 * "Also available on" — the official Amazon and Flipkart marks.
 *
 * The SVGs in public/brand/ are the marketplaces' own artwork, not redrawings.
 * Showing a retailer's logo to say "our product is sold here" is ordinary
 * nominative use for a genuine seller — but each marketplace publishes its own
 * brand guidelines (Amazon in particular offers an official "Available at
 * Amazon" badge for exactly this placement). Worth a check before launch; see
 * CONTENT-TODO.md.
 *
 * Plain <img> rather than next/image: the optimiser rejects SVG by default, and
 * there is nothing to optimise in a vector anyway.
 */

const LOGOS = {
  amazon: {
    src: '/brand/Amazon_logo.svg',
    /** Intrinsic ratio, so the box is reserved before the file lands. */
    width: 603,
    height: 182,
    /** Amazon's wordmark has no descender space; nudge it onto the baseline. */
    className: 'h-5 translate-y-[3px] sm:h-6',
  },
  flipkart: {
    src: '/brand/Flipkart_logo.svg',
    width: 300,
    height: 91,
    /** The bag sits above and below the wordmark, so this runs taller than
     *  Amazon's to make the two wordmarks read at the same optical size. */
    className: 'h-7 sm:h-8',
  },
} as const;

export default function MarketplaceLockup({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-ink-faint uppercase">
        Also available on<span aria-hidden>*</span>
      </p>

      <ul className="mt-3.5 flex flex-wrap items-stretch gap-3">
        {(Object.keys(LOGOS) as (keyof typeof LOGOS)[]).map((key) => {
          const logo = LOGOS[key];
          const shop = MARKETPLACES[key];
          const unset = shop.href === '#';

          /** Each logo is the whole button face — the mark is the label. */
          const chip =
            'group/mk inline-flex h-14 items-center justify-center rounded-xl border border-ink/15 bg-ivory px-5 shadow-[0_1px_0_rgba(43,26,18,0.05)] transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]';

          const mark = (
            <img
              src={logo.src}
              alt={shop.label}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
              className={`w-auto ${logo.className}`}
            />
          );

          return (
            <li key={key} className="flex">
              {unset ? (
                <span
                  className={`${chip} cursor-not-allowed opacity-70`}
                  title={`${shop.label} link not set yet — see CONTENT-TODO.md`}
                >
                  {mark}
                </span>
              ) : (
                <a
                  href={shop.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buy Bapu Best on ${shop.label}`}
                  className={`${chip} hover:-translate-y-0.5 hover:border-ink/35 hover:shadow-[0_12px_22px_-14px_rgba(43,26,18,0.55)]`}
                >
                  {mark}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-3.5 text-[0.7rem] text-ink-faint">
        <span aria-hidden>*</span>Product availability may vary by location.
      </p>
    </div>
  );
}
