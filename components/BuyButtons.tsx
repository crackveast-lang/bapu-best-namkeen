"use client";

/* Renders Buy CTAs for one product, showing only the platforms it is
   actually listed on. When a product is on neither, the store/Zomato
   fallback is shown instead of a dead button. */

import Link from "next/link";
import { amazonFor, flipkartFor, ZOMATO_URL } from "@/lib/products";

type Size = "sm" | "lg";

export default function BuyButtons({
  slug,
  size = "lg",
  className = "",
}: {
  slug: string;
  size?: Size;
  className?: string;
}) {
  const amazon = amazonFor(slug);
  const flipkart = flipkartFor(slug);

  const pad = size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm lg:px-6 lg:text-base";
  const arrow = size === "lg" ? "ml-2" : "ml-1.5";

  if (!amazon && !flipkart) {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        <a
          href={ZOMATO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`group rounded-full bg-orange font-bold text-cream shadow-lg shadow-orange/30 transition-transform hover:scale-[1.05] active:scale-[0.97] ${pad}`}
        >
          Order on Zomato
          <span className={`${arrow} inline-block transition-transform group-hover:translate-x-1`}>↗</span>
        </a>
        <Link
          href="/#stores"
          className="text-sm font-semibold text-charcoal/60 underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-orange-deep"
        >
          Or find it in our Gwalior stores
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}>
      {amazon && (
        <a
          href={amazon}
          target="_blank"
          rel="noopener noreferrer"
          className={`group rounded-full bg-orange font-bold text-cream shadow-lg shadow-orange/30 transition-transform hover:scale-[1.05] active:scale-[0.97] ${pad}`}
        >
          Buy on Amazon
          <span className={`${arrow} inline-block transition-transform group-hover:translate-x-1`}>→</span>
        </a>
      )}
      {flipkart && (
        <a
          href={flipkart}
          target="_blank"
          rel="noopener noreferrer"
          className={`group rounded-full bg-green font-bold text-cream shadow-lg shadow-green/25 transition-transform hover:scale-[1.05] active:scale-[0.97] ${pad}`}
        >
          Buy on Flipkart
          <span className={`${arrow} inline-block transition-transform group-hover:translate-x-1`}>→</span>
        </a>
      )}
    </div>
  );
}

/** Compact pill variants for product cards. `compact` lets them share one row
    in a two-up phone grid (below sm). */
export function BuyPills({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const amazon = amazonFor(slug);
  const flipkart = flipkartFor(slug);
  const fit = compact ? "max-sm:flex-1 max-sm:justify-center max-sm:px-1.5 max-sm:py-1.5 max-sm:text-[11px]" : "";
  const arrow = compact ? "max-sm:hidden" : "";

  if (!amazon && !flipkart) {
    return (
      <a
        href={ZOMATO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full border-2 border-orange/60 px-4 py-2 text-sm font-bold text-orange-deep transition-colors hover:bg-orange hover:text-cream ${fit}`}
      >
        Zomato <span className={arrow}>↗</span>
      </a>
    );
  }

  return (
    <>
      {amazon && (
        <a
          href={amazon}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-full border-2 border-orange/60 px-4 py-2 text-sm font-bold text-orange-deep transition-colors hover:bg-orange hover:text-cream ${fit}`}
        >
          Amazon <span className={arrow}>↗</span>
        </a>
      )}
      {flipkart && (
        <a
          href={flipkart}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-full border-2 border-green/50 px-4 py-2 text-sm font-bold text-green transition-colors hover:bg-green hover:text-cream ${fit}`}
        >
          Flipkart <span className={arrow}>↗</span>
        </a>
      )}
    </>
  );
}
