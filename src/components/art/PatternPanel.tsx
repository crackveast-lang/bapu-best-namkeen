import type { ReactNode } from 'react';
import Pattern, { type PatternTone } from '@/components/art/Pattern';

/**
 * A printed-label panel: the block-print pattern field, corners bitten out the
 * way a mithai-box label is die-cut, and a hairline gold frame set in from the
 * edge. Content sits on top.
 *
 * The notch and the frame are separate elements on purpose — the mask that
 * cuts the corners would clip a border drawn on the same box, so the frame is
 * an inset overlay that follows the same curve.
 */
export default function PatternPanel({
  children,
  tone = 'rose',
  className = '',
  /** Dims the pattern so text over it stays readable. 1 is full strength. */
  patternOpacity = 1,
  scale = 1,
  /** Corner bite radius. Match it to the panel's visual weight. */
  notch = '2rem',
  frame = true,
}: {
  children?: ReactNode;
  tone?: PatternTone;
  className?: string;
  patternOpacity?: number;
  scale?: number;
  notch?: string;
  frame?: boolean;
}) {
  return (
    <div
      className={`notched relative isolate overflow-hidden ${className}`}
      style={{ '--notch': notch } as React.CSSProperties}
    >
      <Pattern tone={tone} opacity={patternOpacity} scale={scale} />

      {frame ? (
        <span
          aria-hidden
          className="notched pointer-events-none absolute inset-3 z-10 border border-gold/45 sm:inset-4"
          style={{ '--notch': `calc(${notch} * 0.72)` } as React.CSSProperties}
        />
      ) : null}

      <div className="relative z-20">{children}</div>
    </div>
  );
}
