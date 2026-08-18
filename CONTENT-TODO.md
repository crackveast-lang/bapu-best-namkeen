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
| **Logo artwork** | `src/components/ui/Bits.tsx` → `Wordmark` | I did **not** recreate your printed logo. The header/footer currently use a plain typographic lockup. Send the vector (SVG/AI/EPS) of the `Bapu Best` and `Bappu Best Bites` marks and I will drop them straight in. |

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

**Not written.** `src/data/story.ts` is entirely placeholders except two dates,
which come off the sunburst marks on the packs (Bapu Best "Since 1960", Best
Bites "Since 1990").

Please send, in whatever form is easiest — a voice note is fine:

- Who started it, and where in Gwalior
- What was made first, and what the shop was called
- When the Phalka Bazar counter opened
- When and why the other outlets opened
- Why **Bapu Best Bites** was created as a second brand
- When the facility became ISO 22000:2018 certified
- When you started selling online

Fill in `TIMELINE` (set `confirmed: true` per entry) and `STORY_INTRO.body`.

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
