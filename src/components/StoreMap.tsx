import { STORES } from '@/data/stores';
import { LEGAL } from '@/data/site';
import Reveal from '@/components/ui/Reveal';

/**
 * The map.
 *
 * This used to be a stylised drawing of a street grid with "no outlet has been
 * surveyed" written across it, because no address had been supplied. Four now
 * have, so it shows a real map instead.
 *
 * It is an embed of a Google Maps *search*, not a set of pins. Nobody has
 * surveyed these shops with a GPS; what we have is four addresses, one off the
 * packaging and three off public listings. A search embed is exactly as precise
 * as the information behind it, which is the point — dropping hand-typed
 * coordinates would look more certain than we are entitled to be.
 *
 * No API key, no script: the `output=embed` URL is a plain iframe.
 */
const EMBED_QUERY = 'Best Namkeen Gwalior';

export default function StoreMap() {
  return (
    <section aria-labelledby="map-heading" className="relative bg-parchment py-16 md:py-20">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-2.5 text-olive">
              <span className="h-px w-6 bg-current opacity-45" />
              On the map
            </p>

            <h2
              id="map-heading"
              className="mt-4 text-[clamp(1.6rem,3.4vw,2.3rem)] leading-tight"
            >
              Find your nearest counter.
            </h2>

            <p className="mt-4 text-[0.94rem] leading-relaxed text-ink-soft">
              Every shop is in Gwalior. Our registered and manufacturing address is{' '}
              {LEGAL.addressLine}, {LEGAL.city}, {LEGAL.state} {LEGAL.postalCode} — that is the
              Phalka Bazar counter, and the kitchen behind it.
            </p>

            <ul className="mt-7 space-y-3 border-t border-ink/10 pt-6">
              {STORES.map((store) => (
                <li key={store.id} className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${
                      store.confirmed ? 'bg-emerald' : 'bg-saffron'
                    }`}
                  />
                  <span className="flex-1">
                    <span className="text-[0.92rem] font-semibold text-ink">{store.name}</span>
                    <span className="text-[0.92rem] text-ink-faint"> — {store.area}</span>
                  </span>
                  {store.mapsUrl ? (
                    <a
                      href={store.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline shrink-0 text-[0.78rem] font-semibold text-ink transition-colors hover:text-maroon"
                    >
                      Directions
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[0.76rem] leading-relaxed text-ink-faint">
              Listings put the chain at more than six shops in the city. Four are named here;
              the rest go up as soon as the family confirms them.
            </p>
          </Reveal>

          <Reveal delay={0.12} variant="scale" className="lg:col-span-7">
            <div className="relative aspect-16/10 overflow-hidden rounded-[1.25rem] border border-ink/12 shadow-[0_40px_70px_-52px_rgba(43,26,18,0.6)]">
              <iframe
                title="Bapu Best shops in Gwalior on Google Maps"
                src={`https://www.google.com/maps?q=${encodeURIComponent(EMBED_QUERY)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
