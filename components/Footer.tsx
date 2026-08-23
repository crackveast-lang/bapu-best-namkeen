"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AMAZON_URL, FLIPKART_URL, ZOMATO_URL, INSTAGRAM_URL } from "@/lib/products";
import { CONTACT } from "@/lib/stores";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal pt-20 pb-8 text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo.webp"
                alt="Bapu Best Namkeen logo — since 1960"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              <div>
                <p className="font-script text-3xl text-brand-red">Best Namkeen</p>
                <p className="mt-0.5 text-[11px] font-bold tracking-[0.24em] text-cream/50 uppercase">
                  Gwalior · Since 1960
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed text-cream/65">
              Small-batch namkeen from Gwalior — carrying forward a legacy of
              taste that began with one kadhai in 1960.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-cream/45 uppercase">Explore</p>
            <ul className="space-y-2.5 text-cream/80">
              {[
                ["Products", "/products"],
                ["Combos", "/#combos"],
                ["Our Story", "/#story"],
                ["Stores", "/#stores"],
                ["Why Us", "/#why"],
                ["Home", "/"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-orange">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-cream/45 uppercase">Find us</p>
            <ul className="space-y-2.5 text-cream/80">
              <li>
                <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange">
                  Buy on Amazon ↗
                </a>
              </li>
              <li>
                <a href={FLIPKART_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange">
                  Buy on Flipkart ↗
                </a>
              </li>
              <li>
                <a href={ZOMATO_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange">
                  Order on Zomato ↗
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orange">
                  Instagram ↗
                </a>
              </li>
              <li>
                <Link href="/#stores" className="transition-colors hover:text-orange">
                  Our Stores
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-cream/40">
              {CONTACT.company}
              <br />
              {CONTACT.addressLine}
              <br />
              {CONTACT.phones.join(" · ")}
              <br />
              <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-orange">
                {CONTACT.email}
              </a>
              <br />
              {CONTACT.fssai}
            </p>
          </div>
        </div>

        {/* giant sign-off */}
        <div className="overflow-hidden border-t border-cream/10 pt-10">
          <motion.p
            initial={{ y: "60%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="display text-center text-[15vw] leading-[0.85] text-cream/95 lg:text-[11rem]"
          >
            One more <span className="text-orange">bite.</span>
          </motion.p>
        </div>

        <p className="mt-10 text-center text-xs text-cream/35">
          © {new Date().getFullYear()} Best Namkeen · A legacy of taste. A tradition of trust.
        </p>
      </div>
    </footer>
  );
}
