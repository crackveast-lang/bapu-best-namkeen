"use client";

/* Doodles that draw themselves in — kept separate from the static set
   so server components can keep importing plain SVGs. */

import { motion } from "framer-motion";

const drawTransition = { duration: 0.9, ease: "easeInOut" as const };

/** Hand-drawn underline that sketches itself when scrolled into view. */
export function DrawnUnderline({
  className,
  color = "#e07b1f",
  delay = 0.3,
}: {
  className?: string;
  color?: string;
  delay?: number;
}) {
  return (
    <svg viewBox="0 0 220 24" fill="none" className={className} preserveAspectRatio="none" aria-hidden>
      <motion.path
        d="M4 14C50 6 120 5 216 10c-70 1-130 4-170 9 50-4 105-5 150-2"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ ...drawTransition, delay }}
      />
    </svg>
  );
}

/** Rough circle that draws itself around whatever sits behind it. */
export function DrawnCircle({
  className,
  color = "#2e6b34",
  delay = 0.4,
}: {
  className?: string;
  color?: string;
  delay?: number;
}) {
  return (
    <svg viewBox="0 0 200 90" fill="none" className={className} preserveAspectRatio="none" aria-hidden>
      <motion.path
        d="M112 8C60 4 12 16 9 44c-3 26 40 40 92 38 54-2 92-16 90-40-2-22-38-34-74-34-10 0-20 .8-28 2"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: "easeInOut", delay }}
      />
    </svg>
  );
}
