"use client";

/* Big typography + packets at different scroll speeds = parallax depth.
   The word MASALA sits mid-stack: some packets behind it, one in front. */

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Seeds, Chilli, Peanut, Sparkle } from "./Doodles";

export default function FloatingComposition() {
  const wrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const scrub = (target: string, vars: gsap.TweenVars) =>
        gsap.fromTo(
          target,
          { yPercent: vars.from as number, rotate: (vars.r0 as number) ?? 0 },
          {
            yPercent: vars.to as number,
            rotate: (vars.r1 as number) ?? 0,
            ease: "none",
            scrollTrigger: {
              trigger: wrap.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

      scrub(".fc-word", { from: 18, to: -18 });
      scrub(".fc-sada", { from: 30, to: -34, r0: -4, r1: 3 });
      scrub(".fc-milan", { from: 12, to: -6, r0: -12, r1: -18 });
      scrub(".fc-ratlami", { from: 45, to: -50, r0: 10, r1: 20 });
      scrub(".fc-indori", { from: 6, to: -2, r0: 8, r1: 2 });
      scrub(".fc-doodles", { from: 24, to: -28 });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      className="relative overflow-hidden bg-cream-2 py-16 sm:py-24"
    >
      <div className="relative mx-auto h-[86vw] max-h-[660px] min-h-[420px] w-full max-w-7xl px-5 sm:h-[46vw]">
        {/* behind the word */}
        <div className="fc-milan absolute top-[6%] left-[4%] z-0 w-[30%] max-w-[300px] opacity-90 sm:left-[8%]">
          <Image src="/products/milan-mixture.webp" alt="Milan Mixture packet floating" width={400} height={520} className="packet-shadow-soft" />
        </div>
        <div className="fc-indori absolute top-[2%] right-[6%] z-0 w-[26%] max-w-[260px] opacity-80">
          <Image src="/products/indori-khatta.webp" alt="Indori Khatta Meetha packet floating" width={380} height={500} className="packet-shadow-soft" />
        </div>

        {/* the word */}
        <div className="fc-word absolute top-1/2 left-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="display block text-[22vw] leading-none text-orange sm:text-[17vw] lg:text-[15rem]">
            Masala
          </span>
          <span className="font-hand mt-2 block text-2xl text-charcoal/55 sm:text-3xl">
            — the mood, the memory, the whole vibe —
          </span>
        </div>

        {/* in front of the word */}
        <div className="fc-sada absolute top-[14%] left-1/2 z-20 w-[46%] max-w-[380px] -translate-x-1/2">
          <Image src="/products/sada-sev.webp" alt="Sada Sev packet floating in front of typography" width={520} height={700} className="packet-shadow" />
        </div>
        <div className="fc-ratlami absolute right-[-6%] bottom-[-4%] z-20 w-[34%] max-w-[300px] sm:right-[2%]">
          <Image src="/products/ratlami-sev.webp" alt="Ratlami Sev packet floating" width={420} height={560} className="packet-shadow" />
        </div>

        {/* scattered bits */}
        <div className="fc-doodles pointer-events-none absolute inset-0 z-30">
          <Chilli className="absolute top-[20%] right-[24%] w-9 rotate-45" />
          <Peanut className="absolute bottom-[18%] left-[12%] w-12 -rotate-12" />
          <Seeds className="absolute top-[64%] right-[38%] hidden w-20 sm:block" />
          <Sparkle className="absolute top-[8%] left-[30%] w-5" />
          <Peanut className="absolute top-[38%] left-[2%] hidden w-9 rotate-45 sm:block" />
        </div>
      </div>
    </section>
  );
}
