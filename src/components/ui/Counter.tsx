'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts up to `to` the first time it scrolls into view.
 *
 * Renders the final value on the server and as the initial client state, so the
 * number is correct with JavaScript off, mid-hydration, and in a static export
 * crawler's snapshot — the animation only ever replays a value already there.
 */
export default function Counter({
  to,
  from,
  duration = 1.5,
  className = '',
}: {
  to: number;
  /** Defaults to a tenth below `to`, which suits a year far better than 0. */
  from?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduced = useReducedMotion();
  const start = from ?? Math.round(to - Math.max(4, Math.abs(to) * 0.1));

  const [value, setValue] = useState(to);
  const [armed, setArmed] = useState(false);

  // Drop to the start value only once the client is live, so SSR output and the
  // first client render agree and hydration stays clean.
  useEffect(() => {
    if (reduced) return;
    setValue(start);
    setArmed(true);
  }, [reduced, start]);

  useEffect(() => {
    if (!armed || !inView || reduced) return;

    let frame = 0;
    let t0 = 0;
    const span = to - start;

    const tick = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min(1, (now - t0) / (duration * 1000));
      // Same ease-out curve as every other transition on the site.
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(start + span * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [armed, inView, reduced, start, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}
