import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Bits';
import { SevStrands } from '@/components/art/Doodles';

export default function NotFound() {
  return (
    <section className="grain relative grid min-h-[62vh] place-items-center bg-parchment px-5 py-24">
      <div className="max-w-lg text-center">
        <SevStrands aria-hidden className="mx-auto w-28 text-saffron/50" />
        <Eyebrow className="mt-8 justify-center">404</Eyebrow>
        <h1 className="mt-4 text-[clamp(2rem,6vw,3.2rem)] leading-tight">
          This page went the way of the last handful.
        </h1>
        <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">
          It is not here — but the namkeen is.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[0.85rem] font-semibold text-ivory transition-colors hover:bg-maroon"
          >
            Back home
          </Link>
          <Link
            href="/namkeen"
            className="inline-flex h-11 items-center rounded-full border border-ink/20 px-6 text-[0.85rem] font-semibold text-ink transition-colors hover:border-ink/45"
          >
            See the namkeen
          </Link>
        </div>
      </div>
    </section>
  );
}
