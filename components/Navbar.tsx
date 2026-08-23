"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { AMAZON_URL, FLIPKART_URL, ZOMATO_URL } from "@/lib/products";

const links = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Combos", href: "/#combos" },
  { label: "Our Story", href: "/#story" },
  { label: "Stores", href: "/#stores" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-charcoal/8 pl-3 pr-2 backdrop-blur-xl transition-all duration-500 ${
          scrolled ? "bg-cream/90 py-1.5 shadow-lg shadow-charcoal/8" : "bg-cream/60 py-2"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo.webp"
            alt="Bapu Best Namkeen logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-script text-lg leading-tight text-brand-red sm:text-xl">
              Best Namkeen
            </span>
            <span className="hidden text-[9px] font-bold tracking-[0.2em] text-charcoal/55 sm:block">
              GWALIOR · SINCE 1960
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-charcoal/75 transition-colors hover:bg-orange/10 hover:text-orange-deep"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-cream transition-transform hover:scale-[1.04] active:scale-[0.98] sm:flex"
          >
            Buy on Amazon
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/5 lg:hidden"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-charcoal transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-charcoal transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-charcoal transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full mt-2 w-[calc(100%-1.5rem)] max-w-5xl rounded-3xl border border-charcoal/8 bg-cream/95 p-4 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-semibold text-charcoal hover:bg-orange/10"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl bg-orange px-4 py-3.5 text-center font-bold text-cream"
              >
                Buy on Amazon ↗
              </a>
              <a
                href={FLIPKART_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl bg-green px-4 py-3.5 text-center font-bold text-cream"
              >
                Buy on Flipkart ↗
              </a>
            </div>
            <a
              href={ZOMATO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-2xl border-2 border-charcoal/15 px-4 py-3 text-center text-sm font-bold text-charcoal/70"
            >
              Order on Zomato ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
