'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/**
 * A vertical rule that fills from the top as the block it spans is scrolled
 * through — the reading position, drawn down the spine of a timeline.
 *
 * The faint full-height track stays put so the column never looks truncated;
 * only the coloured fill is scroll-linked.
 */
export default function ScrollLine({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  // Starts filling as the spine enters the lower third of the viewport and is
  // complete once its foot has passed the middle.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <span ref={ref} aria-hidden className={`block ${className}`}>
      <span className="block size-full bg-ink/12">
        <motion.span
          className="block size-full origin-top bg-gradient-to-b from-saffron via-maroon to-maroon/30"
          style={reduced ? { scaleY: 1 } : { scaleY }}
        />
      </span>
    </span>
  );
}
