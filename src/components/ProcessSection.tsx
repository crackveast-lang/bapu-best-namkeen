'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import { Copy, SectionHeading, isPlaceholder } from '@/components/ui/Bits';
import { PROCESS } from '@/data/story';
import { PROCESS_SCENES } from '@/components/art/ProcessScenes';
import { ArrowCurve } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

function Stage({
  stage,
  index,
  className = '',
}: {
  stage: (typeof PROCESS)[number];
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Each frame drifts a touch against the scroll, so the row breathes.
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['5%', '-5%']);

  const SceneArt = PROCESS_SCENES[stage.scene];

  return (
    <li ref={ref} className={`relative ${className}`}>
      <Reveal delay={index * 0.05}>
        <figure className="relative aspect-4/5 overflow-hidden rounded-[1.1rem] border border-ink/10 bg-cream text-ink">
          <motion.div style={{ y }} className="absolute inset-[-3%]">
            <SceneArt id={`ps-${stage.step}`} className="size-full" />
          </motion.div>
          <span className="absolute top-3 left-3 rounded-full bg-ink/60 px-2.5 py-1 font-display text-[0.7rem] font-semibold tracking-[0.12em] text-ivory backdrop-blur-sm">
            {stage.step}
          </span>
        </figure>

        <h3 className="mt-4 text-[1.06rem] leading-snug">{stage.title}</h3>
        <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-soft">
          {isPlaceholder(stage.body) ? <Copy value={stage.body} /> : stage.body}
        </p>
      </Reveal>

      {index < PROCESS.length - 1 ? (
        <ArrowCurve
          aria-hidden
          className="pointer-events-none absolute top-[36%] -right-6 hidden w-10 text-ink/20 lg:block"
        />
      ) : null}
    </li>
  );
}

export default function ProcessSection() {
  return (
    <section className="grain relative bg-parchment py-20 md:py-28 overflow-hidden" aria-labelledby="process-heading">
      <Decor variant="process" />
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How we make it"
            title={<span id="process-heading">From our kitchen to your home.</span>}
            lede="Five steps, described only as far as we can evidence them. Where the detail is still with the family, you will see a marked gap rather than a guess."
          />
        </Reveal>

        <ul className="no-scrollbar mt-14 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0">
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
            Drawn, not photographed. We have no pictures of the production kitchen yet, and we
            would rather illustrate the process than pass off a stock photograph of someone
            else&rsquo;s factory as ours.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
