import Link from 'next/link';
import { CONTACT, LEGAL, SITE, SOCIAL } from '@/data/site';
import Reveal, { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Placeholder, Wordmark } from '@/components/ui/Bits';
import BuyButton from '@/components/ui/BuyButton';
import GwaliorSkyline from '@/components/art/GwaliorSkyline';
import PatternRule from '@/components/art/PatternRule';

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Our Brands', href: '/brands' },
      { label: 'Namkeen', href: '/namkeen' },
      { label: 'Our Story', href: '/our-story' },
      { label: 'Our Stores', href: '/stores' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'FAQs', href: '/contact#faqs' },
      { label: 'Shipping', href: '/contact#shipping' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Refund Policy', href: '/legal/refunds' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-maroon-deep text-ivory">
      {/* Printed ribbon along the lid, the way a sweet box is banded. */}
      <PatternRule tone="maroon" height="h-7 md:h-9" />
      {/* heritage line art along the base */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 text-ivory/[0.08]"
      >
        <GwaliorSkyline className="w-full" idPrefix="foot" />
      </div>

      <div className="relative mx-auto w-full max-w-[88rem] px-5 pt-16 pb-10 sm:px-8 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---- brand block ---- */}
          <Reveal className="lg:col-span-4">
            <Wordmark tone="ivory" className="scale-[1.15] origin-left" />
            <p className="mt-7 max-w-xs font-display text-[1.22rem] leading-snug text-ivory/85 italic">
              Proudly made in Gwalior. Bringing authentic taste to every home.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <BuyButton
                marketplace="amazon"
                variant="solid"
                size="sm"
                className="!bg-ivory !text-maroon-deep hover:!bg-saffron"
              />
              <BuyButton
                marketplace="flipkart"
                variant="outline"
                size="sm"
                className="!border-ivory/30 !bg-transparent !text-ivory hover:!border-ivory/60"
              />
            </div>
          </Reveal>

          {/* ---- link columns ---- */}
          <Stagger
            as="div"
            step={0.05}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5"
          >
            <nav aria-label="Footer" className="contents">
              {COLUMNS.map((col) => (
                <StaggerItem key={col.title}>
                  <h2 className="font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-ivory/45 uppercase">
                    {col.title}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="group/fl inline-flex items-center gap-1.5 text-[0.86rem] text-ivory/75 transition-colors hover:text-ivory"
                        >
                          <span className="link-underline">{l.label}</span>
                          {/* The arrow is absent until hover, then slides in —
                              a nudge, not a permanent row of chevrons. */}
                          <span
                            aria-hidden
                            className="-translate-x-1 text-[0.75rem] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/fl:translate-x-0 group-hover/fl:opacity-100"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              ))}
            </nav>
          </Stagger>

          {/* ---- contact ---- */}
          <Reveal delay={0.12} className="lg:col-span-3">
            <h2 className="font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-ivory/45 uppercase">
              Contact
            </h2>
            <address className="mt-4 space-y-2.5 text-[0.86rem] leading-relaxed text-ivory/75 not-italic">
              <p>
                {LEGAL.addressLine}
                <br />
                {LEGAL.city}, {LEGAL.state} {LEGAL.postalCode}
              </p>
              <p className="flex flex-col gap-1">
                {CONTACT.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="link-underline w-fit transition-colors hover:text-ivory"
                  >
                    {phone}
                  </a>
                ))}
              </p>
              <p className="flex items-center gap-2">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="link-underline transition-colors hover:text-ivory"
                >
                  {CONTACT.email}
                </a>
              </p>
              {CONTACT.emailNeedsConfirmation ? (
                <Placeholder className="!border-ivory/30 !bg-ivory/5 !text-ivory/70">
                  Confirm email spelling
                </Placeholder>
              ) : null}
            </address>

            <div className="mt-5 flex gap-2">
              {SOCIAL.instagram ? (
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid size-9 place-items-center rounded-full border border-ivory/25 text-ivory/75 transition-colors hover:border-ivory/60 hover:text-ivory"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              ) : (
                <Placeholder className="!border-ivory/30 !bg-ivory/5 !text-ivory/70">
                  Add social links
                </Placeholder>
              )}
            </div>
          </Reveal>
        </div>

        {/* ---- legal strip ---- */}
        <Reveal variant="fade" className="mt-14 border-t border-ivory/12 pt-7">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[0.72rem] text-ivory/50">
            <p>
              &copy; {year} {LEGAL.entity}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <li>FSSAI Lic. No. {LEGAL.fssai}</li>
              <li>GSTIN {LEGAL.gstin}</li>
              <li>{LEGAL.iso} certified</li>
            </ul>
          </div>
          <p className="mt-4 max-w-3xl text-[0.68rem] leading-relaxed text-ivory/35">
            {SITE.name} is a trade name of {LEGAL.entity}, sole proprietorship of{' '}
            {LEGAL.proprietor}. Orders placed through Amazon or Flipkart are fulfilled under
            those marketplaces&rsquo; own terms.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
