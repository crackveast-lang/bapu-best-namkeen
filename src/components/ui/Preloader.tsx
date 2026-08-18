'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Wordmark } from '@/components/ui/Bits';
import { BadgeRing, Rays, SevStrands } from '@/components/art/Doodles';
import { EASE } from '@/components/ui/Reveal';

/**
 * Session key. The loader is a first-impression device, not a toll booth — once
 * a visitor has seen it, every later page load in the same tab skips it. The
 * blocking script in <head> (see layout.tsx) reads the same key and hides the
 * overlay via CSS before first paint, so the skip costs no flash.
 */
const SEEN = 'bapu:preloaded';

/** Never hold the page longer than this, whatever the network is doing. */
const MAX_HOLD = 3200;

export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Already seen this session: the overlay is display:none already, so leave
    // immediately without locking scroll or animating anything.
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === '1';
    } catch {
      /* private mode — just show the loader */
    }
    if (seen) {
      setDone(true);
      return;
    }

    document.body.style.overflow = 'hidden';

    const finish = () => {
      setProgress(100);
      try {
        sessionStorage.setItem(SEEN, '1');
      } catch {
        /* ignore */
      }
      // Let 100% sit for a beat so the bar is seen filling, not just gone.
      window.setTimeout(() => setDone(true), reduced ? 0 : 340);
    };

    // Creep towards 90% while assets stream in, then hand the last 10% to the
    // real `load` event. A bar that only ever moves on `load` looks frozen.
    const creep = window.setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + Math.max(1, (92 - p) * 0.13)));
    }, 90);

    const bail = window.setTimeout(finish, MAX_HOLD);

    if (document.readyState === 'complete') {
      // Small floor so the loader is never a single frame of flicker.
      window.setTimeout(finish, reduced ? 0 : 520);
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      window.clearInterval(creep);
      window.clearTimeout(bail);
      window.removeEventListener('load', finish);
      document.body.style.overflow = '';
    };
  }, [reduced]);

  // Release the scroll lock the moment the curtain starts moving, so the page
  // is interactive through the exit rather than after it.
  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  const shown = Math.min(100, Math.round(progress));

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          id="preloader"
          key="preloader"
          aria-hidden
          initial={false}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.25 } }
              : {
                  y: '-100%',
                  transition: { duration: 0.85, ease: EASE, delay: 0.1 },
                }
          }
          className="grain fixed inset-0 z-[200] grid place-items-center bg-parchment"
        >
          {/* ambient saffron wash, matching the hero's */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(240,168,48,0.28), rgba(240,168,48,0.05) 62%, transparent)',
            }}
          />

          <motion.div
            className="relative flex w-[min(22rem,78vw)] flex-col items-center"
            initial={false}
            exit={reduced ? {} : { opacity: 0, y: -12, transition: { duration: 0.3 } }}
          >
            {/* --- seal + wordmark --- */}
            {/* The same furniture as the hero's "Heritage of taste" badge, so
                the loader is recognisably this site rather than a spinner. */}
            <div className="relative grid size-36 place-items-center">
              <span
                className="pulse-ring absolute inset-2 rounded-full border border-saffron/30"
                aria-hidden
              />
              <BadgeRing
                className="spin-slow absolute inset-0 size-full text-maroon/25"
                aria-hidden
              />
              {/* No entrance animation on the mark itself. This overlay is the
                  one thing on the site that has to be legible *before* React
                  hydrates, and a framer `initial` renders as opacity:0 in the
                  server HTML — the loader would be a blank circle on exactly
                  the slow connections it exists for. */}
              <div className="text-center">
                <Rays className="mx-auto mb-1.5 w-9 text-saffron" aria-hidden />
                <Wordmark className="scale-[0.92]" />
              </div>
            </div>

            {/* --- progress --- */}
            <div className="mt-8 w-full">
              <div className="h-px w-full overflow-hidden bg-ink/12">
                <motion.div
                  className="h-full w-full origin-left bg-maroon"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: shown / 100 }}
                  transition={{ duration: 0.35, ease: 'linear' }}
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-script text-[1.05rem] leading-none text-saffron">
                  From the heart of Gwalior
                </span>
                <span className="font-display text-[0.8rem] tabular-nums text-ink-faint">
                  {shown}
                </span>
              </div>
            </div>

            <SevStrands className="mt-7 w-28 text-ink/18" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
