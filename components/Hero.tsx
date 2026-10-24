"use client";

/* Hero — "a premium namkeen poster brought to life".
   Clean upper half → centred message → real transparent packets rising from
   the lower-left and lower-right corners to frame it.
   Entrance (after the preloader lifts): brand → headline → copy → CTAs →
   packets rise from the corners → doodles. Scroll pushes the clusters outward. */

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { AMAZON_URL, ZOMATO_URL } from "@/lib/products";
import { useIntroReady } from "@/lib/intro";
import { Chilli, SevSquiggle, Seeds, HandArrow, Peanut, Coriander, Diya, Marigold, Rangoli } from "./Doodles";
import { DrawnUnderline, DrawnCircle } from "./AnimatedDoodles";
import BestBites from "./BestBites";

const easeOut = [0.22, 1, 0.36, 1] as const;
const pop = [0.34, 1.56, 0.64, 1] as const;

type Packet = {
  src: string;
  alt: string;
  /** css classes for position/size (absolute, anchored to the section bottom) */
  className: string;
  rotate: number;
  delay: number;
  shadow?: "soft";
  bob: string;
  /** hidden below this breakpoint */
  from?: "sm" | "lg";
};

const LEFT: Packet[] = [
  { src: "/products/ratlami-sev.webp", alt: "Best Namkeen Ratlami Sev packet", className: "bottom-[16%] left-[10%] z-0 w-[14vw] max-w-[220px]", rotate: -6, delay: 1.35, shadow: "soft", bob: "1.3s", from: "lg" },
  { src: "/products/sada-sev.webp", alt: "Best Namkeen Sada Sev packet", className: "bottom-[-4%] left-[-4%] z-10 w-[40vw] max-w-[360px] sm:w-[26vw] lg:w-[22vw]", rotate: -14, delay: 1.15, bob: "0s" },
  { src: "/products/kadipatta-mix.webp", alt: "Best Namkeen Kadipatta Mix packet", className: "bottom-[0%] left-[16%] z-20 w-[12vw] max-w-[200px]", rotate: 9, delay: 1.5, bob: "2.1s", from: "sm" },
];

const RIGHT: Packet[] = [
  { src: "/products/indori-khatta.webp", alt: "Best Namkeen Indori Khatta Meetha packet", className: "bottom-[17%] right-[11%] z-0 w-[13vw] max-w-[210px]", rotate: 8, delay: 1.45, shadow: "soft", bob: "0.7s", from: "lg" },
  { src: "/products/milan-mixture.webp", alt: "Best Namkeen Milan Mixture packet", className: "bottom-[-5%] right-[-3%] z-10 w-[38vw] max-w-[340px] sm:w-[24vw] lg:w-[21vw]", rotate: 12, delay: 1.25, bob: "1.7s" },
  { src: "/products/waffer-mix.webp", alt: "Best Namkeen Waffer Mix packet", className: "bottom-[-2%] right-[17%] z-20 w-[11.5vw] max-w-[190px]", rotate: -10, delay: 1.6, bob: "2.6s", from: "sm" },
];

export default function Hero() {
  const ready = useIntroReady();
  const ref = useRef<HTMLElement>(null);

  /* scroll parallax — clusters drift outward, text lifts slightly */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yCluster = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rLeft = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const rRight = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yDoodle = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yWord = useTransform(scrollYProgress, [0, 1], [0, 60]);

  /* cursor parallax (desktop) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 18 });
  const smy = useSpring(my, { stiffness: 50, damping: 18 });
  const leftX = useTransform(smx, (v) => v * -14);
  const rightX = useTransform(smx, (v) => v * 14);
  const clusterY = useTransform(smy, (v) => v * 8);

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
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-32 pb-[62vw] sm:pb-[30vw] lg:pb-[22vh]"
    >
      {/* warm glow */}
      <div className="pointer-events-none absolute top-[-10%] left-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-orange/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-30%] left-[-10%] h-[60vmin] w-[60vmin] rounded-full bg-green-leaf/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-30%] h-[60vmin] w-[60vmin] rounded-full bg-orange/12 blur-[100px]" />

      {/* faint outlined word — packets overlap it */}
      <motion.div
        style={{ y: yWord }}
        initial="hidden"
        animate={state}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        transition={{ duration: 1.4, delay: 1.1 }}
        className="pointer-events-none absolute inset-x-0 -bottom-[0.16em] z-0 select-none text-center text-[24vw] leading-none lg:text-[15rem]"
      >
        <span className="display outline-text block opacity-70">Namkeen</span>
      </motion.div>

      {/* ---------- centred message ---------- */}
      <motion.div style={{ y: yText }} className="relative z-30 flex max-w-3xl flex-col items-center text-center">
        {/* 1. brand */}
        <motion.div
          initial="hidden"
          animate={state}
          variants={{ hidden: { opacity: 0, y: 14, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
          transition={{ duration: 0.6, ease: pop }}
          className="flex items-center gap-3"
        >
          <Image src="/brand/logo.webp" alt="Best Namkeen logo" width={56} height={56} priority className="h-11 w-11 sm:h-13 sm:w-13" />
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[11px] font-bold tracking-[0.22em] text-charcoal/50 uppercase">From the house of</span>
            <span className="font-script text-2xl text-namkeen-blue sm:text-3xl">Best Namkeen</span>
          </span>
        </motion.div>

        <motion.p
          initial="hidden"
          animate={state}
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
          className="font-hand relative mt-4 -rotate-2 text-2xl text-green sm:text-3xl"
        >
          Gwalior&apos;s own, since 1960
          <DrawnCircle delay={2.2} color="#2e6b34" className="pointer-events-none absolute -inset-x-5 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+2.5rem)] opacity-60" />
        </motion.p>

        {/* 2. headline */}
        {/* sub-brand headline — Best Bites Namkeen, by Best Namkeen (above) */}
        <h1 className="display relative mt-5 text-[clamp(2.7rem,6.8vw,6.4rem)] text-charcoal">
          {/* festive: faint rangoli behind the headline */}
          <Rangoli className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[2.3em] -translate-x-1/2 -translate-y-1/2 text-orange opacity-[0.22]" />
          <Reveal show={ready} delay={0.45}>
            <BestBites variant="logo" className="text-[1.08em]" />
          </Reveal>
          <Reveal show={ready} delay={0.58} pad>
            <span className="relative inline-block whitespace-nowrap">
              Namkeen.
              <DrawnUnderline delay={1.5} className="absolute -bottom-[0.22em] right-0 -z-10 h-[0.16em] w-[70%]" />
            </span>
          </Reveal>
        </h1>

        {/* 3. copy */}
        <motion.p
          initial="hidden"
          animate={state}
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, delay: 0.85, ease: easeOut }}
          className="mt-5 max-w-lg text-lg leading-relaxed text-charcoal/70"
        >
          The crunch you&apos;ll remember — Best Namkeen&apos;s Gwalior recipes, packed as
          {" "}<BestBites /> since 1997. Real besan, whole spices, small batches.
        </motion.p>

        {/* 4. CTAs — Amazon primary, Zomato secondary */}
        <motion.div
          initial="hidden"
          animate={state}
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, delay: 1.0, ease: easeOut }}
          className="relative mt-7"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full bg-orange px-7 py-4 text-base font-bold text-cream shadow-lg shadow-orange/30 transition-transform hover:scale-[1.05] active:scale-[0.97]"
            >
              Buy on Amazon
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
          <div className="mt-4 flex items-center justify-center gap-5 text-sm font-semibold text-charcoal/60">
            <a href={ZOMATO_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-orange/50 underline-offset-4 transition-colors hover:text-orange-deep">
              or order on Zomato ↗
            </a>
            <a href="#shop" className="transition-colors hover:text-orange-deep">
              Explore the range ↓
            </a>
          </div>
          {/* handwritten pointer */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="pointer-events-none absolute -top-8 -left-6 hidden -rotate-6 items-end gap-1 text-orange-deep lg:flex"
          >
            <span className="font-hand text-2xl">start here</span>
            <HandArrow className="w-10 rotate-[100deg]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---------- lower-left cluster ---------- */}
      <motion.div style={{ x: xLeft, y: yCluster, rotate: rLeft }} className="pointer-events-none absolute inset-0 z-10">
        <motion.div style={{ x: leftX, y: clusterY }} className="absolute inset-0">
          {LEFT.map((p) => (
            <PacketItem key={p.src} p={p} show={ready} />
          ))}
        </motion.div>
      </motion.div>

      {/* ---------- lower-right cluster ---------- */}
      <motion.div style={{ x: xRight, y: yCluster, rotate: rRight }} className="pointer-events-none absolute inset-0 z-10">
        <motion.div style={{ x: rightX, y: clusterY }} className="absolute inset-0">
          {RIGHT.map((p) => (
            <PacketItem key={p.src} p={p} show={ready} />
          ))}
        </motion.div>
      </motion.div>

      {/* ---------- doodles (lower areas + edges) ---------- */}
      <motion.div style={{ y: yDoodle }} className="pointer-events-none absolute inset-0 z-20">
        <Drift show={ready} delay={1.8} className="absolute bottom-[34%] left-[6%] w-10 sm:w-12">
          <Chilli className="bob -rotate-12" />
        </Drift>
        <Drift show={ready} delay={1.9} className="absolute bottom-[8%] left-[36%] hidden w-24 lg:block">
          <SevSquiggle className="bob" />
        </Drift>
        <Drift show={ready} delay={2.0} className="absolute right-[6%] bottom-[40%] w-9 sm:w-11">
          <Diya className="bob" />
        </Drift>
        <Drift show={ready} delay={2.05} className="absolute bottom-[3%] left-1/2 hidden w-16 -translate-x-1/2 sm:block">
          <Seeds className="bob" />
        </Drift>
        <Drift show={ready} delay={2.1} className="absolute right-[30%] bottom-[12%] hidden w-9 lg:block">
          <Peanut className="bob rotate-12" />
        </Drift>
        <Drift show={ready} delay={2.15} className="absolute top-[22%] right-[12%] hidden w-9 lg:block">
          <Marigold className="bob" />
        </Drift>
        <Drift show={ready} delay={2.2} className="absolute top-[28%] left-[11%] hidden w-12 lg:block">
          <Diya className="bob" />
        </Drift>
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.3 }}
          className="font-hand absolute top-[21%] left-[7%] hidden -rotate-6 text-2xl text-orange-deep lg:block"
        >
          Shubh Deepavali ✦
        </motion.div>
        <Drift show={ready} delay={2.25} className="absolute right-[4%] bottom-[22%] hidden w-9 sm:block">
          <Coriander className="bob" />
        </Drift>
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.3 }}
          className="font-hand absolute right-[22%] bottom-[30%] hidden rotate-6 text-2xl text-charcoal/55 lg:block"
        >
          chai approved ✓
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-1 text-charcoal/40 lg:flex"
      >
        <span className="font-hand text-lg">scroll for the good stuff</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

function PacketItem({ p, show }: { p: Packet; show: boolean }) {
  const hide = p.from === "lg" ? "hidden lg:block" : p.from === "sm" ? "hidden sm:block" : "";
  return (
    <motion.div
      initial={{ opacity: 0, y: 260, rotate: p.rotate * 2.2 }}
      animate={show ? { opacity: 1, y: 0, rotate: p.rotate } : { opacity: 0, y: 260, rotate: p.rotate * 2.2 }}
      transition={{ duration: 1.1, delay: p.delay, ease: easeOut }}
      className={`absolute ${p.className} ${hide}`}
    >
      <div
        className={`bob ${p.shadow === "soft" ? "packet-shadow-soft" : "packet-shadow"}`}
        style={{ "--bob-rot": "0deg", animationDelay: p.bob, animationDuration: "6.5s" } as React.CSSProperties}
      >
        <Image src={p.src} alt={p.alt} width={420} height={560} priority className="w-full" />
      </div>
    </motion.div>
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
