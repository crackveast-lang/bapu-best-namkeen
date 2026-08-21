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
- **Framer Motion** for the reveals, parallax and preloader — see [Motion](#motion)
- **Three.js + GSAP/ScrollTrigger** for the opening horizon only — see
  [The horizon](#the-horizon). Three is imported dynamically, so it never
  touches any other page's bundle.
- `next/image` for every photograph, with generated blur placeholders

## Where things live

```
scripts/
  assets.manifest.mjs    source photo -> web slug mapping
  build-assets.mjs       npm run assets — resizes to WebP + blur placeholders
  clean-logo.mjs         one-off — repairs the supplied Best Bites screenshot
src/
  app/
    namkeen/[slug]/      product detail page — one per entry in PRODUCTS
    legal/[policy]/      terms / privacy / refunds scaffolds
    *                    one folder per page
  components/
    art/                 GwaliorSkyline, NamkeenCart, Doodles, IngredientIcons
                         — original SVG, all of it drawn for this site
    product/             Gallery, Accordion, IngredientBreakdown, Features, Related
    ui/                  Media, BuyButton, MarketplaceLockup, Bits
                         horizon-hero-section.tsx/.css — the WebGL opening
                         motion: Preloader, Reveal, TextReveal, Counter,
                         Parallax, ScrollLine, ScrollProgress, DrawIn,
                         Magnetic, Spotlight, BackToTop, PageTransition
    *.tsx                one file per homepage section
  data/
    site.ts              business facts, marketplace links, verified claims
    products.ts          both brands, every product, pack label, nutrition
    stores.ts            outlets
    story.ts             house story, timeline, process, testimonials
    image-meta.ts        GENERATED — do not edit
assets/web/              licensed photography (story + process) + SOURCES.md
assets/brand/            brand photography handed over outside the photo drive
public/images/           GENERATED — do not edit
```

### The horizon

> **THE WebGL SCENE IS OFF BY DEFAULT.** Add `?horizon` to any URL to turn it
> on (remembered in `localStorage` as `bapu:horizon`); `?flat` turns it off
> again. Everything below still describes it, and it still works — it simply
> has to be asked for.
>
> **Why.** It caused a flicker on the owner's machine, at the seam between two
> panels, that five rounds of investigation could not reproduce here. This
> environment rasterises WebGL in software, where the fault does not occur, and
> every measurement available came back clean: frame-to-frame deltas (mean 3 of
> 255), composited layer trees, layout oscillation, GSAP tween conflicts,
> pixel-diffs against the deployed build. Four fixes shipped for it — the
> viewport blend layers, the ridge depth-writing, the navbar/hero resize loop,
> the deactivation hysteresis. Every one was a real defect. None of them was the
> flicker.
>
> A decorative background is not worth a hero that strobes, so it stopped being
> the default. The three panels were always ordinary server-rendered HTML: every
> word, both brand badges, the packs, the drawn skyline, the cart and the
> buttons are untouched, and the warm gradient on `.hero-container` was always
> the fallback behind them. It reads as a finished hero, not a broken one.
>
> **To bring it back for everyone**, flip the two defaults at `isFlat` /
> `flatRef` in `horizon-hero-section.tsx` from `true` to `false`. The frame
> watchdog stays either way, so a machine that opts in and still cannot hold the
> scene drops itself back out.


`components/ui/horizon-hero-section.tsx` opens the homepage: three full-height
panels — **Two brands, one legacy**, **Best Bites**, **Best Namkeen** —
scrolling over one pinned WebGL horizon, with the camera flying from in front of
a Gwalior ridge, through it, and out over the range beyond. It is lit for
daylight: parchment ground, brown ink, one sun on the ridge line, because the
rest of the site is printed on warm paper.

The first panel is a printed page rather than a landscape. A wash of parchment
sits over the render, and on top of it go the drawn layer — `GwaliorSkyline` on
the ridge, `NamkeenCart` parked in front of it, doodles in the margins — and the
two brands, each with its badge, its line and its pack. Scrolling thins the wash
and gives more of the screen back to the horizon.

Panels two and three then take a brand each, and are deliberately **not the same
page twice**:

| | **Best Bites** | **Bapu Best** |
|---|---|---|
| composition | copy left, art right | mirrored: art left, copy right |
| the range | five packs standing in a row on a shelf, staggered front-to-back | four packs fanned like a hand of cards in front of a bowl in a turning gold ring |
| the rest of it | named in a line under the shelf | read as a printed list with straplines |

Each brand's own badge stands where a section number would, on the same ivory
disc the opening screen uses.

Every word on them comes from `BRANDS` and `PRODUCTS` in `data/products.ts` —
names, taglines, copy, straplines, and the variety count in the small print.
There is no second set of brand copy to keep in sync, and the three facts under
each brand are either counted from the data or listed in `VERIFIED_CLAIMS`.

**Which packs appear is decided by the data, not by the layout.** A product is
shown if it has a `cutout`, and named if it does not — so supplying a studio
shot for Waffer Mix, Ujjaini Sev, Lahsun Mix or Hing Mixture and adding it to
the manifest moves it from the "also in the range" line onto the shelf with no
markup change.

A pack that has only ever been photographed once also needs a card face, since
the product cards and galleries crop 4:5 and would slice the top off the bag.
`frame: true` in the manifest drops the cut-out onto the page's own paper at
that exact ratio — `card-*` in `public/images`.

Every pack in the hero is a **cut-out with a real alpha channel** (`cut-*`), not
one of the `mix-blend-mode` shots used everywhere else — see [The hero](#the-hero) for why that technique cannot reach
a backdrop it does not share a stacking context with. `scripts/build-assets.mjs`
grows them from the same sources with `cutout: true` in the manifest: lift the
whitepoint, flood in from the border, and keep `255 - min(r,g,b)` as alpha over
warm ink so the contact shadow survives. Flooding from the border rather than
keying by colour is the whole trick — the packs are half white label, and a
colour key deletes it.

**The drawn layer moves on two clocks.** Scroll parallax runs on three speeds —
the panel, the `.hero-scene` layer inside it, and the fort and cart inside
that — which is what makes a flat sketch sit *in front of* the render rather
than on it. On top of that every doodle floats on its own loop, the sparkles
twinkle, the packs breathe and the seal behind the bowl turns.

The ambient loops are CSS, and they are held back until `data-lively` appears on
the container, which the entrance timeline sets when it finishes. That is not
decoration: a running keyframe animation outranks the inline transform GSAP
writes, so starting them any earlier would have the two fight over every doodle
for the length of the intro. For the same reason the entrance tweens on the
drawn layer skip `clearProps` — the parallax writes to those same elements.

Worth knowing before editing it:

- **Progress is measured against the section, not the document.** The page
  below is long; a document-wide `scrollY / scrollHeight` would have the camera
  crawl for ten screens.
- **The canvas is `position: fixed`, not sticky.** A sticky element releases one
  viewport before its container ends, which slides the horizon away under the
  last panel. `data-active` on the container takes the canvas away again once
  the hero no longer fills the screen — otherwise a fixed element would sit on
  top of the whole page.
- **Three.js is imported inside the effect**, not at module scope. The panels
  are ordinary server-rendered HTML, so the copy is in the document with or
  without JavaScript, and the renderer arrives after hydration.
- **Ridge silhouettes are `ShapeGeometry` from a polygon.** The closing baseline
  has to sit below every trough, or the outline crosses itself and triangulates
  to nothing at all — an invisible mountain with no error to show for it.
- **The atmosphere shell uses a real view-direction fresnel.** The camera flies
  *inside* that sphere, and the usual fixed-axis version reads every facing
  surface as rim light, which on a light ground bleaches the frame to white.
- **The intro uses `fromTo` with `clearProps`, never `from`.** A `from` tween
  ends on whatever value it read and leaves it inline, where it outranks the
  `[data-active]` rules that hide the fixed furniture.
- Bloom is thresholded above everything except the sun. On a light ground a low
  threshold does not glow, it just washes.
- **The scene watches its own frame rate and switches itself off.** A
  decorative background is never worth a page that judders, and this one cannot
  be tested on every machine it will meet — a GPU that cannot hold it shows it
  as a flicker, and no amount of tuning from here finds that out. So bad frames
  accumulate a debt, good frames pay it down, and if the debt gets away the
  horizon goes `flat` for good: the canvas unmounts, the fixed veil and rail go
  with it, and the three panels stand on the parchment. They are ordinary
  server-rendered HTML, so nothing but the render is lost. Thresholds are
  forgiving on purpose (a frame counts as bad over 40ms, and anything over
  250ms is assumed to be a backgrounded tab rather than this scene's fault).
- **`?flat` and `?horizon` force it either way**, remembered in
  `localStorage` under `bapu:flat`. This exists so that a reported flicker can
  be pinned on this scene, or ruled out, in one reload instead of another round
  of guessing — which is what the first three attempts at the flicker cost.
- **Deactivation frees the layers.** `data-active="false"` sets `display: none`
  on the canvas, the veil and both rails, not `visibility: hidden` — a hidden
  element keeps its composited layer, and these are four viewport-sized fixed
  layers that would otherwise sit over every section below for the rest of the
  page. The hysteresis is on the safe side too: off as soon as the hero stops
  filling the screen, back on only past 1.04, so the fixed furniture stops
  overlapping the next section as early as possible.
- **`--hero-offset` is measured AT REST, and nothing scroll-derived may ever
  feed layout again.** This was the flicker — the real one, after two wrong
  answers. The property publishes the distance from the top of the document to
  the top of the hero, and the first panel consumes it as
  `min-height: calc(100svh - var(--hero-offset))`. That makes it *layout*. It
  was being recomputed on every scroll, and the navbar shrinks as you scroll
  (`h-24` to `h-16`), so:

  ```
  scroll past 24px -> navbar shrinks -> offset shrinks
    -> panel one grows (it is 100svh MINUS the offset)
    -> container grows -> document grows
    -> the browser moves the scroll position under our feet
    -> which can drop it back under 24px -> navbar grows -> repeat
  ```

  The header and the hero taking turns resizing each other, several times a
  second. `progress` is measured against that same container height, so every
  pass jumped the camera and every parallax in the hero at once — which is why
  it was on all three panels, not one. Traced: container height stepping
  2654 -> 2687 mid-scroll, and a frame where the page scrolled **4px backwards**
  while the wheel went forwards. After the fix both are single-valued.

  If you ever need a scroll-derived number in this component again, use it for
  `transform` or `opacity`. Never for anything that changes a box.
- **Every object in the scene is transparent, so NOTHING may write depth and
  everything needs an explicit `renderOrder`.** This is what made the third
  panel flicker like a bulb. The six ridge planes were the only meshes left on
  three.js's default `depthWrite: true` while being `transparent: true` — so
  each one punched a hole in the depth buffer where it drew and hid the ridges
  behind it. three.js re-sorts transparent objects **every frame** by distance,
  and these planes move every frame (the scroll pushes their z, the idle drift
  nudges their y, and the sort key is computed from exactly that), so two
  neighbours could swap order between frames and two viewport-sized maroon
  ridges traded places over and over. Worst on panel three, where the camera
  has flown deepest and the overlap is greatest. Fixed with
  `depthWrite: false` plus the `RENDER_ORDER` table at the top of the file:
  sky, haze, six ridges far-to-near, motes, atmosphere. If you add anything to
  this scene, give it a slot in that table.
- **The `data-active` toggle has hysteresis, and needs it.** It flips
  `opacity` and `visibility` on the canvas, the veil and both rails, and stops
  the render loop. A single threshold sat right at the end of the last panel —
  exactly where a visitor nudges back and forth — so trackpad jitter could
  strobe the whole horizon. On at 0.95, off at 0.75.
- **Nothing over the canvas may blend or use a backdrop filter.** `.hero-veil`
  was a fixed, viewport-sized `mix-blend-mode: multiply` layer and both rails
  carried `backdrop-filter: blur()`, all sitting on a canvas that repaints
  every frame — three full-viewport backdrop readbacks at 60fps for three
  screens of scroll. That was a real cost and it is gone (the veil composites
  normally, the rails are opaque), but on its own it was **not** what caused
  the flicker: the depth-write bug above was.

Under `prefers-reduced-motion` the scene renders still — no drift, no camera
float, no entrance, no parallax — and every panel is visible from the first
frame. The ambient loops never start either, because the flag that switches them
on is set by the entrance timeline that never runs.

### The order of the homepage

```
1. the horizon      HorizonHero    who this is, over three screens of scroll
2. the house        HouseSection   why there are two names, what each is for
3. the shops        StoresSection  where to walk in
4. the best sellers SignatureSection
5. the story        LegacySection  six decades of it
6. the rest         Why / Process / Testimonials / SocialGrid / MarketplaceCTA
```

Stores sit that high deliberately. This is a sixty-year-old counter business in
one city, and for a large share of the people who land here the useful answer is
an address and a pair of opening hours, not a brand film. The story is the
reward for scrolling past that, not the toll for reaching it.

The short "It started in Gwalior" card that used to sit above the story is gone.
It restated the address and the year immediately before the story said both,
better — a page clearing its throat twice. `StorySection.tsx` is still in the
repo, unmounted.

### The house

Below the horizon, `HouseSection.tsx` answers the first question a visitor asks
on a site carrying two names: *why are there two?* It runs in two acts —

1. **The pin.** Three screens of scroll spent on one screen of content. The
   house name is a title card from the moment it arrives; the scroll then draws
   a line down out of it, forks the line in two, lands a brand name under each
   branch, and finally prints the one sentence that explains the pair.
2. **The two faces.** Two panels that are deliberately *not* the same card
   twice: Best Namkeen is printed — block-print ground, die-cut corners, gold
   hairline frame, serif name, sunburst date. Best Bites is a clean sheet —
   ivory, straight edges, tracked sans name, one crimson rule. What they share
   (the crop, the descriptor line, the spacing, the shape of the link) is what
   makes them read as sisters rather than as strangers on a shelf.

Worth knowing before editing it:

- **Nothing that carries the headline starts at opacity 0.** Progress sits at 0
  for the whole of the pin's approach, so anything hidden at 0 would arrive as a
  blank maroon screen. Only the fork and what it produces are on the scroll.
- **Every scroll step is padded out to the full 0–1 range** by `useStep`. Given
  a partial input range, this version of `useTransform` runs the mapping
  *backwards* once the input passes the end of it — a step written as
  `[0.4, 0.56] → [0, 1]` fades in on cue and then quietly fades back out again
  over the rest of the section. Held at both ends, it stays where it was put.
- **The column drops on arrival and rises as the fork fills it in.** The column
  reserves the height the fork and the two names will need, so the title alone
  would otherwise sit high with a hole under it.
- **Nothing viewport-sized may scale, blend, or carry `grain` inside the pin.**
  This is the rule that stops the section flickering, and it cost a debugging
  session to learn. Three things were fighting the compositor at once: a
  full-screen photograph on a scroll-driven `scale`, the block-print field on
  `mix-blend-mode: soft-light`, and `.grain::after` on `mix-blend-mode:
  multiply`. Chromium re-rasters a composited layer whenever its transform
  *scale* changes, and a blend layer has to read its backdrop back out every
  frame it paints — so every frame of a three-screen pin was re-rastering and
  re-reading the whole viewport. The frames it could not finish showed as
  white, for a second at a time. Inside the pin: fade, translate and stroke
  freely (all compositor-only); scale and blend nothing bigger than a card.
- **`svh`, not `vh`, for the track and the pinned child** (`.pin-track` /
  `.pin-stage` in `globals.css`). `vh` is the height with a phone's toolbars
  hidden, so the moment the toolbar collapses mid-scroll both boxes resize, the
  pin re-measures and the composition jumps. `dvh` changes continuously, which
  is worse. `svh` never moves while scrolling.
- Under `prefers-reduced-motion` the pin is not a pin at all: the wrapper loses
  its height, the stage loses `sticky`, and every step collapses to its settled
  value, so the same composition renders as one static screen.

The three photographs in this section are not the brand's own — see **Images**
below.

### The hero (not currently mounted)

`Hero.tsx` and `PackMarquee.tsx` are no longer on the homepage; `HouseSection`
took the slot. They are kept because the blend technique below is the only way
these pack shots can be placed on the warm ground, and any future section that
shows a pack will need it.

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

### Motion

Everything moves for a reason, and everything stops under
`prefers-reduced-motion`. The pieces, in `components/ui/`:

| Component | What it does |
| --- | --- |
| `Preloader` | First-visit brand curtain: the heritage seal, a real progress bar, then a curtain wipe. Once per tab. |
| `Reveal` / `Stagger` | Scroll-in entrance. Seven variants (`up`, `left`, `scale`, `blur`, …); `Stagger` + `StaggerItem` time a group from one place. |
| `TextReveal` | Headline that rises a word at a time from behind a clipping mask. Takes a string; `\n` breaks the line. |
| `Counter` | Counts a number up when it reaches view. Renders the final value on the server. |
| `Parallax` / `ScrollLine` | Scroll-linked drift inside a frame; a rule that fills as its block is read. |
| `DrawIn` | Draws SVG strokes on. Needs `pathLength={1}` on the paths. |
| `Magnetic` / `Spotlight` | Cursor-led hover: a CTA that leans in, a card lit where you point. Mouse only. |
| `ScrollProgress` / `BackToTop` | Reading position across the top; a return control with a progress ring. |
| `PageTransition` | Enter-only fade-and-rise on route change, keyed to the pathname. |

Three things are easy to get wrong here:

- **The preloader must render without JavaScript.** It exists for slow
  connections, so nothing inside it may carry a Framer `initial` — that
  serialises to `opacity: 0` in the server HTML and the loader would be a blank
  circle until hydration. The seal is plain markup on purpose.
- **Never branch the tree on `useReducedMotion`.** The server cannot know the
  preference, so `if (reduced) return null` hydrates into a mismatch. Hide with
  `motion-reduce:hidden` instead — `ScrollProgress` shows the pattern.
- **A horizontal `Reveal` needs a clipped section.** Until it is scrolled to, the
  element rests at its x-offset; on a narrow screen that sits outside the
  viewport. Any section using `variant="left"`/`"right"` must be
  `overflow-hidden`.

The hero marquee, the drift, the sheen and the accordion stay pure CSS
(`globals.css`), so they cost no JavaScript and no hydration.

### Logo

The printed badge lives at `public/brand/bapu-best-logo.webp`, referenced once
through `LOGO_SRC` in `components/ui/Bits.tsx`. Swap that file to change the
mark in the header, the footer and the preloader together. `src/app/icon.png`
is the same artwork as the favicon.

It ships as WebP for the same reason the marketplace marks do: the source PNG
is 174 KB of gradient and quantising it only reaches 39 KB, while WebP holds
the gradient cleanly at 22 KB — and this one sits in the header of every page.

`Wordmark` pairs the badge with a typographic lockup rather than using it
alone. The "Namkeen" and "SINCE 1960" set into the artwork stop being legible
below roughly 80px, so at header size the type carries the name while the badge
carries the recognition.

### Pattern

`components/art/Pattern.tsx` is a tileable block-print motif — a four-petal
flower in a lobed diamond, ringed with stippling — in the language of a printed
mithai box. Four colourways, driven by two CSS variables so one tile serves all
of them: `rose`, `blush`, `emerald`, `maroon` and `parchment`.

```tsx
<Pattern tone="maroon" opacity={0.2} scale={0.66} />   // texture behind copy
<PatternPanel tone="blush" notch="2.75rem">…</PatternPanel>  // die-cut label
<PatternRule tone="maroon" />                          // ribbon divider
```

Three things to keep in mind:

- **`scale` is the tile edge as a multiple of 120px**, and it is exact: the
  `<svg>` deliberately has no `viewBox`, so one user unit is one CSS pixel and
  `patternTransform` does the sizing. Sizing through a `viewBox` instead makes
  the motif depend on the panel's aspect ratio, because `preserveAspectRatio`
  fits whichever axis overflows — the same panel then tiles differently on a
  phone and a desktop.
- **The motif is laid out around the centre of the tile.** An off-centre path
  still tiles, but the rows visibly drift.
- **Check contrast before putting copy on a field.** On the full `rose`,
  `ink-soft` lands at 4.0:1 and `ink-faint` at 1.9:1, both under AA — which is
  why the buy band uses `blush` and lifts its own text a step darker.

Ids come from `useId`, not from the tone: two fields of the same tone on one
page would otherwise share an id and both would resolve to whichever `<pattern>`
the document defined first.

The palette additions behind it (`--color-rose`, `--color-emerald`,
`--color-gold`) are drawn from the deep green, gold and soft rose that Om Sweets
uses. They dress the decorative fields only — the maroon and saffron core still
carries the brand, because that is what matches the packs.

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

One exception: the `story-*` and `process-*` frames are licensed photographs, not the brand's own, and they DO ship in the repo — under
`assets/web/`, reached by the `root` field on a manifest entry. They are there
because the section needed editorial imagery (a spice table, a shared plate)
that the asset library does not contain. None of them shows Bapu Best product,
packaging, staff or premises, and none is captioned as though it did; the alt
text describes a basket, a plate, a tray. Licence, credits and swap-out notes
are in `assets/web/SOURCES.md` — replace them with the family's own photographs
whenever those exist and only that folder and the manifest change.

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
- **`ProcessScenes.tsx`** — the five "How we make it" scenes. **Not currently
  mounted**: that section now runs on photographs (see below). The file is kept
  because it is original artwork and because the argument it was drawn for is
  still the one that governs the section.

**How we make it, and what a photograph there is allowed to be.** The five
stages were illustrated at first, for a reason that has not gone away: a stock
photo of another factory under the heading "From our kitchen to your home" is a
manufacturing claim the business cannot evidence.

They are photographs now because the business asked for them, and they were
chosen so the original argument still holds. Each frame shows the *craft* and
not this kitchen — a scoop of pulses, a kadai, chilli on a spoon, a food hall, a
plain unbranded pouch under a sealer. No frame shows a Bapu Best pack, premises
or person; no alt text says it does; and the note under the section tells the
reader in plain words that these are illustrative and that only the ISO and
FSSAI numbers above them are ours. Hold any replacement to the same test.

Each card also carries a small motion layer keyed to its stage — dust settling,
oil rising, masala falling, a check sweeping down, a seal running across — plus
a pointer-driven tilt. All of it is `transform`/`opacity` on card-sized or
speck-sized elements: see the flicker note under **The house**, and keep it
that way.

To go back to drawings, or forward to real kitchen photography, only `PROCESS`
in `src/data/story.ts` and the card body in `ProcessSection.tsx` change. Scenes
are drawn at 400×500 to match the 4:5 card exactly, with a small parallax
overscan — keep anything that matters inside x 34–366, y 44–456.

### The shops

`StoresSection.tsx` leads with the one photograph that has the name lit over
the door and lets the other three follow as a row. Two colours carry the thing
the copy cannot: **emerald** marks an address that is evidenced — Phalka Bazar,
which is on the pack and on the FSSAI licence — and **saffron** marks one that
came off a public listing and is still waiting on the family. The key is printed
under the row, and `STORES` in `src/data/stores.ts` records the listing each
unconfirmed address came from.

Every `mapsUrl` is a Google Maps **search**, never a place id, and the map on
`/stores` is a search embed rather than pins. Nobody has surveyed these shops;
a hand-typed coordinate would look more certain than we are entitled to be, and
a search link still lands on the right shop if a listing moves.

### The legacy story

`LegacySection.tsx` is the founding narrative, in the business's own words,
told down the page one line at a time with a thread in the left margin that
fills as you read. It is mounted twice — on the homepage after the short
`StorySection` card, and on `/our-story` as "the long version" — from a single
copy of the text in `LEGACY` (`src/data/story.ts`). Edit the words there and
both move together.

It is deliberately **not** pinned. It is far longer than the house stage, and
everything in it moves by opacity, translate and stroke only.

## Deploying

Any Node host that runs Next.js works; Vercel needs no configuration. Set
`SITE.url` in `src/data/site.ts` to the live domain before the first deploy so
canonical URLs, the sitemap and Open Graph tags point at the right place.
