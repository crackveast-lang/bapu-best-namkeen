"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, HandArrow, Chilli, Stamp1960 } from "./Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Founder() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLogo = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yPacket = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const yDoodles = useTransform(scrollYProgress, [0, 1], [30, -50]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        {/* visual composition */}
        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            style={{ y: yLogo }}
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 mx-auto w-56 sm:w-64"
          >
            <Image
              src="/brand/logo.webp"
              alt="Bapu Best Namkeen logo — since 1960"
              width={480}
              height={480}
              className="drop-shadow-[0_20px_35px_rgba(36,30,22,0.3)]"
            />
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
            className="relative z-0 -mt-10 rounded-2xl bg-cream-2 p-3 pb-9 shadow-xl shadow-charcoal/15"
          >
            <Image
              src="/stores/store-phalka.webp"
              alt="The Best Namkeen Bakers storefront lit up at night"
              width={800}
              height={500}
              className="rounded-lg object-cover"
            />
            <figcaption className="font-hand absolute bottom-1.5 left-0 w-full text-center text-lg text-charcoal/60">
              the shopfront, lit for the evening rush
            </figcaption>
          </motion.figure>

          <motion.div
            style={{ y: yPacket }}
            initial={{ opacity: 0, rotate: 18, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 12, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
            className="absolute -right-6 bottom-2 z-20 w-28 sm:-right-10 sm:w-36"
          >
            <Image
              src="/products/ratlami-sev.webp"
              alt="Ratlami Sev packet"
              width={280}
              height={380}
              className="packet-shadow"
            />
          </motion.div>
          <motion.div style={{ y: yDoodles }} className="pointer-events-none absolute inset-0">
            <Star className="absolute -top-3 -left-2 w-7 -rotate-12" />
            <Chilli className="absolute bottom-24 -left-8 hidden w-9 -rotate-45 sm:block" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -top-6 right-0 w-24 text-brand-red sm:-right-6"
          >
            <Stamp1960 className="w-full" />
          </motion.div>
        </div>

        {/* copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-3 text-xs font-bold tracking-[0.22em] text-orange-deep uppercase"
          >
            The People
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
            className="display text-4xl text-charcoal sm:text-6xl"
          >
            Behind every bite,
            <br />
            <span className="text-orange">there&apos;s a story.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="mt-7 max-w-md text-lg leading-relaxed text-charcoal/70"
          >
            In 1960, <strong className="text-charcoal">Shri Seth Sunnulal Bedar</strong> set
            up shop in Gwalior&apos;s Phalka Bazar with a kadhai, a recipe, and
            a refusal to compromise on quality.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.32, ease: easeOut }}
            className="mt-5 max-w-md text-lg leading-relaxed text-charcoal/70"
          >
            Today the family still runs every store, still tastes every batch,
            and still packs every pouch the way he would have — because a
            legacy isn&apos;t inherited. It&apos;s repeated, every single
            morning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex items-center gap-3 text-green"
          >
            <span className="font-hand text-2xl">meet us at the counter</span>
            <HandArrow className="w-12 rotate-[70deg]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
