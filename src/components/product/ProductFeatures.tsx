import Reveal from '@/components/ui/Reveal';
import { PRODUCT_FEATURES } from '@/data/products';
import { Rays, SpiceScatter } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function FeatureIcon({ kind }: { kind: (typeof PRODUCT_FEATURES)[number]['icon'] }) {
  switch (kind) {
    case 'fort':
      return (
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden {...s}>
          <path d="M4 27V13h24v14" />
          <path d="M2 13h28" />
          <path d="M9 13v-2.5a7 7 0 0 1 14 0V13" />
          <path d="M16 3.5V2" />
          <path d="M12 27v-5a4 4 0 0 1 8 0v5" />
          <path d="M6 13V9.5h3V13M23 13V9.5h3V13" opacity={0.55} />
        </svg>
      );
    case 'veg':
      return (
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden {...s}>
          <rect x="5" y="5" width="22" height="22" rx="3" />
          <circle cx="16" cy="16" r="5.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden {...s}>
          <path d="M16 3l11 4v9c0 7-4.6 11.4-11 13-6.4-1.6-11-6-11-13V7l11-4Z" />
          <path d="M11 16.5l3.4 3.4L21.5 13" />
        </svg>
      );
    case 'pouch':
      return (
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden {...s}>
          <path d="M8 6h16l-1.4 21H9.4L8 6Z" />
          <path d="M7 11h18" />
          <path d="M12 6V4.5M20 6V4.5" opacity={0.6} />
          <path d="M13 17h6" opacity={0.5} />
        </svg>
      );
  }
}

/** The four things every pack can prove. Sits directly under the buy block. */
export default function ProductFeatures() {
  return (
    <section className="relative overflow-hidden bg-ivory py-14 md:py-16" aria-label="Product features">
      <Decor variant="trust" />
      <SpiceScatter
        aria-hidden
        className="pointer-events-none absolute top-8 right-10 hidden w-28 text-ink/12 lg:block"
      />
      <Rays
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-8 hidden w-16 text-saffron/35 lg:block"
      />

      <div className="relative mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
          {PRODUCT_FEATURES.map((f, i) => (
            <Reveal
              as="li"
              key={f.title}
              delay={i * 0.06}
              className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto"
            >
              <div className="group/pf flex h-full flex-col rounded-[1.1rem] border border-ink/10 bg-parchment p-5 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_50px_-40px_rgba(43,26,18,0.6)]">
                <span className="grid size-12 place-items-center rounded-full border border-ink/12 bg-ivory text-maroon transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pf:scale-108 group-hover/pf:border-maroon/30 group-hover/pf:bg-saffron/15">
                  <FeatureIcon kind={f.icon} />
                </span>
                <h3 className="mt-4 text-[1.02rem] leading-snug">{f.title}</h3>
                <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
