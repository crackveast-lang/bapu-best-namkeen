/**
 * Converts the brand's raw photography into web-ready WebP plus tiny blur
 * placeholders. Run with `npm run assets` whenever assets.manifest.mjs changes.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { SOURCE_ROOT, IMAGES } from './assets.manifest.mjs';

const OUT_DIR = path.join(process.cwd(), 'public', 'images');
const META_FILE = path.join(process.cwd(), 'src', 'data', 'image-meta.ts');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.dirname(META_FILE), { recursive: true });

const meta = {};
const missing = [];

/**
 * Studio shots sit on a sweep that photographs slightly grey. The hero and the
 * marquee blend these with `mix-blend-mode: multiply`, which only disappears
 * cleanly if the backdrop is actually 255 — so lift the whitepoint just enough
 * to get there, sampled from the corners rather than guessed.
 */
async function whitepointGain(abs) {
  const size = 24;
  const { data, info } = await sharp(abs, { failOn: 'none' })
    .rotate()
    .resize(size, size, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const corners = [];
  const at = (x, y) => {
    const o = (y * info.width + x) * info.channels;
    return Math.max(data[o], data[o + 1], data[o + 2]);
  };
  for (const [x, y] of [
    [0, 0], [size - 1, 0], [0, size - 1], [size - 1, size - 1],
    [1, 1], [size - 2, 1], [1, size - 2], [size - 2, size - 2],
  ]) corners.push(at(x, y));

  corners.sort((a, b) => a - b);
  const median = corners[Math.floor(corners.length / 2)];
  if (!median) return 1;
  // Never push more than 15% — beyond that the backdrop is not white and the
  // image should not have been flagged in the first place.
  return Math.min(1.15, Math.max(1, 255 / median));
}

/**
 * Turns a lifted white sweep into a real alpha channel.
 *
 * Flooding inwards from the border, never keying by colour: the packs carry
 * large white label panels, and a colour key walks straight through them. The
 * silhouette's own edge is always darker than the threshold, so the flood stops
 * at it and the label survives.
 *
 * Background pixels keep an alpha of `255 - min(r,g,b)` over warm ink, which
 * preserves the contact shadow as a soft brown rather than clipping it away —
 * so the pack still sits on something wherever it is placed.
 */
async function cutOut(pipeline, w, h) {
  // 236, not higher: the light end of the contact shadow has to be walkable or
  // the flood cannot reach the pockets of sweep enclosed between the pack and
  // its own shadow, and they survive as white slivers. Not lower either — by
  // about 226 the flood breaks through into the white label panels.
  const THRESHOLD = 236;
  const { data } = await pipeline.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = new Uint8ClampedArray(data);

  const min = (i) => Math.min(px[i], px[i + 1], px[i + 2]);
  const seen = new Uint8Array(w * h);
  const queue = [];
  const push = (x, y) => {
    const p = y * w + x;
    if (seen[p] || min(p * 4) < THRESHOLD) return;
    seen[p] = 1;
    queue.push(p);
  };

  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }

  let head = 0;
  while (head < queue.length) {
    const p = queue[head++];
    const x = p % w;
    const y = (p - x) / w;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }

  for (let p = 0; p < w * h; p++) {
    if (!seen[p]) continue;
    const i = p * 4;
    px[i + 3] = 255 - min(i);
    px[i] = 43;
    px[i + 1] = 26;
    px[i + 2] = 18;
  }

  return sharp(Buffer.from(px), { raw: { width: w, height: h, channels: 4 } });
}

/**
 * A card face for a pack that exists only as a studio shot.
 *
 * The product cards and galleries crop to 4:5 with `object-cover`, which on a
 * bare pack shot would slice the top off the bag. Dropping the cut-out onto the
 * page's own paper at exactly that ratio, with room around it, means the crop
 * has nothing left to take.
 */
const FRAME = { width: 1000, height: 1250, background: { r: 239, g: 228, b: 209, alpha: 1 } };

async function frameCut(cut) {
  // Encoded rather than left raw: the cut-out pipeline starts from raw pixels,
  // and a raw buffer carries no dimensions for the composite to place.
  const { data, info } = await cut
    .clone()
    .resize({
      width: Math.round(FRAME.width * 0.78),
      height: Math.round(FRAME.height * 0.84),
      fit: 'inside',
    })
    .png()
    .toBuffer({ resolveWithObject: true });

  // Flattened back to a real image before it is handed on. sharp resizes its
  // input *before* compositing, so a pipeline still carrying an overlay cannot
  // be resized again — which is exactly what the 16px blur below does.
  const framed = await sharp({
    create: { width: FRAME.width, height: FRAME.height, channels: 4, background: FRAME.background },
  })
    .composite([
      {
        input: data,
        left: Math.round((FRAME.width - info.width) / 2),
        top: Math.round((FRAME.height - info.height) / 2),
      },
    ])
    .png()
    .toBuffer();

  return sharp(framed);
}

for (const { out, src, max, quality = 80, whiteBackdrop = false, cutout = false, frame = false } of IMAGES) {
  const abs = path.join(SOURCE_ROOT, src);
  if (!fs.existsSync(abs)) { missing.push(`${out} <- ${src}`); continue; }

  const pipeline = sharp(abs, { failOn: 'none' }).rotate();
  const { width = max, height = max } = await pipeline.metadata();
  const scale = Math.min(1, max / Math.max(width, height));
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);

  // A cut-out needs the sweep at a true 255 before it can be flooded away.
  const gain = whiteBackdrop || cutout ? await whitepointGain(abs) : 1;
  if (gain > 1.001) process.stdout.write(`  (whitepoint x${gain.toFixed(3)}) `);

  const source = () => {
    let p = sharp(abs, { failOn: 'none' })
      .rotate()
      .resize(w, h, { fit: 'inside', withoutEnlargement: true });
    if (gain > 1.001) p = p.linear(gain, 0);
    return p;
  };

  const cut = cutout ? await cutOut(source(), w, h) : null;
  const base = frame && cut ? await frameCut(cut) : (cut ?? source());
  const outW = frame ? FRAME.width : w;
  const outH = frame ? FRAME.height : h;

  await base.clone().webp({ quality, effort: 6 }).toFile(path.join(OUT_DIR, `${out}.webp`));

  // 16px blur placeholder, inlined as a data URI for instant paint. Taken from
  // the cut version where there is one, so the placeholder is not a white box
  // behind a transparent image.
  const blur = await (cut ? base.clone() : sharp(abs, { failOn: 'none' }).rotate())
    .resize(16, 16, { fit: 'inside' })
    .webp({ quality: 30 })
    .toBuffer();

  meta[out] = {
    src: `/images/${out}.webp`,
    width: outW,
    height: outH,
    blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
  };
  process.stdout.write(`  ${out}.webp  ${outW}x${outH}\n`);
}

if (missing.length) {
  console.warn('\nMISSING SOURCES:\n' + missing.map((m) => '  ! ' + m).join('\n'));
}

const body = `// GENERATED by scripts/build-assets.mjs — do not edit by hand.
export type ImageMeta = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export const IMAGE_META = ${JSON.stringify(meta, null, 2)} as const satisfies Record<string, ImageMeta>;

export type ImageKey = keyof typeof IMAGE_META;

export function img(key: ImageKey): ImageMeta {
  return IMAGE_META[key];
}
`;
fs.writeFileSync(META_FILE, body, 'utf8');
console.log(`\nWrote ${Object.keys(meta).length} images + ${path.relative(process.cwd(), META_FILE)}`);
