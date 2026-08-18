# Bapu Best Namkeen

Marketing site for **Bapu Best** and **Bapu Best Bites**, made in Phalka Bazar,
Lashkar, Gwalior by M/s Sunnulal Amit Kumar and Sons.

The site is a storefront for the brand, not a shop. There is no cart anywhere in
the codebase — every purchase action hands the visitor to Amazon or Flipkart.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start
```

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — tokens live in `@theme` at the top of `src/app/globals.css`
- **Framer Motion** for reveals and the hero parallax
- `next/image` for every photograph, with generated blur placeholders

## Where things live

```
scripts/
  assets.manifest.mjs    source photo -> web slug mapping
  build-assets.mjs       npm run assets — resizes to WebP + blur placeholders
src/
  app/
    namkeen/[slug]/      product detail page — one per entry in PRODUCTS
    legal/[policy]/      terms / privacy / refunds scaffolds
    *                    one folder per page
  components/
    art/                 GwaliorSkyline, Doodles, IngredientIcons — original SVG
    product/             Gallery, Accordion, IngredientBreakdown, Features, Related
    ui/                  Media, BuyButton, MarketplaceLockup, Reveal, Bits
    *.tsx                one file per homepage section
  data/
    site.ts              business facts, marketplace links, verified claims
    products.ts          both brands, every product, pack label, nutrition
    stores.ts            outlets
    story.ts             timeline, process, testimonials
    image-meta.ts        GENERATED — do not edit
public/images/           GENERATED — do not edit
```

### The hero

Headline left, product right, marquee along the bottom.

**The pack is not a cut-out.** Cutting these packs out cleanly is impossible by
colour alone — their labels are themselves white, so any flood fill from the
backdrop walks straight through the pack. Instead the white-sweep studio shots
are composited with `mix-blend-mode: multiply` over the warm page, which makes
the backdrop vanish while keeping the pack's own contact shadow. The pipeline
lifts each flagged image's whitepoint to a true 255 first (`whiteBackdrop: true`
in the asset manifest) so there is no faint rectangle.

That has one hard constraint worth knowing before editing `Hero.tsx` or
`PackMarquee.tsx`: **`mix-blend-mode` composites against the nearest isolated
ancestor.** Any wrapper between the blended element and the section background
that has `opacity`, `z-index`, `transform`, `filter` or `will-change` will
isolate it and the pack renders as a white box. So:

- the parallax transform rides on the *same* element as the blend, never a parent;
- the marquee blend sits on the animated track itself, not the images inside it;
- the content wrappers deliberately use `relative` with **no** `z-index`, relying
  on DOM order for stacking.

The marquee is pure CSS — the track holds two identical copies of the list and
slides exactly `-50%`, so the loop is seamless with no JavaScript. It pauses on
hover and on keyboard focus, and stops entirely under `prefers-reduced-motion`.
Verified: the two halves measure identically, so there is no visible seam.

### Product pages

`/namkeen/[slug]` is generated from `PRODUCTS` — add an entry and the page, its
gallery, its sitemap row and its `Product` JSON-LD all appear. Each page carries
a four-frame gallery, the marketplace buttons, a "Liked it? Try these!"
switcher, the "Also available on" logos, three accordions (ingredients, storage,
manufacturer), a feature strip, a fun fact, its own illustrated breakdown and a
related-products carousel.

**Every product's breakdown is its own.** `PRODUCTS[].breakdown` holds that
pack's heading, its components, its icons and one of *its own* photographs —
nothing is shared between products. The `parts` describe the mixture (what is
in the bowl); the *declared* ingredient list is a separate thing and lives in
`PACK_LABEL`.

That declared list was transcribed from a **Bapu Best Bites** pouch, so it is
shown only on Best Bites pages. The two Bapu Best pages show a marked gap
instead of borrowing another pack's declaration.

Three things the pages deliberately **do not** show:

- **A price.** No MRP is on record; the buy block says "Price shown on Amazon &
  Flipkart".
- **A star rating.** No reviews have been supplied.
- **Nutrition data.** Removed at the client's request; the reading taken off the
  pack photo is preserved in CONTENT-TODO.md but is not published.

The JSON-LD omits `offers` and `aggregateRating` for the same reasons, so no
invented data reaches a search rich result.

### Marketplace logos

`public/brand/` holds the official Amazon and Flipkart artwork, served locally
and rendered through a plain `<img>` (the image optimiser rejects SVG, and there
is nothing to optimise in a vector).

Two forms, both derived from the same official files:

- **Full wordmarks** — used as the *buttons* in the "Also available on" row.
- **Marks** (`amazon-mark`, `flipkart-mark`) — Amazon's smile-arrow and
  Flipkart's bag, used as the icon inside every Buy button. `npm run marks`
  regenerates them: it isolates each mark by brand colour, measures its bounding
  box from a raster, and re-windows the official SVG's viewBox onto it. Nothing
  is redrawn. It also emits 128px WebP versions, because Flipkart's source file
  is ~135 KB of traced clip paths — far too heavy for an 18px button icon.

See CONTENT-TODO.md for the one brand-policy check worth doing before launch.

### Decoration

`components/art/Decor.tsx` is the site-wide doodle system, sharing the hero's
language with every other section. `<Decor variant="..." />` drops a preset
scatter — nine variants so no two neighbouring sections share a silhouette —
and `tone="dark"` switches the palette for the maroon sections.

Two rules keep it decoration rather than clutter: it lives in the margins and
never sits over text or product, and most pieces are `hidden` until `lg`,
because on a narrow screen there are no margins for it to live in. Everything is
`aria-hidden` and pointer-inert, and the drift stops under
`prefers-reduced-motion`.

Any section hosting `<Decor>` must be `relative overflow-hidden`.

### Content is data, not markup

Nothing factual is hard-coded in a component. To change a phone number, add a
product or fill in the founding story, edit the relevant file in `src/data/` and
every page that uses it updates.

### Images

Source photography is **not** in this repo. `scripts/assets.manifest.mjs` points
at the brand asset folder on disk; `npm run assets` re-generates
`public/images/*.webp` and `src/data/image-meta.ts`. The whole image set is
~3.5 MB, and `next/image` resizes and re-encodes per device from there.

### Placeholders

Facts the business has not supplied are written as `[BRACKETED TEXT]` in
`src/data/` and render as visibly unfinished chips via the `Placeholder`
component. This is deliberate: nothing invented ever reads as fact.

**See [CONTENT-TODO.md](./CONTENT-TODO.md) for the full list of what's still
needed** — including two conflicts between the packaging and the FSSAI
declaration that need your call.

### Illustration

Everything in `components/art/` is hand-authored SVG, drawn for this site.
Nothing is traced, hotlinked or stock.

- **`GwaliorSkyline.tsx`** — built from the architectural vocabulary of Gwalior
  Fort: the rampart on its plateau, the cylindrical Man Mandir bastions with
  ribbed cupolas, chhatri pavilions, and a colonnaded block standing in for the
  Jai Vilas wing.
- **`Doodles.tsx`** — the marginal food doodles.
- **`IngredientIcons.tsx`** — 21 icons for the per-product breakdowns.
- **`ProcessScenes.tsx`** — the five "How we make it" scenes.

**Why the process scenes are drawn and not photographed.** There are no
pictures of the production kitchen in the asset library. A stock photo of
another factory under the heading "From our kitchen to your home" would be a
manufacturing claim the business cannot evidence, so the section is illustrated
instead — an illustration reads as depiction, not documentation. The section
says so in a footnote.

If real behind-the-scenes photography is shot later, swap `scene` for an
`image` key in `PROCESS` (`src/data/story.ts`) and render `Media` instead of
`PROCESS_SCENES[...]` in `ProcessSection.tsx`. That is the whole change.

Scenes are drawn at 400×500 to match the 4:5 card exactly, with a small
parallax overscan — keep anything that matters inside x 34–366, y 44–456.

## Deploying

Any Node host that runs Next.js works; Vercel needs no configuration. Set
`SITE.url` in `src/data/site.ts` to the live domain before the first deploy so
canonical URLs, the sitemap and Open Graph tags point at the right place.
