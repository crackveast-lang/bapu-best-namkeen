'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/products';

/**
 * A scroll-snapped rail. It uses native overflow scrolling, so it swipes on
 * touch, drags on trackpads and arrows on desktop, without a carousel library.
 */
export default function ProductCarousel({ products }: { products: Product[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = rail.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir * (window.innerWidth > 1024 ? 2 : 1), behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <ul
        ref={rail}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8"
      >
        {products.map((product) => (
          <li
            key={product.slug}
            className="w-[74vw] shrink-0 snap-start sm:w-[46vw] md:w-[34vw] lg:w-[calc((100%-3rem)/3.4)] xl:w-[calc((100%-3.75rem)/4.25)]"
          >
            <ProductCard product={product} className="h-full" />
          </li>
        ))}
      </ul>

      {/* controls — desktop only; touch users just swipe */}
      <div className="mt-7 hidden items-center gap-3 md:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={atStart}
          aria-label="Previous products"
          className="grid size-11 place-items-center rounded-full border border-ink/18 text-ink transition-all duration-300 hover:border-ink/45 hover:bg-ink hover:text-ivory disabled:pointer-events-none disabled:opacity-25"
        >
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label="More products"
          className="grid size-11 place-items-center rounded-full border border-ink/18 text-ink transition-all duration-300 hover:border-ink/45 hover:bg-ink hover:text-ivory disabled:pointer-events-none disabled:opacity-25"
        >
          <span aria-hidden>→</span>
        </button>
        <p className="ml-2 text-[0.72rem] tracking-[0.1em] text-ink-faint uppercase">
          Scroll for more
        </p>
      </div>
    </div>
  );
}
