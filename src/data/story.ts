import type { ImageKey } from './image-meta';
import type { BrandId } from './products';
import type { ProcessSceneKey } from '@/components/art/ProcessScenes';

/**
 * The house story — one parent identity above the two brands.
 *
 * This exists to answer the one question a visitor asks within five seconds of
 * seeing two names on a namkeen site: *why are there two?* The section built on
 * it (HouseSection) states the parent first, then forks it, then gives each
 * brand a visual identity of its own so they read as sisters rather than as
 * strangers sharing a shelf.
 *
 * A NOTE ON "BEST FOODS": unlike everything in site.ts, this house name is not
 * printed on any pack — it is a brand-architecture decision, supplied by the
 * business, not a fact taken off the packaging. The legal entity underneath it
 * is still M/s Sunnulal Amit Kumar and Sons (see LEGAL), and that is what the
 * section prints beneath the house name.
 *
 * `label` is how each brand is spoken about in this story; `packName` is what
 * is actually printed on the bag. Both are shown, so the story never quietly
 * renames the product.
 */
export type HouseBrand = {
  id: BrandId;
  label: string;
  packName: string;
  /** The one line that says what this brand is for. */
  descriptor: string;
  body: string;
  since: string;
  href: string;
  image: ImageKey;
  imageAlt: string;
  /** Drives the panel's whole visual treatment. See HouseSection. */
  tone: 'heritage' | 'modern';
};

export const HOUSE = {
  eyebrow: 'One house',
  name: 'Best Foods',
  tagline: 'Bringing you timeless taste, in more than one name.',
  /**
   * The sentence that does the actual work. Kept short and kept together —
   * it is the answer to "why two brands?", and it must be readable in one
   * glance or it may as well not be there.
   */
  explainer:
    'Best Namkeen and Best Bites are two expressions of the same passion for quality, freshness and delicious Indian snacks.',
  bridge: {
    eyebrow: 'One kitchen',
    heading: 'Same hands. Same masala. Same city.',
    body: 'Both names are fried, seasoned and sealed in the same Gwalior kitchen, from the same spice list. What changes is the pack — and how far it is built to travel.',
    image: 'story-spice' as ImageKey,
    imageAlt: 'Ground chilli, turmeric and cumin in steel bowls on a dark cloth',
  },
  close: {
    heading: 'A taste that has been loved for generations.',
    standfirst: 'Two names. One commitment to great taste.',
    image: 'story-table' as ImageKey,
    imageAlt: 'A shared tray of fried Indian snacks and sev mixture with glasses of tea',
  },
  brands: [
    {
      id: 'bapu-best',
      label: 'Best Namkeen',
      packName: 'Bapu Best — Namkeen & Bakery',
      descriptor: 'Traditional namkeen • Classic favourites',
      body: 'The everyday pack Gwalior grew up on. Classic sevs and mixtures, made the way they have always been made, for the people who already know exactly what they are reaching for.',
      since: '1960',
      href: '/brands#bapu-best',
      image: 'story-heritage',
      imageAlt:
        'A cane basket of freshly fried sev mixture with peanuts and curry leaves, beside two glasses of tea',
      tone: 'heritage',
    },
    {
      id: 'best-bites',
      label: 'Best Bites',
      packName: 'Bapu Best Bites — Namkeen',
      descriptor: 'Snacks & everyday favourites',
      body: 'The same kitchen, in a resealable 400 g pack built to travel. Made for the shelf, the desk drawer and the suitcase — anywhere Gwalior is a long way away.',
      since: '1990',
      href: '/brands#best-bites',
      image: 'story-modern',
      imageAlt: 'Crisp golden sev served on a white plate against a bright yellow backdrop',
      tone: 'modern',
    },
  ] satisfies HouseBrand[],
  image: 'story-house' as ImageKey,
  imageAlt: 'A bowl of sev mixture with peanuts on a dark wooden table, beside squares of Indian sweets',
} as const;

/**
 * The founding story has not been supplied. Rather than invent one, every
 * narrative field below is a placeholder; the two dates are the only facts
 * here, and both come off the packaging (the sunburst marks read "Since 1960"
 * on Bapu Best and "Since 1990" on Best Bites).
 */

export type Milestone = {
  year: string;
  title: string;
  body: string;
  /** false where the copy is still a placeholder awaiting the business. */
  confirmed: boolean;
  image?: ImageKey;
};

export const TIMELINE: Milestone[] = [
  {
    year: '1960',
    title: 'The beginning',
    body: '[ADD FOUNDING STORY — who started it, where in Gwalior, and what was made first. The year 1960 is taken from the sunburst mark on the Bapu Best pack.]',
    confirmed: false,
  },
  {
    year: '[ADD YEAR]',
    title: 'Our first shop',
    body: '[ADD THE STORY OF THE FIRST COUNTER — the Phalka Bazar address is on every pack, but we do not know when it opened.]',
    confirmed: false,
    image: 'store-counter',
  },
  {
    year: '[ADD YEAR]',
    title: 'Growing across Gwalior',
    body: '[ADD HOW AND WHEN THE OTHER OUTLETS OPENED.]',
    confirmed: false,
    image: 'store-mithai',
  },
  {
    year: '1990',
    title: 'Bapu Best Bites',
    body: '[ADD WHY THE SECOND BRAND WAS CREATED. The year 1990 is taken from the sunburst mark on the Best Bites pack.]',
    confirmed: false,
    image: 'brand-best-bites',
  },
  {
    year: '[ADD YEAR]',
    title: 'An ISO 22000:2018 kitchen',
    body: '[ADD WHEN THE FACILITY WAS CERTIFIED. The certification itself is printed on every Best Bites pack.]',
    confirmed: false,
  },
  {
    year: '[ADD YEAR]',
    title: "Gwalior's taste, delivered",
    body: '[ADD WHEN THE BRAND STARTED SELLING ONLINE.]',
    confirmed: false,
    image: 'detail-waffer-pour',
  },
];

export const STORY_INTRO = {
  eyebrow: 'Our story',
  heading: 'It started in Gwalior.',
  standfirst:
    'Every namkeen we sell is still made in the same city it started in — Phalka Bazar, Lashkar, Gwalior.',
  body: '[ADD REAL FOUNDING STORY HERE — the family, the first kadhai, the recipe that started it, and what has stayed the same since. Two or three short paragraphs is plenty.]',
  image: 'store-counter' as ImageKey,
};

/**
 * How the namkeen is made.
 *
 * Each stage is an ORIGINAL ILLUSTRATION, not a photograph — see
 * components/art/ProcessScenes.tsx for why. There are no pictures of the
 * production kitchen in the brand's asset library, and a stock photo of another
 * factory captioned "our kitchen" would be a manufacturing claim we cannot
 * evidence. The copy is held to the same standard: only the certified facility
 * and the sealed pack are asserted, and the one genuinely unknown step is
 * marked rather than guessed.
 */
export const PROCESS = [
  {
    step: '01',
    title: 'Ingredients',
    body: 'Gram flour, rice flakes, peanuts and lentils — the base of every mixture we make.',
    scene: 'ingredients' as ProcessSceneKey,
    confirmed: true,
  },
  {
    step: '02',
    title: 'Preparation',
    body: '[ADD HOW THE BATTER IS MIXED AND PRESSED — kadhai size, batch size, anything that makes it yours.]',
    scene: 'preparation' as ProcessSceneKey,
    confirmed: false,
  },
  {
    step: '03',
    title: 'Seasoning',
    body: 'Chilli, cumin, clove, black pepper, dry mango and hing — the masala list printed on the back of the pack.',
    scene: 'seasoning' as ProcessSceneKey,
    confirmed: true,
  },
  {
    step: '04',
    title: 'Quality check',
    body: 'Made in an ISO 22000:2018 certified facility, under FSSAI licence 11419570000105.',
    scene: 'quality' as ProcessSceneKey,
    confirmed: true,
  },
  {
    step: '05',
    title: 'Packing',
    body: 'Sealed into a resealable 400 g pack, marked 100% vegetarian, ready to travel.',
    scene: 'packing' as ProcessSceneKey,
    confirmed: true,
  },
];

/**
 * No customer reviews have been supplied. These are placeholders, and they are
 * rendered as visibly empty slots — the site never shows a fabricated review.
 */
export const TESTIMONIALS = [
  { quote: '[REAL CUSTOMER REVIEW]', author: '[NAME]', location: '[CITY]' },
  { quote: '[REAL CUSTOMER REVIEW]', author: '[NAME]', location: '[CITY]' },
  { quote: '[REAL CUSTOMER REVIEW]', author: '[NAME]', location: '[CITY]' },
];
