'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Moves its child against the scroll while its own box stays put, so a section
 * gains depth without any layout shift.
 *
 * `speed` is the fraction of the travelled distance to offset by: positive lags
 * behind the scroll, negative runs ahead of it. Keep it small — past about 0.2
 * the effect stops reading as depth and starts reading as a bug.
 */
export default function Parallax({
  children,
  speed = 0.08,
  className = '',
  innerClassName = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  /** On the moving element. Use `relative size-full` when it frames a fill image. */
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const shift = speed * 100;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : [`${shift}%`, `${-shift}%`],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  );
}
