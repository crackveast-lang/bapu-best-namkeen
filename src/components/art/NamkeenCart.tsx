/**
 * The thela — a Gwalior namkeen handcart, drawn for the opening screen.
 *
 * Same pen as GwaliorSkyline, Doodles and ProcessScenes: original line work in
 * `currentColor`, with a displacement filter for a slight hand-drawn wobble, so
 * it reads as a page from a sketchbook rather than vector clip-art.
 *
 * Everything is stroke, no fills except a few warm washes inside the karahis —
 * which means it can sit over the horizon render without punching a hole in it,
 * and it takes whatever colour and opacity the page gives it.
 *
 * Drawn 420x330 with the ground line at y=302. Decorative throughout.
 */

type Props = {
  className?: string;
  /** Unique per instance — filter ids must not collide. */
  idPrefix?: string;
};

const ink = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** A cart wheel: rim, hub and spokes, spaced by angle rather than by hand. */
function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const spokes = Array.from({ length: 10 }, (_, i) => {
    const a = (i * 36 * Math.PI) / 180;
    return (
      <path
        key={i}
        d={`M${cx + Math.cos(a) * 7} ${cy + Math.sin(a) * 7} L${cx + Math.cos(a) * (r - 5)} ${
          cy + Math.sin(a) * (r - 5)
        }`}
        opacity={0.75}
      />
    );
  });

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={r - 6} opacity={0.55} />
      <circle cx={cx} cy={cy} r={7} />
      {spokes}
    </g>
  );
}

export default function NamkeenCart({ className, idPrefix = 'cart' }: Props) {
  const wobble = `${idPrefix}-wobble`;
  const saffron = 'var(--color-saffron)';
  const maroon = 'var(--color-maroon)';

  /** Slats along the cart's skirt. */
  const slats = Array.from({ length: 11 }, (_, i) => (
    <path key={i} d={`M${86 + i * 26} 216 v22`} opacity={0.5} />
  ));

  /** The scalloped hem of the canopy. */
  const scallops = Array.from({ length: 13 }, (_, i) => (
    <path key={i} d={`M${52 + i * 26} 104 q13 16 26 0`} opacity={0.8} />
  ));

  return (
    <svg
      viewBox="0 0 420 330"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <filter id={wobble} x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves={2} seed={11} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
        </filter>
      </defs>

      <g filter={`url(#${wobble})`} {...ink}>
        {/* canopy: two poles, a sagging cloth roof and its scalloped hem */}
        <path d="M74 198V96M346 198V96" />
        <path d="M44 100q166 -34 332 0" />
        <path d="M44 100q166 22 332 0" opacity={0.6} />
        <path d="M210 66v-24" opacity={0.7} />
        <path d="M210 42q-9 8 0 16 9-8 0-16z" opacity={0.7} />
        {scallops}

        {/* the vendor, behind the cart — everything below the bed is the
            cart's business, so the drawing simply stops there */}
        <path d="M154 150a19 19 0 1 1 38 0 19 19 0 1 1-38 0" />
        <path d="M150 138q22 -16 46 0" />
        <path d="M148 140q24 -22 50 -2" opacity={0.8} />
        <path d="M164 168q9 8 20 0" opacity={0.55} />
        <path d="M158 172q-22 8 -26 26 -3 12 -2 28M190 172q22 8 26 26" />
        <path d="M132 226v-2" opacity={0.4} />
        <path d="M216 198q14 -6 22 -16" />

        {/* the bed and its skirt */}
        <path d="M52 198h316" strokeWidth={2.6} />
        <path d="M62 214h296" />
        <path d="M62 214v26h296v-26" />
        {slats}
        <path d="M70 242h280" opacity={0.7} />

        {/* handle, dropped to the ground the way a parked thela is left */}
        <path d="M368 204q34 10 44 34" />
        <path d="M398 226l16 -6" opacity={0.7} />

        {/* axle and wheels */}
        <path d="M120 262h180" opacity={0.5} />
        <Wheel cx={128} cy={264} r={38} />
        <Wheel cx={296} cy={264} r={38} />
        <path d="M22 302h376" strokeWidth={2.4} opacity={0.55} />

        {/* the wide karahi, heaped */}
        <path d="M92 198h92c0 24-18 40-46 40s-46-16-46-40z" />
        <path d="M84 198h108" />
        <path d="M108 198q22 -30 52 -2" />
        <path d="M108 198q22 -30 52 -2z" fill={saffron} fillOpacity={0.32} stroke="none" />

        {/* a lidded degchi */}
        <path d="M230 198h56v-30h-56z" />
        <path d="M224 168h68" />
        <path d="M236 168q22 -20 44 0" />
        <path d="M258 148v-9" opacity={0.8} />
        <path d="M236 168q22 -20 44 0z" fill={maroon} fillOpacity={0.14} stroke="none" />

        {/* a stack of paper packets, tied */}
        <path d="M304 198h50v-26h-50zM304 186h50" opacity={0.9} />
        <path d="M330 172v26M316 176l28 18" opacity={0.45} />

        {/* steam */}
        <g opacity={0.55} strokeWidth={1.7}>
          <path d="M130 176q-8 -10 0 -18 8 -8 0 -16" />
          <path d="M156 168q-8 -10 0 -18 8 -8 0 -16" />
          <path d="M258 132q-7 -9 0 -16 7 -7 0 -14" />
        </g>
      </g>
    </svg>
  );
}
