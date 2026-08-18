'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Route-change entrance for <main>.
 *
 * Deliberately CSS rather than Framer. This wrapper contains the whole page, so
 * a Framer `initial` would serialise `opacity:0` onto it in the server HTML —
 * and if scripts fail or are switched off, the entire site stays invisible. A
 * keyframe runs without JavaScript and finishes visible either way.
 *
 * Enter-only: an AnimatePresence exit would keep the outgoing page mounted
 * while the new one is already scrolled to top, which reads as a jump. The
 * pathname key remounts the subtree, so every navigation restarts the animation
 * and every scroll-triggered Reveal inside re-arms.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
