"use client";

/* "Six Decades. One Timeless Taste." — the brand story told as six scroll moments.
   Editorial typography + archival store imagery + floating product elements. */

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Sparkle, Seeds, SevSquiggle, Stamp1960 } from "./Doodles";
import { DrawnUnderline } from "./AnimatedDoodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
} as const;

export default function StoryCinema() {
  return (
    <section id="story" className="relative overflow-hidden">
      <MomentOpening />
      <Moment1960 />
      <MomentGenerations />
      <MomentPhilosophy />
      <MomentFeeling />
      <MomentEnding />
    </section>
  );
}

/* ---------- Moment 01 — opening ---------- */
function MomentOpening() {
  return (
    <div className="relative mx-auto max-w-5xl px-5 pt-28 pb-20 text-center sm:px-8 sm:pt-40 sm:pb-28">
      <motion.p
        {...fadeUp}
        transition={{ duration: 0.6, ease: easeOut }}
        className="mb-4 text-xs font-bold tracking-[0.22em] text-orange-deep uppercase"
      >
        Our Story
      </motion.p>
      <h2 className="display text-[clamp(2.8rem,7.5vw,6.5rem)] text-charcoal">
        <Line delay={0}>Six decades.</Line>
        <Line delay={0.12}>
          One <span className="text-orange">timeless</span> taste.
        </Line>
      </h2>
      <motion.p
        {...fadeUp}
        transition={{ duration: 0.8, delay: 0.35, ease: easeOut }}
        className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-charcoal/65"
      >
        Some tastes are enjoyed.
        <br />
        Some become memories.
        <br />
        And some become a legacy.
      </motion.p>
      <Star className="absolute top-24 left-[12%] w-6 rotate-12 sm:top-36" />
      <Sparkle className="absolute right-[14%] bottom-16 w-5" />
    </div>
  );
}

/* ---------- Moment 02 — 1960 ---------- */
function Moment1960() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yPacket = useTransform(scrollYProgress, [0, 1], [90, -60]);

  return (
    <div ref={ref} className="relative bg-cream-2 py-24 sm:py-32">
      {/* packet drifting through the moment */}
      <motion.div
        style={{ y: yPacket }}
        className="pointer-events-none absolute top-[18%] left-[42%] z-0 hidden w-40 -rotate-12 opacity-90 lg:block"
      >
        <Image
          src="/products/milan-mixture.webp"
          alt="Milan Mixture packet"
          width={300}
          height={420}
          className="packet-shadow-soft"
        />
      </motion.div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: easeOut }}
            className="display block text-[clamp(6rem,20vw,17rem)] leading-none text-orange"
          >
            1960
          </motion.span>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.25, ease: easeOut }}
            className="mt-4 max-w-md text-lg leading-relaxed text-charcoal/70"
          >
            <strong className="text-charcoal">Shri Seth Sunny Lal Bedar</strong> began a
            journey with a simple belief — when quality is uncompromised,
            taste becomes timeless.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
            className="font-hand mt-4 text-2xl text-green"
          >
            one kadhai, one bazar, one belief
          </motion.p>
        </div>

        <motion.figure
          style={{ y: yPhoto }}
          initial={{ opacity: 0, rotate: 4 }}
          whileInView={{ opacity: 1, rotate: 2 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="relative mx-auto w-full max-w-sm rounded-2xl bg-cream p-3 pb-10 shadow-xl shadow-charcoal/15"
        >
          <Image
            src="/stores/store-heritage.webp"
            alt="Inside the classic Best Namkeen store — shelves stacked with namkeen"
            width={700}
            height={900}
            className="rounded-lg"
          />
          <figcaption className="font-hand absolute bottom-2 left-0 w-full text-center text-xl text-charcoal/60">
            the bazar shop, still going strong
          </figcaption>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 14 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -top-8 -right-6 w-24 text-brand-red"
          >
            <Stamp1960 className="w-full" />
          </motion.div>
        </motion.figure>
      </div>
    </div>
  );
}

/* ---------- Moment 03 — generations ---------- */
function MomentGenerations() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yPacket = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yImg = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div style={{ y: yImg }} className="relative order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, rotate: -4, y: 40 }}
            whileInView={{ opacity: 1, rotate: -2, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="overflow-hidden rounded-[2rem] shadow-2xl shadow-charcoal/20"
          >
            <Image
              src="/stores/store-counter.webp"
              alt="The modern Best Namkeen store counter today"
              width={900}
              height={640}
              className="w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: yPacket }}
            initial={{ opacity: 0, rotate: 14, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 9, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
            className="absolute -right-4 -bottom-10 w-36 sm:w-44"
          >
            <Image
              src="/products/sada-sev.webp"
              alt="Sada Sev packet"
              width={300}
              height={400}
              className="packet-shadow"
            />
          </motion.div>
          <Seeds className="absolute -bottom-6 left-8 w-20" />
        </motion.div>

        <div className="order-1 lg:order-2">
          <motion.h3
            {...fadeUp}
            transition={{ duration: 0.7, ease: easeOut }}
            className="display text-4xl text-charcoal sm:text-6xl"
          >
            From one generation
            <br />
            <span className="text-green">to the next.</span>
          </motion.h3>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/70"
          >
            What started more than six decades ago has grown into a name
            trusted by generations. Times changed, generations evolved — one
            thing never moved: our commitment to quality, freshness, and that
            unmistakable taste.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
            className="mt-5 max-w-md text-lg leading-relaxed text-charcoal/70"
          >
            Every ingredient is carefully chosen. Every recipe is prepared
            with care. And every bite carries the same dedication that started
            it all.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Moment 04 — philosophy ---------- */
function MomentPhilosophy() {
  const words = [
    { w: "Quality.", c: "text-orange" },
    { w: "Freshness.", c: "text-green" },
    { w: "Taste.", c: "text-charcoal" },
  ];
  return (
    <div className="relative bg-cream-2 py-24 text-center sm:py-36">
      <SevSquiggle className="absolute top-10 right-[10%] w-24 opacity-60" />
      <Sparkle className="absolute bottom-14 left-[12%] w-5" />
      <div className="mx-auto max-w-4xl px-5">
        {words.map((item, i) => (
          <motion.span
            key={item.w}
            initial={{ opacity: 0, y: 70, rotate: i % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.18, ease: easeOut }}
            className={`display block text-[clamp(3.5rem,10vw,8.5rem)] leading-[1.02] ${item.c}`}
          >
            {item.w}
          </motion.span>
        ))}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
          className="font-hand mx-auto mt-8 text-2xl text-charcoal/55"
        >
          the three things that never left the recipe
        </motion.p>
      </div>
    </div>
  );
}

/* ---------- Moment 05 — the feeling ---------- */
function MomentFeeling() {
  const images = [
    { src: "/products/life-kadipatta.webp", alt: "Namkeen scattered around a bowl at chai time", cap: "celebrations" },
    { src: "/products/life-sada-topdown.webp", alt: "A full bowl of sev from above", cap: "conversations" },
    { src: "/products/gal-indori-hand.webp", alt: "A hand holding an Indori Khatta Meetha pack", cap: "memories" },
  ];
  return (
    <div className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mx-auto max-w-lg text-xl leading-relaxed text-charcoal/70 sm:text-2xl"
        >
          Because for us, namkeen is not simply something you eat.
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {images.map((img, i) => (
            <motion.figure
              key={img.cap}
              initial={{ opacity: 0, y: 60, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: i === 1 ? -14 : 0, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: easeOut }}
              className="group relative"
            >
              <div className="overflow-hidden rounded-3xl shadow-lg shadow-charcoal/10">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={520}
                  height={640}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="display mt-5 text-2xl text-charcoal sm:text-3xl">
                {img.cap}.
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
          className="mx-auto mt-12 max-w-md text-lg leading-relaxed text-charcoal/65"
        >
          And perhaps that is why our customers don&apos;t just come back for
          the taste. <span className="font-hand text-2xl text-orange-deep">They come back for the feeling.</span>
        </motion.p>
      </div>
    </div>
  );
}

/* ---------- Moment 06 — cinematic ending ---------- */
function MomentEnding() {
  const lines = ["The taste.", "The tradition.", "The trust."];
  return (
    <div className="relative overflow-hidden bg-green-deep py-28 text-center text-cream sm:py-40">
      <div className="pointer-events-none absolute top-[-20%] left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-orange/10 blur-[100px]" />
      <div className="relative mx-auto max-w-4xl px-5">
        {lines.map((l, i) => (
          <motion.span
            key={l}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.2, ease: easeOut }}
            className="display block text-[clamp(3rem,8.5vw,7rem)] leading-[1.04]"
          >
            {l}
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
          className="mx-auto mt-12 w-32 sm:w-40"
        >
          <Image
            src="/brand/logo.webp"
            alt="Bapu Best Namkeen — since 1960"
            width={320}
            height={320}
            className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
          />
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.85, ease: easeOut }}
          className="mt-8 text-lg font-semibold text-cream/85"
        >
          Best Namkeen. Since 1960.
        </motion.p>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 1, ease: easeOut }}
          className="relative mx-auto mt-2 inline-block"
        >
          <span className="font-hand text-2xl text-green-leaf">
            a legacy of taste. a tradition of trust.
          </span>
          <DrawnUnderline delay={1.1} className="absolute -bottom-2 left-0 h-3 w-full opacity-70" />
        </motion.div>
      </div>
    </div>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.09em]">
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, delay, ease: easeOut }}
      >
        {children}
      </motion.span>
    </span>
  );
}
