import type { ReactNode } from 'react';

/**
 * Native <details>/<summary> — open/close works with zero JavaScript, and the
 * content stays findable by in-page search when collapsed in most browsers.
 */
export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group border-b border-ink/12 [&[open]_.chevron]:rotate-180"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.98rem] font-medium text-ink transition-colors hover:text-maroon [&::-webkit-details-marker]:hidden">
        {title}
        <span
          aria-hidden
          className="chevron grid size-7 shrink-0 place-items-center rounded-full border border-ink/15 text-ink-soft transition-[transform,border-color,background-color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-maroon/35 group-hover:bg-saffron/12"
        >
          <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </summary>
      <div className="accordion-panel pb-6 text-[0.87rem] leading-relaxed text-ink-soft">
        {children}
      </div>
    </details>
  );
}
