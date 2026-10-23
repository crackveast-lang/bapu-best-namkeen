/* The Best Bites name, set the way the pack logo sets it: a slanted brush
   script. Use this everywhere the sub-brand is named.
   - "inline": inside running text — brush script in brand red.
   - "logo":   headings/badges — white letters with a red outline,
               like the logo; `namkeen` adds the small NAMKEEN caps beneath. */

type Props = {
  variant?: "inline" | "logo";
  /** follow the name with "Namkeen" */
  namkeen?: boolean;
  className?: string;
};

export default function BestBites({ variant = "inline", namkeen = false, className = "" }: Props) {
  if (variant === "logo") {
    return (
      <span className={`inline-flex flex-col items-center leading-none normal-case ${className}`}>
        <span className="font-bites bites-logo whitespace-nowrap">Best Bites</span>
        {namkeen && (
          <span className="mt-[0.12em] text-[0.22em] font-bold tracking-[0.3em] text-brand-red uppercase">Namkeen</span>
        )}
      </span>
    );
  }
  return (
    <span className={`whitespace-nowrap normal-case tracking-normal ${className}`}>
      <span className="font-bites pr-[0.1em] text-[1.08em] text-brand-red">Best Bites</span>
      {namkeen && " Namkeen"}
    </span>
  );
}
