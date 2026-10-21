"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Product } from "@/lib/products";
import { BuyPills } from "./BuyButtons";
import { Star, HandArrow } from "./Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ProductCard({ p, index }: { p: Product; index: number }) {
  return (
    <motion.div whileHover="hover" initial="rest" animate="rest" className="group relative">
      {/* card */}
      <motion.div
        variants={{
          rest: { y: 0, rotate: 0 },
          hover: { y: -10, rotate: index % 2 === 0 ? -1.2 : 1.2 },
        }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="relative overflow-hidden rounded-[2rem] p-6 pb-7 shadow-sm transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-charcoal/15"
        style={{ backgroundColor: p.tint }}
      >
        <Star className="wiggle-on-hover absolute top-5 right-5 w-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {p.note && (
          <span className="font-hand pointer-events-none absolute top-4 left-5 z-10 flex -rotate-3 items-center gap-1 text-xl text-orange-deep">
            {p.note}
            <HandArrow className="w-8 rotate-[100deg] text-orange-deep" />
          </span>
        )}

        <Link href={`/products/${p.slug}`} aria-label={`View ${p.name}`} className="block">
          <div className="relative flex h-72 items-center justify-center sm:h-80">
            {p.photo ? (
              <motion.div
                variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="h-full w-full overflow-hidden rounded-3xl"
              >
                <Image
                  src={p.img}
                  alt={`${p.name} — Best Namkeen`}
                  width={520}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ) : (
              <motion.div
                variants={{
                  rest: { scale: 1, rotate: 0, y: 0 },
                  hover: { scale: 1.05, rotate: 3, y: -8 },
                }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="packet-shadow-soft h-full"
              >
                <Image
                  src={p.img}
                  alt={`${p.name} — Best Namkeen packet`}
                  width={420}
                  height={560}
                  className="h-full w-auto object-contain"
                />
              </motion.div>
            )}
          </div>
        </Link>

        <div className="mt-4 flex items-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold text-cream"
            style={{ backgroundColor: p.pouch }}
          >
            {p.flavor}
          </span>
          <span className="rounded-full border border-charcoal/15 px-3 py-1 text-[11px] font-bold text-charcoal/60">
            {p.weight}
          </span>
          <span className="ml-auto rounded-full bg-charcoal px-3 py-1 text-[13px] font-bold text-cream">
            {p.price}
          </span>
        </div>
      </motion.div>

      {/* text under card */}
      <div className="mt-5 px-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display text-2xl text-charcoal sm:text-[1.7rem]">
            <Link href={`/products/${p.slug}`} className="transition-colors hover:text-orange-deep">
              {p.name}
            </Link>
          </h3>
          <span className="font-hand text-xl whitespace-nowrap" style={{ color: p.pouch }}>
            {p.tagline}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{p.desc}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={`/products/${p.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-sm font-bold text-cream transition-all hover:gap-3 hover:bg-orange"
          >
            View product <span>→</span>
          </Link>
          <BuyPills slug={p.slug} />
        </div>
      </div>
    </motion.div>
  );
}
