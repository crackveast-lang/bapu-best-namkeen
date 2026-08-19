import Pattern, { type PatternTone } from '@/components/art/Pattern';

/**
 * A narrow band of the block print, used as a section divider — the printed
 * ribbon that runs along the edge of a sweet box.
 *
 * Purely decorative: it carries no heading and separates nothing semantically,
 * so it is a plain <div>, hidden from assistive technology by the Pattern
 * inside it.
 */
export default function PatternRule({
  tone = 'maroon',
  className = '',
  height = 'h-8 md:h-10',
}: {
  tone?: PatternTone;
  className?: string;
  height?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${height} ${className}`}>
      <Pattern tone={tone} scale={0.34} />
    </div>
  );
}
