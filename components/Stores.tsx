"use client";

/* "Come crunch with us." — interactive store discovery for Gwalior.
   Desktop: selectable list + crossfading store imagery. Mobile: stacked cards. */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { stores } from "@/lib/stores";
import { Star, HandArrow, PinSketch } from "./Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21c-4.5-4.6-7-8-7-11a7 7 0 1114 0c0 3-2.5 6.4-7 11z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="12" cy="10" r="2.6" fill="#f6efe2" />
    </svg>
  );
}

export default function Stores() {
  const [active, setActive] = useState(0);
  const store = stores[active];

  return (
    <section id="stores" className="relative overflow-hidden bg-cream-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* heading */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="mb-3 text-xs font-bold tracking-[0.22em] text-orange-deep uppercase"
            >
              Visit Us · Gwalior
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
              className="display text-5xl text-charcoal sm:text-7xl"
            >
              Come crunch
              <br />
              <span className="text-green">with us.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="font-hand mt-3 text-2xl text-charcoal/55"
            >
              Gwalior, we&apos;ve got you covered.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden items-end gap-2 pb-2 text-charcoal/50 lg:flex"
          >
            <span className="font-hand text-2xl">four counters across Gwalior</span>
            <HandArrow className="w-14 rotate-12" />
          </motion.div>
        </div>

        {/* ---------- desktop: list + image stage ---------- */}
        <div className="hidden gap-10 lg:grid lg:grid-cols-[1fr_1.2fr]">
          <motion.ul
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="flex flex-col divide-y divide-charcoal/10"
          >
            {stores.map((s, i) => {
              const selected = i === active;
              return (
                <li key={s.slug}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-center justify-between gap-4 py-6 text-left transition-colors ${
                      selected ? "text-charcoal" : "text-charcoal/45 hover:text-charcoal/75"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <motion.span
                        animate={selected ? { scale: 1.15, rotate: [0, -12, 8, 0] } : { scale: 1 }}
                        transition={{ duration: 0.55, ease: easeOut }}
                        className={selected ? "text-orange" : "text-charcoal/25"}
                      >
                        <PinSketch className="w-6" />
                      </motion.span>
                      <div>
                        <span className="display block text-3xl xl:text-4xl">{s.name}</span>
                        <span className="mt-1 block text-sm font-semibold tracking-wide text-charcoal/50">
                          {s.locality}
                          {s.flagship && (
                            <span className="ml-2 rounded-full bg-orange/15 px-2 py-0.5 text-[10px] font-bold tracking-widest text-orange-deep uppercase">
                              Since 1960
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-2xl transition-transform duration-300 ${
                        selected ? "translate-x-0 text-orange" : "-translate-x-2 opacity-0 group-hover:opacity-60"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>

          {/* image stage */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-charcoal/20">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={store.slug}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: easeOut }}
                  className="absolute inset-0"
                >
                  <Image
                    src={store.img}
                    alt={`${store.name} store — ${store.caption}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent p-6 pt-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={store.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: easeOut }}
                  >
                    <p className="font-hand text-xl text-cream/85">{store.caption}</p>
                    <p className="mt-1 text-sm leading-relaxed font-medium text-cream/80">
                      {store.address}
                      {store.hours ? ` · ${store.hours}` : ""}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <a
              href={store.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute -bottom-5 right-8 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-cream shadow-lg shadow-orange/30 transition-transform hover:scale-[1.05] active:scale-[0.97]"
            >
              <PinIcon className="w-4" />
              Get directions
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
            <Star className="absolute -top-4 -left-3 w-7" />
          </motion.div>
        </div>

        {/* ---------- mobile: stacked cards ---------- */}
        <div className="flex flex-col gap-8 lg:hidden">
          {stores.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: easeOut }}
              className="overflow-hidden rounded-[1.75rem] bg-cream shadow-lg shadow-charcoal/10"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={s.img}
                  alt={`${s.name} store — ${s.caption}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                {s.flagship && (
                  <span className="absolute top-4 left-4 rounded-full bg-orange px-3 py-1 text-[10px] font-bold tracking-widest text-cream uppercase">
                    Since 1960
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="display text-2xl text-charcoal">{s.name}</h3>
                    <p className="mt-0.5 text-xs font-bold tracking-wide text-charcoal/50 uppercase">
                      {s.locality}
                    </p>
                  </div>
                  <PinSketch className="w-5 shrink-0 text-orange" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                  {s.address}
                  {s.hours ? ` · ${s.hours}` : ""}
                </p>
                <a
                  href={s.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-bold text-cream transition-colors hover:bg-orange"
                >
                  Get directions ↗
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
