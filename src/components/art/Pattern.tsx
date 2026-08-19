'use client';

import { useId } from 'react';

/**
 * Block-print pattern field.
 *
 * A tileable SVG motif in the language of an Indian mithai box: a four-petal
 * flower inside a lobed diamond, ringed with stippling. Drawn rather than
 * photographed, like everything else in `art/`, so it stays crisp at any size
 * and takes its colours from the page instead of from a bitmap.
 *
 * Everything is laid out around the centre of a 120-unit tile. Keep it that
 * way: an off-centre motif still tiles, but the rows visibly drift.
 */

export type PatternTone = keyof typeof PALETTES;

const C = 60; // tile centre, and half the tile edge

const PALETTES = {
  /** Rose ground, olive-gold motif — the mithai-box colourway. */
  rose: { bg: '#e8918a', ink: '#a89a32', dot: '#df837b' },
  /**
   * The same print on a blush ground. Used wherever body copy sits on the
   * pattern: at full rose, `ink-soft` lands at 4.0:1 and `ink-faint` at 1.9:1,
   * both under AA. On this ground they clear it.
   */
  blush: { bg: '#f4c5c0', ink: '#b9992f', dot: '#eeb7b1' },
  /** Deep green and gold, the dressier of the two. */
  emerald: { bg: '#0f6f61', ink: '#e3b34a', dot: '#0d6155' },
  /** The house maroon, for sections that must stay in the existing palette. */
  maroon: { bg: '#6d1420', ink: '#e0a83e', dot: '#5e1119' },
  /** Barely-there tint, for use behind body copy. */
  parchment: { bg: '#f6efe2', ink: '#c8a86a', dot: '#efe5d3' },
} as const;

/** Evenly spaced dots on a ring — the stippling that frames each motif. */
function ring(radius: number, count: number, r: number, keyPrefix: string) {
  return Array.from({ length: count }, (_, i) => {
    const a = (Math.PI * 2 * i) / count - Math.PI / 2;
    return (
      <circle
        key={`${keyPrefix}${i}`}
        cx={(C + Math.cos(a) * radius).toFixed(2)}
        cy={(C + Math.sin(a) * radius).toFixed(2)}
        r={r}
      />
    );
  });
}

function Tile({ id, scale }: { id: string; scale: number }) {
  return (
    // No viewBox on the <svg>, so one user unit is one CSS pixel and
    // patternTransform sets the tile edge in px exactly: scale 1 => 120px.
    // Sizing this through a viewBox instead would make the motif depend on the
    // panel's aspect ratio, because preserveAspectRatio="slice" fits whichever
    // axis overflows.
    <pattern
      id={id}
      width="120"
      height="120"
      patternUnits="userSpaceOnUse"
      patternTransform={`scale(${scale})`}
    >
      {/* lobed diamond, a tone deeper than the ground */}
      <path
        d="M60 16C68 37 83 52 104 60 83 68 68 83 60 104 52 83 37 68 16 60 37 52 52 37 60 16Z"
        fill="var(--pat-dot)"
      />

      {/* four-petal flower, both petals centred on the tile */}
      <g fill="var(--pat-ink)">
        <path d="M60 32C64.5 45 64.5 75 60 88 55.5 75 55.5 45 60 32Z" />
        <path d="M32 60C45 55.5 75 55.5 88 60 75 64.5 45 64.5 32 60Z" />
        <circle cx="60" cy="60" r="4.5" />
      </g>

      {/* stippled ring, inside the half-tile so the repeat never collides */}
      <g fill="var(--pat-ink)" opacity="0.9">
        {ring(52, 24, 2, 'r')}
      </g>

      {/* corner seeds — they meet across the seam to make a second, offset
          motif, which is what stops the grid reading as plain rows */}
      <g fill="var(--pat-ink)" opacity="0.55">
        <circle cx="0" cy="0" r="3.2" />
        <circle cx="120" cy="0" r="3.2" />
        <circle cx="0" cy="120" r="3.2" />
        <circle cx="120" cy="120" r="3.2" />
      </g>
    </pattern>
  );
}

/**
 * Fills its positioned parent with the repeat. Decorative throughout, so it is
 * hidden from assistive technology and never intercepts a pointer.
 */
export default function Pattern({
  tone = 'rose',
  className = '',
  opacity = 1,
  /** Tile edge as a multiple of 120px. Below ~0.5 the stippling turns to noise. */
  scale = 0.8,
}: {
  tone?: PatternTone;
  className?: string;
  opacity?: number;
  scale?: number;
}) {
  const p = PALETTES[tone];
  // useId, not the tone: two fields of the same tone on one page would
  // otherwise share an id, and every reference resolves to whichever was
  // defined first.
  const id = `pat${useId().replace(/:/g, '')}`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ background: p.bg, opacity }}
    >
      <svg
        className="size-full"
        style={{ '--pat-ink': p.ink, '--pat-dot': p.dot } as React.CSSProperties}
      >
        <defs>
          <Tile id={id} scale={scale} />
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

/** The ground colour of a tone, for panels that sit beside a pattern field. */
export function patternBg(tone: PatternTone) {
  return PALETTES[tone].bg;
}
