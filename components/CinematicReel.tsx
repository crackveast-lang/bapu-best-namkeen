"use client";

/* Pinned, scroll-scrubbed product presentation — the "commercial while you scroll".
   Beat 1: Ratlami Sev center stage.
   Beat 2: Ratlami tucks left + shrinks; Indori Khatta Meetha sweeps in.
   Beat 3: Milan Mixture rises; the others frame it. */

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const beats = [
  {
    n: "01",
    name: "Ratlami Sev",
    line: "Bold. Spicy. Addictive.",
    body: "Thick-cut sev with the legendary Ratlam masala — cloves, pepper, fire.",
    color: "#23348c",
  },
  {
    n: "02",
    name: "Indori Khatta Meetha",
    line: "Sweet meets tang.",
    body: "Indore's seesaw of sweet and sour, with peanuts in every handful.",
    color: "#0e8794",
  },
  {
    n: "03",
    name: "Milan Mixture",
    line: "Everything, together.",
    body: "Flakes, sev, dals and nuts — the mixture every tea tray asks for.",
    color: "#4a2c1a",
  },
];

export default function CinematicReel() {
  const wrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "+=2600",
          pin: true,
          scrub: 1,
        },
      });

      // ---- initial state
      gsap.set(".reel-ratlami", { xPercent: 0, yPercent: 6, rotate: -4, scale: 1 });
      gsap.set(".reel-indori", { xPercent: 130, yPercent: 16, rotate: 18, scale: 0.9, opacity: 0 });
      gsap.set(".reel-milan", { xPercent: -20, yPercent: 130, rotate: -14, scale: 0.85, opacity: 0 });
      gsap.set(".reel-text-1", { opacity: 1, y: 0 });
      gsap.set([".reel-text-2", ".reel-text-3"], { opacity: 0, y: 60 });

      // ---- beat 1 -> 2
      tl.to(".reel-ratlami", { xPercent: -98, yPercent: 22, rotate: -16, scale: 0.6, duration: 1 }, 0.35)
        .to(".reel-indori", { xPercent: 0, yPercent: 0, rotate: 5, scale: 1, opacity: 1, duration: 1 }, 0.4)
        .to(".reel-text-1", { opacity: 0, y: -60, duration: 0.45 }, 0.35)
        .to(".reel-text-2", { opacity: 1, y: 0, duration: 0.5 }, 0.7)
        .to(".reel-stage", { backgroundColor: "rgba(41,182,197,0.10)", duration: 1 }, 0.4)

        // ---- beat 2 -> 3
        .to(".reel-indori", { xPercent: 88, yPercent: 24, rotate: 17, scale: 0.58, duration: 1 }, 1.75)
        .to(".reel-milan", { xPercent: 0, yPercent: 4, rotate: -2, scale: 1.02, opacity: 1, duration: 1 }, 1.8)
        .to(".reel-ratlami", { xPercent: -112, yPercent: 18, rotate: -20, scale: 0.48, duration: 1 }, 1.8)
        .to(".reel-text-2", { opacity: 0, y: -60, duration: 0.45 }, 1.75)
        .to(".reel-text-3", { opacity: 1, y: 0, duration: 0.5 }, 2.1)
        .to(".reel-stage", { backgroundColor: "rgba(74,44,26,0.08)", duration: 1 }, 1.8)

        // breathing room at the end
        .to({}, { duration: 0.4 });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative overflow-hidden">
      <div className="reel-stage flex h-svh items-center">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-5 sm:px-8 lg:grid-cols-2">
          {/* text beats */}
          <div className="relative z-20 order-2 h-56 lg:order-1 lg:h-80">
            {beats.map((b, i) => (
              <div key={b.n} className={`reel-text-${i + 1} absolute inset-0 flex flex-col justify-center`}>
                <span className="display text-7xl lg:text-8xl" style={{ color: b.color, opacity: 0.25 }}>
                  {b.n}
                </span>
                <h3 className="display mt-2 text-4xl text-charcoal lg:text-6xl">{b.name}</h3>
                <p className="mt-3 text-xl font-bold" style={{ color: b.color }}>
                  {b.line}
                </p>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-charcoal/65">{b.body}</p>
              </div>
            ))}
          </div>

          {/* packet stage */}
          <div className="relative order-1 h-[46svh] lg:order-2 lg:h-[74svh]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="reel-ratlami">
                <Image src="/products/ratlami-sev.webp" alt="Ratlami Sev packet" width={620} height={840} className="packet-shadow max-h-[42svh] w-auto lg:max-h-[62svh]" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="reel-indori">
                <Image src="/products/indori-khatta.webp" alt="Indori Khatta Meetha packet" width={620} height={840} className="packet-shadow max-h-[42svh] w-auto lg:max-h-[62svh]" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="reel-milan">
                <Image src="/products/milan-mixture.webp" alt="Milan Mixture packet" width={620} height={840} className="packet-shadow max-h-[42svh] w-auto lg:max-h-[62svh]" />
              </div>
            </div>
          </div>
        </div>

        {/* section label */}
        <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 sm:top-28">
          <span className="font-hand text-2xl text-charcoal/50">the line-up, one by one ↓</span>
        </div>
      </div>
    </section>
  );
}
