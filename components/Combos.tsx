"use client";

/* Combos — editorial rows, not cards. Each combo is a fanned stack of real
   transparent packets that spreads on hover and drifts with scroll. */

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { combos, comboProducts, type Combo } from "@/lib/combos";
import { whatsappLink } from "@/lib/products";
import { HandArrow, Star, Seeds, Peanut, Sparkle, Burst } from "./Doodles";
import { DrawnUnderline } from "./AnimatedDoodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Combos() {
  return (
    <section id="combos" className="relative overflow-hidden bg-cream-2 py-24 sm:py-32">
      <Seeds className="absolute top-16 right-[8%] hidden w-20 lg:block" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 max-w-3xl sm:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-3 text-xs font-bold tracking-[0.22em] text-orange-deep uppercase"
          >
            Combos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
            className="display text-5xl text-charcoal sm:text-7xl"
          >
            More namkeen.
            <br />
            <span className="relative inline-block text-green">
              More to share.
              <DrawnUnderline color="#e07b1f" className="absolute -bottom-[0.2em] left-0 -z-10 h-[0.18em] w-full" />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-hand mt-4 text-2xl text-charcoal/55"
          >
            bundles of the real packs — nothing invented, just more of it
          </motion.p>
        </div>

        <div className="flex flex-col gap-20 sm:gap-28">
          {combos.map((c, i) => (
            <ComboRow key={c.slug} combo={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComboRow({ combo, index }: { combo: Combo; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yStack = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const yDoodle = useTransform(scrollYProgress, [0, 1], [30, -70]);
  const items = comboProducts(combo);
  const flip = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: easeOut }}
      className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* packet stack */}
      <div className={`relative mb-6 lg:mb-0 ${flip ? "lg:order-2" : ""}`}>
        <div
          className="absolute inset-x-[8%] top-[8%] h-[84%]"
          style={{ backgroundColor: combo.tint, borderRadius: "58% 42% 50% 50% / 46% 54% 46% 54%" }}
        />
        <motion.div style={{ y: yStack }} className="relative flex h-[360px] items-end justify-center sm:h-[440px]">
          {items.map((p, i) => {
            const n = items.length;
            const mid = (n - 1) / 2;
            const off = i - mid;
            const rot = off * 9;
            const x = off * (n > 3 ? 17 : 22);
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 80, rotate: rot * 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: rot }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: easeOut }}
                style={{ left: `calc(50% + ${x}% - ${n > 3 ? 15 : 19}%)`, zIndex: Math.abs(off) < 0.6 ? 10 : 5 - Math.abs(off) }}
                className={`absolute bottom-[16%] w-[36%] max-w-[210px] origin-bottom transition-transform duration-700 sm:w-[34%] ${
                  off < 0 ? "group-hover:-translate-x-3 group-hover:-rotate-3" : off > 0 ? "group-hover:translate-x-3 group-hover:rotate-3" : "group-hover:-translate-y-3"
                }`}
              >
                <Image
                  src={p.photo ? p.gallery[0] : p.img}
                  alt={`${p.name} packet`}
                  width={420}
                  height={560}
                  className={`packet-shadow w-full ${p.photo ? "rounded-2xl object-cover" : ""}`}
                />
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div style={{ y: yDoodle }} className="pointer-events-none absolute inset-0">
          <Star className="wiggle-on-hover absolute top-[6%] left-[12%] w-7" />
          <Peanut className="absolute right-[10%] bottom-[14%] w-10 rotate-12" />
          <Sparkle className="absolute top-[40%] right-[4%] w-5" />
        </motion.div>
        {combo.note && (
          <span className="font-hand absolute top-2 left-[6%] hidden items-start gap-1 text-2xl text-orange-deep sm:flex">
            {combo.note}
            <HandArrow className="wiggle-on-hover mt-2 w-10 rotate-[60deg]" />
          </span>
        )}
      </div>

      {/* copy */}
      <div className={flip ? "lg:order-1" : ""}>
        <p className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: combo.accent }}>
          {combo.kicker}
        </p>
        <h3 className="display mt-3 text-4xl text-charcoal sm:text-6xl">{combo.name}</h3>
        <p className="font-hand mt-2 text-2xl" style={{ color: combo.accent }}>
          {combo.tagline}
        </p>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal/70">{combo.desc}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {items.map((p) => (
            <li
              key={p.slug}
              className="rounded-full border border-charcoal/15 bg-cream px-3 py-1 text-xs font-bold text-charcoal/70"
            >
              {p.name} · {p.weight}
            </li>
          ))}
        </ul>

        {combo.price && (
          <p className="display mt-5 text-3xl text-charcoal">{combo.price}</p>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={whatsappLink(
              `Hi Best Namkeen! I'd like to order the ${combo.name} (${items.map((p) => p.name).join(", ")}).`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group/b rounded-full bg-green px-7 py-4 text-base font-bold text-cream shadow-lg shadow-green/25 transition-transform hover:scale-[1.05] active:scale-[0.97]"
          >
            Order on WhatsApp
            <span className="ml-2 inline-block transition-transform group-hover/b:translate-x-1">→</span>
          </a>
        </div>
        <Burst className="wiggle-on-hover mt-6 hidden w-6 text-orange lg:block" />
      </div>
    </motion.article>
  );
}
