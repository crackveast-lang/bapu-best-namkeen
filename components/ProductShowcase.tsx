"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuredProducts, AMAZON_URL, FLIPKART_URL } from "@/lib/products";
import { HandArrow, Sparkle } from "./Doodles";
import ProductCard from "./ProductCard";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ProductShowcase() {
  return (
    <section id="shop" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6 sm:mb-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-3 text-xs font-bold tracking-[0.22em] text-orange-deep uppercase"
          >
            The Shelf
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
            className="display text-5xl text-charcoal sm:text-7xl"
          >
            Find your
            <br />
            favourite <span className="text-green">crunch.</span>
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hidden items-end gap-2 pb-2 text-charcoal/50 lg:flex"
        >
          <span className="font-hand text-2xl">every packet, made in small batches</span>
          <HandArrow className="w-14 rotate-12" />
        </motion.div>
      </div>

      {/* two-up on phones, with the right column dropped a little for a staggered shelf */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3">
        {featuredProducts.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: easeOut }}
            className={`${i % 2 === 1 ? "max-sm:mt-8" : ""} ${i % 3 === 1 ? "lg:-mt-10" : ""}`}
          >
            <ProductCard p={p} index={i} compact />
          </motion.div>
        ))}
      </div>

      {/* explore CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="group relative mt-20 overflow-hidden rounded-[2.5rem] bg-green-deep px-6 py-14 text-cream sm:px-12"
      >
        <Sparkle className="absolute top-8 left-[8%] w-5 text-green-leaf opacity-60" />
        <div className="relative z-10 max-w-xl text-center lg:text-left">
          <p className="font-hand text-2xl text-green-leaf">made with care, packed for freshness</p>
          <h3 className="display mt-3 text-4xl sm:text-6xl">
            Eight packs. One favourite. <span className="text-orange">Yours to find.</span>
          </h3>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              href="/products"
              className="group/btn rounded-full bg-orange px-8 py-4 text-base font-bold text-cream shadow-lg shadow-charcoal/20 transition-transform hover:scale-[1.05] active:scale-[0.97]"
            >
              Explore all products
              <span className="ml-2 inline-block transition-transform group-hover/btn:translate-x-1">→</span>
            </Link>
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-cream/60 px-8 py-[14px] text-base font-bold text-cream transition-colors hover:bg-cream hover:text-green-deep"
            >
              Buy on Amazon ↗
            </a>
            <a
              href={FLIPKART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-cream/60 px-8 py-[14px] text-base font-bold text-cream transition-colors hover:bg-cream hover:text-green-deep"
            >
              Buy on Flipkart ↗
            </a>
          </div>
        </div>
        {/* floating packet peeking into the banner */}
        <div className="pointer-events-none absolute -right-8 -bottom-14 hidden w-56 rotate-[14deg] transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-[10deg] lg:block xl:w-64">
          <Image
            src="/products/milan-mixture.webp"
            alt="Milan Mixture packet"
            width={380}
            height={500}
            className="packet-shadow"
          />
        </div>
      </motion.div>
    </section>
  );
}
