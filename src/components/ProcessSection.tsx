'use client';

import { useRef, type CSSProperties, type PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/Bits';
import { PROCESS } from '@/data/story';
import Decor from '@/components/art/Decor';

/* ------------------------------------------------------------------ *
 * The motion layer
 * ------------------------------------------------------------------ */

/**
 * The particle field that plays over a card's photograph.
 *
 * `scan` and `seal` are drawn by the stylesheet on a pseudo-element and need no
 * children; the other three are a scatter of specks. Positions come from a
 * fixed table rather than `Math.random()` so the server and the client agree —
 * a random scatter would mismatch on hydration and React would blow the whole
 * card away and rebuild it.
 */
const SPECKS = [
  { left: '12%', top: '68%', size: 5, delay: 0, duration: 6.5 },
  { left: '28%', top: '84%', size: 3, delay: 1.4, duration: 5.2 },
  { left: '44%', top: '72%', size: 6, delay: 0.7, duration: 7.4 },
  { left: '61%', top: '88%', size: 4, delay: 2.1, duration: 6 },
  { left: '77%', top: '64%', size: 3, delay: 1.1, duration: 8 },
  { left: '89%', top: '80%', size: 5, delay: 2.8, duration: 5.6 },
];

function MotionLayer({ kind }: { kind: (typeof PROCESS)[number]['motion'] }) {
  const scattered = kind === 'settle' || kind === 'sizzle' || kind === 'fall';

  return (
    <span aria-hidden className={`proc-fx proc-fx--${kind} text-saffron`}>
      {scattered
        ? SPECKS.map((s) => (
            <i
              key={s.left}
              style={
                {
                  left: s.left,
                  // Falling masala starts at the top of the frame; everything
                  // else starts at the bottom and works its way up.
                  top: kind === 'fall' ? '0%' : s.top,
                  '--fx-size': `${s.size}px`,
                  '--fx-delay': `${s.delay}s`,
                  '--fx-duration': `${s.duration}s`,
                } as CSSProperties
              }
            />
          ))
        : null}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * A stage
 * ------------------------------------------------------------------ */

function Stage({
  stage,
  index,
  className = '',
}: {
  stage: (typeof PROCESS)[number];
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  // Pointer tilt. The springs are what stop it feeling like a mouse-follower:
  // the card leans towards the cursor and settles back on its own.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.li
      className={`group relative ${className}`}
      style={{ perspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <Reveal delay={index * 0.06} y={26} variant="blur">
        <motion.article
          style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative"
        >
          <figure className="relative aspect-4/5 overflow-hidden rounded-[1.1rem] border border-ink/10 bg-ink shadow-[0_30px_60px_-44px_rgba(43,26,18,0.8)] transition-shadow duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[0_46px_80px_-42px_rgba(43,26,18,0.85)]">
            <Media
              name={stage.image}
              alt={stage.imageAlt}
              fill
              sizes="(max-width: 640px) 62vw, (max-width: 1024px) 38vw, 19vw"
              imgClassName="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
            />

            {/* Scrim. Deep enough at the foot for the title to sit on it, and
                it closes over the whole frame on hover so the body copy has
                somewhere to arrive. */}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 via-45% to-transparent"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-ink/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <MotionLayer kind={stage.motion} />

            {/* The step number, and the rule that draws out from under it. */}
            <div className="absolute top-4 left-4 z-10">
              <span className="font-display text-[1.5rem] leading-none font-semibold text-ivory/85">
                {stage.step}
              </span>
              <span
                aria-hidden
                className="mt-1.5 block h-px w-6 origin-left scale-x-100 bg-saffron transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[2.6]"
              />
            </div>

            {/* Type. The title holds its place; the body slides up under it on
                hover and on keyboard focus. Below `md` there is no hover to
                speak of, so the body is simply always there. */}
            <figcaption className="absolute inset-x-0 bottom-0 z-10 p-5">
              <h3 className="text-[1.05rem] leading-snug text-ivory">{stage.title}</h3>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-ivory/80 md:max-h-0 md:translate-y-2 md:overflow-hidden md:opacity-0 md:transition-[max-height,opacity,transform] md:duration-600 md:ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:max-h-52 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:max-h-52 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                {stage.body}
              </p>
            </figcaption>
          </figure>
        </motion.article>
      </Reveal>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ *
 * The section
 * ------------------------------------------------------------------ */

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  });
  // Padded to the full range at both ends — a partial input range runs this
  // mapping backwards past its end. See the note in HouseSection.
  const rail = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], reduced ? [1, 1, 1, 1] : [0, 0, 1, 1]);

  return (
    <section
      className="grain relative overflow-hidden bg-parchment py-20 md:py-28"
      aria-labelledby="process-heading"
    >
      <Decor variant="process" />
      <div ref={ref} className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How we make it"
            title="From our kitchen to your home."
            titleId="process-heading"
            lede="Five steps, from the sack of gram flour to the sealed pack. Point at a stage to read what happens there."
          />
        </Reveal>

        {/* The rail fills as the row scrolls through, so the five stages read
            as one run rather than five separate cards. */}
        <div aria-hidden className="mt-12 h-px w-full overflow-hidden bg-ink/12">
          <motion.div style={{ scaleX: rail }} className="h-full w-full origin-left bg-maroon/70" />
        </div>

        <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0">
          {PROCESS.map((stage, i) => (
            <Stage
              key={stage.step}
              stage={stage}
              index={i}
              className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-auto"
            />
          ))}
        </ul>

        <Reveal>
          <p className="mt-10 max-w-2xl text-[0.76rem] leading-relaxed text-ink-faint">
            <strong className="font-semibold text-ink-soft">About these photographs.</strong>{' '}
            They illustrate the craft — a scoop of pulses, a kadai, chilli on a spoon, a food
            hall, a pouch under a sealer. None of them is our kitchen, our pack or our people,
            and we would rather say so than pass someone else&rsquo;s factory off as ours. The
            certification and the licence number above are ours, and are on every pack.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
