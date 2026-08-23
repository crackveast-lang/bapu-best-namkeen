"use client";

/* Hero — a short animated brand intro.
   Sequence (starts when the preloader lifts):
   brand mark → main packet → supporting packets → namkeen bits & doodles →
   headline → copy → CTAs. Packets respond to scroll and (on desktop) the cursor. */

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { AMAZON_URL, FLIPKART_URL, ZOMATO_URL } from "@/lib/products";
import { useIntroReady } from "@/lib/intro";
import { Chilli, Coriander, SevSquiggle, Star, Sparkle, Seeds, HandArrow, Peanut, Burst } from "./Doodles";
import { DrawnUnderline } from "./AnimatedDoodles";

const easeOut = [0.22, 1, 0.36, 1] as const;
const pop = [0.34, 1.56, 0.64, 1] as const;

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef<HTMLElement>(null);

  /* scroll parallax */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ySide = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yWord = useTransform(scrollYProgress, [0, 1], [0, -80]);

  /* cursor parallax (desktop) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const mainX = useTransform(smx, (v) => v * 14);
  const mainY = useTransform(smy, (v) => v * 10);
  const backX = useTransform(smx, (v) => v * -22);
  const backY = useTransform(smy, (v) => v * -14);
  const frontX = useTransform(smx, (v) => v * 30);
  const frontY = useTransform(smy, (v) => v * 20);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const state = ready ? "show" : "hidden";

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      {/* warm glow */}
      <div className="pointer-events-none absolute -top-1/4 right-[-10%] h-[80vmin] w-[80vmin] rounded-full bg-orange/15 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-12%] h-[60vmin] w-[60vmin] rounded-full bg-green-leaf/12 blur-[100px]" />

      {/* giant outlined word — packets overlap it */}
      <motion.div
        style={{ y: yWord }}
        initial="hidden"
        animate={state}
        variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 1.2, delay: 0.35, ease: easeOut }}
        className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] z-0 select-none text-center text-[26vw] leading-none lg:text-[16rem]"
      >
        <span className="display outline-text block">Namkeen</span>
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        {/* ---------- copy ---------- */}
        <motion.div style={{ y: yText }} className="relative z-20">
          {/* 1. brand mark */}
          <motion.div
            initial="hidden"
            animate={state}
            variants={{ hidden: { opacity: 0, y: 16, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
            transition={{ duration: 0.6, ease: pop }}
            className="mb-6 flex items-center gap-3"
          >
            <Image src="/brand/logo.webp" alt="Best Namkeen logo" width={56} height={56} priority className="h-12 w-12 sm:h-14 sm:w-14" />
            <div className="leading-none">
              <p className="font-script text-2xl text-brand-red sm:text-3xl">Best Namkeen</p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.22em] text-charcoal/55 uppercase">
                Gwalior · Since 1960
              </p>
            </div>
          </motion.div>

          {/* 4. headline */}
          <h1 className="display text-[clamp(3.4rem,8.4vw,7.2rem)] text-charcoal">
            <Reveal show={ready} delay={0.95}>Crunch</Reveal>
            <Reveal show={ready} delay={1.05}>that feels</Reveal>
            <Reveal show={ready} delay={1.15} pad>
              <span className="relative inline-block text-orange">
                like home.
                <DrawnUnderline delay={1.9} className="absolute -bottom-[0.26em] left-0 -z-10 h-[0.18em] w-full" />
              </span>
            </Reveal>
          </h1>

          {/* 5. copy */}
          <motion.p
            initial="hidden"
            animate={state}
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, delay: 1.4, ease: easeOut }}
            className="mt-8 max-w-md text-lg leading-relaxed text-charcoal/70"
          >
            Small-batch namkeen made the Gwalior way — real besan, whole
            spices, and recipes that haven&apos;t changed since 1960.
          </motion.p>

          {/* 6. CTAs — Amazon & Flipkart primary, Zomato secondary */}
          <motion.div
            initial="hidden"
            animate={state}
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, delay: 1.6, ease: easeOut }}
            className="relative mt-9"
          >
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-orange px-7 py-4 text-base font-bold text-cream shadow-lg shadow-orange/30 transition-transform hover:scale-[1.05] active:scale-[0.97]"
              >
                Buy on Amazon
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={FLIPKART_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-green px-7 py-4 text-base font-bold text-cream shadow-lg shadow-green/25 transition-transform hover:scale-[1.05] active:scale-[0.97]"
              >
                Buy on Flipkart
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm font-semibold text-charcoal/60">
              <a href={ZOMATO_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-orange/50 underline-offset-4 transition-colors hover:text-orange-deep">
                or order on Zomato ↗
              </a>
              <a href="#shop" className="transition-colors hover:text-orange-deep">
                Explore the range ↓
              </a>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={ready ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.1 }}
              className="pointer-events-none absolute -top-9 right-2 hidden items-end gap-1 text-green lg:flex"
            >
              <span className="font-hand text-xl">start here</span>
              <HandArrow className="w-10 rotate-[120deg]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={state}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-charcoal/55"
          >
            <span>✦ No added preservatives</span>
            <span>✦ 100% real besan</span>
            <span>✦ ISO 22000 certified</span>
          </motion.div>
        </motion.div>

        {/* ---------- packet stage ---------- */}
        <div className="relative z-10 h-[430px] sm:h-[560px] lg:h-[660px]">
          {/* organic backdrop blob */}
          <motion.div
            initial="hidden"
            animate={state}
            variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }}
            transition={{ duration: 1, delay: 0.1, ease: easeOut }}
            className="absolute top-[6%] left-[10%] h-[78%] w-[80%] bg-orange-soft/70"
            style={{ borderRadius: "62% 38% 55% 45% / 48% 58% 42% 52%" }}
          />
          {/* floor shadow */}
          <motion.div
            initial="hidden"
            animate={state}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-4 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-charcoal/15 blur-2xl"
          />

          {/* 3. Ratlami — behind, left */}
          <motion.div style={{ y: ySide }} className="absolute top-[14%] left-[-2%] z-0 hidden w-[38%] sm:block">
            <motion.div style={{ x: backX, y: backY }}>
              <motion.div
                initial="hidden"
                animate={state}
                variants={{ hidden: { opacity: 0, x: -140, rotate: -26 }, show: { opacity: 1, x: 0, rotate: -12 } }}
                transition={{ duration: 1, delay: 0.55, ease: easeOut }}
              >
                <div className="bob packet-shadow-soft" style={{ "--bob-rot": "-12deg", animationDelay: "0.8s" } as React.CSSProperties}>
                  <Image src="/products/ratlami-sev.webp" alt="Best Namkeen Ratlami Sev packet" width={420} height={560} priority />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 2. Sada Sev — hero packet */}
          <motion.div style={{ y: yMain }} className="absolute top-[0%] left-1/2 z-10 w-[74%] max-w-[440px] -translate-x-1/2 sm:w-[62%]">
            <motion.div style={{ x: mainX, y: mainY }}>
              <motion.div
                initial="hidden"
                animate={state}
                variants={{ hidden: { opacity: 0, y: 180, rotate: 14, scale: 0.85 }, show: { opacity: 1, y: 0, rotate: 2, scale: 1 } }}
                transition={{ duration: 1.1, delay: 0.2, ease: easeOut }}
              >
                <div className="bob packet-shadow" style={{ "--bob-rot": "2deg" } as React.CSSProperties}>
                  <Image src="/products/sada-sev.webp" alt="Best Namkeen Sada Sev packet" width={560} height={760} priority />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3. Kadipatta — front right */}
          <motion.div style={{ y: ySide }} className="absolute right-[-4%] bottom-[2%] z-20 w-[46%] sm:right-[-2%] sm:w-[40%]">
            <motion.div style={{ x: frontX, y: frontY }}>
              <motion.div
                initial="hidden"
                animate={state}
                variants={{ hidden: { opacity: 0, y: 160, rotate: 26 }, show: { opacity: 1, y: 0, rotate: 11 } }}
                transition={{ duration: 1, delay: 0.7, ease: easeOut }}
              >
                <div className="bob packet-shadow" style={{ "--bob-rot": "11deg", animationDelay: "1.6s" } as React.CSSProperties}>
                  <Image src="/products/kadipatta-mix.webp" alt="Best Namkeen Kadipatta Mix packet" width={420} height={540} priority />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3b. namkeen bits & doodles */}
          <Drift show={ready} delay={0.95} className="absolute top-[4%] left-[10%] w-10 sm:w-12">
            <Chilli className="bob" />
          </Drift>
          <Drift show={ready} delay={1.05} className="absolute top-[46%] right-[4%] hidden w-10 sm:block">
            <Coriander className="bob" />
          </Drift>
          <Drift show={ready} delay={1.15} className="absolute bottom-[12%] left-[4%] hidden w-24 sm:block">
            <SevSquiggle className="bob" />
          </Drift>
          <Drift show={ready} delay={1.2} className="absolute top-[-2%] right-[20%] w-6">
            <Star className="bob" />
          </Drift>
          <Drift show={ready} delay={1.3} className="absolute bottom-[30%] left-[24%] z-30 w-5">
            <Sparkle className="bob" />
          </Drift>
          <Drift show={ready} delay={1.35} className="absolute bottom-[4%] right-[42%] hidden w-16 sm:block">
            <Seeds className="bob" />
          </Drift>
          <Drift show={ready} delay={1.4} className="absolute top-[30%] left-[32%] z-30 hidden w-9 sm:block">
            <Peanut className="bob -rotate-12" />
          </Drift>
          <Drift show={ready} delay={1.5} className="absolute top-[10%] right-[6%] w-7 text-orange">
            <Burst className="bob" />
          </Drift>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-charcoal/40 sm:flex"
      >
        <span className="font-hand text-lg">scroll for the good stuff</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

function Reveal({
  children,
  delay,
  pad,
  show,
}: {
  children: React.ReactNode;
  delay: number;
  pad?: boolean;
  show: boolean;
}) {
  return (
    <span className={`block overflow-hidden ${pad ? "pb-[0.3em]" : "pb-[0.08em]"}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={show ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 0.85, delay, ease: easeOut }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Drift({
  children,
  className,
  delay,
  show,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  show: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -30 }}
      animate={show ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -30 }}
      transition={{ duration: 0.6, delay, ease: pop }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
