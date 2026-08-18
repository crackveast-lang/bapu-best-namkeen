import Link from 'next/link';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/Bits';
import { BRANDS, type Brand } from '@/data/products';
import { Flourish, SevStrands } from '@/components/art/Doodles';
import Decor from '@/components/art/Decor';

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  return (
    <Reveal as="article" delay={index * 0.08} className="group h-full">
      <Link
        href={brand.href}
        className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ivory transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[0_44px_70px_-52px_rgba(43,26,18,0.7)]"
      >
        {/* accent rule that grows on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          style={{ background: brand.accent }}
        />

        <div className="relative aspect-16/11 overflow-hidden bg-cream">
          <Media
            name={brand.image}
            alt={`${brand.name} packaging photographed with a bowl of namkeen`}
            fill
            sizes="(max-width: 768px) 92vw, 44vw"
            imgClassName="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
          />
          <span className="absolute top-4 left-4 rounded-full border border-ivory/40 bg-ink/45 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.16em] text-ivory uppercase backdrop-blur-sm">
            Since {brand.since}
          </span>
          <SevStrands
            aria-hidden
            className="pointer-events-none absolute right-5 bottom-5 w-20 text-ivory/0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-ivory/60"
          />
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-[1.6rem] leading-tight">{brand.name}</h3>
          <p className="mt-1 text-[0.7rem] font-semibold tracking-[0.16em] text-ink-faint uppercase">
            {brand.lockup}
          </p>
          <p className="mt-4 font-display text-[1.06rem] leading-snug text-maroon italic">
            {brand.blurb}
          </p>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">{brand.copy}</p>

          <span className="mt-6 inline-flex items-center gap-2 text-[0.82rem] font-semibold text-ink">
            <span className="link-underline">Explore {brand.name}</span>
            <span
              aria-hidden
              className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function BrandsSection() {
  return (
    <section id="brands" className="relative scroll-mt-24 bg-ivory py-20 md:py-28 overflow-hidden" aria-labelledby="brands-heading">
      <Decor variant="brands" />
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our brands"
            title={<span id="brands-heading">Two names. One love for great namkeen.</span>}
            lede="Both are made by the same family, in the same city. One has been on Gwalior's kitchen shelves for decades; the other was built to travel."
          />
        </Reveal>

        <Flourish
          aria-hidden
          className="mt-10 hidden w-40 text-ink/20 md:block"
        />

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 lg:gap-8">
          {Object.values(BRANDS).map((brand, i) => (
            <BrandCard key={brand.id} brand={brand} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
