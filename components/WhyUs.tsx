"use client";

import { motion } from "framer-motion";
import { Coriander } from "./Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

/* hand-drawn feature icons */
function BesanBowl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M10 30h44c0 14-10 22-22 22S10 44 10 30z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M18 30c1-8 5-13 9-16M32 30c0-7 2-12 5-16M45 30c-.4-6-3-11-6-14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="12" r="2.4" fill="currentColor" />
      <circle cx="41" cy="9" r="2" fill="currentColor" />
    </svg>
  );
}
function NoColour({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M32 8c8 11 14 19 14 27a14 14 0 11-28 0c0-8 6-16 14-27z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M10 54L54 10" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}
function FreshLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M50 12C28 14 14 26 13 48c22 2 36-12 37-36z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M16 46c8-12 18-20 28-26" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
function PackedHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M14 22l4-10h28l4 10v30H14V22z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M14 22h36" stroke="currentColor" strokeWidth="2.6" />
      <path d="M32 44c-5-4-9-7.4-9-11.4 0-4.8 5.6-6.4 9-2.4 3.4-4 9-2.4 9 2.4 0 4-4 7.4-9 11.4z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

const features = [
  {
    n: "01",
    icon: BesanBowl,
    title: "Made with real besan",
    body: "Stone-ground gram flour and groundnut oil. No fillers, no maida shortcuts.",
  },
  {
    n: "02",
    icon: NoColour,
    title: "No artificial colours",
    body: "That golden shade comes from besan and turmeric — nothing out of a bottle.",
  },
  {
    n: "03",
    icon: FreshLeaf,
    title: "No added preservatives",
    body: "Fried fresh, sealed fast. It tastes like it was made this morning, because it was.",
  },
  {
    n: "04",
    icon: PackedHeart,
    title: "Packed with care",
    body: "Zip-lock pouches that keep every strand crunchy from our kadhai to your chai.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-green-deep py-24 text-cream sm:py-32">
      <Coriander className="absolute top-10 right-8 w-16 opacity-25 sm:right-16" />
      <Coriander className="absolute bottom-12 left-6 w-12 -rotate-45 opacity-20" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-3 text-xs font-bold tracking-[0.22em] text-green-leaf uppercase"
        >
          Why Best Namkeen
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
          className="display max-w-3xl text-5xl sm:text-7xl"
        >
          Honest namkeen.
          <br />
          <span className="text-orange">Nothing to hide.</span>
        </motion.h2>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: easeOut }}
              className="group border-t-2 border-cream/15 pt-6"
            >
              <div className="flex items-start justify-between">
                <span className="display text-5xl text-cream/20 transition-colors duration-500 group-hover:text-orange/60">
                  {f.n}
                </span>
                <f.icon className="w-11 text-green-leaf transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-cream/65">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
