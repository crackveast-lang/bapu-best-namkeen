/**
 * Single source of truth for business facts.
 *
 * RULE: everything in this file must be traceable to something the business
 * supplied — packaging artwork, the FSSAI/GST declaration, or store photos.
 * Anything not yet supplied is written as a `[BRACKETED PLACEHOLDER]` so it is
 * obvious on the page and impossible to mistake for a real claim.
 * See CONTENT-TODO.md for the open items.
 */

export const SITE = {
  name: 'Bapu Best Namkeen',
  shortName: 'Bapu Best',
  /**
   * Canonical origin — drives canonical URLs, the sitemap and OG tags.
   * Set NEXT_PUBLIC_SITE_URL per deployment; the fallback is the intended
   * production domain, so pointing DNS at the host is the only step left.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bapubest.com',
  tagline: 'From the heart of Gwalior to your home.',
  description:
    'Bapu Best Namkeen — namkeen made in Gwalior by Sunnulal Amit Kumar and Sons. Traditional recipes, 100% vegetarian, made in an ISO 22000:2018 certified facility. Order on Amazon and Flipkart, or visit our stores in Gwalior.',
} as const;

/** Printed on the packaging of both brands. */
export const LEGAL = {
  entity: 'M/s Sunnulal Amit Kumar and Sons',
  proprietor: 'Amit Gupta',
  addressLine: 'Phalka Bazar, Lashkar',
  city: 'Gwalior',
  state: 'Madhya Pradesh',
  postalCode: '474009',
  country: 'IN',
  /** From the signed FSSAI declaration (valid to 15-06-2029). */
  fssai: '11419570000105',
  gstin: '23AYCPG8271B1ZV',
  iso: 'ISO 22000:2018',
} as const;

export const CONTACT = {
  /** Customer care numbers as printed on the Best Bites pack. */
  phones: ['+91 94253 07800', '+91 94254 79767'],
  /** Printed on-pack as "cacamitnamkeen@gmaii.com" — assumed typo for gmail. */
  email: 'cacamitnamkeen@gmail.com',
  emailNeedsConfirmation: true,
  hours: '[ADD OPENING HOURS]',
} as const;

/**
 * Marketplace storefronts. Replace the `#` values with the live listing URLs —
 * every Buy button on the site reads from here.
 */
export const MARKETPLACES = {
  amazon: {
    label: 'Amazon',
    href: '#', // [ADD AMAZON STOREFRONT URL]
    ready: false,
  },
  flipkart: {
    label: 'Flipkart',
    href: '#', // [ADD FLIPKART STOREFRONT URL]
    ready: false,
  },
} as const;

export const SOCIAL = {
  instagram: '', // [ADD INSTAGRAM URL]
  facebook: '', // [ADD FACEBOOK URL]
  youtube: '',
} as const;

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Our Brands', href: '/brands' },
  { label: 'Namkeen', href: '/namkeen' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Our Stores', href: '/stores' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * Claims we are allowed to make, each with the evidence behind it.
 * Nothing goes on a page unless it appears here.
 */
export const VERIFIED_CLAIMS = {
  since1960: {
    text: 'Since 1960',
    source: 'Printed on the Bapu Best (Namkeen & Bakery) pack sunburst mark.',
  },
  iso: {
    text: 'ISO 22000:2018 certified company',
    source: 'Printed on every Bapu Best Bites pack.',
  },
  veg: {
    text: '100% vegetarian',
    source: 'Green FSSAI vegetarian mark on all packs.',
  },
  madeInGwalior: {
    text: 'Made in Gwalior',
    source: 'Manufacturing address on-pack: Phalka Bazar, Lashkar, Gwalior.',
  },
  fssai: {
    text: `FSSAI Lic. No. ${LEGAL.fssai}`,
    source: 'FSSAI declaration filed 31-07-2026; also printed on-pack.',
  },
} as const;
