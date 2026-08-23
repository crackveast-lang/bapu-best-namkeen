"use client";

/* Final CTA — "One more bite?" A playful send-off with a floating packet,
   sketchy arrow and the Zomato / stores routes to an actual purchase. */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AMAZON_URL, FLIPKART_URL, ZOMATO_URL } from "@/lib/products";
import { SevSquiggle, Star, HandArrow, Smiley, Burst } from "./Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Marketplace() {
  return (
    <section id="contact" className="group relative overflow-hidden bg-orange py-24 text-cream sm:py-32">
      {/* texture accents */}
      <SevSquiggle className="absolute top-10 left-[6%] w-28 opacity-40" />
      <SevSquiggle className="absolute right-[8%] bottom-12 w-32 rotate-12 opacity-40" />
      <Star className="wiggle-on-hover absolute top-[26%] right-[16%] w-6 opacity-60" />
      <Burst className="absolute bottom-[24%] left-[12%] w-8 text-cream/50" />
      <Smiley className="absolute top-[18%] left-[20%] hidden w-10 -rotate-12 text-cream/45 lg:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="font-hand text-3xl text-cream/85"
          >
            go on, nobody&apos;s counting
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
            className="display mt-4 text-6xl sm:text-8xl"
          >
            One more
            <br />
            bite?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/z w-full max-w-xs rounded-full bg-charcoal px-10 py-5 text-center text-lg font-bold text-cream shadow-xl shadow-charcoal/25 transition-transform hover:scale-[1.05] active:scale-[0.97] sm:w-auto"
            >
              Buy on Amazon
              <span className="ml-2 inline-block transition-transform group-hover/z:translate-x-1 group-hover/z:-translate-y-0.5">↗</span>
            </a>
            <a
              href={FLIPKART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs rounded-full border-[3px] border-cream px-10 py-[17px] text-center text-lg font-bold text-cream transition-colors hover:bg-cream hover:text-orange-deep sm:w-auto"
            >
              Buy on Flipkart ↗
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-semibold text-cream/85 lg:justify-start"
          >
            <a href={ZOMATO_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-cream/50 underline-offset-4 hover:text-cream">
              or order on Zomato ↗
            </a>
            <Link href="/#stores" className="hover:text-cream">
              Visit a store →
            </Link>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-5 text-xs font-semibold tracking-wide text-cream/65"
          >
            Fresh from Gwalior · Sealed in zip-lock pouches · 100% vegetarian
          </motion.p>
        </div>

        {/* floating packet with sketchy arrow */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 18 }}
          whileInView={{ opacity: 1, y: 0, rotate: 8 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
          className="relative mx-auto hidden w-64 lg:block xl:w-72"
        >
          <div className="transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-[-3deg]">
            <Image
              src="/products/ratlami-sev.webp"
              alt="Best Namkeen Ratlami Sev packet"
              width={420}
              height={560}
              className="packet-shadow"
            />
          </div>
          <div className="absolute -bottom-6 -left-24 flex items-end gap-1 text-cream">
            <span className="font-hand text-2xl leading-none">this one&apos;s calling</span>
            <HandArrow className="wiggle-on-hover w-14 -rotate-[30deg]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
