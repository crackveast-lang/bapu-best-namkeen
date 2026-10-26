"use client";

/* Bulk orders — weddings, festive gifting, office boxes, shop restocks.
   One CTA: Order on WhatsApp, with a short order template pre-typed. */

import Image from "next/image";
import { motion } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";
import { Diya, HandArrow } from "./Doodles";

const easeOut = [0.22, 1, 0.36, 1] as const;

const occasions = ["Weddings & functions", "Diwali & festive gifting", "Corporate gift boxes", "Shops & resellers", "Parties & events"];

const BULK_MESSAGE = `Hi Best Namkeen! I'd like to place a bulk order.
Occasion:
Products:
Quantity:
City:`;

const STACK = [
  { src: "/products/sada-sev.webp", className: "left-[4%] top-[14%] w-[38%] -rotate-12" },
  { src: "/products/milan-mixture.webp", className: "right-[4%] top-[12%] w-[38%] rotate-12" },
  { src: "/products/ratlami-sev.webp", className: "left-1/2 top-[2%] z-10 w-[44%] -translate-x-1/2" },
];

export default function BulkOrders() {
  return (
    <section id="bulk" className="relative bg-cream-2 pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] border-2 border-charcoal/10 bg-cream p-7 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-16"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-orange-deep uppercase">Bulk orders</p>
            <h2 className="display mt-3 text-5xl text-charcoal sm:text-6xl">
              Ordering for
              <br />
              <span className="text-green">a crowd?</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal/70">
              Tell us the occasion, the packs and how many — we&apos;ll reply on WhatsApp with
              options and pricing.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {occasions.map((o) => (
                <li
                  key={o}
                  className="flex items-center gap-1.5 rounded-full border border-charcoal/15 bg-cream-2/60 px-3.5 py-1.5 text-sm font-bold text-charcoal/70"
                >
                  {o.startsWith("Diwali") && <Diya className="w-5" />}
                  {o}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <WhatsAppButton message={BULK_MESSAGE} />
            </div>
          </div>

          {/* packets fanned like a stack waiting to be boxed */}
          <div className="relative mx-auto aspect-[5/4] w-full max-w-md">
            {STACK.map((p) => (
              <div key={p.src} className={`absolute ${p.className}`}>
                <Image src={p.src} alt="" width={420} height={560} className="packet-shadow-soft w-full" />
              </div>
            ))}
            <span className="font-hand absolute right-0 bottom-0 flex rotate-[-4deg] items-end gap-1 text-2xl text-orange-deep">
              <HandArrow className="w-9 rotate-[200deg]" />
              enough for the whole baraat
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
