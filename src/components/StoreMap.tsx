import { STORES } from '@/data/stores';
import { LEGAL } from '@/data/site';
import { Placeholder } from '@/components/ui/Bits';

/**
 * Placeholder map. No outlet has been surveyed, so rather than invent
 * coordinates this renders a stylised plan of the plot with an unplaced pin per
 * store. Drop real `coords` into src/data/stores.ts and swap this for an
 * embedded map — the component boundary is here so nothing else has to change.
 */
export default function StoreMap() {
  const unplaced = STORES.filter((s) => !s.coords);

  return (
    <section aria-labelledby="map-heading" className="relative bg-parchment py-16 md:py-20">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 id="map-heading" className="text-[clamp(1.6rem,3.4vw,2.3rem)] leading-tight">
              Find your nearest store
            </h2>
            <p className="mt-4 text-[0.94rem] leading-relaxed text-ink-soft">
              Our registered and manufacturing address is {LEGAL.addressLine}, {LEGAL.city},{' '}
              {LEGAL.state} {LEGAL.postalCode}. The pins for our other outlets are not on the
              map yet.
            </p>
            <p className="mt-4 text-[0.84rem] leading-relaxed text-ink-faint">
              An interactive map goes here once each outlet&rsquo;s address and coordinates are
              confirmed. Until then this panel deliberately shows nothing it cannot stand behind.
            </p>
            <div className="mt-5">
              <Placeholder>Add store coordinates</Placeholder>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-16/10 overflow-hidden rounded-[1.25rem] border border-dashed border-ink/25 bg-cream/60">
              {/* stylised street grid */}
              <svg
                viewBox="0 0 800 500"
                className="absolute inset-0 size-full text-ink/12"
                aria-hidden
                fill="none"
                stroke="currentColor"
              >
                <path d="M0 130h800M0 250h800M0 370h800" strokeWidth={1.2} />
                <path d="M150 0v500M330 0v500M520 0v500M680 0v500" strokeWidth={1.2} />
                <path
                  d="M-20 420C120 400 200 330 330 320s240 30 360-20 140-90 180-100"
                  strokeWidth={2}
                  opacity={0.7}
                />
                <circle cx="330" cy="250" r="70" strokeWidth={1} opacity={0.5} />
                <circle cx="330" cy="250" r="130" strokeWidth={1} strokeDasharray="4 8" opacity={0.4} />
              </svg>

              <div className="absolute inset-0 grid place-items-center">
                <div className="max-w-xs px-6 text-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="mx-auto size-8 text-maroon/70"
                    aria-hidden
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <p className="mt-3 font-display text-[1.05rem] text-ink">
                    {unplaced.length} location{unplaced.length === 1 ? '' : 's'} awaiting
                    coordinates
                  </p>
                  <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-faint">
                    Placeholder component — no coordinates have been invented.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
