'use client';

import Link from 'next/link';
import { useRef, useState, type ReactNode } from 'react';

/**
 * Warm radial highlight that follows the cursor across a card.
 *
 * The gradient itself lives in `.spotlight::after` (globals.css); this only
 * writes the two custom properties it reads, which keeps the work on the
 * compositor and off React's render path.
 *
 * `as` is a tag name rather than a component, and linking is done by passing
 * `href` — a component reference cannot be handed from a server component
 * across the client boundary.
 */
export default function Spotlight({
  children,
  className = '',
  as = 'div',
  href,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li' | 'section' | 'figure';
  /** Renders a next/link instead of `as`. */
  href?: string;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement | null>(null);
  const [lit, setLit] = useState(false);

  const track = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    if (!lit) setLit(true);
  };

  const shared = {
    onPointerMove: track,
    onPointerLeave: () => setLit(false),
    'data-lit': lit,
    className: `spotlight ${className}`,
    ...rest,
  };

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...shared}
      >
        {children}
      </Link>
    );
  }

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<never>} {...shared}>
      {children}
    </Tag>
  );
}
