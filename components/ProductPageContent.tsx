"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AMAZON_URL, FLIPKART_URL, ZOMATO_URL, type Product } from "@/lib/products";
import ProductGallery from "./ProductGallery";
import ProductCard from "./ProductCard";
import { SevSquiggle, Star, Sparkle, Chilli, Coriander } from "./Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
} as const;

export default function ProductPageContent({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const p = product;
  return (
    <main className="pt-28 sm:pt-36">
      {/* ---------- top: gallery + info ---------- */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-charcoal/55 transition-colors hover:text-orange-deep"
          >
            ← All products
          </Link>
        </motion.div>

        <div className="mt-6 grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
            className="min-w-0"
          >
            <ProductGallery
              images={p.gallery}
              name={p.name}
              cutout={!p.photo}
              tint={p.tint}
            />
          </motion.div>

          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
            >
              <span
                className="rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-cream uppercase"
                style={{ backgroundColor: p.pouch }}
              >
                {p.flavor}
              </span>
              <h1 className="display mt-5 text-[clamp(2.4rem,9vw,3.75rem)] text-charcoal">{p.name}</h1>
              <p className="font-hand mt-2 text-3xl" style={{ color: p.pouch }}>
                {p.tagline}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
              className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/70"
            >
              {p.longDesc}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: easeOut }}
              className="mt-7 space-y-2.5"
            >
              {[`Net weight: ${p.weight}`, ...p.highlights].map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[15px] font-semibold text-charcoal/70">
                  <span className="mt-0.5 text-orange">✦</span> {h}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-orange px-8 py-4 text-center text-base font-bold text-cream shadow-lg shadow-orange/30 transition-transform hover:scale-[1.05] active:scale-[0.97]"
              >
                Buy on Amazon
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">↗</span>
              </a>
              <a
                href={FLIPKART_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-green px-8 py-4 text-center text-base font-bold text-cream shadow-lg shadow-green/25 transition-transform hover:scale-[1.05] active:scale-[0.97]"
              >
                Buy on Flipkart
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">↗</span>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-charcoal/60"
            >
              <a href={ZOMATO_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-orange/50 underline-offset-4 transition-colors hover:text-orange-deep">
                or order on Zomato ↗
              </a>
              <Link href="/#stores" className="transition-colors hover:text-orange-deep">
                Visit a store in Gwalior →
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-6 max-w-md text-sm leading-relaxed text-charcoal/50"
            >
              <strong className="text-charcoal/65">Inside the pack:</strong> {p.ingredientsNote}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ---------- the crunch ---------- */}
      <div className="relative mt-24 overflow-hidden bg-cream-2 py-20 sm:py-28">
        <SevSquiggle className="absolute top-8 right-[8%] w-28 opacity-50" />
        <Sparkle className="absolute bottom-10 left-[10%] w-5" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, ease: easeOut }}
            className="display text-6xl text-charcoal sm:text-8xl"
          >
            The
            <br />
            <span style={{ color: p.pouch }}>crunch.</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            className="max-w-lg text-xl leading-relaxed text-charcoal/70 sm:text-2xl"
          >
            {p.crunch}
          </motion.p>
        </div>
      </div>

      {/* ---------- made with care ---------- */}
      <div className="relative overflow-hidden bg-green-deep py-20 text-cream sm:py-28">
        <Coriander className="absolute top-8 right-8 w-14 opacity-25" />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, ease: easeOut }}
            className="display text-5xl sm:text-7xl"
          >
            Made with <span className="text-orange">care.</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.12, ease: easeOut }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75"
          >
            Small batches, slow frying, whole spices ground the same week —
            then sealed fast in a zip-lock pouch so the first handful and the
            last one crunch exactly the same.
          </motion.p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.highlights.map((h, i) => (
              <motion.div
                key={h}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.1, ease: easeOut }}
                className="border-t-2 border-cream/15 pt-4"
              >
                <span className="display text-3xl text-cream/25">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-bold">{h}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- perfect for ---------- */}
      <div className="relative py-20 text-center sm:py-28">
        <Chilli className="absolute top-12 left-[10%] w-9 -rotate-12 opacity-80" />
        <Star className="absolute right-[12%] bottom-14 w-6" />
        <div className="mx-auto max-w-4xl px-5">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, ease: easeOut }}
            className="display text-5xl text-charcoal sm:text-7xl"
          >
            Perfect <span className="text-green">for.</span>
          </motion.h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {p.perfectFor.map((m, i) => (
              <motion.span
                key={m}
                initial={{ opacity: 0, scale: 0.6, rotate: i % 2 === 0 ? -6 : 6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                className="rounded-full border-2 border-charcoal/12 bg-cream-2 px-6 py-3 text-lg font-bold text-charcoal/75"
              >
                {m}
              </motion.span>
            ))}
          </div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
            className="font-hand mt-10 text-2xl text-orange-deep"
          >
            and honestly? no occasion needed.
          </motion.p>
        </div>
      </div>

      {/* ---------- related ---------- */}
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.7, ease: easeOut }}
          className="display mb-12 text-4xl text-charcoal sm:text-6xl"
        >
          You might <span className="text-orange">also like.</span>
        </motion.h2>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r, i) => (
            <motion.div
              key={r.slug}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.12, ease: easeOut }}
            >
              <ProductCard p={r} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
