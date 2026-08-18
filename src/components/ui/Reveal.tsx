'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE = [0.16, 1, 0.3, 1] as const;

type Tag = 'div' | 'section' | 'li' | 'article' | 'header' | 'figure' | 'span' | 'ul' | 'p';

/**
 * `up` is the house default. The rest exist so a section can vary its entrance
 * without every block on the page arriving from the same direction.
 */
export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'blur';

type Props = {
  children: ReactNode;
  /** Stagger position when several Reveals sit in a row. */
  delay?: number;
  /** Distance travelled, in px. Small by default — this should be felt, not seen. */
  y?: number;
  variant?: RevealVariant;
  duration?: number;
  className?: string;
  as?: Tag;
  /** Re-run every time the block scrolls back into view. Off by default. */
  repeat?: boolean;
};

function offsets(variant: RevealVariant, y: number) {
  switch (variant) {
    case 'down':
      return { y: -y };
    case 'left':
      return { x: -y * 1.4 };
    case 'right':
      return { x: y * 1.4 };
    case 'scale':
      return { scale: 0.94 };
    case 'blur':
      return { y: y * 0.6, filter: 'blur(10px)' };
    case 'fade':
      return {};
    default:
      return { y };
  }
}

function rest(variant: RevealVariant) {
  switch (variant) {
    case 'left':
    case 'right':
      return { x: 0 };
    case 'scale':
      return { scale: 1 };
    case 'blur':
      return { y: 0, filter: 'blur(0px)' };
    case 'fade':
      return {};
    default:
      return { y: 0 };
  }
}

/**
 * Scroll-in reveal. Fires once, travels a short distance, and collapses to a
 * plain fade when the visitor has asked for reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  variant = 'up',
  duration,
  className,
  as = 'div',
  repeat = false,
}: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...(reduced ? {} : offsets(variant, y)) }}
      whileInView={{ opacity: 1, ...(reduced ? {} : rest(variant)) }}
      viewport={{ once: !repeat, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: reduced ? 0.2 : (duration ?? 0.7),
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Stagger
 * ------------------------------------------------------------------ */

/**
 * Parent half of a staggered group. Children written as <StaggerItem> inherit
 * their timing from here, so a list of ten does not need ten hand-tuned delays
 * — and reordering the list cannot desynchronise them.
 */
export function Stagger({
  children,
  className,
  as = 'div',
  step = 0.07,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Gap between consecutive children, in seconds. */
  step?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  const container: Variants = {
    hidden: {},
    shown: {
      transition: {
        staggerChildren: reduced ? 0 : step,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
  y = 20,
  variant = 'up',
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  y?: number;
  variant?: RevealVariant;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  const item: Variants = {
    hidden: { opacity: 0, ...(reduced ? {} : offsets(variant, y)) },
    shown: {
      opacity: 1,
      ...(reduced ? {} : rest(variant)),
      transition: { duration: reduced ? 0.2 : 0.68, ease: EASE },
    },
  };

  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
