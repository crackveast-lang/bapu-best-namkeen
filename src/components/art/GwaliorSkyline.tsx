/**
 * Original line-art panorama drawn for this site.
 *
 * Not traced from any photograph. The forms are built from the architectural
 * vocabulary of Gwalior Fort — the long rampart on its sandstone plateau, the
 * fat cylindrical bastions of Man Mandir with their ribbed cupolas, the chhatri
 * pavilions along the parapet — with a colonnaded block at the right standing
 * in for the neoclassical wing of Jai Vilas. Every path is authored by hand.
 *
 * A displacement filter gives the strokes a slight pencil wobble so it reads as
 * an old architectural sketch rather than vector clip-art.
 */

type Props = {
  className?: string;
  /** Unique per instance — filter and gradient ids must not collide. */
  idPrefix?: string;
};

const MERLON_ROWS = [
  { x: 210, to: 470, y: 300 },
  { x: 700, to: 900, y: 286 },
  { x: 1010, to: 1160, y: 300 },
];

function Merlons({ x, to, y }: { x: number; to: number; y: number }) {
  const step = 26;
  const teeth = [];
  for (let cx = x; cx < to; cx += step) {
    teeth.push(
      <path
        key={cx}
        d={`M${cx} ${y} v-14 q0 -7 6 -7 h9 q6 0 6 7 v14`}
        fill="none"
      />,
    );
  }
  return <g>{teeth}</g>;
}

/** A cylindrical bastion capped with a ribbed dome and a kalash finial. */
function Bastion({
  x,
  w,
  top,
  base,
  ribs = 5,
}: {
  x: number;
  w: number;
  top: number;
  base: number;
  ribs?: number;
}) {
  const cx = x + w / 2;
  const domeH = w * 0.52;
  const domeTop = top - domeH;
  const ribLines = [];
  for (let i = 1; i < ribs; i += 1) {
    const t = i / ribs;
    const rx = x + w * t;
    const lift = Math.sin(t * Math.PI) * domeH * 0.86;
    ribLines.push(<path key={i} d={`M${rx} ${top} V${top - lift}`} fill="none" />);
  }

  return (
    <g>
      {/* shaft */}
      <path d={`M${x} ${base} V${top} M${x + w} ${base} V${top}`} fill="none" />
      {/* string courses */}
      <path d={`M${x - 4} ${top + 16} H${x + w + 4}`} fill="none" />
      <path d={`M${x - 5} ${top + 30} H${x + w + 5}`} fill="none" />
      <path d={`M${x - 3} ${base - 54} H${x + w + 3}`} fill="none" />
      {/* blind arcade on the shaft */}
      <path
        d={`M${x + 12} ${base - 6} V${top + 62} q0 -18 18 -18 q18 0 18 18 V${base - 6}`}
        fill="none"
      />
      <path
        d={`M${x + w - 48} ${base - 6} V${top + 62} q0 -18 18 -18 q18 0 18 18 V${base - 6}`}
        fill="none"
      />
      {/* dome */}
      <path d={`M${x - 6} ${top} Q${cx} ${domeTop - 12} ${x + w + 6} ${top}`} fill="none" />
      {ribLines}
      {/* finial */}
      <path
        d={`M${cx} ${domeTop - 8} v-16 M${cx - 7} ${domeTop - 8} h14 M${cx} ${domeTop - 26} l0 -8`}
        fill="none"
      />
      <circle cx={cx} cy={domeTop - 38} r={4} fill="none" />
    </g>
  );
}

/** A chhatri: slender columns, a chajja slab, a small dome, a finial. */
function Chhatri({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const w = 54 * s;
  const h = 40 * s;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M0 0 h${w} M${-4 * s} 0 h${w + 8 * s}`} fill="none" />
      <path
        d={`M${6 * s} 0 V${-h} M${w - 6 * s} 0 V${-h} M${w * 0.5} 0 V${-h}`}
        fill="none"
      />
      <path d={`M${-2 * s} ${-h} h${w + 4 * s}`} fill="none" />
      <path
        d={`M${2 * s} ${-h} Q${w / 2} ${-h - 34 * s} ${w - 2 * s} ${-h}`}
        fill="none"
      />
      <path d={`M${w / 2} ${-h - 26 * s} v${-12 * s}`} fill="none" />
      <circle cx={w / 2} cy={-h - 42 * s} r={3 * s} fill="none" />
    </g>
  );
}

export default function GwaliorSkyline({ className, idPrefix = 'gw' }: Props) {
  const wobble = `${idPrefix}-wobble`;

  return (
    <svg
      viewBox="0 0 1600 460"
      className={className}
      role="img"
      aria-label="Line drawing of a Gwalior fort rampart with domed bastions and chhatri pavilions"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <filter id={wobble} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.016"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" />
        </filter>
      </defs>

      <g
        filter={`url(#${wobble})`}
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
      >
        {/* ---- the plateau the fort sits on -------------------------------- */}
        <path
          d="M-10 440 C 120 432, 190 424, 250 418 C 340 410, 430 414, 520 410
             C 640 404, 760 408, 880 404 C 1010 400, 1140 406, 1270 402
             C 1400 398, 1500 404, 1610 400"
          strokeWidth={2.1}
        />
        <path d="M40 440 c 60 -6 120 -4 176 -10" strokeWidth={1} opacity={0.55} />
        <path d="M1180 436 c 80 -8 160 -4 240 -12" strokeWidth={1} opacity={0.55} />
        {/* rock hatching */}
        <path d="M300 438 l16 -22 M336 440 l14 -18 M372 436 l18 -24" opacity={0.4} />
        <path d="M930 436 l16 -22 M966 438 l14 -18" opacity={0.4} />

        {/* ---- curtain wall ----------------------------------------------- */}
        <path d="M60 410 V300 H1350 V406" />
        <path d="M60 316 H1350" opacity={0.8} />
        <path d="M64 330 H1346" opacity={0.45} />
        {MERLON_ROWS.map((r) => (
          <Merlons key={r.x} {...r} />
        ))}

        {/* wall arcading */}
        {[240, 300, 360, 1050, 1110].map((wx) => (
          <path
            key={wx}
            d={`M${wx} 404 V352 q0 -16 16 -16 q16 0 16 16 V404`}
            opacity={0.7}
          />
        ))}

        {/* ---- bastions ---------------------------------------------------- */}
        <Bastion x={100} w={128} top={252} base={412} ribs={6} />
        <Bastion x={470} w={112} top={272} base={410} ribs={5} />
        <Bastion x={890} w={140} top={238} base={408} ribs={7} />

        {/* ---- the gateway ------------------------------------------------- */}
        <g>
          <path d="M596 408 V286 H700 V406" />
          <path d="M592 286 h112" />
          <path d="M600 272 h96" opacity={0.7} />
          <path
            d="M616 408 V336 q0 -32 32 -32 q32 0 32 32 V408"
            strokeWidth={2}
          />
          <path d="M628 408 V344 q0 -20 20 -20 q20 0 20 20 V408" opacity={0.55} />
          <Chhatri x={604} y={272} s={0.62} />
          <Chhatri x={654} y={272} s={0.62} />
        </g>

        {/* ---- chhatris along the parapet ---------------------------------- */}
        <Chhatri x={268} y={300} s={0.8} />
        <Chhatri x={392} y={300} s={0.8} />
        <Chhatri x={760} y={286} s={0.9} />
        <Chhatri x={1064} y={300} s={0.8} />

        {/* ---- colonnaded wing (Jai Vilas cue) ----------------------------- */}
        <g>
          <path d="M1180 406 V262 H1500 V404" />
          {/* pediment */}
          <path d="M1268 262 L1340 214 L1412 262" />
          <path d="M1276 262 h128" opacity={0.6} />
          {/* entablature */}
          <path d="M1176 274 h328" />
          <path d="M1180 288 h316" opacity={0.5} />
          {/* columns */}
          {[1204, 1244, 1284, 1324, 1364, 1404, 1444, 1478].map((cx) => (
            <g key={cx} opacity={0.9}>
              <path d={`M${cx} 404 V292`} />
              <path d={`M${cx + 13} 404 V292`} />
              <path d={`M${cx - 3} 292 h19`} />
              <path d={`M${cx - 3} 400 h19`} />
            </g>
          ))}
          {/* balustrade */}
          <path d="M1180 250 h320" opacity={0.65} />
          {[1192, 1212, 1232, 1252, 1432, 1452, 1472, 1492].map((bx) => (
            <path key={bx} d={`M${bx} 262 V250`} opacity={0.5} />
          ))}
        </g>

        {/* ---- a distant lone dome, for depth ------------------------------ */}
        <g opacity={0.45}>
          <path d="M1546 404 V352 M1600 404 V352" />
          <path d="M1540 352 Q1573 316 1606 352" />
          <path d="M1573 316 v-14" />
        </g>
      </g>
    </svg>
  );
}
