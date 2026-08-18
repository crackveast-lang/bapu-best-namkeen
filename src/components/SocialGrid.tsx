import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { Placeholder, SectionHeading } from '@/components/ui/Bits';
import { SOCIAL } from '@/data/site';
import type { ImageKey } from '@/data/image-meta';
import Decor from '@/components/art/Decor';

/**
 * Deliberately asymmetric — two tall frames, one wide, four square — so it
 * reads as an editorial spread rather than an ecommerce grid. Images are the
 * brand's own; no social feed is embedded until an account URL is supplied.
 */
/**
 * Packs exactly, with no gaps, at both breakpoints — one big frame, two shop
 * panoramas, three squares. Each tile's span is chosen to suit the shape of the
 * photograph in it, so nothing is cropped to a letterbox.
 *
 *   lg (6 cols x 4 rows)        base (4 cols x 5 rows)
 *   A A A  B B B                A A A A
 *   A A A  C C C                A A A A
 *   D D E E F F                 B B C C
 *   D D E E F F                 D D E E
 *                               D D F F
 */
const TILES: { name: ImageKey; alt: string; span: string }[] = [
  {
    name: 'detail-ratlami-flat',
    alt: 'Ratlami Sev photographed from above with sev scattered around the pack',
    span: 'col-span-4 row-span-2 lg:col-span-3',
  },
  {
    name: 'store-sweets',
    alt: 'A sweets counter in a Bapu Best shop in Gwalior',
    span: 'col-span-2 row-span-1 lg:col-span-3',
  },
  {
    name: 'store-mithai',
    alt: 'Trays of mithai in the shop display case',
    span: 'col-span-2 row-span-1 lg:col-span-3',
  },
  {
    name: 'p-milan-mixture',
    alt: 'Milan Mixture pack beside a bowl of mixture',
    span: 'col-span-2 row-span-2 lg:col-span-2',
  },
  {
    name: 'detail-kadipatta-flat',
    alt: 'Kadipatta Mix photographed from above',
    span: 'col-span-2 row-span-1 lg:col-span-2 lg:row-span-2',
  },
  {
    name: 'detail-waffer-pour',
    alt: 'Waffer Mix being poured from the pack into a bowl',
    span: 'col-span-2 row-span-1 lg:col-span-2 lg:row-span-2',
  },
];

export default function SocialGrid() {
  const hasAccount = Boolean(SOCIAL.instagram);

  return (
    <section className="relative bg-ivory py-20 md:py-28 overflow-hidden" aria-labelledby="social-heading">
      <Decor variant="social" />
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="A little taste of Bapu Best"
              title="Namkeen, shop and city."
              titleId="social-heading"
              lede="Everything on this wall was photographed for us, in Gwalior."
              className="max-w-xl"
            />
            {hasAccount ? (
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 pb-2 text-[0.85rem] font-semibold text-ink transition-colors hover:text-maroon"
              >
                <span className="link-underline">Follow us on Instagram</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            ) : (
              <Placeholder className="mb-3">Add Instagram URL</Placeholder>
            )}
          </div>
        </Reveal>

        <div className="mt-12 grid auto-rows-[7.5rem] grid-cols-4 gap-3 sm:auto-rows-[10rem] sm:gap-4 lg:auto-rows-[13rem] lg:grid-cols-6">
          {TILES.map((tile, i) => (
            <Reveal
              key={tile.name}
              delay={i * 0.05}
              variant="scale"
              className={`${tile.span} sheen group relative overflow-hidden rounded-[0.9rem] border border-ink/10 bg-cream`}
            >
              <Media
                name={tile.name}
                alt={tile.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 30vw"
                imgClassName="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-maroon-deep/0 transition-colors duration-500 group-hover:bg-maroon-deep/12"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
