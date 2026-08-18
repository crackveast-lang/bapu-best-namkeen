import type { ReactNode } from 'react';
import {
  ArrowCurve,
  Bowl,
  CircleScribble,
  CurryLeaf,
  Flourish,
  Peanut,
  Rays,
  SevStrands,
  Sparkle,
  SpiceScatter,
} from '@/components/art/Doodles';
import { Boondi, CornFlake, GreenPeas, SevStrand, Wafer } from '@/components/art/IngredientIcons';

/**
 * Shared decoration for every section on the site.
 *
 * The hero established the language — drifting snack pieces and hand-drawn
 * marks in the margins — and this puts the same pen everywhere else. Two rules
 * keep it from turning into clutter:
 *
 *   1. Decoration lives in the margins. Nothing sits over text or product.
 *   2. Most pieces are `hidden` until `lg`, because on a narrow screen the
 *      margins do not exist and doodles become noise.
 *
 * All of it is decorative, so all of it is `aria-hidden` and pointer-inert.
 */

export function Floater({
  children,
  className,
  y = -12,
  rot = 0,
  spin = 4,
  duration = 8,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Travel in px over half a cycle. */
  y?: number;
  /** Resting rotation. */
  rot?: number;
  /** Extra rotation at the top of the drift. */
  spin?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <span
      aria-hidden
      className={`drift pointer-events-none absolute ${className ?? ''}`}
      style={
        {
          '--drift-y': `${y}px`,
          '--drift-rot': `${rot}deg`,
          '--drift-spin': `${spin}deg`,
          '--drift-duration': `${duration}s`,
          '--drift-delay': `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}

type Tone = 'light' | 'dark';

const TONES = {
  light: {
    faint: 'text-ink/15',
    soft: 'text-ink/22',
    warm: 'text-saffron/45',
    leaf: 'text-olive/40',
    accent: 'text-maroon/30',
  },
  dark: {
    faint: 'text-ivory/12',
    soft: 'text-ivory/18',
    warm: 'text-saffron/55',
    leaf: 'text-saffron/30',
    accent: 'text-ivory/20',
  },
} as const;

/**
 * Preset scatters. Each section picks one so no two neighbours share a
 * silhouette, and the whole page reads as one hand rather than a library.
 */
export type DecorVariant =
  | 'brands'
  | 'products'
  | 'trust'
  | 'story'
  | 'process'
  | 'stores'
  | 'reviews'
  | 'social'
  | 'header';

export default function Decor({
  variant,
  tone = 'light',
}: {
  variant: DecorVariant;
  tone?: Tone;
}) {
  const t = TONES[tone];

  switch (variant) {
    case 'brands':
      return (
        <>
          <Floater className={`top-14 right-[6%] hidden w-16 lg:block ${t.warm}`} y={-10} rot={-8} duration={9}>
            <SevStrands className="w-full" />
          </Floater>
          <Floater className={`bottom-24 left-[3%] hidden w-11 lg:block ${t.leaf}`} y={12} rot={14} duration={10} delay={0.8}>
            <CurryLeaf className="w-full" />
          </Floater>
          <Sparkle aria-hidden className={`pointer-events-none absolute top-32 left-[7%] hidden w-5 lg:block ${t.warm}`} />
        </>
      );

    case 'products':
      return (
        <>
          <Floater className={`top-16 right-[5%] hidden w-12 lg:block ${t.leaf}`} y={-11} rot={12} duration={8.5}>
            <CurryLeaf className="w-full" />
          </Floater>
          <Floater className={`bottom-16 left-[2%] hidden w-10 lg:block ${t.soft}`} y={13} rot={-10} duration={9.5} delay={1.1}>
            <Wafer className="w-full" />
          </Floater>
          <SpiceScatter aria-hidden className={`pointer-events-none absolute top-24 left-[4%] hidden w-24 lg:block ${t.faint}`} />
        </>
      );

    case 'trust':
      return (
        <>
          <Floater className={`top-20 left-[5%] hidden w-11 lg:block ${t.soft}`} y={-12} rot={-14} duration={9}>
            <SevStrand className="w-full" />
          </Floater>
          <Floater className={`top-28 right-[6%] hidden w-10 lg:block ${t.warm}`} y={11} rot={10} duration={8} delay={0.6}>
            <CornFlake className="w-full" />
          </Floater>
          <Floater className={`bottom-14 right-[12%] hidden w-12 lg:block ${t.faint}`} y={-9} rot={6} duration={10} delay={1.4}>
            <Boondi className="w-full" />
          </Floater>
          <Rays aria-hidden className={`pointer-events-none absolute bottom-10 left-[9%] hidden w-14 lg:block ${t.warm}`} />
        </>
      );

    case 'story':
      return (
        <>
          <Floater className={`top-16 right-[8%] hidden w-14 lg:block ${t.warm}`} y={-10} rot={8} duration={9.5}>
            <SevStrands className="w-full" />
          </Floater>
          <Floater className={`bottom-20 left-[4%] hidden w-10 lg:block ${t.leaf}`} y={12} rot={-12} duration={11} delay={0.9}>
            <GreenPeas className="w-full" />
          </Floater>
          <Sparkle aria-hidden className={`pointer-events-none absolute top-28 left-[10%] hidden w-6 lg:block ${t.warm}`} />
        </>
      );

    case 'process':
      return (
        <>
          <Floater className={`top-12 right-[7%] hidden w-11 lg:block ${t.soft}`} y={-11} rot={-9} duration={8.5}>
            <SevStrand className="w-full" />
          </Floater>
          <ArrowCurve aria-hidden className={`pointer-events-none absolute bottom-16 left-[5%] hidden w-14 -scale-x-100 lg:block ${t.faint}`} />
          <Flourish aria-hidden className={`pointer-events-none absolute top-24 left-[6%] hidden w-28 lg:block ${t.faint}`} />
        </>
      );

    case 'stores':
      return (
        <>
          <Bowl aria-hidden className={`pointer-events-none absolute top-20 right-[6%] hidden w-20 lg:block ${t.faint}`} />
          <Floater className={`bottom-24 left-[3%] hidden w-11 lg:block ${t.warm}`} y={-12} rot={10} duration={9} delay={0.5}>
            <CornFlake className="w-full" />
          </Floater>
          <Peanut aria-hidden className={`pointer-events-none absolute bottom-12 right-[16%] hidden w-12 rotate-[-12deg] lg:block ${t.soft}`} />
        </>
      );

    case 'reviews':
      return (
        <>
          <SpiceScatter aria-hidden className={`pointer-events-none absolute top-12 left-[5%] hidden w-32 lg:block ${t.faint}`} />
          <Floater className={`right-[6%] bottom-20 hidden w-12 lg:block ${t.warm}`} y={-10} rot={-8} duration={9.5} delay={0.7}>
            <SevStrands className="w-full" />
          </Floater>
          <CircleScribble aria-hidden className={`pointer-events-none absolute top-24 right-[10%] hidden h-16 w-40 lg:block ${t.accent}`} />
        </>
      );

    case 'social':
      return (
        <>
          <Floater className={`top-16 right-[4%] hidden w-11 lg:block ${t.leaf}`} y={12} rot={12} duration={10}>
            <GreenPeas className="w-full" />
          </Floater>
          <Floater className={`bottom-20 left-[3%] hidden w-12 lg:block ${t.soft}`} y={-11} rot={-8} duration={8.5} delay={1.2}>
            <Boondi className="w-full" />
          </Floater>
          <Sparkle aria-hidden className={`pointer-events-none absolute top-24 left-[8%] hidden w-5 lg:block ${t.warm}`} />
        </>
      );

    case 'header':
      return (
        <>
          <Floater className={`top-10 right-[6%] hidden w-20 lg:block ${t.warm}`} y={-9} rot={7} duration={9}>
            <SevStrands className="w-full" />
          </Floater>
          <Floater className={`bottom-8 right-[22%] hidden w-10 lg:block ${t.leaf}`} y={11} rot={-10} duration={10.5} delay={0.8}>
            <CurryLeaf className="w-full" />
          </Floater>
          <Peanut aria-hidden className={`pointer-events-none absolute bottom-10 left-[2%] hidden w-12 rotate-[-16deg] lg:block ${t.soft}`} />
        </>
      );
  }
}
