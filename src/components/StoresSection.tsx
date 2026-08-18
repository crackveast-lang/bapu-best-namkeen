import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { ArrowLink, Copy, SectionHeading, isPlaceholder } from '@/components/ui/Bits';
import { STORES, type Store } from '@/data/stores';
import { Bowl } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

export function StoreCard({ store, className = '' }: { store: Store; className?: string }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-ink/10 bg-ivory transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_36px_60px_-46px_rgba(43,26,18,0.6)] ${className}`}
    >
      <div className="sheen relative aspect-16/10 overflow-hidden bg-cream">
        <Media
          name={store.image}
          alt={
            store.confirmed
              ? `Inside ${store.name}, ${store.area}, Gwalior`
              : 'Inside a Bapu Best shop in Gwalior'
          }
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 28vw"
          imgClassName="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        {!store.confirmed ? (
          <span className="absolute top-3 left-3 rounded-full border border-dashed border-ivory/60 bg-ink/50 px-2.5 py-1 text-[0.58rem] font-semibold tracking-[0.14em] text-ivory uppercase backdrop-blur-sm">
            Details to confirm
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.12rem] leading-snug">
          {isPlaceholder(store.name) ? <Copy value={store.name} /> : store.name}
        </h3>
        <p className="mt-1 text-[0.68rem] font-semibold tracking-[0.15em] text-ink-faint uppercase">
          {isPlaceholder(store.area) ? <Copy value={store.area} /> : store.area}
        </p>
        <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-soft">
          {isPlaceholder(store.address) ? <Copy value={store.address} /> : store.address}
        </p>
        <p className="mt-2 text-[0.8rem] text-ink-faint">
          {isPlaceholder(store.hours) ? <Copy value={store.hours} /> : store.hours}
        </p>

        <div className="mt-auto pt-5">
          {store.mapsUrl ? (
            <a
              href={store.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/d inline-flex items-center gap-2 text-[0.8rem] font-semibold text-ink transition-colors hover:text-maroon"
            >
              <span className="link-underline">Get directions</span>
              <span aria-hidden className="transition-transform group-hover/d:translate-x-1">
                →
              </span>
            </a>
          ) : (
            <p className="text-[0.72rem] text-ink-faint italic">
              Directions link pending — see CONTENT-TODO
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function StoresSection() {
  return (
    <section id="stores" className="relative scroll-mt-24 bg-ivory py-20 md:py-28 overflow-hidden" aria-labelledby="stores-heading">
      <Decor variant="stores" />
      <Bowl
        aria-hidden
        className="pointer-events-none absolute top-20 right-10 hidden w-20 text-ink/12 lg:block"
      />

      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our stores"
              title="Come say namaste."
              titleId="stores-heading"
              lede="Find Bapu Best near you in Gwalior. The Phalka Bazar counter is where everything is still made."
              className="max-w-xl"
            />
            <ArrowLink href="/stores" className="pb-2">
              All stores &amp; map
            </ArrowLink>
          </div>
        </Reveal>

        <ul className="no-scrollbar mt-12 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {STORES.map((store, i) => (
            <Reveal
              as="li"
              key={store.id}
              delay={i * 0.06}
              className="w-[82vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto"
            >
              <StoreCard store={store} className="h-full" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
