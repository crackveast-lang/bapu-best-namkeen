'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Media from '@/components/ui/Media';
import type { ImageKey } from '@/data/image-meta';

/**
 * Main frame plus a thumbnail strip. Thumbnails are real buttons, so the
 * gallery is arrow-key and screen-reader navigable, and the main frame
 * cross-fades rather than sliding.
 */
export default function ProductGallery({
  images,
  productName,
  accent,
}: {
  images: ImageKey[];
  productName: string;
  accent: string;
}) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-ink/10 bg-cream">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: reduced ? 1 : 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Media
              name={current}
              alt={`${productName} — image ${active + 1} of ${images.length}`}
              fill
              priority={active === 0}
              sizes="(max-width: 1024px) 92vw, 46vw"
            />
          </motion.div>
        </AnimatePresence>

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ background: accent }}
        />
      </div>

      {images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {images.map((name, i) => {
            const selected = i === active;
            return (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={selected ? 'true' : undefined}
                  aria-label={`Show ${productName} image ${i + 1}`}
                  className={`relative block aspect-square w-full overflow-hidden rounded-[0.85rem] border transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 ${
                    selected ? 'border-ink/45' : 'border-ink/12 hover:border-ink/30'
                  }`}
                >
                  <Media
                    name={name}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 22vw, 11vw"
                    imgClassName={`object-cover transition-opacity duration-300 ${
                      selected ? 'opacity-100' : 'opacity-75'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
