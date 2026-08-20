# Content to supply

Everything on the site is traceable to something you gave me — the packaging
artwork, the FSSAI/GST declaration, or the shop photographs. Where a fact was
missing I left a **visible bracketed placeholder** rather than writing something
plausible. This file lists every gap, and where to fill it.

Nothing below is blocking. The site builds, deploys and reads properly as it
stands; each item just replaces a marked gap with the real thing.

---

## 1. Blocking for launch

These make the site functional rather than merely correct.

| What | Where | Notes |
| --- | --- | --- |
| **Amazon storefront URL** | `src/data/site.ts` → `MARKETPLACES.amazon.href` | Every Buy button on the site reads from this one value. Until it is set, the buttons render as `#` and are marked `aria-disabled`. |
| **Flipkart storefront URL** | `src/data/site.ts` → `MARKETPLACES.flipkart.href` | Same. |
| **Live domain** | `src/data/site.ts` → `SITE.url` | Currently `https://www.bapubest.com`. Drives canonical URLs, sitemap and Open Graph tags. |

**Per-product listing links** — strongly recommended now that each product has
its own page. Set `amazon` / `flipkart` on each entry in
`src/data/products.ts` and that product's buttons deep-link to its own listing
instead of the generic storefront. Without them, all ten pages send the visitor
to the same place.

### Marketplace logos

The "Also available on" row (`src/components/ui/MarketplaceLockup.tsx`) now uses
the **official Amazon and Flipkart artwork**, stored locally in `public/brand/`.
Nothing is hotlinked.

Showing a retailer's logo to say "our product is sold here" is ordinary
nominative use for a genuine seller. Two things worth checking before launch,
though — they are policy questions, not code:

- **Amazon** offers an official **"Available at Amazon"** badge intended for
  exactly this placement, and its brand guidelines generally prefer it over the
  bare wordmark on third-party sites. If you have Seller Central access, grab
  the badge and swap the `amazon` entry in that file.
- **Flipkart** brand assets come from Seller Hub → Marketing resources.

Both files are plain SVG — replacing them is a one-line change.

---

## 1b. The three newest Bapu Best packs

Ratlami Sev, Lahsun Sev and Wafer Mixture were added from the single studio
shot each in `Best Namkeen Product images/Best Namkeen/…`. Everything written
about them describes only the pack front and what is visible through its
window — no ingredient, weight or sourcing claim. Three things need your eye:

| What | Where | Notes |
| --- | --- | --- |
| **Strapline wording** | `PRODUCTS` → `bapu-ratlami-sev`, `bapu-wafer-mixture` | The line runs around the pack seam in the photograph. I read Ratlami as **"Swad jo bhulat nai"** and Wafer as **"Ka mazza ka saath"** — both may be longer than the camera caught. |
| **Net weights** | same entries, `netWeight` | Omitted rather than guessed. Every other pack shows its weight on the product page. |
| **More photography** | `scripts/assets.manifest.mjs` | One frame each, so the card, the gallery and the breakdown all use the same picture. A bowl shot and one lifestyle frame each would fill the gaps. |

Still missing a studio pack shot altogether — named on the site but not
pictured: **Waffer Mix**, **Ujjaini Sev**, **Lahsun Mix** (Best Bites) and
**Hing Mixture** (Bapu Best). A plain white-background shot of any of them is
all it takes; the hero shows a pack the moment one exists.

---

## 2. Conflicts on your own documents

Two facts appear differently on different sources. I used the signed FSSAI
declaration in both cases, because it is the legal document — **please confirm
which is correct.**

| Fact | On the declaration (31-07-2026) | On the pack | Site currently uses |
| --- | --- | --- | --- |
| Postal code | Gwalior **474009** | Gwalior **474 003** | `474009` |
| FSSAI licence | `1141957000**0105**` | Waffer Mix pack reads `1141957000**0405**` | `11419570000105` |
| Customer care | — | Red pack: `84353 38670`, `94253 64267` <br> Waffer pack: `94253 07800`, `94254 79767` | `94253 07800`, `94254 79767` |
| E-mail | — | Printed `cacamitnamkeen@gmaii.com` | `cacamitnamkeen@gmail.com` (assumed typo — **flagged on the site** until you confirm) |

Fix in `src/data/site.ts` (`LEGAL`, `CONTACT`). Set
`CONTACT.emailNeedsConfirmation` to `false` once confirmed, and the warning chip
disappears from the footer and contact page.

Also worth a decision: the packs spell the second brand **"Bappu Best Bites"**
(double *p*) while everything else says *Bapu*. The site uses **Bapu Best
Bites** for display and records the exact pack spelling in
`BRANDS['best-bites'].packName`.

---

## 3. The founding story

**Partly written now.** You sent the legacy story — *Six Decades. One Timeless
Taste.* — and it is on the site twice, word for word: on the homepage after the
short "It started in Gwalior" card, and on **Our Story** as the long version.
It lives in one place, `LEGACY` in `src/data/story.ts`, so editing it there
changes both.

That settled two things that had been marked as gaps since the start: the
founder, **Shri Seth Sunny Lal Bedar**, and what he began in 1960. The 1960
timeline entry and the Our Story intro are no longer placeholders.

Still open, in whatever form is easiest — a voice note is fine:

- What was made first, and what the shop was called
- When the Phalka Bazar counter opened
- When and why the other outlets opened
- Why **Bapu Best Bites** was created as a second brand
- When the facility became ISO 22000:2018 certified
- When you started selling online

Fill in `TIMELINE` (set `confirmed: true` per entry) as each one lands.

**One spelling to confirm.** The founder's name is printed on the site exactly
as you sent it — *Shri Seth Sunny Lal Bedar*. If the family spells it
differently (Sunnu Lal / Sunnulal, as in the registered entity **M/s Sunnulal
Amit Kumar and Sons**), say which is right and it is one string to change.

### 3b. "Best Foods" — the house name, and two decisions inside it

The homepage now opens (below the horizon) on a house identity above the two
brands: **Best Foods**, with the line *"Bringing you timeless taste, in more
than one name."* Three things in it are decisions rather than facts off a pack,
so they are yours to confirm — all three live in `src/data/story.ts` → `HOUSE`:

| What | Currently | Confirm |
| --- | --- | --- |
| **The house name** | `Best Foods` | It is on no pack and in no document you sent. If the family already trades under a house name, use that instead — it is one string. The legal entity printed under it (`M/s Sunnulal Amit Kumar and Sons · Gwalior`) comes from `LEGAL` and is correct. |
| **How the brands are named in this story** | `Best Namkeen` and `Best Bites` | The packs read *Bapu Best — Namkeen & Bakery* and *Bappu Best Bites — Namkeen*, and both panels print that pack name underneath. If you would rather the story used the pack names throughout, change `label`. |
| **What each brand is *for*** | "Traditional namkeen • Classic favourites" / "Snacks & everyday favourites" | This is the split the whole section argues for. If the real distinction is different — price, format, distribution — say so and the copy follows it. |

Nothing in this section makes a manufacturing, sourcing or quality claim beyond
what is already evidenced elsewhere on the site.

---

## 4. Stores

Only **Phalka Bazar** is confirmed — it is the manufacturing and registered
address on the licence. The other three cards show real photographs of your
shops, but are marked *"Details to confirm"* because I have no names or
addresses for them.

For each outlet, in `src/data/stores.ts`:

- `name`, `area`, `address`, `hours`, `phone`
- `mapsUrl` — the Google Maps share link
- `coords` — `{ lat, lng }`

The map section (`src/components/StoreMap.tsx`) is a deliberate placeholder: it
draws a stylised plan and says how many locations are unplaced. **No coordinates
were invented.** Once `coords` are filled in, swap that component for a real
embed — nothing else has to change.

---

## 5. Customer reviews

**None supplied, so none are shown.** The "Loved by Gwalior" section renders
three visibly empty dashed cards rather than invented quotes.

Fill `TESTIMONIALS` in `src/data/story.ts` with real reviews — Amazon/Flipkart
review text is fine if you have permission to quote it — then remove the
placeholder chips in `src/components/Testimonials.tsx`.

---

## 6. Claims I deliberately did not make

Your brief listed **"No Artificial Colours"** and **"No Added Preservatives"**.
The 400 g Best Bites ingredient panel I transcribed lists neither a colour nor a
preservative, which is suggestive — but one variant's label is not evidence for
the whole range, and these are regulated claims under the FSS (Advertising and
Claims) Regulations. **I left them off.**

If they are true across every SKU, say so and I will add them to
`src/components/WhySection.tsx`.

Also absent, for the same reason — nothing was supplied to support them:

- Years in business beyond the "Since 1960" printed on the pack
- Number of stores, customers or cities
- Awards
- Any health, nutrition or sourcing claim

What the site **does** claim, and the evidence for each, is recorded in
`VERIFIED_CLAIMS` in `src/data/site.ts`.

### Ten photographs that are not yours

Two sections use licensed photography, because they needed pictures the asset
library does not contain. All ten are under the Pexels licence (commercial use,
no attribution required); the files, the credits and the swap-out instructions
are in `assets/web/SOURCES.md`.

- **The house section (5)** — a basket of namkeen, sev on a plate, a spice
  table, a shared tray, a bowl of mixture.
- **How we make it (5)** — a scoop of pulses, a kadai, chilli on a spoon, a
  food hall, a plain pouch under a sealer.

**The five in "How we make it" are the ones to read carefully.** That section
sits under the heading *From our kitchen to your home*, so every frame was
chosen to show the **craft** and not your kitchen: no Bapu Best pack, no Phalka
Bazar, nobody who works for you. The note printed under the row says so to the
reader in plain words, and the only claims in that section that are yours are
the ISO 22000:2018 certification and the FSSAI licence number, both of which are
on the pack.

If you would rather the site showed only your own photography — and for that
section especially it would be better — send frames of the kitchen and it is one
line per image in `scripts/assets.manifest.mjs`.

### The "Preparation" step

Card **02** in "How we make it" was the one step you had never described, and it
used to render as a visible gap. You asked for something to be written there, so
it now reads:

> The flour is worked into a batter loose enough to press, then pushed through
> the jhara straight into hot oil — a batch at a time, so every strand goes in
> at the same heat and comes out with the same snap.

That is a true description of how sev is made **anywhere**; it is not a
description of your kadhai. It is still flagged `confirmed: false` in
`src/data/story.ts`. Replace it with what actually happens in Phalka Bazar —
kadhai size, batch size, who does it, anything that makes it yours.

---

## 7. Product names to double-check

Taken from your folder names and pack fronts. Two are worth a second look:

- **Lahsun Mix** — the folder is `Lahsun (Mix)` (garlic) but the files inside
  are named `LaungMix*` (clove). Which is it?
- **Ujjaini Sev** — folder name; the pack front was not legible in the photos.
- **Laung Sev** was excluded: its folder is marked *"(No upload)"* and the only
  images in it are AI-generated, not photographs of the real pack.
- **Waffer (hing Mix)** was excluded — the folder is empty.
- `Kattha_meethatg.png` shows a long green pack I could not identify, so it is
  not on the site.

Edit `PRODUCTS` in `src/data/products.ts`.

---

## 8. Smaller gaps

- **Behind-the-scenes photography** — there is none in the asset library, so the
  five "How we make it" stages are **original illustrations**. I did not use
  stock: a photograph of another company's kitchen under "From our kitchen to
  your home" would be a manufacturing claim you cannot evidence. If you shoot
  the real kitchen — the kadhai, the sev press, the seasoning drum, the packing
  bench, someone at work — send it and the section swaps to photographs in one
  edit. Five frames is enough, and it would be one of the biggest single
  upgrades available to the site.
- **Opening hours** — `CONTACT.hours` in `src/data/site.ts`, and per store.
- **Social links** — `SOCIAL` in `src/data/site.ts`. With none set, the social
  section shows an *"Add Instagram URL"* chip instead of a follow button.
- **Legal pages** — `/legal/terms`, `/legal/privacy`, `/legal/refunds` are
  structured scaffolds with section headings and no body text. Policy wording is
  a legal document and has to come from you or your accountant; I did not draft
  one. They are `noindex` in the meantime.
- **Shelf life** and **wholesale/distributor policy** — two FAQ answers on
  `/contact` are placeholders.

---

## 9. Nutrition panel — removed from the site

**Nutrition labelling is no longer shown on any product page**, as requested.
The accordion and its data are gone from the codebase.

Keeping the reading here in case you want it back later. I enlarged the panel
from `waffer_mix_2.png` and could mostly read it, but in that photograph the
pack is curved and shot at an angle, so the value column drifts against the row
labels — the last row even reads "Rodium (mg)". Below is my best
reconstruction, cross-checked so that every per-20 g figure is exactly one fifth
of its per-100 g figure. **Confirm it against a flat pack before it goes
anywhere near a label or a listing.**

| Nutrient | Per 100 g | Per 20 g |
| --- | --- | --- |
| Energy (kcal) | 521.63 | 104.33 |
| Total fat (g) | 31.54 | 6.31 |
| Saturated fat (g) | 14.27 | 2.85 |
| Trans fat (g) | 0 | 0 |
| Cholesterol (mg) | 0 | 0 |
| Carbohydrate (g) | 58.65 | 11.73 |
| Total sugars (g) | 6.82 | 1.36 |
| Added sugars (g) | 4.42 | 0.88 |
| Protein (g) | 8.78 | 1.76 |
| Sodium (mg) | 902.68 | 180.54 |

The panel also states: serving size 20 g, and per-serve RDA contribution of
Energy 5%, Added Sugar 2%.

If you ever want it back on the site: lay one pack flat, photograph the panel
square-on in good light, and send it over — then it is a short job with no
guessing.

### The Bapu Best ingredient panel is still missing

Related, and worth flagging: the transcribed ingredient and allergen list
belongs to a **Bapu Best Bites** pouch. It is shown on the eight Best Bites
product pages, and deliberately **not** on the two Bapu Best pages
(Khatta Meetha, Hing Mixture) — those show a marked gap instead, because
borrowing another pack's declaration would be wrong.

Send a flat photo of a Bapu Best back panel and I will add it as a second entry
alongside `PACK_LABEL` in `src/data/products.ts`.

---

## 10. Product names to double-check on the pack

Now that every product has its own page and its own URL, the names matter more.
Two need a look:

- **Indori Khatta Meetha** — the studio pack front actually reads **"Indori
  Khatta Mix"**, while other shots in the same folder read "Indori Khatta
  Meetha". Which is on the current print run? The slug is
  `/namkeen/indori-khatta-meetha`, so changing the name later means a redirect.
- **Lahsun Mix** vs **Laung Sev** — see section 7.

---

## Where placeholders appear on the site

They are impossible to miss by design — dashed red-bordered chips in uppercase.
Search the codebase for `[` inside `src/data/` to find every one, or grep for
`Placeholder` to find the component that renders them.
