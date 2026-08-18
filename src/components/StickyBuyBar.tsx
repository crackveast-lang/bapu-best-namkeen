'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import BuyButton from '@/components/ui/BuyButton';

/**
 * Mobile-only purchase bar. It appears once the visitor is past the hero and
 * hides again as the footer's own CTA comes into view, so the two never stack.
 */
export default function StickyBuyBar() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const nearEnd = y + window.innerHeight > doc.scrollHeight - 900;
      setShow(y > window.innerHeight * 0.9 && !nearEnd);
    };
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
        <motion.div
          initial={{ y: reduced ? 0 : '110%', opacity: reduced ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduced ? 0 : '110%', opacity: reduced ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/12 bg-ivory/92 px-4 pt-3 backdrop-blur-xl lg:hidden"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="flex items-center gap-2.5">
            {/* Short labels: at 390px "Buy on Amazon" wraps to two lines. */}
            <BuyButton
              marketplace="amazon"
              variant="solid"
              size="md"
              label="Amazon"
              className="flex-1"
            />
            <BuyButton
              marketplace="flipkart"
              variant="outline"
              size="md"
              label="Flipkart"
              className="flex-1"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
