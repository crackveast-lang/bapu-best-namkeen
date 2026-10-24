"use client";

/* Brand preloader — shown once per session on first load.
   Logo pops in, a packet floats, a thin progress line fills, then the
   curtain lifts and signals the Hero to start its intro sequence. */

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { finishIntro, INTRO_KEY } from "@/lib/intro";
import { Star, Sparkle } from "./Doodles";

const MIN_MS = 1100;
const MAX_MS = 2300;

export default function Preloader() {
  const [phase, setPhase] = useState<"pending" | "show" | "done">("pending");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced) {
      setPhase("done");
      finishIntro();
      return;
    }

    setPhase("show");
    const start = performance.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setPhase("done");
    };
    const tryFinish = () => {
      const elapsed = performance.now() - start;
      setTimeout(finish, Math.max(0, MIN_MS - elapsed));
    };

    if (document.readyState === "complete") tryFinish();
    else window.addEventListener("load", tryFinish, { once: true });
    const cap = setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener("load", tryFinish);
      clearTimeout(cap);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={finishIntro}>
      {phase === "show" && (
        <motion.div
          key="preloader"
          aria-hidden
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-52 sm:w-64"
            >
              <Image
                src="/brand/best-bites-logo.webp"
                alt=""
                width={720}
                height={334}
                priority
                className="drop-shadow-[0_14px_24px_rgba(36,30,22,0.25)]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 18 }}
              animate={{ opacity: 1, y: [0, -8, 0], rotate: 12 }}
              transition={{
                opacity: { duration: 0.5, delay: 0.3 },
                rotate: { duration: 0.5, delay: 0.3 },
                y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
              }}
              className="absolute -right-14 -bottom-6 w-16 sm:-right-16 sm:w-20"
            >
              <Image src="/products/sada-sev.webp" alt="" width={160} height={220} priority className="packet-shadow-soft" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: [0, 20, 0] }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -top-4 -left-8 w-6"
            >
              <Star />
            </motion.div>
            <Sparkle className="absolute -right-6 -top-2 w-4" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-hand mt-8 text-2xl text-charcoal/65"
          >
            getting the crunch ready…
          </motion.p>

          <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-charcoal/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="h-full w-full rounded-full bg-orange"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
