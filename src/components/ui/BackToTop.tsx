'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { EASE } from '@/components/ui/Reveal';

/**
 * Return-to-top control with a progress ring drawn from scroll position, so it
 * doubles as a "how far through am I" readout.
 *
 * Desktop only: on mobile the sticky buy bar owns the bottom of the screen and
 * two floating controls would fight each other.
 */
export default function BackToTop() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const ring = useSpring(scrollYProgress, { stiffness: 150, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
          }
          initial={{ opacity: 0, scale: reduced ? 1 : 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduced ? 1 : 0.7 }}
          transition={{ duration: 0.35, ease: EASE }}
          whileHover={reduced ? undefined : { y: -3 }}
          whileTap={reduced ? undefined : { scale: 0.94 }}
          className="group fixed right-6 bottom-6 z-40 hidden size-12 place-items-center rounded-full border border-ink/12 bg-ivory/90 text-ink shadow-[0_20px_40px_-24px_rgba(43,26,18,0.7)] backdrop-blur-md lg:grid"
        >
          <span className="sr-only">Back to top</span>

          {/* progress ring — pathLength normalises the circle to 0…1 */}
          <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden>
            <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink/10" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              pathLength={1}
              className="text-maroon"
              style={{ pathLength: ring }}
            />
          </svg>

          <span
            aria-hidden
            className="relative text-[0.95rem] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
          >
            ↑
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
