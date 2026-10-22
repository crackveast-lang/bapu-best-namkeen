"use client";

/* Trust bridge — the parent/sub-brand relationship told from the customer's
   side: the Best Namkeen counter you already know → the Best Bite pack in
   your hand. A dotted line draws itself between the two and a small heart
   ("the same trust") travels along it. */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkle } from "./Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

const points = [
  {
    n: "01",
    title: "Same family",
    body: "Best Bite is made by the Best Namkeen family — the people behind the counters you've bought from since 1960.",
  },
  {
    n: "02",
    title: "Same kitchen, same recipes",
    body: "Our own ISO 22000:2018 certified kitchen in Gwalior, and the recipes you already know by taste.",
  },
  {
    n: "03",
    title: "Sealed for you since 1997",
    body: "Packed in a 400g zip-lock pouch, so that taste can reach your home, your city and your gifts.",
  },
];

/** A heart centred on (0,0), for travelling along the path. */
const HEART = "M0 5C-5 1.4-7.5-1.2-7.5-4.2-7.5-7.6-3.6-8.8 0-5.6 3.6-8.8 7.5-7.6 7.5-4.2 7.5-1.2 5 1.4 0 5z";

function Connector({ d, viewBox, arrow, className }: { d: string; viewBox: string; arrow: string; className: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox={viewBox} fill="none" className={className} aria-hidden>
      <motion.path
        d={d}
        stroke="#e07b1f"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 9"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
      />
      <motion.path
        d={arrow}
        stroke="#e07b1f"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.3, delay: 1.7 }}
      />
      {!reduce && (
        <path d={HEART} fill="#b5121b">
          <animateMotion dur="3.2s" begin="1.8s" repeatCount="indefinite" path={d} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="3.2s" begin="1.8s" repeatCount="indefinite" />
        </path>
      )}
    </svg>
  );
}

export default function TrustBridge() {
  return (
    <section id="trust" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-3 text-xs font-bold tracking-[0.22em] text-orange-deep uppercase"
          >
            Who makes Best Bite?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
            className="display text-5xl text-charcoal sm:text-7xl"
          >
            At the counter since 1960.
            <br />
            <span className="text-orange">In your pack since 1997.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-charcoal/70"
          >
            If you&apos;ve ever bought namkeen at a Best Namkeen store in Gwalior, you already know
            Best Bite. Since 1997 it&apos;s been the same trust — packed so it can come home with you.
          </motion.p>
        </div>

        {/* the handoff: store → line → pack */}
        <div className="mt-14 grid items-center gap-2 lg:mt-20 lg:grid-cols-[1fr_minmax(160px,240px)_1fr] lg:gap-6">
          {/* parent */}
          <motion.figure
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mx-auto w-full max-w-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border-4 border-cream shadow-xl shadow-charcoal/10">
              <Image
                src="/stores/store-phalka.webp"
                alt="The Best Namkeen shopfront at Phalka Bazar, Gwalior"
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center">
              <span className="text-[11px] font-bold tracking-[0.22em] text-charcoal/50 uppercase">The name you trust</span>
              <span className="font-script block text-3xl text-brand-red">Best Namkeen</span>
              <span className="font-hand text-xl text-charcoal/60">Gwalior&apos;s counters since 1960</span>
            </figcaption>
          </motion.figure>

          {/* connector */}
          <div className="relative flex flex-col items-center">
            <Connector
              viewBox="0 0 240 90"
              d="M10 60C70 6 170 6 226 52"
              arrow="M212 54l15-1-5-14"
              className="hidden w-full lg:block"
            />
            <Connector
              viewBox="0 0 90 150"
              d="M45 6C12 50 78 92 45 138"
              arrow="M34 128l11 11 9-13"
              className="h-32 lg:hidden"
            />
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="font-hand -rotate-3 text-2xl text-orange-deep lg:absolute lg:-bottom-6"
            >
              same trust, carried over
            </motion.span>
          </div>

          {/* sub-brand */}
          <motion.figure
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.9, ease: easeOut }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative flex aspect-[16/10] items-center justify-center rounded-[2rem] bg-orange-soft/50">
              <Sparkle className="absolute top-6 left-8 w-5" />
              <Sparkle className="absolute right-10 bottom-8 w-4" />
              <div className="bob packet-shadow h-[92%] lg:h-[115%] lg:-translate-y-[6%]" style={{ "--bob-rot": "-6deg" } as React.CSSProperties}>
                <Image
                  src="/products/ratlami-sev.webp"
                  alt="A Best Bite Namkeen Ratlami Sev pack"
                  width={420}
                  height={560}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            <figcaption className="mt-4 text-center">
              <span className="text-[11px] font-bold tracking-[0.22em] text-charcoal/50 uppercase">The pack in your hand</span>
              <span className="display block text-3xl text-charcoal">
                Best <span className="text-orange">Bite</span> Namkeen
              </span>
              <span className="font-hand text-xl text-charcoal/60">the same taste, packed since 1997</span>
            </figcaption>
          </motion.figure>
        </div>

        {/* why that trust holds */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-x-10 gap-y-8 sm:grid-cols-3 lg:mt-24">
          {points.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: easeOut }}
              className="border-t-2 border-charcoal/10 pt-5"
            >
              <span className="display text-4xl text-orange/40">{p.n}</span>
              <h3 className="mt-3 text-xl font-bold text-charcoal">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-charcoal/65">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
