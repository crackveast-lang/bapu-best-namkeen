import type { ImageKey } from './image-meta';
import type { BrandId } from './products';

/**
 * The motion layer a process card plays over its photograph — see the
 * `process-*` keyframes in globals.css. Named for what the stage does, not for
 * what the animation is, so the card and the copy cannot drift apart.
 */
export type ProcessMotion = 'settle' | 'sizzle' | 'fall' | 'scan' | 'seal';

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
  brands: [
    {
      id: 'bapu-best',
      label: 'Best Namkeen',
      packName: 'Bapu Best — Namkeen & Bakery',
      descriptor: 'Traditional namkeen • Classic favourites',
      body: 'The everyday pack Gwalior grew up on. Classic sevs and mixtures, made the way they have always been made, for the people who already know exactly what they are reaching for.',
      since: '1960',
      href: '/brands#bapu-best',
      image: 'brand-bapu-best',
      imageAlt:
        'A Bapu Best Namkeen & Bakery pack photographed from above with a glass bowl of the mixture on it',
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
      image: 'g-indori-b',
      imageAlt:
        'A pack of Bapu Best Bites Indori Khatta Meetha standing beside a glass bowl of the mixture',
      tone: 'modern',
    },
  ] satisfies HouseBrand[],
  image: 'story-house' as ImageKey,
  imageAlt: 'A bowl of sev mixture with peanuts on a dark wooden table, beside squares of Indian sweets',
} as const;

/**
 * The legacy story — supplied by the business, printed as written.
 *
 * This is the first piece of real founding narrative anyone has given us, and
 * it settles two things the rest of this file had marked as gaps: the founder's
 * name (Shri Seth Sunny Lal Bedar) and what he started in 1960. TIMELINE and
 * STORY_INTRO below now draw on it rather than showing a placeholder.
 *
 * It is broken into beats rather than kept as paragraphs because the section
 * built on it (LegacySection) reveals it a line at a time as you scroll — the
 * copy is written in short declarative lines and it reads far better delivered
 * that way than set as a wall of prose. The wording is the business's own; only
 * the line breaks are ours.
 */
export const LEGACY = {
  eyebrow: 'A legacy of taste',
  title: 'Six decades.\nOne timeless taste.',
  /** Three lines, each landing a beat after the last. The third is the point. */
  opening: ['Some tastes are enjoyed.', 'Some become memories.', 'And some become a legacy.'],
  founder: {
    year: 1960,
    name: 'Shri Seth Sunny Lal Bedar',
    lead: 'began a journey with a simple belief —',
    belief: 'when quality is uncompromised, taste becomes timeless.',
    body: 'What started more than six decades ago has grown into a name trusted by generations.',
    image: 'shop-front' as ImageKey,
    imageAlt: 'The Bapu Best shopfront in Gwalior at night, the name lit above the door',
  },
  constant:
    'Through the years, while times changed and generations evolved, one thing remained constant — our commitment to quality, freshness, and that unmistakable taste.',
  /** The three-beat refrain. `lead` is the anaphora, `line` completes it. */
  every: [
    { lead: 'Every ingredient', line: 'is carefully chosen.' },
    { lead: 'Every recipe', line: 'is prepared with care.' },
    { lead: 'Every bite', line: 'carries the same dedication that started it all in 1960.' },
  ],
  everyImage: 'story-spice' as ImageKey,
  everyImageAlt: 'Ground chilli, turmeric and cumin in steel bowls on a dark cloth',
  shared: {
    lead: 'Because for us, namkeen is not simply something you eat.',
    parts: [
      'A part of celebrations.',
      'A part of conversations.',
      'A part of countless memories shared with family and friends.',
    ],
    image: 'story-table' as ImageKey,
    imageAlt: 'A shared tray of fried Indian snacks and sev mixture with glasses of tea',
  },
  feeling: {
    setup: 'And perhaps, that is why our customers don’t just come back for the taste.',
    punch: 'They come back for the feeling.',
    tag: 'Quality you can trust. Taste you remember.',
  },
  today:
    'And today, from our stores across Gwalior, we continue to carry forward the vision with which Shri Seth Sunny Lal Bedar began this journey more than six decades ago.',
  preserve: {
    lead: 'Because while the world around us continues to change, some things are worth preserving.',
    three: ['The taste.', 'The tradition.', 'The trust.'],
    image: 'detail-waffer-pour' as ImageKey,
    imageAlt: 'Waffer Mix being poured from the pack into a glass bowl',
  },
  sign: {
    brand: 'Best Namkeen',
    since: 'Since 1960',
    line: 'A legacy of taste. A tradition of trust.',
  },
} as const;

/**
 * The dated timeline.
 *
 * 1960 is now confirmed twice over — it is on the sunburst mark of the Bapu
 * Best pack, and LEGACY above names who started it. The 1990 date comes off the
 * Best Bites mark the same way. Every entry between them is still a placeholder,
 * and stays one until the family fills it in.
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
    body: 'Shri Seth Sunny Lal Bedar began a journey with a simple belief — when quality is uncompromised, taste becomes timeless. The year is on the sunburst mark of every Bapu Best pack.',
    confirmed: true,
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
  body: 'It began in 1960 with Shri Seth Sunny Lal Bedar and one belief — that when quality is uncompromised, taste becomes timeless. Six decades on, times have changed and generations have turned over, and that is still the only thing we have refused to change.',
  image: 'store-counter' as ImageKey,
};

/**
 * How the namkeen is made.
 *
 * Each stage now carries a PHOTOGRAPH, and the rule that used to keep them
 * illustrated still applies to what those photographs are allowed to be. Not
 * one of them shows this kitchen, this pack or these people: they show the
 * craft — a scoop of pulses, a kadai, chilli on a spoon, a food hall, a plain
 * pouch under a sealing machine — and the section says so underneath in plain
 * words. A stock photograph captioned as our production line would be a
 * manufacturing claim nobody can evidence; a picture of chilli on a spoon
 * beside the sentence "chilli, cumin, clove" is an illustration.
 *
 * The copy is held to the same standard: only the certified facility and the
 * sealed pack are asserted. `confirmed: false` marks a stage whose detail is
 * still with the family — its copy reads as a plausible account of how sev is
 * made anywhere, not as a description of this kadhai, and it is listed in
 * CONTENT-TODO for replacement.
 */
export const PROCESS = [
  {
    step: '01',
    title: 'Ingredients',
    body: 'Gram flour, rice flakes, peanuts and lentils — the base of every mixture we make.',
    image: 'process-ingredients' as ImageKey,
    imageAlt: 'Pulses, grains and flour in dark bowls on a stone surface, with a wooden scoop',
    /** Drives the card's motion layer. See ProcessSection. */
    motion: 'settle' as ProcessMotion,
    confirmed: true,
  },
  {
    step: '02',
    title: 'Preparation',
    body: 'The flour is worked into a batter loose enough to press, then pushed through the jhara straight into hot oil — a batch at a time, so every strand goes in at the same heat and comes out with the same snap.',
    image: 'process-preparation' as ImageKey,
    imageAlt: 'Golden fritters frying in oil in a deep black kadai',
    motion: 'sizzle' as ProcessMotion,
    confirmed: false,
  },
  {
    step: '03',
    title: 'Seasoning',
    body: 'Chilli, cumin, clove, black pepper, dry mango and hing — the masala list printed on the back of the pack.',
    image: 'process-seasoning' as ImageKey,
    imageAlt: 'Ground red chilli spilling from a metal spoon onto dark slate, beside dried chillies',
    motion: 'fall' as ProcessMotion,
    confirmed: true,
  },
  {
    step: '04',
    title: 'Quality check',
    body: 'Made in an ISO 22000:2018 certified facility, under FSSAI licence 11419570000105.',
    image: 'process-quality' as ImageKey,
    imageAlt: 'A worker in whites and a hairnet at a stainless steel bench in a food production hall',
    motion: 'scan' as ProcessMotion,
    confirmed: true,
  },
  {
    step: '05',
    title: 'Packing',
    body: 'Sealed into a resealable 400 g pack, marked 100% vegetarian, ready to travel.',
    image: 'process-packing' as ImageKey,
    imageAlt: 'A plain foil pouch passing under an industrial heat sealer',
    motion: 'seal' as ProcessMotion,
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
