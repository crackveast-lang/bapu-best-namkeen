"use client";

/* "Your craving. Our crunch." — Zomato delivery moment.
   A floating packet, a delivery-scooter sketch, and a hand-drawn arrow
   pointing straight at the order button. */

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ZOMATO_URL } from "@/lib/products";
import { HandArrow, ScooterSketch, Burst, WavyLine, Star } from "./Doodles";
import { DrawnCircle } from "./AnimatedDoodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ZomatoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yPacket = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const rotPacket = useTransform(scrollYProgress, [0, 1], [14, 4]);

  return (
    <section ref={ref} className="group relative overflow-hidden py-24 sm:py-32">
      <WavyLine className="absolute top-12 left-[8%] w-28 text-green-leaf/60" />
      <Star className="wiggle-on-hover absolute right-[10%] bottom-16 w-6" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-4 flex items-center justify-center gap-3 lg:justify-start"
          >
            <ScooterSketch className="wiggle-on-hover w-14 text-green" />
            <span className="text-xs font-bold tracking-[0.22em] text-orange-deep uppercase">
              Also on Zomato · Craving it right now?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
            className="display text-5xl text-charcoal sm:text-7xl"
          >
            Your craving.
            <br />
            <span className="relative inline-block text-orange">
              Our crunch.
              <DrawnCircle className="pointer-events-none absolute -inset-x-6 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+3rem)]" />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-charcoal/70 lg:mx-0"
          >
            No waiting for the weekend bazar run. Get your favourite Best
            Namkeen delivered to your door through Zomato — fresh, sealed,
            and dangerously easy to finish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
            className="mt-9 flex flex-wrap items-center justify-center gap-5 lg:justify-start"
          >
            <a
              href={ZOMATO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta rounded-full bg-brand-red px-9 py-4 text-base font-bold text-cream shadow-lg shadow-brand-red/30 transition-transform hover:scale-[1.05] active:scale-[0.97]"
            >
              Order on Zomato
              <span className="ml-2 inline-block transition-transform group-hover/cta:translate-x-1">→</span>
            </a>
            <span className="hidden items-end gap-1 text-green sm:flex">
              <HandArrow className="wiggle-on-hover w-12 rotate-[195deg]" />
              <span className="font-hand text-2xl">delivered crunchy</span>
            </span>
          </motion.div>
        </div>

        {/* floating packet */}
        <motion.div style={{ y: yPacket, rotate: rotPacket }} className="relative mx-auto w-56 sm:w-64 lg:w-72">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <Image
              src="/products/waffer-mix.webp"
              alt="Best Namkeen Waffer Mix packet ready for delivery"
              width={460}
              height={640}
              className="packet-shadow"
            />
          </motion.div>
          <Burst className="absolute -top-4 -right-6 w-9 text-orange" />
          <span className="font-hand absolute -bottom-8 left-1/2 -translate-x-1/2 rotate-[-4deg] text-2xl whitespace-nowrap text-charcoal/55">
            hot pick of the week
          </span>
        </motion.div>
      </div>
    </section>
  );
}
