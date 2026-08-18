import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { Copy, isPlaceholder } from '@/components/ui/Bits';
import { TIMELINE } from '@/data/story';

/**
 * Vertical timeline with a hand-drawn spine. Each entry says plainly whether
 * its copy is confirmed or still waiting on the family.
 */
export default function Timeline() {
  return (
    <ol className="relative mt-14">
      {/* the spine */}
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[13px] w-px bg-gradient-to-b from-transparent via-ink/20 to-transparent md:left-1/2 md:-translate-x-px"
      />

      {TIMELINE.map((m, i) => {
        const right = i % 2 === 1;
        return (
          <Reveal as="li" key={`${m.year}-${m.title}`} delay={0.04 * i} className="relative">
            <div
              className={`grid gap-x-12 gap-y-4 pb-14 pl-10 md:grid-cols-2 md:pl-0 ${
                right ? '' : ''
              }`}
            >
              {/* node */}
              <span
                aria-hidden
                className="absolute top-1.5 left-0 grid size-7 place-items-center rounded-full border border-ink/20 bg-ivory md:left-1/2 md:-translate-x-1/2"
              >
                <span
                  className={`size-2 rounded-full ${m.confirmed ? 'bg-maroon' : 'border border-dashed border-crimson/70 bg-transparent'}`}
                />
              </span>

              <div
                className={`${right ? 'md:col-start-2 md:pl-14' : 'md:col-start-1 md:pr-14 md:text-right'}`}
              >
                <p className="font-display text-[1.9rem] leading-none text-saffron">
                  {isPlaceholder(m.year) ? <Copy value={m.year} /> : m.year}
                </p>
                <h3 className="mt-2 text-[1.25rem] leading-snug">{m.title}</h3>
                <div
                  className={`mt-3 text-[0.89rem] leading-relaxed text-ink-soft ${right ? '' : 'md:ml-auto'} max-w-md`}
                >
                  <Copy value={m.body} />
                </div>
              </div>

              {m.image ? (
                <figure
                  className={`${right ? 'md:col-start-1 md:row-start-1 md:pr-14' : 'md:col-start-2 md:pl-14'}`}
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-[1.1rem] border border-ink/10 bg-cream">
                    <Media
                      name={m.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 88vw, 38vw"
                      imgClassName="object-cover"
                    />
                  </div>
                </figure>
              ) : null}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
