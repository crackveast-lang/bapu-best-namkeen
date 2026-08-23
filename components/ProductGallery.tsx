"use client";

/* Product-page image gallery: main stage + thumbnails.
   Smooth crossfade on switch, swipe on mobile, no over-animation. */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ProductGallery({
  images,
  name,
  cutout,
  tint,
}: {
  images: string[];
  name: string;
  /** first image is a transparent cutout (render floating, not cropped) */
  cutout: boolean;
  tint: string;
}) {
  const [idx, setIdx] = useState(0);
  const isCutout = cutout && idx === 0;

  const next = (dir: number) =>
    setIdx((i) => (i + dir + images.length) % images.length);

  return (
    <div>
      {/* main stage */}
      <div
        className="relative flex aspect-[4/4.4] items-center justify-center overflow-hidden rounded-[2rem] sm:aspect-[4/4.1]"
        style={{ backgroundColor: tint }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.96, rotate: isCutout ? -2 : 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: easeOut }}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next(1);
              else if (info.offset.x > 60) next(-1);
            }}
            className={`h-full w-full touch-pan-y ${isCutout ? "flex items-center justify-center p-8 sm:p-12" : ""}`}
          >
            {isCutout ? (
              <Image
                src={images[idx]}
                alt={`${name} packet`}
                width={520}
                height={680}
                priority
                className="packet-shadow h-full w-auto object-contain transition-transform duration-700 hover:scale-[1.04] hover:rotate-1"
                draggable={false}
              />
            ) : (
              <Image
                src={images[idx]}
                alt={`${name} — photo ${idx + 1}`}
                width={900}
                height={1000}
                priority={idx === 0}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                draggable={false}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* pagination dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === idx ? "w-5 bg-orange" : "w-2 bg-charcoal/25 hover:bg-charcoal/40"
                }`}
              />
            ))}
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute right-4 bottom-4 hidden gap-2 sm:flex">
            <button
              onClick={() => next(-1)}
              aria-label="Previous image"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-charcoal shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              ←
            </button>
            <button
              onClick={() => next(1)}
              aria-label="Next image"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-charcoal shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIdx(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl transition-all ${
                i === idx
                  ? "ring-[3px] ring-orange ring-offset-2 ring-offset-cream"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: tint }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className={cutout && i === 0 ? "object-contain p-2" : "object-cover"}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
