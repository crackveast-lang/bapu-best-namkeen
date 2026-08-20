// Maps source photography (from the brand's own asset library) -> web slugs.
// `src` is relative to SOURCE_ROOT in build-assets.mjs, unless the entry names
// its own `root`.
export const SOURCE_ROOT = 'C:/Users/studi/Downloads/Bapu Best All Resources';

/**
 * The one folder of photography that is NOT the brand's own — five licensed
 * frames that dress the house story. Kept in the repository rather than on the
 * photo drive, so the build works on a machine that has never seen the drive.
 * See assets/web/SOURCES.md for the licence and the swap-out instructions.
 */
export const WEB_ROOT = 'assets/web';

/**
 * Brand photography supplied straight into the repository rather than through
 * the photo drive — files handed over one at a time after the drive was last
 * synced. Same pipeline, same output; it just does not live on D:.
 */
export const BRAND_ROOT = 'assets/brand';

/** @type {{out:string, src:string, max:number, quality?:number, root?:string}[]} */
export const IMAGES = [
  // ---- Hero -------------------------------------------------------------
  { out: 'hero-ratlami-sev', src: 'Best Namkeen Product images/Best Bites/Ratlami Sev/Ratlami_sev4.png', max: 1800 },

  // ---- Brand cards ------------------------------------------------------
  { out: 'brand-best-bites', src: 'Best Namkeen Product images/Best Bites/Kadipatta Mix/kadipatta_4.png', max: 1600 },
  { out: 'brand-bapu-best', src: 'Best Namkeen Product images/Best Namkeen/Kattha Meetha/Kattha_meetha5.png', max: 1800 },

  // ---- Products: lifestyle (card face) ----------------------------------
  { out: 'p-ratlami-sev', src: 'Best Namkeen Product images/Best Bites/Ratlami Sev/Ratlami_sev6.png', max: 1200 },
  { out: 'p-sada-sev', src: 'Best Namkeen Product images/Best Bites/Sada Sev/Sada Sev 3.png', max: 1200 },
  { out: 'p-milan-mixture', src: 'Best Namkeen Product images/Best Bites/Milan Mixture/Milan_mixture_2.png', max: 1200 },
  { out: 'p-kadipatta-mix', src: 'Best Namkeen Product images/Best Bites/Kadipatta Mix/kadipatta_1.png', max: 1200 },
  { out: 'p-indori-khatta-meetha', src: 'Best Namkeen Product images/Best Bites/Indori Khatta Meetha/Indori_khatta_meetha_2.png', max: 1200 },
  { out: 'p-lahsun-mix', src: 'Best Namkeen Product images/Best Bites/Lahsun (Mix)/LaungMix5.png', max: 1200 },
  { out: 'p-waffer-mix', src: 'Best Namkeen Product images/Best Bites/Waffer Mix/waffer_mix_5.png', max: 1200 },
  { out: 'p-ujjaini-sev', src: 'Best Namkeen Product images/Best Bites/Ujjaini/UjjainSev6.png', max: 1200 },
  { out: 'p-khatta-meetha', src: 'Best Namkeen Product images/Best Namkeen/Kattha Meetha/Kattha_meetha6.png', max: 1200 },
  { out: 'p-hing-mixture', src: 'Best Namkeen Product images/Best Namkeen/IMG_20260802_050036.jpg', max: 1200 },

  // ---- Products: pack-only studio shots (cut-out feel) -------------------
  { out: 'pack-ratlami-sev', src: 'Best Namkeen Product images/Best Bites/Ratlami Sev/Ratlami_sev.png', max: 1000, whiteBackdrop: true },
  { out: 'pack-sada-sev', src: 'Best Namkeen Product images/Best Bites/Sada Sev/Sada Sev.png', max: 1000, whiteBackdrop: true },
  { out: 'pack-milan-mixture', src: 'Best Namkeen Product images/Best Bites/Milan Mixture/milanMix.png', max: 1000, whiteBackdrop: true },
  { out: 'pack-kadipatta-mix', src: 'Best Namkeen Product images/Best Bites/Kadipatta Mix/kadipatta_2.png', max: 1000, whiteBackdrop: true },
  { out: 'pack-indori-khatta-meetha', src: 'Best Namkeen Product images/Best Bites/Indori Khatta Meetha/Indori_khatta_meetha.png', max: 1000, whiteBackdrop: true },
  { out: 'pack-khatta-meetha', src: 'Best Namkeen Product images/Best Namkeen/Kattha Meetha/Kattha_meetha.png', max: 1000, whiteBackdrop: true },

  // ---- Cut-outs: pack on a real alpha channel ---------------------------
  // For the horizon hero, where packs sit over the WebGL landscape rather than
  // over the page. `mix-blend-mode` cannot reach a backdrop it does not share a
  // stacking context with, so these need the alpha baked in. One per studio
  // pack shot in the library; the products without one are named but not shown.
  { out: 'cut-ratlami-sev', src: 'Best Namkeen Product images/Best Bites/Ratlami Sev/Ratlami_sev.png', max: 1000, cutout: true },
  { out: 'cut-sada-sev', src: 'Best Namkeen Product images/Best Bites/Sada Sev/Sada Sev.png', max: 1000, cutout: true },
  { out: 'cut-milan-mixture', src: 'Best Namkeen Product images/Best Bites/Milan Mixture/milanMix.png', max: 1000, cutout: true },
  { out: 'cut-kadipatta-mix', src: 'Best Namkeen Product images/Best Bites/Kadipatta Mix/kadipatta_2.png', max: 1000, cutout: true },
  { out: 'cut-indori-khatta-meetha', src: 'Best Namkeen Product images/Best Bites/Indori Khatta Meetha/Indori_khatta_meetha.png', max: 1000, cutout: true },
  { out: 'cut-khatta-meetha', src: 'Best Namkeen Product images/Best Namkeen/Kattha Meetha/Kattha_meetha.png', max: 1000, cutout: true },

  // ---- Bapu Best: the rest of the Namkeen & Bakery range -----------------
  // One studio shot each, so each one is built three ways: the sweep for the
  // marquee, the cut-out for the hero, and a framed card face — the product
  // cards crop 4:5 and a bare pack shot would lose the top of the bag.
  { out: 'pack-bapu-ratlami-sev', src: 'Best Namkeen Product images/Best Namkeen/Ratlami sev/Ratlami sev.png', max: 1000, whiteBackdrop: true },
  { out: 'cut-bapu-ratlami-sev', src: 'Best Namkeen Product images/Best Namkeen/Ratlami sev/Ratlami sev.png', max: 1000, cutout: true },
  { out: 'card-bapu-ratlami-sev', src: 'Best Namkeen Product images/Best Namkeen/Ratlami sev/Ratlami sev.png', max: 1000, cutout: true, frame: true },

  { out: 'pack-bapu-lahsun-sev', src: 'Best Namkeen Product images/Best Namkeen/lahsun sev/Lahsun sev.png', max: 1000, whiteBackdrop: true },
  { out: 'cut-bapu-lahsun-sev', src: 'Best Namkeen Product images/Best Namkeen/lahsun sev/Lahsun sev.png', max: 1000, cutout: true },
  { out: 'card-bapu-lahsun-sev', src: 'Best Namkeen Product images/Best Namkeen/lahsun sev/Lahsun sev.png', max: 1000, cutout: true, frame: true },

  { out: 'pack-bapu-wafer-mixture', src: 'Best Namkeen Product images/Best Namkeen/waffer Mixture/waffer Mixture.png', max: 1000, whiteBackdrop: true },
  { out: 'cut-bapu-wafer-mixture', src: 'Best Namkeen Product images/Best Namkeen/waffer Mixture/waffer Mixture.png', max: 1000, cutout: true },
  { out: 'card-bapu-wafer-mixture', src: 'Best Namkeen Product images/Best Namkeen/waffer Mixture/waffer Mixture.png', max: 1000, cutout: true, frame: true },

  // ---- Editorial / story / texture --------------------------------------
  { out: 'detail-bowl-khatta-meetha', src: 'Best Namkeen Product images/Best Namkeen/Kattha Meetha/Kattha_meetha7.png', max: 1600 },
  { out: 'detail-sev-scatter', src: 'Best Namkeen Product images/Best Bites/Sada Sev/Sada Sev 4.png', max: 1600 },
  { out: 'detail-waffer-pour', src: 'Best Namkeen Product images/Best Bites/Waffer Mix/waffer_mix_4.png', max: 1600 },
  { out: 'detail-milan-bowl', src: 'Best Namkeen Product images/Best Bites/Milan Mixture/Milan_mixture_1.png', max: 1600 },
  { out: 'detail-ratlami-flat', src: 'Best Namkeen Product images/Best Bites/Ratlami Sev/Ratlami_sev5.png', max: 1600 },
  { out: 'detail-kadipatta-flat', src: 'Best Namkeen Product images/Best Bites/Kadipatta Mix/kadipatta.png', max: 1600 },

  // ---- Stores (the brand's own shop photographs) -------------------------
  { out: 'store-01', src: 'Store image of best namkeen/WhatsApp Image 2026-07-28 at 1.54.21 PM (1).jpeg', max: 1800 },
  { out: 'store-02', src: 'Store image of best namkeen/WhatsApp Image 2026-07-28 at 1.54.21 PM.jpeg', max: 1800 },
  { out: 'store-03', src: 'Store image of best namkeen/WhatsApp Image 2026-07-28 at 1.54.22 PM.jpeg', max: 1800 },
  { out: 'store-04', src: 'Store image of best namkeen/WhatsApp Image 2026-07-28 at 1.54.20 PM.jpeg', max: 1800 },
  { out: 'store-counter', src: 'Store image of best namkeen/WhatsApp Image 2026-07-28 at 1.54.19 PM (1).jpeg', max: 1800 },
  { out: 'store-sweets', src: 'Store image of best namkeen/WhatsApp Image 2026-07-28 at 1.54.25 PM.jpeg', max: 1800 },
  { out: 'store-mithai', src: 'Store image of best namkeen/WhatsApp Image 2026-07-28 at 1.54.23 PM.jpeg', max: 1800 },
  { out: 'store-shelf', src: 'Store image of best namkeen/WhatsApp Image 2026-07-28 at 1.54.24 PM.jpeg', max: 1800 },

  // ---- Extra gallery frames for the product detail pages ----------------
  { out: 'g-ratlami-b', src: 'Best Namkeen Product images/Best Bites/Ratlami Sev/Ratlami_sev8.png', max: 1200 },
  { out: 'g-sada-b', src: 'Best Namkeen Product images/Best Bites/Sada Sev/Sada Sev 8.png', max: 1200 },
  { out: 'g-milan-b', src: 'Best Namkeen Product images/Best Bites/Milan Mixture/Milan_mixture_3.png', max: 1200 },
  { out: 'g-kadipatta-b', src: 'Best Namkeen Product images/Best Bites/Kadipatta Mix/kadipatta_5.png', max: 1200 },
  { out: 'g-indori-b', src: 'Best Namkeen Product images/Best Bites/Indori Khatta Meetha/Indori_khatta_meetha_1.png', max: 1200 },
  { out: 'g-indori-c', src: 'Best Namkeen Product images/Best Bites/Indori Khatta Meetha/Indori_khatta_meetha_4.png', max: 1200 },
  { out: 'g-waffer-b', src: 'Best Namkeen Product images/Best Bites/Waffer Mix/waffer_mix.png', max: 1200 },
  { out: 'g-waffer-c', src: 'Best Namkeen Product images/Best Bites/Waffer Mix/waffer_mix_3.png', max: 1200 },
  { out: 'g-ujjaini-b', src: 'Best Namkeen Product images/Best Bites/Ujjaini/UjjainSev2.png', max: 1200 },
  { out: 'g-ujjaini-c', src: 'Best Namkeen Product images/Best Bites/Ujjaini/UjjainSev4.png', max: 1200 },
  { out: 'g-ujjaini-d', src: 'Best Namkeen Product images/Best Bites/Ujjaini/UjjainSev8.png', max: 1200 },
  { out: 'g-lahsun-b', src: 'Best Namkeen Product images/Best Bites/Lahsun (Mix)/LaungMix2.png', max: 1200 },
  { out: 'g-lahsun-c', src: 'Best Namkeen Product images/Best Bites/Lahsun (Mix)/LaungMix7.png', max: 1200 },
  { out: 'g-lahsun-d', src: 'Best Namkeen Product images/Best Bites/Lahsun (Mix)/LaungMix3.png', max: 1200 },
  { out: 'g-khatta-b', src: 'Best Namkeen Product images/Best Namkeen/Kattha Meetha/Kattha_meetha9.png', max: 1200 },
  { out: 'g-hing-b', src: 'Best Namkeen Product images/Best Namkeen/IMG_20260802_050107.jpg', max: 1200 },
  { out: 'g-hing-c', src: 'Best Namkeen Product images/Best Namkeen/IMG_20260802_050020.jpg', max: 1200 },

  // The legible back-of-pack label, shown beside the ingredients accordion.
  { out: 'label-back', src: 'Best Namkeen Product images/Best Bites/Waffer Mix/waffer_mix_2.png', max: 1400 },

  // ---- The house story (licensed, NOT the brand's own) ------------------
  // The only images on the site that were not shot for Bapu Best. They dress
  // the "One house, two names" section and are captioned as what they are —
  // a table, a spice tray, a basket of namkeen — never as this kitchen or
  // these packs. Licence and swap-out notes: assets/web/SOURCES.md.
  { out: 'story-house', src: 'story-house.jpg', max: 1800, root: WEB_ROOT },
  { out: 'story-heritage', src: 'story-heritage.jpg', max: 1600, root: WEB_ROOT },
  { out: 'story-modern', src: 'story-modern.jpg', max: 1600, root: WEB_ROOT },
  { out: 'story-spice', src: 'story-spice.jpg', max: 1800, root: WEB_ROOT },
  { out: 'story-table', src: 'story-table.jpg', max: 1600, root: WEB_ROOT },

  // ---- How we make it (licensed, NOT the brand's own) -------------------
  // One frame per stage. Each is a picture of the CRAFT, not a picture of this
  // kitchen — a scoop of pulses, a kadai, chilli on a spoon, a food hall, a
  // sealing machine — and the section says so in as many words underneath.
  // Swap them for photographs of the Phalka Bazar kitchen the day those exist.
  { out: 'process-ingredients', src: 'process-ingredients.jpg', max: 1400, root: WEB_ROOT },
  { out: 'process-preparation', src: 'process-preparation.jpg', max: 1400, root: WEB_ROOT },
  { out: 'process-seasoning', src: 'process-seasoning.jpg', max: 1400, root: WEB_ROOT },
  { out: 'process-quality', src: 'process-quality.jpg', max: 1400, root: WEB_ROOT },
  { out: 'process-packing', src: 'process-packing.jpg', max: 1400, root: WEB_ROOT },

  // ---- Supplied by the business, straight into the repo ------------------
  { out: 'pour-bowl', src: 'pour-bowl.png', max: 1600, root: BRAND_ROOT },
];
