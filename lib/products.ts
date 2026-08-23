export type Product = {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  /** longer copy for the product page */
  longDesc: string;
  /** texture / taste copy for "The Crunch" section */
  crunch: string;
  flavor: string;
  weight: string;
  img: string;
  /** true when img is a photograph rather than a transparent cutout */
  photo?: boolean;
  /** product-page gallery (first entry is the lead image) */
  gallery: string[];
  highlights: string[];
  /** only verified, on-pack information */
  ingredientsNote: string;
  perfectFor: string[];
  /** small handwritten note shown on the card (optional) */
  note?: string;
  pouch: string; // pouch color
  tint: string; // soft card background tint
  featured?: boolean;
};

/**
 * Purchase destinations — CTA hierarchy: Amazon & Flipkart primary, Zomato secondary.
 * Amazon/Flipkart currently open the brand's storefront search; swap in the
 * exact product/storefront listing URLs when available.
 */
export const AMAZON_URL = "https://www.amazon.in/s?k=best+namkeen+gwalior";
export const FLIPKART_URL = "https://www.flipkart.com/search?q=best%20namkeen%20gwalior";
export const ZOMATO_URL = "https://link.zomato.com/xqzv/rshare?id=237243839b9b947b";
export const INSTAGRAM_URL = "https://www.instagram.com/bestnamkeen/";

const MIX_INGREDIENTS =
  "Gram flour (besan), edible vegetable oil, rice flakes, peanuts, chickpea & lentil dals, whole spices & condiments — red chilli, clove, black pepper, hing, dry mango — iodized salt and black salt. Full list on every pack.";
const SEV_INGREDIENTS =
  "Gram flour (besan), edible vegetable oil and whole spices, slow-fried in small batches. Full list on every pack.";

const CARE = [
  "400g resealable zip-lock pouch",
  "100% vegetarian",
  "No added preservatives",
  "Made in an ISO 22000:2018 certified kitchen",
];

/** Curated gallery picks (indexes into public/products/gal/<slug>-N.webp) */
function pick(slug: string, indexes: number[]) {
  return indexes.map((i) => `/products/gal/${slug}-${i}.webp`);
}

export const products: Product[] = [
  {
    slug: "ratlami-sev",
    name: "Ratlami Sev",
    tagline: "Bold. Spicy. Addictive.",
    desc: "Thick-cut besan sev with the classic Ratlam-style hit of cloves and black pepper.",
    longDesc:
      "The pride of the shelf. Thick strands of pure besan carry the legendary Ratlam masala — cloves, black pepper and a slow-building heat that keeps your hand going back to the bowl.",
    crunch:
      "Thick, rugged strands that snap loud and finish warm. The spice arrives a second after the crunch — that's the Ratlami way.",
    flavor: "Fiery masala",
    weight: "400g",
    img: "/products/ratlami-sev.webp",
    gallery: ["/products/ratlami-sev.webp", ...pick("ratlami-sev", [2, 3, 6, 7, 8])],
    highlights: CARE,
    ingredientsNote: SEV_INGREDIENTS,
    perfectFor: ["Chai time", "Poha topping", "Spice lovers", "Everyday snacking"],
    note: "our favourite ↓",
    pouch: "#23348c",
    tint: "#e4e7f5",
    featured: true,
  },
  {
    slug: "sada-sev",
    name: "Sada Sev",
    tagline: "Simple. Crispy. Classic.",
    desc: "Fine golden strands of pure besan, fried gently and salted just right.",
    longDesc:
      "The quiet classic. Fine golden strands of besan, gently fried and salted just right — the sev that goes with everything and disappears first at every gathering.",
    crunch:
      "Feather-fine strands with a delicate, clean crunch. Mild, buttery besan flavour that plays well with chaat, poha, or a plain afternoon.",
    flavor: "Lightly salted",
    weight: "400g",
    img: "/products/sada-sev.webp",
    gallery: ["/products/sada-sev.webp", ...pick("sada-sev", [6, 1, 4, 9, 3])],
    highlights: CARE,
    ingredientsNote: SEV_INGREDIENTS,
    perfectFor: ["Chaat & bhel", "Chai time", "Kids' tiffin", "Everyday snacking"],
    pouch: "#ef9a10",
    tint: "#faeacc",
    featured: true,
  },
  {
    slug: "kadipatta-mix",
    name: "Kadipatta Mix",
    tagline: "Curry-leaf crunch.",
    desc: "A garden-fresh mix tempered with crackling curry leaves and green chilli.",
    longDesc:
      "A garden-fresh namkeen tempered the South-meets-Central way — crackling curry leaves, green chilli and roasted dals folded through a light, crispy mix.",
    crunch:
      "Light and leafy — every handful crackles with fried kadipatta and the gentle bite of green chilli. Herby first, spicy after.",
    flavor: "Herby & spicy",
    weight: "400g",
    img: "/products/kadipatta-mix.webp",
    gallery: ["/products/kadipatta-mix.webp", ...pick("kadipatta-mix", [7, 1, 2, 4, 6])],
    highlights: CARE,
    ingredientsNote: MIX_INGREDIENTS,
    perfectFor: ["Chai time", "Evening cravings", "Herb lovers", "Road trips"],
    note: "chai approved",
    pouch: "#76b82a",
    tint: "#e9f2d8",
    featured: true,
  },
  {
    slug: "indori-khatta-meetha",
    name: "Indori Khatta Meetha",
    tagline: "Sweet meets tang.",
    desc: "Indore's favourite seesaw of sweet, sour and spice — with peanuts in every handful.",
    longDesc:
      "Indore's most loved mood swing — a seesaw of sweet, sour and gently spiced, with peanuts and green peas hiding in every handful. The pack the whole family fights over.",
    crunch:
      "Soft flakes, crunchy dals and the occasional peanut jackpot. Sweet on the tongue, tangy at the finish.",
    flavor: "Sweet & tangy",
    weight: "400g",
    img: "/products/indori-khatta.webp",
    gallery: ["/products/indori-khatta.webp", ...pick("indori-khatta-meetha", [3, 5, 2, 7, 4])],
    highlights: CARE,
    ingredientsNote: MIX_INGREDIENTS,
    perfectFor: ["Family gatherings", "Kids' favourite", "Chai time", "Festivals"],
    pouch: "#29b6c5",
    tint: "#dcf1f3",
    featured: true,
  },
  {
    slug: "milan-mixture",
    name: "Milan Mixture",
    tagline: "Everything, together.",
    desc: "Flakes, sev, dals and nuts — the family-pack mixture every tea tray asks for.",
    longDesc:
      "The name says it — a milan (meeting) of everything good. Corn flakes, sev, fried dals and nuts tossed in a balanced masala. The tea-tray essential.",
    crunch:
      "Every handful is different — flake, strand, dal, nut. A rolling, layered crunch with a warm masala finish.",
    flavor: "Classic mixture",
    weight: "400g",
    img: "/products/milan-mixture.webp",
    gallery: ["/products/milan-mixture.webp", ...pick("milan-mixture", [6, 1, 4, 3, 7])],
    highlights: CARE,
    ingredientsNote: MIX_INGREDIENTS,
    perfectFor: ["Guests & gatherings", "Chai time", "Celebrations", "Everyday snacking"],
    pouch: "#4a2c1a",
    tint: "#ece1d6",
    featured: true,
  },
  {
    slug: "ujjaini-sev",
    name: "Ujjaini Sev",
    tagline: "Old-school heat.",
    desc: "The original red-pack sev — rustic, peppery and made the way it always was.",
    longDesc:
      "The original red pack. Rustic, peppery sev made to the old Ujjain-style recipe — no reinvention, no shortcuts, just the taste regulars have trusted for decades.",
    crunch:
      "Coarse, honest strands with a peppery kick that builds slowly. The old-timers' choice for a reason.",
    flavor: "Peppery",
    weight: "400g",
    img: "/products/gal/ujjaini-sev-3.webp",
    photo: true,
    gallery: pick("ujjaini-sev", [3, 8, 1, 5, 7]),
    highlights: CARE,
    ingredientsNote: MIX_INGREDIENTS,
    perfectFor: ["Spice lovers", "Chai time", "Poha topping", "Old-school snackers"],
    pouch: "#c21823",
    tint: "#f6dcd8",
    featured: true,
  },
  {
    slug: "lahsun-mix",
    name: "Lahsun Mix",
    tagline: "Garlic, unapologetically.",
    desc: "A punchy garlic-forward mix for those who like their namkeen loud.",
    longDesc:
      "For those who believe garlic is a personality trait. A punchy, savoury mix where lahsun leads and a blend of dals, flakes and spices follows close behind.",
    crunch:
      "Bold and savoury — the garlic hits first, the crunch carries it. Not for the faint-hearted, beloved by everyone else.",
    flavor: "Garlic & spice",
    weight: "400g",
    img: "/products/gal/lahsun-mix-8.webp",
    photo: true,
    gallery: pick("lahsun-mix", [8, 6, 9, 2, 4, 3]),
    highlights: CARE,
    ingredientsNote: MIX_INGREDIENTS,
    perfectFor: ["Garlic lovers", "Evening chai", "Drinks-side snack", "Road trips"],
    pouch: "#c21823",
    tint: "#f6dcd8",
  },
  {
    slug: "waffer-mix",
    name: "Waffer Mix",
    tagline: "Feather-light. Full flavour.",
    desc: "Crisp potato wafers tossed with sev, peanuts and a gentle hing masala.",
    longDesc:
      "The lightest pack on the shelf. Crisp wafers tossed with sev, peanuts and a gentle hing-laced masala — big flavour that somehow weighs nothing.",
    crunch:
      "Shatter-light wafers against soft masala dust — the kind of crunch you hear across the room and finish before the chai cools.",
    flavor: "Hing masala",
    weight: "400g",
    img: "/products/waffer-mix.webp",
    gallery: ["/products/waffer-mix.webp", ...pick("waffer-mix", [6, 2, 5, 4, 3])],
    highlights: CARE,
    ingredientsNote: MIX_INGREDIENTS,
    perfectFor: ["Movie nights", "Chai time", "Light snacking", "Kids' favourite"],
    pouch: "#c21823",
    tint: "#f6dcd8",
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, count = 3) {
  const rest = products.filter((p) => p.slug !== slug);
  return rest.slice(0, count);
}
