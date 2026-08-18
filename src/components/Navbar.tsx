'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { NAV } from '@/data/site';
import { Wordmark } from '@/components/ui/Bits';
import BuyButton from '@/components/ui/BuyButton';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the sheet on navigation and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? 'border-b border-ink/10 bg-ivory/82 shadow-[0_1px_24px_-14px_rgba(43,26,18,0.5)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex w-full max-w-[88rem] items-center gap-6 px-5 transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 ${
          scrolled ? 'h-16' : 'h-20 md:h-24'
        }`}
      >
        <Link
          href="/"
          className="shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
          aria-label="Bapu Best Namkeen — home"
        >
          <Wordmark />
        </Link>

        {/* ---- desktop links ------------------------------------------- */}
        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="group relative block px-3.5 py-2 text-[0.82rem] font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-px h-px origin-left bg-maroon transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto hidden items-center gap-2 lg:ml-0 lg:flex">
          <BuyButton marketplace="amazon" variant="solid" size="sm" label="Amazon" />
          <BuyButton marketplace="flipkart" variant="outline" size="sm" label="Flipkart" />
        </div>

        {/* ---- mobile trigger ------------------------------------------- */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="ml-auto grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/35 lg:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="relative block h-3 w-4.5" aria-hidden>
            <span
              className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute inset-x-0 top-1.5 h-px bg-current transition-opacity duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute inset-x-0 top-3 h-px bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </nav>

      {/* ---- mobile sheet ---------------------------------------------- */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: reduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-b border-ink/10 bg-ivory/97 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto w-full max-w-[88rem] px-5 py-3 sm:px-8">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-ink/8 last:border-0"
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-3.5 font-display text-[1.28rem] text-ink"
                  >
                    {item.label}
                    <span aria-hidden className="text-ink-faint">
                      →
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mx-auto flex w-full max-w-[88rem] gap-2.5 px-5 pb-5 sm:px-8">
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

            {/* Scrim over the page below the sheet. Anchored to the sheet's own
                foot rather than the viewport, so it never tints the bar above
                it. Decorative — the sheet also closes on navigation. */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={() => setOpen(false)}
              className="absolute inset-x-0 top-full h-screen cursor-default bg-ink/25 backdrop-blur-[2px]"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
