import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { Placeholder } from '@/components/ui/Bits';
import { INGREDIENT_ICONS } from '@/components/art/IngredientIcons';
import { PACK_LABEL, type Product } from '@/data/products';
import Decor from '@/components/art/Decor';

/**
 * This pack's own breakdown — its heading, its components, its photograph.
 * Nothing is shared between products.
 *
 * The `parts` describe the mixture. The declared ingredient list is a separate
 * thing and is printed verbatim underneath, but only for Bapu Best Bites: that
 * panel was transcribed from a Best Bites pouch and we have no equivalent scan
 * for the Bapu Best range, so those pages say so rather than borrowing it.
 */
export default function IngredientBreakdown({ product }: { product: Product }) {
  const { breakdown } = product;
  const showsDeclaredList = product.brand === 'best-bites';

  return (
    <section
      className="grain relative bg-parchment py-16 md:py-20 overflow-hidden"
      aria-labelledby="breakdown-heading"
    >
      <Decor variant="products" />
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---- the breakdown ---- */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-2.5">
                <span className="h-px w-6 bg-current opacity-45" />
                {breakdown.eyebrow}
              </p>
              <h2
                id="breakdown-heading"
                className="mt-4 text-[clamp(1.7rem,3.8vw,2.5rem)] leading-tight"
              >
                {breakdown.heading}
              </h2>
              <p className="mt-4 max-w-lg text-[0.92rem] leading-relaxed text-ink-soft">
                {breakdown.lede}
              </p>
            </Reveal>

            <ul className="mt-9 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {breakdown.parts.map((part, i) => {
                const Icon = INGREDIENT_ICONS[part.icon];
                return (
                  <Reveal as="li" key={part.name} delay={i * 0.05} className="flex gap-3.5">
                    <span
                      className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/12 bg-ivory"
                      style={{ color: product.accent }}
                    >
                      <Icon className="size-7" />
                    </span>
                    <div className="pt-1">
                      <h3 className="font-sans text-[0.92rem] font-semibold text-ink">
                        {part.name}
                      </h3>
                      <p className="mt-0.5 text-[0.82rem] leading-relaxed text-ink-soft">
                        {part.detail}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal className="mt-10">
              {showsDeclaredList ? (
                <div className="rounded-[1.1rem] border border-ink/12 bg-ivory p-5">
                  <h3 className="text-[0.66rem] font-semibold tracking-[0.18em] text-ink-faint uppercase">
                    The declared list, verbatim
                  </h3>
                  <p className="mt-3 text-[0.84rem] leading-relaxed text-ink-soft">
                    {PACK_LABEL.ingredients}
                  </p>
                  <p className="mt-4 border-t border-ink/10 pt-4 text-[0.82rem] leading-relaxed text-crimson">
                    <strong className="font-semibold">Allergens.</strong> {PACK_LABEL.allergens}
                  </p>
                  <p className="mt-3 text-[0.76rem] leading-relaxed text-ink-faint italic">
                    {PACK_LABEL.note}
                  </p>
                </div>
              ) : (
                <div className="rounded-[1.1rem] border border-dashed border-crimson/35 bg-crimson/[0.04] p-5">
                  <Placeholder>Add the Bapu Best ingredient panel</Placeholder>
                  <p className="mt-3.5 text-[0.84rem] leading-relaxed text-ink-soft">
                    The declared ingredient and allergen list for the Bapu Best range has not
                    been supplied. We have a transcription for Bapu Best Bites, but it belongs
                    to a different pack and is not shown here — read the pouch you receive.
                  </p>
                </div>
              )}
            </Reveal>
          </div>

          {/* ---- this product's own photograph ---- */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <figure className="lg:sticky lg:top-28">
                <div className="relative aspect-3/4 overflow-hidden rounded-[1.25rem] border border-ink/10 bg-cream">
                  <Media
                    name={breakdown.image}
                    alt={breakdown.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 38vw"
                    imgClassName="object-cover"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ background: product.accent }}
                  />
                </div>
                <figcaption className="mt-3 text-[0.75rem] leading-relaxed text-ink-faint">
                  {product.name} &mdash; photographed for us in Gwalior.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
