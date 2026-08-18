// Maps source photography (from the brand's own asset library) -> web slugs.
// `src` is relative to SOURCE_ROOT in build-assets.mjs.
export const SOURCE_ROOT = 'C:/Users/studi/Downloads/Bapu Best All Resources';

/** @type {{out:string, src:string, max:number, quality?:number}[]} */
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
];
