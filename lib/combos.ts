import { getProduct, type Product } from "./products";

export type Combo = {
  slug: string;
  name: string;
  kicker: string;
  tagline: string;
  desc: string;
  /** product slugs from lib/products.ts — only real products */
  productSlugs: string[];
  /** optional — leave null until a real listing exists; the CTA renders disabled */
  amazonUrl: string | null;
  flipkartUrl: string | null;
  /** optional display price, e.g. "₹499" — omitted when null */
  price: string | null;
  /** small handwritten note on the composition */
  note?: string;
  accent: string;
  tint: string;
};

export const combos: Combo[] = [
  {
    slug: "bestseller-combo",
    name: "Bestseller Combo",
    kicker: "01 · The crowd favourites",
    tagline: "The three everyone asks for.",
    desc: "Ratlami Sev for the heat, Sada Sev for the classics, Indori Khatta Meetha for the sweet-tang seesaw. Our most-reordered trio.",
    productSlugs: ["ratlami-sev", "sada-sev", "indori-khatta-meetha"],
    amazonUrl: null,
    flipkartUrl: null,
    price: null,
    note: "start here",
    accent: "#23348c",
    tint: "#e4e7f5",
  },
  {
    slug: "family-combo",
    name: "Family Combo",
    kicker: "02 · Built for sharing",
    tagline: "More namkeen. More to share.",
    desc: "Four full packs so nobody has to negotiate — Milan Mixture, Kadipatta Mix, Sada Sev and Ratlami Sev on the same tray.",
    productSlugs: ["milan-mixture", "kadipatta-mix", "sada-sev", "ratlami-sev"],
    amazonUrl: null,
    flipkartUrl: null,
    price: null,
    note: "for the whole table",
    accent: "#4a2c1a",
    tint: "#ece1d6",
  },
  {
    slug: "chai-time-combo",
    name: "Chai-Time Combo",
    kicker: "03 · Four o'clock essentials",
    tagline: "Pour the chai. We'll handle the crunch.",
    desc: "Light, leafy and feather-crisp — Sada Sev, Kadipatta Mix and Waffer Mix, the three that pair best with a hot cup.",
    productSlugs: ["sada-sev", "kadipatta-mix", "waffer-mix"],
    amazonUrl: null,
    flipkartUrl: null,
    price: null,
    note: "chai approved",
    accent: "#2e6b34",
    tint: "#e9f2d8",
  },
];

export function comboProducts(c: Combo): Product[] {
  return c.productSlugs.map((s) => getProduct(s)).filter((p): p is Product => Boolean(p));
}
