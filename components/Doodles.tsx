/* Hand-drawn style SVG doodles — chillies, leaves, sev, seeds, stars, arrows.
   Deliberately imperfect strokes for a handmade feel. */

type P = { className?: string };

export function Chilli({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M14 46c2 6 10 10 18 8 12-3 22-15 24-28-6 8-14 12-24 14-9 1.8-17 2-18 6z"
        fill="#b5121b"
        stroke="#8c0e15"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M55 26c2-4 1-8-2-10"
        stroke="#2e6b34"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M20 44c6 1 12-1 18-5"
        stroke="#e9c8c4"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function Coriander({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M32 58C31 42 31 28 33 12" stroke="#2e6b34" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M33 16c-6-2-9-7-8-12 5 0 9 4 10 9M33 16c5-3 10-3 13 1-3 4-8 5-13 3M31 30c-7-1-11-5-11-11 6-.4 11 3 13 8M32 32c6-4 12-4 15 0-3 5-9 6-15 4M30 45c-6-1-10-5-10-10 5-.5 10 3 11 7"
        stroke="#2e6b34"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function SevSquiggle({ className }: P) {
  return (
    <svg viewBox="0 0 120 40" fill="none" className={className} aria-hidden>
      <path
        d="M4 22c10-12 16 10 26-2s14 8 26-3 15 9 26-2 15 8 26-4"
        stroke="#e07b1f"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M14 34c8-8 12 6 22-2s12 6 22-3"
        stroke="#c46210"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function Seeds({ className }: P) {
  return (
    <svg viewBox="0 0 80 40" fill="none" className={className} aria-hidden>
      <ellipse cx="12" cy="16" rx="4.5" ry="3.4" fill="#c46210" transform="rotate(-20 12 16)" />
      <ellipse cx="34" cy="28" rx="4" ry="3" fill="#8c5a1d" transform="rotate(30 34 28)" />
      <ellipse cx="52" cy="12" rx="4.4" ry="3.2" fill="#e07b1f" transform="rotate(-8 52 12)" />
      <ellipse cx="68" cy="26" rx="3.6" ry="2.8" fill="#74a832" transform="rotate(18 68 26)" />
    </svg>
  );
}

export function Star({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M16 3c1.2 5.4 3.5 9.4 13 13-9.5 3.6-11.8 7.6-13 13-1.2-5.4-3.5-9.4-13-13 9.5-3.6 11.8-7.6 13-13z"
        fill="#e07b1f"
      />
    </svg>
  );
}

export function Sparkle({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 2v20M2 12h20" stroke="#2e6b34" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" stroke="#2e6b34" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function HandArrow({ className }: P) {
  return (
    <svg viewBox="0 0 90 60" fill="none" className={className} aria-hidden>
      <path
        d="M6 10c22 26 44 34 72 30M78 40l-12-9M78 40l-14 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScribbleUnderline({ className }: P) {
  return (
    <svg viewBox="0 0 220 24" fill="none" className={className} preserveAspectRatio="none" aria-hidden>
      <path
        d="M4 14C50 6 120 5 216 10c-70 1-130 4-170 9 50-4 105-5 150-2"
        stroke="#e07b1f"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Smiley({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 5C13 6 5.5 14 6 25c.5 10 9 18 19 17.5S43 33 42.5 23C42 13 34 4 24 5z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M17 20c.2-1.8 1.4-3 3-3M29 19.6c.2-1.8 1.4-3 3-3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M16 29c2.6 4 5.8 5.6 9 5.4 3-.2 5.8-2 7.6-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Burst({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 4v9M24 35v9M4 24h9M35 24h9M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WavyLine({ className }: P) {
  return (
    <svg viewBox="0 0 120 20" fill="none" className={className} preserveAspectRatio="none" aria-hidden>
      <path
        d="M3 12c8-8 14 6 24-2s13 7 24-2 14 7 24-2 14 8 24-1 12 6 18 1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CameraSketch({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M10 20c8-1.4 12-2 15-2l3-6c4-.5 8-.5 12 0l2.6 6.4c4 .4 8 .8 11.4 1.6 1.6 8 1.6 20 0 28-14 2.4-30 2.4-44 .6-1.4-9-1.4-19 0-28.6z"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path d="M32 25c-5 .4-8.6 4-8.6 9s4 8.8 8.8 8.6c5-.2 8.6-4 8.4-9-.2-4.8-4-8.8-8.6-8.6z" stroke="currentColor" strokeWidth="2.8" />
      <circle cx="49" cy="26" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function ScooterSketch({ className }: P) {
  return (
    <svg viewBox="0 0 96 64" fill="none" className={className} aria-hidden>
      <path
        d="M14 50a7 7 0 1014 .4A7 7 0 0014 50zm54-.6a7 7 0 1014 .6 7 7 0 00-14-.6z"
        stroke="currentColor"
        strokeWidth="2.8"
      />
      <path
        d="M28 50c8 .6 20 .6 27-1l7-17c3-1.4 7-1.6 10 0l4 16M62 32c-2-8-3-13-5-19-3-1-6-1.2-9-.6M48 12h12M34 34c-6 0-11 3-13 8"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 22h14M2 30h11M7 38h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function PinSketch({ className }: P) {
  return (
    <svg viewBox="0 0 48 64" fill="none" className={className} aria-hidden>
      <path
        d="M24 58C14 46 8 37.6 7.6 28 7 17 14.6 8 24 7.4 33.6 6.8 41 15 41 25c0 9.6-7 19.6-17 33z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M24 19c-3.6.2-6.4 3-6.2 6.6.2 3.4 3 6 6.6 5.8 3.4-.2 6-3 5.8-6.6-.2-3.4-3-6-6.2-5.8z" stroke="currentColor" strokeWidth="2.8" />
    </svg>
  );
}

export function Stamp1960({ className }: P) {
  return (
    <svg viewBox="0 0 96 60" fill="none" className={className} aria-hidden>
      <rect
        x="5"
        y="7"
        width="86"
        height="46"
        rx="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="10 5"
        transform="rotate(-4 48 30)"
      />
      <text
        x="48"
        y="38"
        textAnchor="middle"
        fontFamily="var(--font-caveat), cursive"
        fontSize="24"
        fontWeight="700"
        fill="currentColor"
        transform="rotate(-4 48 30)"
      >
        est. 1960
      </text>
    </svg>
  );
}

export function Peanut({ className }: P) {
  return (
    <svg viewBox="0 0 48 32" fill="none" className={className} aria-hidden>
      <path
        d="M10 8c5-4 11-3 14 2 2 3 6 3 9 1 5-3 11 1 11 7 0 5-5 9-10 8-3-.6-6 .8-7 3-3 5-10 5-14 1-3-3-3-7-1-10 1.6-2.6 1-6-2-7-3-1.4-2.6-3 0-5z"
        fill="#d9a05b"
        stroke="#a9701f"
        strokeWidth="2"
      />
      <path d="M18 12c3 3 8 4 12 3M16 20c4 2 9 2 13 0" stroke="#a9701f" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
