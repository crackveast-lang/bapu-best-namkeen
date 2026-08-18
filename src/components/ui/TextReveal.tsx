'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Fragment } from 'react';
import { EASE } from '@/components/ui/Reveal';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

/**
 * Headline that rises into view a word at a time from behind a clipping mask,
 * as though the line were being set rather than faded in.
 *
 * Takes a plain string, not children: each word needs its own wrapper, and the
 * whole string stays in the DOM as real text for screen readers and search.
 * `\n` breaks the line.
 */
export default function TextReveal({
  text,
  as = 'span',
  className = '',
  delay = 0,
  step = 0.045,
  id,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  /** Gap between consecutive words, in seconds. */
  step?: number;
  id?: string;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const container: Variants = {
    hidden: {},
    shown: {
      transition: {
        staggerChildren: reduced ? 0 : step,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  const word: Variants = {
    // The mask does the hiding, so `opacity: 0` is barely perceptible here —
    // but it means this initial serialises as `opacity:0` like every other one
    // on the site, which is what the no-JS fallback in layout.tsx keys on.
    hidden: { y: reduced ? 0 : '110%', opacity: 0 },
    shown: {
      y: 0,
      opacity: 1,
      transition: { duration: reduced ? 0.25 : 0.78, ease: EASE },
    },
  };

  return (
    <MotionTag
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      {text.split('\n').map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((w, wi) => (
            <Fragment key={`${li}-${wi}`}>
              {/* The outer span clips, the inner one travels. Bottom padding
                  keeps descenders (g, y, p) from being shaved by the clip, and
                  the space sits outside the box — a trailing space inside an
                  inline-block collapses and the words would run together. */}
              <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                <motion.span variants={word} className="inline-block">
                  {w}
                </motion.span>
              </span>{' '}
            </Fragment>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}
