import Link from 'next/link';
import type { ReactNode } from 'react';
import Reveal from '@/components/ui/Reveal';
import TextReveal from '@/components/ui/TextReveal';

/* ------------------------------------------------------------------ *
 * Wordmark
 * ------------------------------------------------------------------ */

/**
 * A typographic lockup, not a reproduction of the printed logo. The real
 * artwork should replace this — see CONTENT-TODO.md.
 */
export function Wordmark({
  className = '',
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'ivory';
}) {
  const color = tone === 'ivory' ? 'text-ivory' : 'text-ink';
  const rule = tone === 'ivory' ? 'bg-ivory/35' : 'bg-ink/20';
  const sub = tone === 'ivory' ? 'text-ivory/65' : 'text-ink-faint';

  return (
    <span className={`inline-flex flex-col leading-none ${color} ${className}`}>
      <span className="font-display text-[1.02rem] font-semibold tracking-[0.16em] uppercase">
        Bapu Best
      </span>
      <span className="mt-[3px] flex items-center gap-1.5">
        <span className={`h-px w-3 ${rule}`} />
        <span className={`text-[0.53rem] font-semibold tracking-[0.34em] uppercase ${sub}`}>
          Namkeen
        </span>
        <span className={`h-px flex-1 ${rule}`} />
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Section furniture
 * ------------------------------------------------------------------ */

/** The rule to the left of the label draws itself out as the eyebrow arrives. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Reveal as="p" variant="fade" duration={0.5} className={`eyebrow flex items-center gap-2.5 ${className}`}>
      <span className="h-px w-6 origin-left animate-[grow-rule_0.7s_cubic-bezier(0.16,1,0.3,1)] bg-current opacity-45" />
      {children}
    </Reveal>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  lede,
  align = 'left',
  className = '',
  children,
}: {
  eyebrow?: string;
  /** A plain string gets the word-by-word mask reveal; a node is rendered as-is. */
  title: ReactNode;
  /** Anchor id for the <h2>, when `title` is a plain string. */
  titleId?: string;
  lede?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}) {
  const centered = align === 'center';
  const headingClass = 'mt-4 text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.06]';

  return (
    <div
      className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow ? (
        <Eyebrow className={centered ? 'justify-center' : ''}>{eyebrow}</Eyebrow>
      ) : null}

      {typeof title === 'string' ? (
        <TextReveal as="h2" id={titleId} text={title} className={headingClass} delay={0.08} />
      ) : (
        <h2 className={headingClass}>{title}</h2>
      )}

      {lede ? (
        <Reveal delay={0.18} y={12}>
          <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft md:text-[1.03rem]">
            {lede}
          </p>
        </Reveal>
      ) : null}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Links
 * ------------------------------------------------------------------ */

/** Text link whose arrow slides on hover. */
export function ArrowLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/al inline-flex items-center gap-2 text-[0.85rem] font-semibold tracking-wide text-ink transition-colors hover:text-maroon ${className}`}
    >
      <span className="link-underline">{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/al:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Content placeholders
 * ------------------------------------------------------------------ */

/**
 * Renders bracketed placeholder copy as a visibly unfinished chip, so an
 * unsupplied fact can never be mistaken for a real one.
 */
export function Placeholder({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[4px] border border-dashed border-crimson/45 bg-crimson/[0.05] px-1.5 py-0.5 font-sans text-[0.68rem] font-semibold tracking-[0.06em] text-crimson/90 uppercase ${className}`}
    >
      {children}
    </span>
  );
}

/** True when a string is an unfilled `[BRACKET]` placeholder. */
export function isPlaceholder(value: string) {
  return /^\s*\[.*\]\s*$/.test(value);
}

/** Prints real copy plainly, and placeholder copy as a chip. */
export function Copy({ value, className = '' }: { value: string; className?: string }) {
  return isPlaceholder(value) ? (
    <Placeholder className={className}>{value.replace(/^\[|\]$/g, '')}</Placeholder>
  ) : (
    <span className={className}>{value}</span>
  );
}

/* ------------------------------------------------------------------ *
 * Trust marks
 * ------------------------------------------------------------------ */

export function TrustPill({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.04em] text-ink-soft">
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/12 bg-ivory/60 text-maroon">
        {icon}
      </span>
      {children}
    </li>
  );
}
