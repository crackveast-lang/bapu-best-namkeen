/**
 * Image pipeline for Best Namkeen site.
 * - Cutouts: the owner's prepared transparent assets in "transparent BG" (used directly — no bg removal)
 * - Galleries: every edited image per product folder (Raw Image subfolders excluded)
 * - Lifestyle/brand/store shots: resize + WebP
 */
import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const RES = "C:/Users/studi/Downloads/Bapu Best All Resources";
const SRC = `${RES}/Best Namkeen Product images/Best Bites`;
const TB = `${RES}/transparent BG`;
const OUT = path.resolve("public/products");

/* ---- transparent packet cutouts (source of truth, used as-is) ---- */
const cutouts = [
  { in: `${TB}/Ratlami sev.png`, out: "ratlami-sev.webp" },
  { in: `${TB}/Sada Sev.png`, out: "sada-sev.webp" },
  { in: `${TB}/indoriKhattaMix.png`, out: "indori-khatta.webp" },
  { in: `${TB}/Kadipatta Mix.png`, out: "kadipatta-mix.webp" },
  { in: `${TB}/MilanMix.png`, out: "milan-mixture.webp" },
  { in: `${TB}/Waffer Mix (2).png`, out: "waffer-mix.webp" },
];

/* ---- homepage lifestyle + brand + store shots ---- */
const lifestyle = [
  { in: `${SRC}/Kadipatta Mix/kadipatta.png`, out: "life-kadipatta.webp", w: 1400 },
  { in: `${SRC}/Sada Sev/Sada Sev 6.png`, out: "life-sada-topdown.webp", w: 1400 },
  { in: `${SRC}/Lahsun (Mix)/ujjani.png`, out: "life-red-pouch.webp", w: 1400 },
  { in: `${SRC}/Ujjaini/UjjainSev2.png`, out: "life-ujjaini-flat.webp", w: 1400 },
  { in: `${SRC}/Lahsun (Mix)/LaungMix.png`, out: "life-lahsun-back.webp", w: 1200 },
  { in: `${SRC}/Ratlami Sev/Ratlami_sev6.png`, out: "gal-ratlami-hand.webp", w: 1200 },
  { in: `${SRC}/Milan Mixture/Milan_mixture_4.png`, out: "gal-milan-open.webp", w: 1200 },
  { in: `${SRC}/Indori Khatta Meetha/Indori_khatta_meetha_4.png`, out: "gal-indori-hand.webp", w: 1200 },
  { in: `${SRC}/Waffer Mix/waffer_mix_4.png`, out: "gal-waffer-bowl.webp", w: 1200 },
  { in: `${RES}/Store image of best namkeen/logoOfbrand.png`, out: "../brand/logo.webp", w: 480, alpha: true },
  { in: `${RES}/Best images/unnamed (6).webp`, out: "../stores/store-phalka.webp", w: 1200 },
  { in: `${RES}/Store image of best namkeen/WhatsApp Image 2026-07-28 at 1.54.20 PM.jpeg`, out: "../stores/store-thatipur.webp", w: 1400 },
  { in: `${RES}/Best images/unnamed (3).webp`, out: "../stores/store-gole.webp", w: 1200 },
  { in: `${RES}/Store image of best namkeen/WhatsApp Image 2026-07-28 at 1.54.24 PM.jpeg`, out: "../stores/store-city.webp", w: 1400 },
  { in: `${RES}/Best images/unnamed (2).webp`, out: "../stores/store-heritage.webp", w: 1000 },
  { in: `${RES}/Best images/WhatsApp Image 2026-07-28 at 1.54.21 PM.jpeg`, out: "../stores/store-counter.webp", w: 1400 },
];

/* ---- full product galleries: every edited image per folder, Raw Image excluded ---- */
const galleryFolders = [
  { dir: "Ratlami Sev", slug: "ratlami-sev" },
  { dir: "Sada Sev", slug: "sada-sev" },
  { dir: "Indori Khatta Meetha", slug: "indori-khatta-meetha" },
  { dir: "Kadipatta Mix", slug: "kadipatta-mix" },
  { dir: "Milan Mixture", slug: "milan-mixture" },
  { dir: "Ujjaini", slug: "ujjaini-sev" },
  { dir: "Lahsun (Mix)", slug: "lahsun-mix" },
  { dir: "Waffer Mix", slug: "waffer-mix" },
  { dir: "Waffer (hing Mix)", slug: "waffer-mix" },
];
// "Laung Sev (No upload)" is intentionally excluded (AI-generated packaging).

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(path.join(OUT, "gal"), { recursive: true });

for (const job of cutouts) {
  const dest = path.join(OUT, job.out);
  try {
    await sharp(job.in)
      .trim({ threshold: 20 })
      .resize({ height: 1100, withoutEnlargement: true })
      .webp({ quality: 88, alphaQuality: 90 })
      .toFile(dest);
    console.log(`cutout ${job.out}`);
  } catch (e) {
    console.error(`FAILED ${job.out}:`, e.message);
  }
}

for (const job of lifestyle) {
  const dest = path.join(OUT, job.out);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  try {
    await sharp(job.in)
      .resize({ width: job.w, withoutEnlargement: true })
      .webp({ quality: 78, ...(job.alpha ? { alphaQuality: 90 } : {}) })
      .toFile(dest);
  } catch (e) {
    console.error(`FAILED ${job.out}:`, e.message);
  }
}
console.log("lifestyle done");

const manifest = {};
const counters = {};
for (const gf of galleryFolders) {
  const dirPath = `${SRC}/${gf.dir}`;
  let entries;
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch {
    continue;
  }
  const files = entries
    .filter((e) => e.isFile() && /\.(png|jpe?g)$/i.test(e.name))
    .map((e) => e.name)
    .sort();
  manifest[gf.slug] ??= [];
  counters[gf.slug] ??= 0;
  for (const name of files) {
    counters[gf.slug] += 1;
    const outName = `gal/${gf.slug}-${counters[gf.slug]}.webp`;
    try {
      await sharp(`${dirPath}/${name}`)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(path.join(OUT, outName));
      manifest[gf.slug].push(`/products/${outName}`);
    } catch (e) {
      console.error(`FAILED ${outName} (${name}):`, e.message);
    }
  }
}
console.log("MANIFEST " + JSON.stringify(manifest, null, 1));
console.log("done");
