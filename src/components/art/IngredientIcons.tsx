/**
 * Hand-drawn icons for the ingredient breakdown — one per group on the printed
 * label. Original line art, in the same pen as the rest of the site's doodles.
 * Decorative: the ingredient name is always beside them in text.
 */

type P = { className?: string };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** Besan — a mound of gram flour in a bowl. */
export function GramFlour({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M8 30h32c0 7-7 12-16 12S8 37 8 30Z" />
      <path d="M5 30h38" />
      <path d="M13 30c3-9 7-13 11-13s8 4 11 13" />
      <path d="M20 22c1.5-2 4-3 6-2M18 27c2-1 4-1 6 0M27 25c2-1 4 0 5 1" opacity={0.6} />
    </svg>
  );
}

/** Edible vegetable oil — a drop above a shallow pan. */
export function OilDrop({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M24 6c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15Z" />
      <path d="M20 21c0 3 1.5 5 4 5.5" opacity={0.6} />
      <path d="M9 35h30c0 5-6 8-15 8s-15-3-15-8Z" opacity={0.75} />
    </svg>
  );
}

/** Rice flakes — poha, three overlapping flakes. */
export function RiceFlakes({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M6 24c4-6 11-8 16-4s3 11-3 13-14-2-13-9Z" />
      <path d="M22 14c5-5 12-5 16 0s0 12-6 13" opacity={0.8} />
      <path d="M30 30c4 1 8 4 9 8" opacity={0.55} />
      <path d="M12 24c3-2 7-2 9 1" opacity={0.5} />
    </svg>
  );
}

/** Peanut. */
export function PeanutIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M11 20c0-6 4-10 9-10 5 0 6 3 9 4.5s4 .5 7 .5c5 0 8 4 8 9s-4 9-9 9c-4 0-6-2-9-3.5s-4-.5-7-.5c-5 0-8-4-8-9Z" />
      <path d="M24 14c1 4 1 9 0 14M18 16c1 3 1 6 0 9M31 17c1 3 1 5 0 8" opacity={0.55} />
    </svg>
  );
}

/** Chickpeas and lentils — three pulses. */
export function Pulses({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <circle cx="16" cy="18" r="7" />
      <path d="M12 15c2-2 5-2 7 0" opacity={0.55} />
      <circle cx="31" cy="24" r="6" />
      <path d="M28 21c1.5-1.5 4-1.5 5.5 0" opacity={0.55} />
      <circle cx="19" cy="33" r="5.5" />
      <path d="M16 31c1.5-1.5 3.5-1.5 5 0" opacity={0.55} />
    </svg>
  );
}

/** Spices and condiments — chilli, star and seeds. */
export function Spices({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M14 12c8-2 18 4 21 14 1 4-2 7-6 6-9-3-15-12-15-20Z" />
      <path d="M14 12c-2-3-5-4-8-3 1 3 3 5 6 5" />
      <path d="M20 19c4 2 8 6 10 10" opacity={0.5} />
      <path d="M9 33c2-1.5 4.5-1 5.5 1M8 41c2-1.5 4.5-1 5.5 1M17 39c2-1.5 4.5-1 5.5 1" opacity={0.7} />
    </svg>
  );
}

/** Asafoetida — a pinch above a small pot. */
export function Hing({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M14 26h20l-2 15H16l-2-15Z" />
      <path d="M12 26h24" />
      <path d="M20 21c-1-3 .5-5 2-6M24 20c0-4 2-6 4-7M28 22c1-2 3-3 5-3" opacity={0.75} />
      <path d="M19 32h10M20 36h8" opacity={0.45} />
    </svg>
  );
}

/** Iodised and black salt — a shaker. */
export function Salt({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M17 18h14l2 22H15l2-22Z" />
      <path d="M18 25h12" opacity={0.6} />
      <path d="M20 18c0-4 1.8-6 4-6s4 2 4 6" />
      <path d="M22 9.5v-2M26 9.5v-2M24 8v-2.5" opacity={0.7} />
    </svg>
  );
}

/** Dry mango powder — amchur. */
export function DryMango({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M31 12c6 3 9 11 6 18-3 8-12 11-19 7-6-3-8-10-5-16 3-7 11-12 18-9Z" />
      <path d="M31 12c1-3 3-4 6-4-.5 3-2 5-4 6" />
      <path d="M17 25c2-3 5-4 8-3" opacity={0.55} />
    </svg>
  );
}

/** Acidity regulator — a small labelled vial. */
export function Regulator({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M20 8h8v11l7 15c1.5 3-.5 6-4 6H17c-3.5 0-5.5-3-4-6l7-15V8Z" />
      <path d="M18 8h12" />
      <path d="M16 29h16" opacity={0.6} />
      <path d="M21 34h2M26 36h2" opacity={0.5} />
    </svg>
  );
}

/** Sev — strands pressed through a jhara. */
export function SevStrand({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M5 17c6-8 12 6 18-3s14 7 20-2" />
      <path d="M5 27c6-8 12 6 18-3s14 7 20-2" opacity={0.8} />
      <path d="M5 37c6-8 12 6 18-3s14 7 20-2" opacity={0.55} />
    </svg>
  );
}

/** Wafer — a broad, brittle chip. */
export function Wafer({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M9 20c3-8 12-12 20-9s12 12 8 20-13 11-21 7-10-11-7-18Z" />
      <path d="M16 20c3 1 5 3 6 6M26 17c2 2 3 5 3 8M20 30c3 1 6 1 9 0" opacity={0.55} />
    </svg>
  );
}

/** Corn flake. */
export function CornFlake({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M24 6c8 2 14 8 15 16s-5 16-14 18c-8-2-14-9-14-18S16 8 24 6Z" />
      <path d="M24 8v32" opacity={0.6} />
      <path d="M24 16c3 1 5 3 6 5M24 24c3 1 5 3 6 5M24 16c-3 1-5 3-6 5M24 24c-3 1-5 3-6 5" opacity={0.45} />
    </svg>
  );
}

/** Green peas. */
export function GreenPeas({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <circle cx="16" cy="20" r="7.5" />
      <circle cx="31" cy="17" r="6" />
      <circle cx="24" cy="33" r="7" />
      <path d="M12 17c2-2 4-2.5 6-1.5M28 15c1.5-1.5 3-2 4.5-1M20 30c2-2 4-2.5 6-1.5" opacity={0.5} />
    </svg>
  );
}

/** A curry-leaf sprig. */
export function CurryLeafSprig({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M24 42c0-14-1-24-3-33" />
      <path d="M21 32c-7 .5-12-3-13-9 7-2 12 2 13 9zM22 32c7-.5 11-5 12-11-7-1-11 3-12 11z" />
      <path d="M20 20c-6 .5-10-2.5-11-7.5 6-1.5 10 1.5 11 7.5zM21 20c6-.5 10-4 10.5-9-6-1-10 3-10.5 9z" opacity={0.7} />
    </svg>
  );
}

/** Boondi — small fried droplets. */
export function Boondi({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <circle cx="15" cy="16" r="5" />
      <circle cx="30" cy="14" r="4.5" />
      <circle cx="22" cy="26" r="5.5" />
      <circle cx="35" cy="27" r="4" />
      <circle cx="13" cy="34" r="4.5" />
      <circle cx="28" cy="37" r="4" />
    </svg>
  );
}

/** Garlic bulb. */
export function Garlic({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M24 13c7 4 12 11 12 18 0 6-5 10-12 10s-12-4-12-10c0-7 5-14 12-18Z" />
      <path d="M24 13V9M24 9c-2-2-4-2.5-6-2M24 9c2-2 4-2.5 6-2" />
      <path d="M19 19c-2 5-2 12 0 20M29 19c2 5 2 12 0 20" opacity={0.55} />
    </svg>
  );
}

/** Clove. */
export function Clove({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M24 40V19" />
      <path d="M24 19c-3-1-5-4-5-7 0-3 2-5 5-6 3 1 5 3 5 6 0 3-2 6-5 7Z" />
      <path d="M19 14l-5-3M29 14l5-3M24 6V3" opacity={0.65} />
      <path d="M22 40h4" opacity={0.5} />
    </svg>
  );
}

/** Black peppercorns. */
export function BlackPepper({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <circle cx="17" cy="19" r="7" />
      <path d="M13 16c2-2 5-2 7 .5" opacity={0.5} />
      <circle cx="31" cy="28" r="6.5" />
      <path d="M27 25c2-1.5 4.5-1.5 6 .5" opacity={0.5} />
      <path d="M12 32c1.5-1.5 3.5-1.5 5 0M33 14c1.5-1.5 3.5-1.5 5 0" opacity={0.6} />
    </svg>
  );
}

/** Cumin seeds. */
export function Cumin({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M12 12c4 2 6 7 5 12M20 10c4 3 5 8 4 13M29 13c3 3 4 8 2 12M37 17c2 3 2 7 0 10" />
      <path d="M14 32c4 2 6 5 5 9M24 30c4 2 5 6 4 10M33 33c3 2 4 5 2 8" opacity={0.6} />
    </svg>
  );
}

/** Sugar crystals. */
export function Sugar({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M14 14h9v9h-9zM26 19h8v8h-8zM17 28h9v9h-9zM29 31h6v6h-6z" />
      <path d="M14 14l3-3h9l-3 3M23 14l3-3v9l-3-3" opacity={0.5} />
    </svg>
  );
}

export const INGREDIENT_ICONS = {
  gramFlour: GramFlour,
  oil: OilDrop,
  riceFlakes: RiceFlakes,
  peanut: PeanutIcon,
  pulses: Pulses,
  spices: Spices,
  hing: Hing,
  salt: Salt,
  dryMango: DryMango,
  regulator: Regulator,
  sev: SevStrand,
  wafer: Wafer,
  cornFlake: CornFlake,
  greenPeas: GreenPeas,
  curryLeaf: CurryLeafSprig,
  boondi: Boondi,
  garlic: Garlic,
  clove: Clove,
  blackPepper: BlackPepper,
  cumin: Cumin,
  sugar: Sugar,
} as const;

export type IngredientIconKey = keyof typeof INGREDIENT_ICONS;
