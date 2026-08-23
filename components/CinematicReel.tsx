"use client";

/* Pinned, scroll-scrubbed product reel — five products, one moment each.
   Layout contract: text lives in the left lane, packets in the right lane.
   Packet transforms are bounded so they never cross into the text lane
   (desktop) or the text block (mobile, where the stage sits above the text). */

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/products";
import BuyButtons from "./BuyButtons";
import { Star, Sparkle } from "./Doodles";

const REEL_SLUGS = ["ratlami-sev", "sada-sev", "kadipatta-mix", "indori-khatta-meetha", "milan-mixture"];
const reel = REEL_SLUGS.map((s) => products.find((p) => p.slug === s)!);

/* packet states — all percentages are of the packet's own size, and the
   stage is wide enough that "prev" and "next" stay inside the right lane */
const STATES = {
  next: { xPercent: 55, yPercent: 12, scale: 0.78, rotate: 16, opacity: 0 },
  active: { xPercent: 0, yPercent: 0, scale: 1, rotate: 3, opacity: 1 },
  prev: { xPercent: -30, yPercent: 16, scale: 0.55, rotate: -12, opacity: 0.55 },
  gone: { xPercent: -42, yPercent: 26, scale: 0.42, rotate: -18, opacity: 0 },
};

export default function CinematicReel() {
  const wrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const packets = reel.map((_, i) => `.reel-packet-${i}`);
      const texts = reel.map((_, i) => `.reel-text-${i}`);

      packets.forEach((sel, i) => gsap.set(sel, i === 0 ? STATES.active : STATES.next));
      texts.forEach((sel, i) => gsap.set(sel, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 50, pointerEvents: i === 0 ? "auto" : "none" }));

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: `+=${reel.length * 900}`,
          pin: true,
          scrub: 1,
        },
      });

      reel.forEach((p, i) => {
        if (i === 0) return;
        const at = i * 1.4;
        tl.to(packets[i - 1], STATES.prev, at);
        if (i >= 2) tl.to(packets[i - 2], STATES.gone, at);
        tl.to(packets[i], STATES.active, at + 0.05);
        tl.to(texts[i - 1], { opacity: 0, y: -40, pointerEvents: "none", duration: 0.45 }, at);
        tl.to(texts[i], { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.5 }, at + 0.35);
        tl.to(".reel-stage", { backgroundColor: p.tint, duration: 1 }, at);
      });
      tl.to({}, { duration: 0.5 });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative overflow-hidden">
      <div className="reel-stage flex h-svh flex-col justify-center" style={{ backgroundColor: reel[0].tint }}>
        <p className="font-hand pointer-events-none absolute top-24 left-1/2 z-20 -translate-x-1/2 text-2xl whitespace-nowrap text-charcoal/50 sm:top-28">
          the line-up, one by one ↓
        </p>

        <div className="mx-auto grid w-full max-w-7xl grid-rows-[minmax(0,42svh)_auto] items-center gap-4 px-5 pt-16 sm:px-8 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)] lg:grid-rows-1 lg:gap-8 lg:pt-0">
          {/* ---------- text lane ---------- */}
          <div className="relative z-20 order-2 h-[36svh] min-h-[250px] lg:order-1 lg:h-[60svh] lg:min-h-[420px]">
            {reel.map((p, i) => (
              <div key={p.slug} className={`reel-text-${i} absolute inset-0 flex flex-col justify-center`}>
                <span className="display text-5xl leading-none lg:text-8xl" style={{ color: p.pouch, opacity: 0.25 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-1 text-3xl text-charcoal sm:text-4xl lg:mt-2 lg:text-6xl">{p.name}</h3>
                <p className="mt-1.5 text-lg font-bold lg:mt-3 lg:text-xl" style={{ color: p.pouch }}>
                  {p.tagline}
                </p>
                <p className="mt-1.5 line-clamp-2 max-w-md text-sm leading-relaxed text-charcoal/65 sm:text-base lg:mt-2 lg:line-clamp-none">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2.5 lg:mt-6 lg:gap-3">
                  <BuyButtons slug={p.slug} size="sm" />
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-sm font-semibold text-charcoal/60 underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-orange-deep"
                  >
                    View product
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ---------- packet lane ---------- */}
          <div className="relative order-1 h-full min-h-0 lg:order-2 lg:h-[74svh]">
            <Star className="absolute top-[8%] right-[10%] w-6" />
            <Sparkle className="absolute bottom-[14%] left-[12%] w-5 text-green" />
            {reel.map((p, i) => (
              <div key={p.slug} className="absolute inset-0 flex items-center justify-center">
                <div className={`reel-packet-${i} will-change-transform`}>
                  <Image
                    src={p.img}
                    alt={`${p.name} packet`}
                    width={620}
                    height={840}
                    className="packet-shadow max-h-[38svh] w-auto lg:max-h-[60svh]"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
