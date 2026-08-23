"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Seeds, Star } from "./Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

/* hand-drawn chai cup with animated steam */
function ChaiCup({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden>
      {/* steam */}
      <g stroke="#b95c0d" strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="steam-line" d="M46 46c-3-6 3-8 0-14 3-6-3-8 0-14" style={{ animationDelay: "0s" }} />
        <path className="steam-line" d="M62 44c-3-6 3-8 0-14 3-6-3-8 0-14" style={{ animationDelay: "1.1s" }} />
        <path className="steam-line" d="M78 46c-3-6 3-8 0-14 3-6-3-8 0-14" style={{ animationDelay: "2.2s" }} />
      </g>
      {/* cup */}
      <path d="M30 58h64c0 20-8 34-22 38H52c-14-4-22-18-22-38z" fill="#e07b1f" stroke="#8c4a0a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M94 62c10-2 16 4 12 12-3 6-10 8-16 6" stroke="#8c4a0a" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M38 64c14 4 34 4 48 0" stroke="#8c4a0a" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* saucer */}
      <path d="M24 100h76c-4 8-18 12-38 12s-34-4-38-12z" fill="#c46210" stroke="#8c4a0a" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

export default function ChaiTime() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yBowl = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotBowl = useTransform(scrollYProgress, [0, 1], [-4, 6]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-cream via-orange-soft/60 to-cream py-24 sm:py-36"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        {/* bowl photo */}
        <motion.div style={{ y: yBowl, rotate: rotBowl }} className="relative mx-auto w-full max-w-lg">
          <div className="overflow-hidden rounded-[3rem] shadow-2xl shadow-orange/25">
            <Image
              src="/products/life-sada-topdown.webp"
              alt="Sada Sev packet and a full bowl of sev from above"
              width={800}
              height={1000}
              className="w-full object-cover"
            />
          </div>
          <Star className="absolute -top-4 right-8 w-8" />
          <Seeds className="absolute -bottom-6 left-6 w-24" />
        </motion.div>

        {/* copy */}
        <div className="relative text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="mx-auto mb-6 w-28 lg:mx-0 lg:w-32"
          >
            <ChaiCup />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="display text-5xl text-charcoal sm:text-7xl"
          >
            Chai <span className="font-script lowercase text-brand-red">&</span> namkeen.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
            className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-charcoal/70 lg:mx-0"
          >
            Some pairs were never meant to be separated. Four o&apos;clock, a
            hot cup, a full bowl — and the little pause where the day finally
            makes sense.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-hand mt-6 text-2xl text-orange-deep"
          >
            pour the chai. we&apos;ll handle the crunch.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
