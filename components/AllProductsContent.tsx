"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import { HandArrow, Chilli, Star } from "./Doodles";
import BestBites from "./BestBites";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function AllProductsContent() {
  return (
    <main className="relative mx-auto max-w-7xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <Chilli className="absolute top-32 right-[8%] hidden w-10 rotate-12 lg:block" />
      <Star className="absolute top-56 left-[4%] hidden w-6 lg:block" />

      <div className="mb-14 sm:mb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-3 text-xs font-bold tracking-[0.22em] text-orange-deep uppercase"
        >
          The Full Shelf
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
          className="display text-5xl text-charcoal sm:text-7xl"
        >
          Every pack.
          <br />
          Every <span className="text-orange">crunch.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 flex items-center gap-2 text-charcoal/50"
        >
          <span className="font-hand text-2xl">
            eight <BestBites /> recipes, packed in Gwalior since 1997
          </span>
          <HandArrow className="w-12 rotate-45" />
        </motion.div>
      </div>

      {/* two-up on phones, with the right column dropped a little for a staggered shelf */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3">
        {products.map((p, i) => (
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
    </main>
  );
}
