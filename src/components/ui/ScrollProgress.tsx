'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A hairline reading indicator across the very top of the viewport. It sits
 * above the sticky header, and it is spring-smoothed so a flicked trackpad
 * scroll settles rather than snapping.
 *
 * Hidden for reduced motion in CSS rather than by returning null: the server
 * cannot know the visitor's preference, so branching the tree on it would
 * hydrate into a mismatch.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-maroon via-crimson to-saffron motion-reduce:hidden"
    />
  );
}
