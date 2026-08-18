import type { ReactNode } from 'react';
import Reveal, { Stagger, StaggerItem } from '@/components/ui/Reveal';
import DrawIn from '@/components/ui/DrawIn';
import { SectionHeading } from '@/components/ui/Bits';
import { LEGAL } from '@/data/site';
import { Flourish } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

/**
 * Every card here is evidenced — five come off the printed pack, one off the
 * FSSAI licence. Claims the business has not substantiated (no added colours,
 * no preservatives, awards, customer counts) are deliberately absent; see
 * CONTENT-TODO.md.
 */

const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.35,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const FEATURES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: 'Made in Gwalior',
    body: `Fried, seasoned and packed at ${LEGAL.addressLine}, ${LEGAL.city} — the address printed on every pack.`,
    icon: (
      <svg viewBox="0 0 32 32" className="size-6" aria-hidden {...s}>
        <path d="M4 27V14h24v13" />
        <path d="M2 14h28" />
        <path d="M9 14v-3a7 7 0 0 1 14 0v3" />
        <path d="M16 4V2" />
        <path d="M12 27v-5a4 4 0 0 1 8 0v5" />
      </svg>
    ),
  },
  {
    title: `${LEGAL.iso} certified`,
    body: 'The food-safety management standard our facility is certified to, as declared on the pack.',
    icon: (
      <svg viewBox="0 0 32 32" className="size-6" aria-hidden {...s}>
        <path d="M16 3l11 4v9c0 7-4.6 11.4-11 13-6.4-1.6-11-6-11-13V7l11-4Z" />
        <path d="M11 16.5l3.4 3.4L21.5 13" />
      </svg>
    ),
  },
  {
    title: '100% vegetarian',
    body: 'Every pack carries the green vegetarian mark. No exceptions across either brand.',
    icon: (
      <svg viewBox="0 0 32 32" className="size-6" aria-hidden {...s}>
        <rect x="5" y="5" width="22" height="22" rx="3" />
        <circle cx="16" cy="16" r="5.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'FSSAI licensed',
    body: `Licence ${LEGAL.fssai}, held by ${LEGAL.entity}.`,
    icon: (
      <svg viewBox="0 0 32 32" className="size-6" aria-hidden {...s}>
        <path d="M7 4h13l5 5v19H7z" />
        <path d="M20 4v5h5" />
        <path d="M12 17h8M12 21h6" />
      </svg>
    ),
  },
  {
    title: 'On shelves since 1960',
    body: 'The year on the Bapu Best sunburst — and the reason Gwalior knows the name.',
    icon: (
      <svg viewBox="0 0 32 32" className="size-6" aria-hidden {...s}>
        <circle cx="16" cy="16" r="11" />
        <path d="M16 9v7.5l5 3" />
      </svg>
    ),
  },
  {
    title: 'Resealable packs',
    body: 'The 400 g Best Bites pouches cut and reseal, so the last handful is as crisp as the first.',
    icon: (
      <svg viewBox="0 0 32 32" className="size-6" aria-hidden {...s}>
        <path d="M8 6h16l-1.4 21H9.4L8 6Z" />
        <path d="M7 11h18" />
        <path d="M13 11v-2M19 11v-2" opacity={0.6} />
      </svg>
    ),
  },
];

export default function WhySection() {
  return (
    <section className="relative bg-ivory py-20 md:py-28 overflow-hidden" aria-labelledby="why-heading">
      <Decor variant="trust" />
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why Bapu Best"
            title="Nothing here that isn’t on the pack."
            titleId="why-heading"
            lede="Six things we can point to and prove — printed on the pouch, or on the licence behind it."
            align="center"
          />
          <DrawIn delay={260} className="mx-auto mt-8 block w-36">
            <Flourish aria-hidden className="w-full text-ink/20" />
          </DrawIn>
        </Reveal>

        <Stagger as="ul" step={0.08} className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <StaggerItem as="li" key={f.title}>
              {/* The whole row is the hover target, so the icon reacts wherever
                  the cursor lands on the card — not just on the 48px disc. */}
              <div className="group/f flex gap-4">
                <span className="relative grid size-12 shrink-0 place-items-center rounded-full border border-ink/12 bg-parchment text-maroon transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/f:-translate-y-1 group-hover/f:border-maroon/30 group-hover/f:bg-saffron/15">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-saffron/0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/f:scale-125 group-hover/f:border-saffron/35"
                  />
                  {f.icon}
                </span>
                <div>
                  <h3 className="text-[1.08rem] leading-snug transition-colors duration-300 group-hover/f:text-maroon">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[0.87rem] leading-relaxed text-ink-soft">{f.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
