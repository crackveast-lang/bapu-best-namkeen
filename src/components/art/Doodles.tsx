/**
 * Hand-drawn editorial doodles — original line art, drawn to sit quietly in the
 * margins of a section. Every one inherits `currentColor` and is decorative, so
 * they are hidden from assistive technology.
 *
 * Keep them sparse. The photography is the hero.
 */

type D = { className?: string; strokeWidth?: number };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export function SevStrands({ className, strokeWidth = 1.6 }: D) {
  return (
    <svg viewBox="0 0 120 68" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M4 42c10-16 22 8 32-6s20 14 30-2 18 10 28-4" />
      <path d="M10 56c9-13 19 7 28-5s17 12 26-2 15 8 24-3" opacity={0.75} />
      <path d="M16 26c8-11 16 6 24-4s14 10 22-1" opacity={0.5} />
      <path d="M96 20l5-7M104 24l7-4M99 32h9" opacity={0.6} />
    </svg>
  );
}

export function Peanut({ className, strokeWidth = 1.6 }: D) {
  return (
    <svg viewBox="0 0 64 44" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M12 22c0-8 5-13 12-13 6 0 8 4 12 6s5 1 9 1c7 0 11 5 11 12s-5 12-12 12c-5 0-8-3-12-5s-6-1-9-1c-7 0-11-5-11-12z" />
      <path d="M30 15c1 4 1 10 0 15M23 18c1 3 1 7 0 10M38 19c1 3 1 6 0 9" opacity={0.55} />
    </svg>
  );
}

export function CurryLeaf({ className, strokeWidth = 1.6 }: D) {
  return (
    <svg viewBox="0 0 72 80" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M36 78C36 52 34 30 30 6" />
      <path d="M31 62c-11 1-19-5-21-14 11-3 19 3 21 14zM33 62c11-1 18-8 19-17-11-2-18 5-19 17z" />
      <path d="M29 42c-10 1-16-4-18-12 10-3 17 2 18 12zM31 42c10-1 16-7 17-15-10-2-16 4-17 15z" opacity={0.8} />
      <path d="M27 24c-8 0-13-4-14-10 8-2 13 2 14 10zM29 24c8-1 13-6 14-12-8-1-13 4-14 12z" opacity={0.6} />
    </svg>
  );
}

export function Bowl({ className, strokeWidth = 1.6 }: D) {
  return (
    <svg viewBox="0 0 96 64" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M8 26h80c0 18-16 32-40 32S8 44 8 26z" />
      <path d="M4 26h88" />
      <path d="M24 20c6-7 14-9 22-6M46 12c7-6 16-6 22 0" opacity={0.7} />
      <path d="M34 6c3-3 8-4 12-2" opacity={0.5} />
      <path d="M30 58c10 3 26 3 36 0" opacity={0.45} />
    </svg>
  );
}

export function ArrowCurve({ className, strokeWidth = 1.6 }: D) {
  return (
    <svg viewBox="0 0 88 52" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M4 12c22-12 48-4 62 18" />
      <path d="M66 12l4 20-20 3" />
    </svg>
  );
}

export function Sparkle({ className, strokeWidth = 1.6 }: D) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M20 3c1 9 7 15 16 17-9 2-15 8-16 17-1-9-7-15-16-17 9-2 15-8 16-17z" />
    </svg>
  );
}

/** A scribbled ring for circling a word. */
export function CircleScribble({ className, strokeWidth = 2 }: D) {
  return (
    <svg
      viewBox="0 0 240 88"
      className={className}
      aria-hidden
      preserveAspectRatio="none"
      {...base}
      strokeWidth={strokeWidth}
    >
      {/* pathLength normalises the stroke to 0…1 so <DrawIn> can dash it
          without knowing the geometry. Purely a unit change when undrawn. */}
      <path
        pathLength={1}
        d="M180 12C132 2 66 4 30 20 4 32 2 56 24 68c30 16 122 20 178 6 32-8 40-30 16-44-12-7-32-12-52-14"
      />
    </svg>
  );
}

export function Flourish({ className, strokeWidth = 1.5 }: D) {
  return (
    <svg viewBox="0 0 200 24" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path pathLength={1} d="M4 14c26 0 26-8 44-8s18 8 44 8 26-8 44-8 18 8 44 8" />
      <path pathLength={1} d="M96 4c3-2 6-2 9 0M96 20c3 2 6 2 9 0" opacity={0.6} />
    </svg>
  );
}

/** Scattered spice seeds — good for filling dead corners. */
export function SpiceScatter({ className, strokeWidth = 1.4 }: D) {
  return (
    <svg viewBox="0 0 140 90" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M14 20c4-3 9-2 11 2M40 8c5-2 9 1 10 5M72 22c4-4 9-3 12 1M104 12c5-2 9 1 10 6" />
      <path d="M22 48c4-3 9-2 11 2M56 42c5-2 9 1 10 5M92 52c4-4 9-3 12 1M124 44c5-2 9 1 10 6" opacity={0.75} />
      <path d="M10 76c4-3 9-2 11 2M48 78c5-2 9 1 10 5M84 72c4-4 9-3 12 1M118 80c5-2 9 1 10 6" opacity={0.5} />
    </svg>
  );
}

/** Rays, as a nod to the sunburst on the packs — not the mark itself. */
export function Rays({ className, strokeWidth = 1.5 }: D) {
  const rays = Array.from({ length: 11 }, (_, i) => {
    const a = (-90 + (i - 5) * 15) * (Math.PI / 180);
    return (
      <path
        key={i}
        d={`M${50 + Math.cos(a) * 18} ${50 + Math.sin(a) * 18} L${50 + Math.cos(a) * (i % 2 ? 40 : 32)} ${
          50 + Math.sin(a) * (i % 2 ? 40 : 32)
        }`}
      />
    );
  });
  return (
    <svg viewBox="0 0 100 60" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M32 50a18 18 0 0 1 36 0" />
      {rays}
    </svg>
  );
}

/** A single drawn cloud, for the sky above the horizon. */
export function Cloud({ className, strokeWidth = 1.6 }: D) {
  return (
    <svg viewBox="0 0 160 64" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M26 54c-12 0-22-8-22-18s10-18 21-17c3-11 14-19 27-19 12 0 23 7 27 17 5-3 10-4 15-4 14 0 25 11 25 24 0 9-7 17-17 17z" />
      <path d="M44 54c7-11 20-16 34-12" opacity={0.45} />
    </svg>
  );
}

/** Three birds, the way everyone draws birds. */
export function Birds({ className, strokeWidth = 1.6 }: D) {
  return (
    <svg viewBox="0 0 120 44" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M6 24q9-11 18 0 9-11 18 0" />
      <path d="M56 12q7-9 14 0 7-9 14 0" opacity={0.8} />
      <path d="M84 36q6-7 12 0 6-7 12 0" opacity={0.55} />
    </svg>
  );
}

/** A cashew, for the scatter — the one nut everybody recognises in outline. */
export function Cashew({ className, strokeWidth = 1.6 }: D) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <path d="M48 12c8 7 9 19 2 27-8 9-23 11-33 4-5-3-4-10 1-11 5-1 9 2 14 3 7 1 13-2 15-8 1-5 0-9-3-12-3-4 1-6 4-3z" />
      <path d="M24 34c5-2 10-2 14 1" opacity={0.45} />
    </svg>
  );
}

/**
 * A brush stroke to stand a pack on — the shadow a product shot casts on a
 * printed page rather than a real one. Filled, not stroked, so give it a
 * colour and an opacity from the page.
 */
export function Splash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 116" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M14 70c10-24 44-42 96-47 40-4 72 3 104 14 20 7 40 7 56 1 12-5 19 3 11 14-12 17-38 29-76 35-48 8-100 7-142 0-32-5-53-8-49-17z"
      />
      <path
        fill="currentColor"
        opacity={0.55}
        d="M258 22c10-6 22-6 30 2 6 7 2 16-8 18-12 3-22-2-26-9-2-5 0-9 4-11z"
      />
    </svg>
  );
}

/** Circular seal used for the "Heritage of Taste" badge ring. */
export function BadgeRing({ className, strokeWidth = 1.4 }: D) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden {...base} strokeWidth={strokeWidth}>
      <circle cx="60" cy="60" r="56" />
      <circle cx="60" cy="60" r="50" strokeDasharray="2 7" opacity={0.8} />
    </svg>
  );
}
