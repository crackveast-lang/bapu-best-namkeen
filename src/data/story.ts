import type { ImageKey } from './image-meta';
import type { ProcessSceneKey } from '@/components/art/ProcessScenes';

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
