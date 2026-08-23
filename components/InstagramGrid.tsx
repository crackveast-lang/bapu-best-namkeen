"use client";

/* "Follow the crunch." — a social-style grid of real brand photography.
   Not a live feed; every tile links to the Instagram profile. */

import Image from "next/image";
import { motion } from "framer-motion";
import { INSTAGRAM_URL } from "@/lib/products";
import { CameraSketch, Burst } from "./Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

function InstaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.4" fill="currentColor" />
    </svg>
  );
}

const tiles = [
  { src: "/products/life-kadipatta.webp", alt: "Kadipatta Mix packet with scattered namkeen", tall: true },
  { src: "/products/gal-milan-open.webp", alt: "An open pack of Milan Mixture from above", tall: false },
  { src: "/stores/store-phalka.webp", alt: "The Best Namkeen storefront at night", tall: false },
  { src: "/products/life-sada-topdown.webp", alt: "A bowl of Sada Sev from above", tall: true },
  { src: "/products/gal-ratlami-hand.webp", alt: "Holding a Ratlami Sev pack in the sun", tall: true },
  { src: "/stores/store-thatipur.webp", alt: "Inside the Thatipur store", tall: false },
];

export default function InstagramGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="group mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, rotate: -14, scale: 0.7 }}
          whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="mx-auto mb-4 w-12"
        >
          <CameraSketch className="wiggle-on-hover w-full text-green" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-3 text-xs font-bold tracking-[0.22em] text-orange-deep uppercase"
        >
          The Community · @bestnamkeen
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
          className="display text-5xl text-charcoal sm:text-7xl"
        >
          Follow the <span className="text-orange">crunch.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-hand mt-3 text-2xl text-charcoal/55"
        >
          a little more crunch for your feed
        </motion.p>
      </div>

      <div className="columns-2 gap-4 sm:columns-3 [&>a]:mb-4">
        {tiles.map((t, i) => (
          <motion.a
            key={t.src}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: easeOut }}
            className="group relative block overflow-hidden rounded-2xl"
            aria-label="Open our Instagram profile"
          >
            <Image
              src={t.src}
              alt={t.alt}
              width={640}
              height={t.tall ? 800 : 480}
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                t.tall ? "aspect-[4/5]" : "aspect-[4/3]"
              }`}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/45">
              <InstaIcon className="w-9 text-cream opacity-0 transition-all duration-500 group-hover:opacity-100" />
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="mt-10 text-center"
      >
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 rounded-full border-2 border-charcoal/15 px-8 py-4 text-base font-bold text-charcoal transition-colors hover:border-orange hover:text-orange-deep"
        >
          <InstaIcon className="w-5" />
          Follow the crunch
          <span className="transition-transform group-hover:translate-x-1">→</span>
          <Burst className="wiggle-on-hover absolute -top-3 -right-4 w-6 text-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
      </motion.div>
    </section>
  );
}
