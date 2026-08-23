# Best Namkeen — Brand Website

Premium animated brand site for Best Namkeen (Gwalior, since 1960).
Built with Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, GSAP ScrollTrigger, and Lenis smooth scroll.

## Run it

```bash
npm install
npm run dev      # development at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Purchase & social links

All ordering CTAs point to Zomato, and social links to Instagram — both set in
**`lib/products.ts`**:

```ts
export const ZOMATO_URL = "https://link.zomato.com/xqzv/rshare?id=...";
export const INSTAGRAM_URL = "https://www.instagram.com/bestnamkeen/";
```

Amazon/Flipkart are deliberately inactive; add their constants and CTAs back
when real listing links exist. Product names, taglines, weights, galleries and
pouch colors also live in `lib/products.ts`.

## Product images

Optimized WebP images live in `public/products/`. Transparent packet cutouts
come **directly from the prepared assets** in
`Bapu Best All Resources/transparent BG` (no background removal is performed).
Product-page galleries include every edited image from each product folder —
`Raw Image` subfolders and the AI-generated "Laung Sev" folder are excluded.
To regenerate after adding photos, edit `scripts/process-images.mjs` and run:

```bash
npm run images
```

Note: if a regenerated image doesn't show up, delete `.next/cache/images`
(Next.js caches optimized images) and restart the server.

## Routes

- `/` — homepage (discover → taste → learn → connect → visit → buy)
- `/products` — full product range
- `/products/[slug]` — dedicated product pages (gallery, story, related products)

## Site structure

| Section | Component |
|---|---|
| Floating navbar (real logo) | `components/Navbar.tsx` |
| Animated hero | `components/Hero.tsx` |
| Marquee strip | `components/Marquee.tsx` |
| Scroll-cinematic product reel (pinned) | `components/CinematicReel.tsx` |
| Featured products + CTA | `components/ProductShowcase.tsx` (cards: `ProductCard.tsx`) |
| "MASALA" parallax composition | `components/FloatingComposition.tsx` |
| Why our namkeen | `components/WhyUs.tsx` |
| Our story — six scroll moments | `components/StoryCinema.tsx` |
| Founder story | `components/Founder.tsx` |
| Chai-time | `components/ChaiTime.tsx` |
| Store locator (Gwalior) | `components/Stores.tsx` (data: `lib/stores.ts`) |
| Instagram-style grid | `components/InstagramGrid.tsx` |
| Amazon / Flipkart CTA | `components/Marketplace.tsx` |
| Footer (contact + logo) | `components/Footer.tsx` |
| Product page | `components/ProductPageContent.tsx`, `ProductGallery.tsx` |

Instagram links currently point to instagram.com — set the real profile URL in
`INSTAGRAM_URL` in `lib/products.ts`. Store data (addresses, hours, Maps links)
lives in `lib/stores.ts`.

Hand-drawn SVG doodles (chilli, coriander, sev, peanuts, arrows) are in
`components/Doodles.tsx`. Brand colors are defined as Tailwind theme tokens in
`app/globals.css`. All animations respect `prefers-reduced-motion`.
