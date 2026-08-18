import type { ImageKey } from './image-meta';
import type { IngredientIconKey } from '@/components/art/IngredientIcons';

export type BrandId = 'best-bites' | 'bapu-best';

export type Brand = {
  id: BrandId;
  name: string;
  /** Exactly as printed on the pack, for the record. */
  packName: string;
  lockup: string;
  since: string;
  blurb: string;
  copy: string;
  image: ImageKey;
  accent: string;
  href: string;
};

export const BRANDS: Record<BrandId, Brand> = {
  'bapu-best': {
    id: 'bapu-best',
    name: 'Bapu Best',
    packName: 'Bapu Best — Namkeen & Bakery',
    lockup: 'Namkeen & Bakery',
    since: '1960',
    blurb: 'Timeless recipes. Authentic taste.',
    copy: 'The namkeen Gwalior grew up on — the everyday pack that has sat on kitchen shelves across the city for decades.',
    image: 'brand-bapu-best',
    accent: 'var(--color-pack-khatta)',
    href: '/brands#bapu-best',
  },
  'best-bites': {
    id: 'best-bites',
    name: 'Bapu Best Bites',
    packName: 'Bappu Best Bites — Namkeen',
    lockup: 'Namkeen',
    since: '1990',
    blurb: 'A new bite of tradition.',
    copy: 'The same kitchen, the same hands, in a resealable pack built to travel — made for shelves far beyond Gwalior.',
    image: 'brand-best-bites',
    accent: 'var(--color-crimson)',
    href: '/brands#best-bites',
  },
};

export type Product = {
  slug: string;
  name: string;
  /** Descriptor line printed on the pack, where there is one. */
  strapline: string;
  description: string;
  /** Longer copy for the product page. Describes taste and form only. */
  longDescription: string;
  brand: BrandId;
  accent: string;
  image: ImageKey;
  /** Studio pack shot, where one exists in the asset library. */
  pack?: ImageKey;
  /** Gallery for the product page — first frame is the one shown on load. */
  gallery: ImageKey[];
  /** Net weight printed on the pack. Undefined where unconfirmed. */
  netWeight?: string;
  /** A true, checkable note about the style of namkeen — never a health claim. */
  funFact?: string;
  /** This pack's own "what's in it" section. See BreakdownSection. */
  breakdown: BreakdownSection;
  amazon?: string;
  flipkart?: string;
  featured?: boolean;
};

/**
 * The per-product breakdown.
 *
 * `parts` are the components you can actually SEE in that pack's own
 * photographs. `seasoning` is what the flavour is built on — cited only where
 * the pack name or the printed Best Bites ingredient panel supports it.
 *
 * This is a description of the mixture, NOT a regulated ingredient
 * declaration; the declared list stays in the Ingredients accordion and on the
 * pack itself. Each product gets its own heading, its own parts and its own
 * photograph — nothing is shared between products.
 */
export type BreakdownPart = {
  icon: IngredientIconKey;
  name: string;
  detail: string;
};

export type BreakdownSection = {
  eyebrow: string;
  heading: string;
  lede: string;
  parts: BreakdownPart[];
  /** Must be one of this product's own images. */
  image: ImageKey;
  imageAlt: string;
};

/**
 * Every product here exists in the brand's own photography folder. Names follow
 * the pack front. Descriptions describe the style of namkeen only — no
 * ingredient, health or sourcing claims beyond what the pack states.
 */
export const PRODUCTS: Product[] = [
  {
    slug: 'ratlami-sev',
    name: 'Ratlami Sev',
    strapline: 'Spicy & Crunchy',
    description: 'Thick, peppery strands of gram-flour sev in the Ratlam style.',
    longDescription:
      'Ratlami sev is the loud one. Thick strands of gram flour carrying clove and black pepper, fried until they snap rather than bend. Eat it straight from the bowl, scatter it over poha, or press it into a bun with chopped onion.',
    brand: 'best-bites',
    accent: 'var(--color-pack-ratlami)',
    image: 'p-ratlami-sev',
    pack: 'pack-ratlami-sev',
    gallery: ['pack-ratlami-sev', 'hero-ratlami-sev', 'detail-ratlami-flat', 'g-ratlami-b'],
    breakdown: {
      eyebrow: 'What goes in',
      heading: 'One strand. Three spices doing the work.',
      lede: 'Ratlami sev is a single-component namkeen — there is nothing to pick around, so everything rests on the seasoning.',
      parts: [
        { icon: 'sev', name: 'Thick gram-flour sev', detail: 'Pressed through a wide jhara so the strand snaps instead of bending.' },
        { icon: 'clove', name: 'Clove', detail: 'The note that makes a Ratlami sev a Ratlami sev.' },
        { icon: 'blackPepper', name: 'Black pepper', detail: 'The heat that arrives after the clove, not before it.' },
        { icon: 'spices', name: 'Red chilli', detail: 'Enough to colour the strand, not to drown it.' },
      ],
      image: 'hero-ratlami-sev',
      imageAlt: 'A bowl of Bapu Best Bites Ratlami Sev beside its blue pack',
    },
    netWeight: '400 g',
    funFact:
      'Ratlami sev takes its name from Ratlam in Madhya Pradesh, about 400 km south-west of Gwalior. The clove note is what separates it from every other sev on the shelf.',
    featured: true,
  },
  {
    slug: 'sada-sev',
    name: 'Sada Sev',
    strapline: 'Spicy & Crunchy',
    description: 'Fine, plain sev — the one that goes on everything, or on nothing at all.',
    longDescription:
      'The plain one, and the useful one. Fine gram-flour strands with nothing shouting over them, which is exactly why it ends up on chaat, on poha, on dahi, and in a bowl next to the evening tea.',
    brand: 'best-bites',
    accent: 'var(--color-pack-sada)',
    image: 'p-sada-sev',
    pack: 'pack-sada-sev',
    gallery: ['pack-sada-sev', 'p-sada-sev', 'detail-sev-scatter', 'g-sada-b'],
    breakdown: {
      eyebrow: 'What goes in',
      heading: 'Three things, and that is the whole list.',
      lede: 'The plain one. Nothing is added to shout over the gram flour, which is exactly why it ends up on top of everything else.',
      parts: [
        { icon: 'sev', name: 'Fine gram-flour sev', detail: 'The narrowest strand we press — fine enough to scatter.' },
        { icon: 'oil', name: 'Edible vegetable oil', detail: 'Soyabean, cotton seed and palmolein.' },
        { icon: 'salt', name: 'Iodised salt', detail: 'The only seasoning in the pack.' },
      ],
      image: 'detail-sev-scatter',
      imageAlt: 'Bapu Best Bites Sada Sev scattered across a cream surface beside its pack',
    },
    netWeight: '400 g',
    funFact:
      'Sev is pressed through a perforated ladle called a jhara straight into hot oil — the hole size is the only thing that decides whether you get sada sev or a thicker Ratlami strand.',
    featured: true,
  },
  {
    slug: 'milan-mixture',
    name: 'Milan Mixture',
    strapline: 'Spicy & Crunchy',
    description: 'A full mixture — sev, flakes, lentils and peanuts in every handful.',
    longDescription:
      'A mixture that earns the name: sev, rice flakes, fried lentils and peanuts, seasoned together so no single handful is quite like the last. The one to open when there is more than one person in the room.',
    brand: 'best-bites',
    accent: 'var(--color-pack-milan)',
    image: 'p-milan-mixture',
    pack: 'pack-milan-mixture',
    gallery: ['pack-milan-mixture', 'p-milan-mixture', 'detail-milan-bowl', 'g-milan-b'],
    breakdown: {
      eyebrow: "What’s in the bowl",
      heading: 'Five things in every handful.',
      lede: 'A mixture, properly. Each of these is fried separately and only meets the others at the end — which is where the name comes from.',
      parts: [
        { icon: 'sev', name: 'Sev', detail: 'Fine strands, running through everything else.' },
        { icon: 'cornFlake', name: 'Corn flakes', detail: 'Wide and brittle, for the loud bite.' },
        { icon: 'pulses', name: 'Fried lentils', detail: 'Red lentil and yellow peas lentils.' },
        { icon: 'peanut', name: 'Peanuts', detail: 'Whole, and the reason the bowl empties.' },
        { icon: 'greenPeas', name: 'Green peas', detail: 'Fried until they rattle.' },
      ],
      image: 'detail-milan-bowl',
      imageAlt: 'A glass bowl of Bapu Best Bites Milan Mixture beside its brown pack',
    },
    netWeight: '400 g',
    funFact:
      '“Milan” means meeting — which is the whole idea of a mixture: several namkeens that were made separately, brought together in one pack.',
    featured: true,
  },
  {
    slug: 'indori-khatta-meetha',
    name: 'Indori Khatta Meetha',
    strapline: 'Spicy & Crunchy',
    description: 'The Indore favourite — sweet, sour and sharp all at once.',
    longDescription:
      'Sweet, sour and hot arriving in that order. Dry mango powder does the sour, a little sugar does the sweet, and the chilli catches up a second later. Made in the Indori style, where the balance leans sweeter than most.',
    brand: 'best-bites',
    accent: 'var(--color-pack-indori)',
    image: 'p-indori-khatta-meetha',
    pack: 'pack-indori-khatta-meetha',
    gallery: ['pack-indori-khatta-meetha', 'p-indori-khatta-meetha', 'g-indori-b', 'g-indori-c'],
    breakdown: {
      eyebrow: "What’s in the bowl",
      heading: 'Sweet, sour and sharp in one bowl.',
      lede: 'The Indori balance leans sweeter than most. Three things carry the flavour, and three things carry the crunch.',
      parts: [
        { icon: 'sev', name: 'Sev', detail: 'Fine strands through the whole mixture.' },
        { icon: 'cornFlake', name: 'Corn flakes', detail: 'The wide pieces you see first.' },
        { icon: 'peanut', name: 'Peanuts', detail: 'Whole, scattered throughout.' },
        { icon: 'greenPeas', name: 'Green peas', detail: 'The green you can spot in the bowl.' },
        { icon: 'dryMango', name: 'Dry mango powder', detail: 'Amchur — this is where the khatta comes from.' },
        { icon: 'sugar', name: 'Sugar', detail: 'And this is the meetha.' },
      ],
      image: 'g-indori-b',
      imageAlt: 'The teal Bapu Best Bites Indori Khatta Meetha pack beside a bowl of mixture',
    },
    netWeight: '400 g',
    funFact:
      'Indore is roughly 500 km from Gwalior, and its Sarafa night market is the reason khatta meetha travelled across Madhya Pradesh in the first place.',
    featured: true,
  },
  {
    slug: 'kadipatta-mix',
    name: 'Kadipatta Mix',
    strapline: 'Spicy & Crunchy',
    description: 'A mixture built around curry leaf, fried until it turns fragrant.',
    longDescription:
      'Curry leaf is the point of this one. Fried until it goes brittle and gives up its smell, then folded through a mixture so the leaf turns up whole in the bowl rather than hiding in the masala.',
    brand: 'best-bites',
    accent: 'var(--color-pack-kadipatta)',
    image: 'p-kadipatta-mix',
    pack: 'pack-kadipatta-mix',
    gallery: ['pack-kadipatta-mix', 'p-kadipatta-mix', 'detail-kadipatta-flat', 'g-kadipatta-b'],
    breakdown: {
      eyebrow: "What’s in the bowl",
      heading: 'Built around one leaf.',
      lede: 'Most mixtures hide their aromatics in the masala. This one leaves the curry leaf whole, so you can see what you are eating.',
      parts: [
        { icon: 'curryLeaf', name: 'Curry leaves', detail: 'Fried whole until brittle — the point of the pack.' },
        { icon: 'cornFlake', name: 'Corn flakes', detail: 'The base the leaf sits on.' },
        { icon: 'sev', name: 'Sev', detail: 'Fine strands, folded through.' },
        { icon: 'peanut', name: 'Peanuts', detail: 'Whole, for weight.' },
        { icon: 'greenPeas', name: 'Green peas', detail: 'Fried, and hiding among the leaves.' },
      ],
      image: 'detail-kadipatta-flat',
      imageAlt: 'Bapu Best Bites Kadipatta Mix photographed from above with the green pack',
    },
    netWeight: '400 g',
    funFact:
      'Kadi patta only releases its aroma once it hits hot oil — which is why it goes into the kadhai and not into the seasoning at the end.',
    featured: true,
  },
  {
    slug: 'waffer-mix',
    name: 'Waffer Mix',
    strapline: 'Spicy & Crunchy',
    description: 'Wide, brittle wafers tossed with masala — a mixture you eat by the fistful.',
    longDescription:
      'Broad, brittle wafers instead of strands, so every piece breaks with a sound. Tossed with masala and peanuts, and built for the fistful rather than the pinch.',
    brand: 'best-bites',
    accent: 'var(--color-pack-red)',
    image: 'p-waffer-mix',
    gallery: ['g-waffer-b', 'p-waffer-mix', 'detail-waffer-pour', 'g-waffer-c'],
    breakdown: {
      eyebrow: "What’s in the bowl",
      heading: 'Wafers first. Everything else after.',
      lede: 'Broad flat pieces instead of strands, which changes how the whole thing eats — this is a fistful namkeen, not a pinch one.',
      parts: [
        { icon: 'wafer', name: 'Wafer chips', detail: 'Wide and brittle. Every piece breaks with a sound.' },
        { icon: 'sev', name: 'Sev', detail: 'Fine strands filling the gaps between wafers.' },
        { icon: 'peanut', name: 'Peanuts', detail: 'Whole, through the mixture.' },
        { icon: 'spices', name: 'Red chilli masala', detail: 'Tossed over the wafers while they are still warm.' },
      ],
      image: 'detail-waffer-pour',
      imageAlt: 'Bapu Best Bites Waffer Mix being poured from the pack into a glass bowl',
    },
    netWeight: '400 g',
    funFact:
      'This is the pack whose back label the whole site quotes from — the ingredient and allergen text on our Namkeen page was transcribed from a 400 g Waffer Mix pouch.',
    featured: true,
  },
  {
    slug: 'ujjaini-sev',
    name: 'Ujjaini Sev',
    strapline: 'Spicy & Crunchy',
    description: 'Sev in the Ujjain style, cut fine and seasoned warm.',
    longDescription:
      'Cut finer than the Ratlami and seasoned warmer than the sada — the Ujjain style sits between the two, which is why it is the one people reach for when they cannot decide.',
    brand: 'best-bites',
    accent: 'var(--color-pack-red)',
    image: 'p-ujjaini-sev',
    gallery: ['g-ujjaini-b', 'p-ujjaini-sev', 'g-ujjaini-c', 'g-ujjaini-d'],
    breakdown: {
      eyebrow: 'What goes in',
      heading: 'Fine sev, warm masala.',
      lede: 'Cut finer than the Ratlami and seasoned warmer than the sada. The Ujjain style sits between the two on purpose.',
      parts: [
        { icon: 'sev', name: 'Fine gram-flour sev', detail: 'A narrower strand than the Ratlami.' },
        { icon: 'cumin', name: 'Cumin', detail: 'The warm note underneath the heat.' },
        { icon: 'spices', name: 'Red chilli', detail: 'Present, but never the loudest thing in the bowl.' },
        { icon: 'salt', name: 'Iodised & black salt', detail: 'Both, as printed on the pack.' },
      ],
      image: 'g-ujjaini-c',
      imageAlt: 'Bapu Best Bites Ujjaini Sev in its red pack beside a bowl of sev',
    },
    netWeight: '400 g',
    funFact:
      'Ujjain and Ratlam are less than 100 km apart, and both cities argue about who makes sev properly. We make both and let the shelf decide.',
  },
  {
    slug: 'lahsun-mix',
    name: 'Lahsun Mix',
    strapline: 'Spicy & Crunchy',
    description: 'A garlic-forward mixture with a long, slow heat.',
    longDescription:
      'Garlic first, then the chilli behind it. The heat builds rather than arrives, which makes this the one that quietly empties while nobody is watching.',
    brand: 'best-bites',
    accent: 'var(--color-pack-red)',
    image: 'p-lahsun-mix',
    gallery: ['g-lahsun-c', 'p-lahsun-mix', 'g-lahsun-b', 'g-lahsun-d'],
    breakdown: {
      eyebrow: "What’s in the bowl",
      heading: 'Garlic, and what it brings with it.',
      lede: 'The garlic arrives first and the chilli catches up afterwards — which is why this one empties without anyone admitting to it.',
      parts: [
        { icon: 'garlic', name: 'Garlic', detail: 'The reason for the pack, and the first thing you taste.' },
        { icon: 'sev', name: 'Sev', detail: 'Fine strands carrying the masala.' },
        { icon: 'peanut', name: 'Peanuts', detail: 'Whole, through the mixture.' },
        { icon: 'spices', name: 'Red chilli', detail: 'A slow heat that builds rather than lands.' },
      ],
      image: 'g-lahsun-b',
      imageAlt: 'Bapu Best Bites Lahsun Mix in its red pack beside a bowl',
    },
    netWeight: '400 g',
  },
  {
    slug: 'khatta-meetha',
    name: 'Khatta Meetha',
    strapline: 'Chat ka saat, ka saath',
    description: 'The classic sweet-and-sour mix, with peanuts and green peas throughout.',
    longDescription:
      'The everyday pack. Sweet-and-sour mixture with peanuts and green peas running through it — the one that has sat on Gwalior kitchen shelves since long before it had a website.',
    brand: 'bapu-best',
    accent: 'var(--color-pack-khatta)',
    image: 'p-khatta-meetha',
    pack: 'pack-khatta-meetha',
    gallery: ['pack-khatta-meetha', 'brand-bapu-best', 'detail-bowl-khatta-meetha', 'g-khatta-b'],
    breakdown: {
      eyebrow: "What’s in the bowl",
      heading: 'The mix everyone in Gwalior can name.',
      lede: 'Five components you can pick out by eye, which is how you know a khatta meetha has been made rather than poured.',
      parts: [
        { icon: 'sev', name: 'Sev', detail: 'Fine strands, all the way through.' },
        { icon: 'boondi', name: 'Boondi', detail: 'Small fried droplets of gram flour.' },
        { icon: 'peanut', name: 'Peanuts', detail: 'Whole, and easy to spot.' },
        { icon: 'greenPeas', name: 'Green peas', detail: 'The green in the bowl.' },
        { icon: 'dryMango', name: 'Khatta meetha masala', detail: 'The sweet-sour seasoning the pack is named for.' },
      ],
      image: 'detail-bowl-khatta-meetha',
      imageAlt: 'A glass bowl of Bapu Best Khatta Meetha namkeen',
    },
    funFact:
      'The line across the bottom of this pack — “chat ka saat, ka saath” — has been on the Bapu Best wrapper for as long as anyone has been printing it.',
    featured: true,
  },
  {
    slug: 'hing-mixture',
    name: 'Hing Mixture',
    strapline: 'Swad aur sehat ka saath',
    description: 'Cornflakes and sev carrying the unmistakable note of asafoetida.',
    longDescription:
      'Cornflakes and sev with hing running through the whole thing. Asafoetida is the kind of ingredient you notice immediately or not at all — this pack is for the people who notice.',
    brand: 'bapu-best',
    accent: 'var(--color-pack-hing)',
    image: 'p-hing-mixture',
    gallery: ['p-hing-mixture', 'g-hing-b', 'g-hing-c'],
    breakdown: {
      eyebrow: "What’s in the bowl",
      heading: 'You will know it by the smell.',
      lede: 'Asafoetida is the kind of ingredient you notice the moment the pack opens. Everything else here is built to carry it.',
      parts: [
        { icon: 'hing', name: 'Asafoetida', detail: 'Hing — named on the front of the pack, and impossible to miss.' },
        { icon: 'cornFlake', name: 'Corn flakes', detail: 'The wide pieces holding the seasoning.' },
        { icon: 'sev', name: 'Sev', detail: 'Fine strands running through it.' },
        { icon: 'peanut', name: 'Peanuts', detail: 'Whole, scattered throughout.' },
      ],
      image: 'g-hing-b',
      imageAlt: 'The Bapu Best Hing Mixture pack held in one hand',
    },
    funFact:
      'Hing is listed on our ingredient panel as “asafoetida (hing)” — a resin so strong it is measured in pinches, never spoons.',
  },
];

export function productBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Siblings from the same brand, for the "Liked it? Try these!" switcher. */
export function relatedProducts(product: Product, limit = 4) {
  const sameBrand = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.brand === product.brand,
  );
  const rest = PRODUCTS.filter((p) => p.slug !== product.slug && p.brand !== product.brand);
  return [...sameBrand, ...rest].slice(0, limit);
}

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);

export function productsByBrand(brand: BrandId) {
  return PRODUCTS.filter((p) => p.brand === brand);
}

/**
 * Ingredient and allergen text transcribed verbatim from the back of a
 * 400 g Bapu Best Bites pack. Shown once, on the product page, so the site
 * never has to paraphrase a food claim.
 */
export const PACK_LABEL = {
  ingredients:
    'Gram flour, edible vegetable oil (soyabean, cotton seed, palmolein), rice flakes, peanut, chickpeas, lentils, red lentil, yellow peas lentils, spices & condiments (red chilli powder, clove powder, cumin powder, asafoetida (hing), black pepper powder, dry mango powder), iodized salt, black salt, sugar, acidity regulator (INS 330).',
  allergens:
    'Contains peanuts and soy. Manufactured in a facility that also processes nuts, seeds & gluten.',
  storage:
    'Store in a clean, cool and dry place. Keep away from moisture, pests, direct sunlight and dust.',
  note: 'Transcribed from a 400 g Bapu Best Bites pack. Ingredients vary by variant — always read the pack you receive.',
} as const;

/** Shown as a strip under every product. All four are evidenced on-pack. */
export const PRODUCT_FEATURES = [
  {
    title: 'Made in Gwalior',
    body: 'Fried and packed at Phalka Bazar, Lashkar — the address on the back of the pack.',
    icon: 'fort',
  },
  {
    title: '100% vegetarian',
    body: 'The green mark sits on the front of every pack we make.',
    icon: 'veg',
  },
  {
    title: 'Certified kitchen',
    body: 'An ISO 22000:2018 certified facility, under FSSAI licence 11419570000105.',
    icon: 'shield',
  },
  {
    title: 'Resealable 400 g pouch',
    body: 'Cut along the top, press it shut, and the last handful still snaps.',
    icon: 'pouch',
  },
] as const;
