/**
 * Derives small square "mark" versions of the marketplace logos from the
 * official SVGs already in public/brand/ — Amazon's smile-arrow and Flipkart's
 * bag — so the Buy buttons carry the real artwork instead of a redrawing.
 *
 * Nothing is redrawn. Each mark is the official file with its viewBox cropped
 * to the mark's own bounding box, found by rasterising and measuring the brand
 * colour rather than by guessing coordinates.
 *
 * Run with `npm run marks`.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'public', 'brand');

/** Bounding box (in 0..1 of the raster) of pixels matching `test`. */
async function measure(svg, test) {
  const RES = 900;
  const { data, info } = await sharp(Buffer.from(svg), { density: 400 })
    .resize({ width: RES, fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const o = (y * info.width + x) * info.channels;
      const a = info.channels === 4 ? data[o + 3] : 255;
      if (a < 40) continue;
      if (!test(data[o], data[o + 1], data[o + 2])) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0) throw new Error('no matching pixels');
  return {
    x0: minX / info.width,
    y0: minY / info.height,
    x1: (maxX + 1) / info.width,
    y1: (maxY + 1) / info.height,
  };
}

function parseViewBox(svg) {
  const m = svg.match(/viewBox="([^"]+)"/);
  if (m) {
    const [x, y, w, h] = m[1].trim().split(/[\s,]+/).map(Number);
    return { x, y, w, h };
  }
  // Amazon's file declares no viewBox — its width/height are the user space.
  const w = Number(svg.match(/\swidth="([\d.]+)"/)?.[1]);
  const h = Number(svg.match(/\sheight="([\d.]+)"/)?.[1]);
  if (!w || !h) throw new Error('no viewBox and no usable width/height');
  return { x: 0, y: 0, w, h };
}

/** Re-window an SVG onto a sub-rectangle of itself, padded and squared off. */
function crop(svg, box, pad = 0.1) {
  const vb = parseViewBox(svg);
  let x = vb.x + box.x0 * vb.w;
  let y = vb.y + box.y0 * vb.h;
  let w = (box.x1 - box.x0) * vb.w;
  let h = (box.y1 - box.y0) * vb.h;

  const p = Math.max(w, h) * pad;
  x -= p; y -= p; w += p * 2; h += p * 2;

  // square it so the mark sits centred in a 1:1 icon slot
  const side = Math.max(w, h);
  x -= (side - w) / 2;
  y -= (side - h) / 2;

  const rounded = [x, y, side, side].map((n) => Number(n.toFixed(4))).join(' ');
  const stripped = svg.replace(/\s(width|height)="[^"]*"/g, '');
  return /viewBox="/.test(stripped)
    ? stripped.replace(/viewBox="[^"]+"/, `viewBox="${rounded}"`)
    : stripped.replace(/<svg\b/, `<svg viewBox="${rounded}"`);
}

// ---- Amazon: keep only the orange smile paths -----------------------------
{
  const src = fs.readFileSync(path.join(DIR, 'Amazon_logo.svg'), 'utf8');
  // The wordmark inherits the root fill; the smile carries an explicit orange.
  const orangePaths = [...src.matchAll(/<path\b[^>]*>/g)]
    .map((m) => m[0])
    .filter((tag) => /ff9900/i.test(tag));
  if (!orangePaths.length) throw new Error('Amazon: no orange paths found');

  const vb = parseViewBox(src);
  const smileOnly = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}">${orangePaths.join('')}</svg>`;

  const box = await measure(smileOnly, (r, g, b) => r > 200 && g > 110 && g < 190 && b < 90);
  fs.writeFileSync(path.join(DIR, 'amazon-mark.svg'), crop(smileOnly, box, 0.08), 'utf8');
  console.log('amazon-mark.svg', JSON.stringify(box));
}

// ---- Flipkart: the yellow bag, dropped out of the full lockup -------------
{
  const src = fs.readFileSync(path.join(DIR, 'Flipkart_logo.svg'), 'utf8');
  // The bag is the only yellow element; the wordmark is blue.
  const box = await measure(src, (r, g, b) => r > 200 && g > 160 && b < 120);
  fs.writeFileSync(path.join(DIR, 'flipkart-mark.svg'), crop(src, box, 0.06), 'utf8');
  console.log('flipkart-mark.svg', JSON.stringify(box));
}

// ---- Small rasters for the buttons ---------------------------------------
// Flipkart's official file is ~135 KB of traced clip paths — far too heavy for
// an 18px button icon. Both marks ship as 128px WebP instead, which is a few
// hundred bytes each and still 4x the largest size they are drawn at.
for (const name of ['amazon-mark', 'flipkart-mark']) {
  const out = path.join(DIR, `${name}.webp`);
  await sharp(path.join(DIR, `${name}.svg`), { density: 700 })
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(out);
  console.log(`${name}.webp`, fs.statSync(out).size, 'bytes');
}

console.log('\nMarks written to public/brand/');
