/**
 * Behind-the-scenes illustrations for "From our kitchen to your home".
 *
 * These are original drawings, not photographs and not stock. That is a
 * deliberate choice: the brand's asset library contains no pictures of the
 * production kitchen, and dropping in a stock photo of somebody else's factory
 * under the heading "our kitchen" would be a manufacturing claim we cannot
 * stand behind. An illustration reads as depiction rather than documentation,
 * so it shows the process honestly without pretending to be evidence of it.
 *
 * Same pen as GwaliorSkyline and Doodles: ink line work over a warm tint, with
 * a displacement filter for a slight hand-drawn wobble.
 *
 * Drawn 400x500 to match the 4:5 card exactly. The frame applies a small
 * parallax overscan, so keep everything that matters inside x 34-366, y 44-456.
 */

type SceneProps = {
  className?: string;
  /** Unique per instance — filter ids must not collide across scenes. */
  id: string;
};

const ink = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const SAFFRON = 'var(--color-saffron)';
const MAROON = 'var(--color-maroon)';
const OLIVE = 'var(--color-olive)';
const TINT = 'var(--color-cream)';

/** Shared frame: tint wash, wobble filter, consistent viewBox. */
function Scene({
  id,
  className,
  label,
  children,
}: SceneProps & { label: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id={`${id}-w`} x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={2} seed={4} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" />
        </filter>
      </defs>

      {/* warm ground */}
      <rect width="400" height="500" fill={TINT} />
      <circle cx="312" cy="104" r="96" fill={SAFFRON} opacity={0.16} />
      <circle cx="72" cy="400" r="84" fill={MAROON} opacity={0.07} />

      <g filter={`url(#${id}-w)`}>{children}</g>
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * 01 — Ingredients
 * ------------------------------------------------------------------ */
export function SceneIngredients(p: SceneProps) {
  return (
    <Scene
      {...p}
      label="Illustration of an open sack of gram flour with bowls of lentils, peanuts and spices on a counter"
    >
      {/* jute sack, rolled open */}
      <g {...ink}>
        <path d="M112 300V150c0-12 7-19 19-21l52-8c12-2 20 4 20 16v163" />
        <path d="M112 150c10-15 25-20 42-17M203 137c-12-12-27-15-42-11" opacity={0.7} />
        <path d="M136 300V158M180 300V152" opacity={0.3} />
      </g>
      <ellipse cx="158" cy="134" rx="45" ry="13" fill={SAFFRON} opacity={0.55} />
      <g {...ink} strokeWidth={1.5} opacity={0.7}>
        <path d="M134 130c4-4 9-4 13 0M156 125c4-4 9-4 13 0M144 140c4-4 9-4 13 0" />
      </g>

      {/* counter */}
      <path d="M26 302h348" {...ink} strokeWidth={2.6} />
      <path d="M48 316h300" {...ink} strokeWidth={1.2} opacity={0.35} />

      {/* wide bowl of besan */}
      <g {...ink}>
        <path d="M52 252h104c0 30-24 52-52 52s-52-22-52-52Z" />
        <path d="M44 252h120" />
        <path d="M72 252c9-27 19-38 32-38s23 11 32 38" />
      </g>
      <path d="M72 252c9-27 19-38 32-38s23 11 32 38Z" fill={SAFFRON} opacity={0.42} />

      {/* bowl of lentils */}
      <g {...ink}>
        <path d="M240 258h94c0 26-21 46-47 46s-47-20-47-46Z" />
        <path d="M232 258h110" />
      </g>
      <g fill={MAROON} opacity={0.5}>
        <circle cx="258" cy="250" r="6" />
        <circle cx="278" cy="244" r="6" />
        <circle cx="298" cy="248" r="6" />
        <circle cx="316" cy="252" r="6" />
        <circle cx="268" cy="235" r="5.5" />
        <circle cx="290" cy="232" r="5.5" />
        <circle cx="308" cy="238" r="5.5" />
      </g>

      {/* peanuts on the counter */}
      <g {...ink} strokeWidth={1.7} opacity={0.85}>
        <path d="M56 348c0-7 6-11 11-8s5 3 9 3 8 4 8 9-6 10-11 8-5-3-9-3-8-4-8-9Z" />
        <path d="M112 362c0-6 5-9 9-7s4 2 7 2 7 3 7 7-5 8-9 7-4-2-7-2-7-3-7-7Z" opacity={0.8} />
      </g>

      {/* spice piles */}
      <g {...ink} strokeWidth={1.8}>
        <path d="M182 372c9-18 21-18 30 0Z" fill={MAROON} fillOpacity={0.45} />
        <path d="M242 378c8-15 18-15 26 0Z" fill={SAFFRON} fillOpacity={0.6} />
        <path d="M300 372c9-18 21-18 30 0Z" fill={OLIVE} fillOpacity={0.42} />
      </g>
      <path d="M26 384h348" {...ink} strokeWidth={2.4} opacity={0.5} />

      {/* scattered seeds */}
      <g {...ink} strokeWidth={1.5} opacity={0.5}>
        <path d="M84 414c4-4 9-3 11 1M148 422c4-4 9-3 11 1M212 416c4-4 9-3 11 1M276 424c4-4 9-3 11 1" />
      </g>
    </Scene>
  );
}

/* ------------------------------------------------------------------ *
 * 02 — Preparation: sev pressed into the kadhai
 * ------------------------------------------------------------------ */
export function ScenePreparation(p: SceneProps) {
  return (
    <Scene
      {...p}
      label="Illustration of sev being pressed through a jhara into a kadhai of hot oil over a flame"
    >
      {/* steam */}
      <g {...ink} strokeWidth={1.8} opacity={0.45}>
        <path d="M132 92c-9-12 5-19-5-31M200 78c-9-12 5-19-5-31M268 92c-9-12 5-19-5-31" />
      </g>

      {/* the press (sancha) */}
      <g {...ink}>
        <path d="M144 130h112v38H144z" />
        <path d="M154 130v-24c0-10 8-18 18-18h56c10 0 18 8 18 18v24" />
        <path d="M200 88V60" />
        <path d="M176 60h48" strokeWidth={3} />
        <path d="M148 168h104" strokeWidth={3} />
      </g>
      <g fill={MAROON} opacity={0.35}>
        <circle cx="164" cy="162" r="3" />
        <circle cx="182" cy="162" r="3" />
        <circle cx="200" cy="162" r="3" />
        <circle cx="218" cy="162" r="3" />
        <circle cx="236" cy="162" r="3" />
      </g>

      {/* falling sev strands */}
      <g {...ink} strokeWidth={1.9} opacity={0.85}>
        <path d="M164 174c-4 18 4 28 0 46M182 174c4 18-4 28 0 46M200 174c-4 18 4 28 0 46M218 174c4 18-4 28 0 46M236 174c-4 18 4 28 0 46" />
      </g>

      {/* kadhai */}
      <g {...ink}>
        <path d="M74 236h252c0 56-56 96-126 96S74 292 74 236Z" strokeWidth={2.6} />
        <path d="M60 236h280" strokeWidth={3} />
        <path d="M60 236c-14-5-24-15-22-27M340 236c14-5 24-15 22-27" />
      </g>
      <path d="M90 248h220c-5 44-52 74-110 74s-105-30-110-74Z" fill={SAFFRON} opacity={0.42} />
      <g {...ink} strokeWidth={1.6} opacity={0.6}>
        <path d="M134 274c10-8 20-8 30 0s20 8 30 0 20-8 30 0" />
        <path d="M158 300c10-8 20-8 30 0s20 8 30 0" opacity={0.7} />
      </g>

      {/* flame */}
      <g {...ink} strokeWidth={2.2}>
        <path d="M198 434c-20 0-33-13-33-28 0-18 18-23 15-41 15 8 20 20 20 30 5-5 8-13 8-20 13 10 21 23 21 33 0 15-13 26-31 26Z" fill={SAFFRON} fillOpacity={0.55} />
      </g>
      <path d="M108 436h184" {...ink} strokeWidth={2.6} />
      <path d="M132 452h136" {...ink} strokeWidth={1.4} opacity={0.4} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ *
 * 03 — Seasoning
 * ------------------------------------------------------------------ */
export function SceneSeasoning(p: SceneProps) {
  return (
    <Scene
      {...p}
      label="Illustration of masala being sprinkled by hand over a drum of freshly fried namkeen"
    >
      {/* hand sprinkling */}
      <g {...ink}>
        <path d="M176 66c0-10 6-16 13-16s13 6 13 16v36" />
        <path d="M202 82c0-10 6-16 13-16s13 6 13 16v25" />
        <path d="M228 96c0-9 5-14 11-14s11 5 11 14v20" />
        <path d="M176 104c-12-5-22 0-24 10-4 12 5 22 15 29l28 22c10 7 22 7 31 0 12-10 17-22 17-36v-31" />
      </g>

      {/* falling masala */}
      <g fill={MAROON} opacity={0.5}>
        <circle cx="166" cy="196" r="3.6" />
        <circle cx="196" cy="216" r="3.2" />
        <circle cx="224" cy="200" r="3.6" />
        <circle cx="182" cy="232" r="3" />
        <circle cx="214" cy="240" r="3.4" />
      </g>
      <g fill={SAFFRON} opacity={0.75}>
        <circle cx="150" cy="220" r="3.2" />
        <circle cx="242" cy="226" r="3" />
        <circle cx="204" cy="186" r="2.8" />
      </g>

      {/* mixing drum */}
      <g {...ink}>
        <path d="M56 306c0-32 50-56 144-56s144 24 144 56-50 56-144 56S56 338 56 306Z" strokeWidth={2.6} />
        <path d="M74 326c19 21 66 36 126 36s107-15 126-36" opacity={0.45} />
      </g>
      <ellipse cx="200" cy="304" rx="122" ry="42" fill={SAFFRON} opacity={0.35} />
      <g {...ink} strokeWidth={1.7} opacity={0.8}>
        <path d="M100 298c10-7 17 5 27-2s17 5 27-2M136 322c10-7 17 5 27-2s17 5 27-2M212 286c10-7 17 5 27-2s17 5 27-2M224 318c10-7 17 5 27-2s17 5 27-2" />
      </g>
      <g fill={MAROON} opacity={0.42}>
        <circle cx="122" cy="314" r="5" />
        <circle cx="198" cy="318" r="5" />
        <circle cx="260" cy="300" r="5" />
        <circle cx="162" cy="292" r="5" />
      </g>

      {/* masala bowl, sitting clear of the frame edge */}
      <g {...ink}>
        <path d="M136 404h88c0 24-20 40-44 40s-44-16-44-40Z" />
        <path d="M128 404h104" />
      </g>
      <path d="M150 404c8-20 18-27 30-27s22 7 30 27Z" fill={MAROON} opacity={0.45} />
      <path d="M40 452h320" {...ink} strokeWidth={2.4} opacity={0.55} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ *
 * 04 — Quality check
 * ------------------------------------------------------------------ */
export function SceneQualityCheck(p: SceneProps) {
  return (
    <Scene
      {...p}
      label="Illustration of a pack on a weighing scale beside a checked inspection sheet and a certification seal"
    >
      {/* inspection sheet */}
      <g {...ink}>
        <path d="M236 60h116v148H236z" strokeWidth={2.4} />
        <path d="M268 60V46h52v14" />
        <path d="M282 104h52M282 140h52M282 176h32" opacity={0.42} />
      </g>
      <g {...ink} strokeWidth={2.6} stroke={OLIVE}>
        <path d="M256 96l7 7 12-14" />
        <path d="M256 132l7 7 12-14" />
        <path d="M256 168l7 7 12-14" />
      </g>

      {/* pouch on the platform */}
      <g {...ink}>
        <path d="M74 336V166c0-8 6-14 14-14h84c8 0 14 6 14 14v170" strokeWidth={2.6} />
        <path d="M74 192h112" opacity={0.55} />
        <path d="M92 152v-14h76v14" />
      </g>
      <path d="M80 198h100v132H80z" fill={MAROON} opacity={0.26} />
      <g {...ink} strokeWidth={1.7} opacity={0.7}>
        <path d="M96 232c11-8 19 5 30-2s19 5 30-2M96 264c11-8 19 5 30-2s19 5 30-2M96 296c11-8 19 5 30-2s19 5 30-2" />
      </g>

      {/* scale */}
      <g {...ink}>
        <path d="M40 336h176" strokeWidth={3} />
        <path d="M62 336v40h132v-40" />
        <path d="M46 376h164" strokeWidth={2.6} />
        {/* display arm */}
        <path d="M216 336v-56h74v56" />
        <path d="M228 288h50v28h-50z" />
      </g>
      <path d="M228 288h50v28h-50z" fill={OLIVE} opacity={0.3} />
      <g {...ink} strokeWidth={2.2} opacity={0.85}>
        <path d="M238 302h7M255 296v12M268 302h7" />
      </g>

      {/* certification seal */}
      <g {...ink} strokeWidth={2.2}>
        <circle cx="296" cy="416" r="36" />
        <circle cx="296" cy="416" r="28" strokeDasharray="2 7" opacity={0.7} />
        <path d="M282 416l10 10 19-22" stroke={MAROON} strokeWidth={3} />
      </g>
      <path d="M40 470h320" {...ink} strokeWidth={2.4} opacity={0.5} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ *
 * 05 — Packing
 * ------------------------------------------------------------------ */
export function ScenePacking(p: SceneProps) {
  return (
    <Scene
      {...p}
      label="Illustration of a pouch being filled from a hopper, with sealed packs stacked alongside"
    >
      {/* hopper */}
      <g {...ink}>
        <path d="M78 52h188l-40 78h-108z" strokeWidth={2.6} />
        <path d="M68 52h208" strokeWidth={3} />
        <path d="M120 130h104v28H120z" />
      </g>
      <path d="M90 62h164l-32 60h-100z" fill={SAFFRON} opacity={0.4} />
      <g {...ink} strokeWidth={1.7} opacity={0.7}>
        <path d="M112 80c11-8 19 5 30-2s19 5 30-2 19 5 30-2" />
      </g>

      {/* falling product */}
      <g fill={MAROON} opacity={0.45}>
        <circle cx="152" cy="180" r="4" />
        <circle cx="186" cy="196" r="3.6" />
        <circle cx="166" cy="214" r="3.8" />
      </g>
      <g {...ink} strokeWidth={1.7} opacity={0.7}>
        <path d="M140 198c8-5 13 4 21-3M182 224c8-5 13 4 21-3" />
      </g>

      {/* sealing bar */}
      <g {...ink}>
        <path d="M84 246h176" stroke={SAFFRON} strokeWidth={5} />
        <path d="M84 236h176" strokeWidth={1.5} opacity={0.4} />
      </g>

      {/* pouch being filled */}
      <g {...ink}>
        <path d="M92 456V276c0-9 7-16 16-16h128c9 0 16 7 16 16v180" strokeWidth={2.6} />
        <path d="M92 260c18-12 40-17 64-17s46 5 64 17" opacity={0.55} />
        <path d="M92 300h160" opacity={0.45} />
      </g>
      <path d="M98 306h148v146H98z" fill={MAROON} opacity={0.24} />
      <g {...ink} strokeWidth={1.7} opacity={0.7}>
        <path d="M114 342c11-8 19 5 30-2s19 5 30-2M114 378c11-8 19 5 30-2s19 5 30-2M114 414c11-8 19 5 30-2s19 5 30-2" />
      </g>

      {/* sealed packs stacked at the right, held clear of the frame edge */}
      <g {...ink}>
        <path d="M274 452v-88c0-8 6-14 14-14h48c8 0 14 6 14 14v88" />
        <path d="M274 376h76" opacity={0.45} />
        <path d="M286 350v-12h52v12" opacity={0.6} />
        <path d="M274 338v-70c0-8 6-14 14-14h48c8 0 14 6 14 14v70" opacity={0.85} />
        <path d="M274 282h76" opacity={0.4} />
      </g>
      <path d="M280 382h64v62h-64z" fill={SAFFRON} opacity={0.35} />
      <path d="M280 288h64v44h-64z" fill={SAFFRON} opacity={0.22} />

      <path d="M44 458h312" {...ink} strokeWidth={2.6} />
    </Scene>
  );
}

export const PROCESS_SCENES = {
  ingredients: SceneIngredients,
  preparation: ScenePreparation,
  seasoning: SceneSeasoning,
  quality: SceneQualityCheck,
  packing: ScenePacking,
} as const;

export type ProcessSceneKey = keyof typeof PROCESS_SCENES;
