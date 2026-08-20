import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { Placeholder, SectionHeading } from '@/components/ui/Bits';
import { SOCIAL } from '@/data/site';
import type { ImageKey } from '@/data/image-meta';
import Decor from '@/components/art/Decor';

/**
 * Six frames, one photographic idea.
 *
 * This wall used to mix shop interiors, flat-lay pack shots and bowl shots at
 * three different crops, which read as a folder rather than a set. Every tile
 * here is now the SAME picture of a different product: the pack standing, a
 * bowl of what is inside it beside the pack, daylight, the same cream ground.
 *
 * That rule is the whole point of the section, so it is worth stating plainly:
 * a tile only belongs here if it is a pack *and* a bowl. Frames that show the
 * pack alone (`p-ratlami-sev`), the bowl alone (`detail-bowl-khatta-meetha`),
 * the BACK of the pack (`p-lahsun-mix`, `p-ujjaini-sev`) or a flat lay rather
 * than a standing pack (`g-ujjaini-d`) are good photographs and are used
 * elsewhere — they just break the row.
 *
 * The grid is a plain uniform 4:5 rather than the old mosaic of spans. Most of
 * these frames are portrait, and a wide tile would have to crop one to a
 * letterbox and throw the pack away; one tile in the same crop, six times over,
 * is what makes the row read as a set in the first place.
 */
const TILES: { name: ImageKey; alt: string }[] = [
  {
    name: 'p-milan-mixture',
    alt: 'A pack of Milan Mixture standing beside a bowl of the mixture',
  },
  {
    name: 'p-kadipatta-mix',
    alt: 'A pack of Kadipatta Mix standing beside a bowl of the mixture',
  },
  {
    name: 'p-khatta-meetha',
    alt: 'A pack of Bapu Best Khatta Meetha standing beside a bowl of namkeen',
  },
  {
    name: 'g-sada-b',
    alt: 'A pack of Sada Sev standing beside a glass bowl of sev',
  },
  {
    name: 'g-indori-b',
    alt: 'A pack of Indori Khatta Meetha standing beside a glass bowl of the mixture',
  },
  {
    name: 'p-waffer-mix',
    alt: 'A pack of Waffer Mix standing beside a bowl of the mixture',
  },
];

export default function SocialGrid() {
  const hasAccount = Boolean(SOCIAL.instagram);

  return (
    <section
      className="relative overflow-hidden bg-ivory py-20 md:py-28"
      aria-labelledby="social-heading"
    >
      <Decor variant="social" />
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="A little taste of Bapu Best"
              title="Open a pack. Fill a bowl."
              titleId="social-heading"
              lede="Six of ours, photographed the same way — the pack, and what comes out of it."
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

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
          {TILES.map((tile, i) => (
            <Reveal
              key={tile.name}
              delay={i * 0.05}
              variant="scale"
              className="sheen group relative aspect-4/5 overflow-hidden rounded-[0.9rem] border border-ink/10 bg-cream"
            >
              <Media
                name={tile.name}
                alt={tile.alt}
                fill
                sizes="(max-width: 768px) 48vw, 31vw"
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
