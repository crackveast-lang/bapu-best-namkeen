/**
 * One-off: turn the supplied Best Bites logo screenshot into a usable mark.
 *
 * `public/brand/bestbitelogo.png` is a screen capture of the artwork, which
 * means it arrives with three problems: a line of certification text above the
 * badge, an operating-system mouse cursor sitting on the "B", and a flat white
 * background that would print as a white box on the warm page.
 *
 * This script fixes all three and writes `public/brand/best-bites-logo.webp`:
 *
 *  1. repairs the cursor by nearest-colour fill — every painted-out pixel takes
 *     the colour of the closest surviving pixel, which keeps the hard red/white
 *     edge of the letterform instead of smearing it the way a blur would;
 *  2. crops to the badge itself, leaving the certification line behind;
 *  3. clears the background to transparent by flooding inwards from the border,
 *     so the white *inside* the lettering — which is most of the logo — stays.
 *
 * Idempotent: it always reads the untouched PNG. Re-run with
 * `node scripts/clean-logo.mjs` if the source is ever replaced.
 */

import sharp from 'sharp';

const SRC = 'public/brand/bestbitelogo.png';
const DEST = 'public/brand/best-bites-logo.webp';

/** The badge, without the "AN ISO 22000:2018 CERTIFIED COMPANY" line above it. */
const BADGE_TOP = 88;
/** The mouse pointer, inflated past its anti-aliased fringe. */
const CURSOR = { x0: 108, y0: 251, x1: 126, y1: 276 };
/** Anything this bright counts as backdrop while flooding in from the edge. */
const WHITE = 238;

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const px = new Uint8ClampedArray(data);

const idx = (x, y) => (y * width + x) * 4;
const isWhite = (i) => px[i] >= WHITE && px[i + 1] >= WHITE && px[i + 2] >= WHITE;

/* -- 1. repair the cursor ------------------------------------------------- */
/* A breadth-first sweep outwards from the surviving pixels around the patch:
   whichever real pixel reaches a hole first owns it, so the fill follows the
   shape of the artwork rather than averaging across it. */
{
  const hole = new Uint8Array(width * height);
  const queue = [];
  for (let y = CURSOR.y0; y <= CURSOR.y1; y++) {
    for (let x = CURSOR.x0; x <= CURSOR.x1; x++) hole[y * width + x] = 1;
  }
  for (let y = CURSOR.y0 - 1; y <= CURSOR.y1 + 1; y++) {
    for (let x = CURSOR.x0 - 1; x <= CURSOR.x1 + 1; x++) {
      if (!hole[y * width + x]) queue.push([x, y]);
    }
  }

  const filled = new Uint8Array(width * height);
  let head = 0;
  while (head < queue.length) {
    const [x, y] = queue[head++];
    const from = idx(x, y);
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx;
      const ny = y + dy;
      const p = ny * width + nx;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      if (!hole[p] || filled[p]) continue;
      filled[p] = 1;
      const to = p * 4;
      px[to] = px[from];
      px[to + 1] = px[from + 1];
      px[to + 2] = px[from + 2];
      px[to + 3] = px[from + 3];
      queue.push([nx, ny]);
    }
  }
}

/* -- 2. clear the backdrop ------------------------------------------------ */
/* Flooding from the border rather than keying every white pixel: the script
   lettering is white too, and keying would punch it straight through. */
{
  const seen = new Uint8Array(width * height);
  const queue = [];
  const push = (x, y) => {
    const p = y * width + x;
    if (seen[p] || !isWhite(p * 4)) return;
    seen[p] = 1;
    queue.push([x, y]);
  };
  for (let x = 0; x < width; x++) {
    push(x, BADGE_TOP);
    push(x, height - 1);
  }
  for (let y = BADGE_TOP; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const [x, y] = queue[head++];
    px[idx(x, y) + 3] = 0;
    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > BADGE_TOP) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }
}

/* -- 3. crop to what is left ---------------------------------------------- */
let x0 = width;
let y0 = height;
let x1 = -1;
let y1 = -1;
for (let y = BADGE_TOP; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (px[idx(x, y) + 3] === 0) continue;
    if (x < x0) x0 = x;
    if (y < y0) y0 = y;
    if (x > x1) x1 = x;
    if (y > y1) y1 = y;
  }
}

const pad = 4;
const left = Math.max(0, x0 - pad);
const top = Math.max(BADGE_TOP, y0 - pad);
const cropW = Math.min(width - left, x1 - left + pad + 1);
const cropH = Math.min(height - top, y1 - top + pad + 1);

await sharp(Buffer.from(px), { raw: { width, height, channels: 4 } })
  .extract({ left, top, width: cropW, height: cropH })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(DEST);

console.log(`${DEST} — ${cropW}x${cropH} from ${width}x${height}`);
