'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useInView } from 'framer-motion';

/**
 * Draws the SVG strokes inside it once, the first time they scroll into view —
 * the line-art equivalent of a fade-in.
 *
 * The dash maths lives in `.draw-in` (globals.css) and depends on the paths
 * carrying `pathLength={1}`; without it the stroke is dashed at one user unit
 * and the whole shape disappears. Doodles used here are already marked up.
 */
export default function DrawIn({
  children,
  className = '',
  /** Held back this many ms after entering view, for choreography. */
  delay = 0,
}: {
  children: ReactNode;
  /** Give the wrapper a real box — an inline span of zero area is unreliable
   *  to observe. `absolute inset-0` inside a positioned parent works well. */
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (!inView || drawn) return;
    const t = window.setTimeout(() => setDrawn(true), delay);
    return () => window.clearTimeout(t);
  }, [inView, drawn, delay]);

  return (
    <span ref={ref} className={`draw-in ${className}`} data-drawn={drawn}>
      {children}
    </span>
  );
}
