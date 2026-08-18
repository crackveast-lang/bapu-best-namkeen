import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import TextReveal from '@/components/ui/TextReveal';
import Media from '@/components/ui/Media';
import MarketplaceCTA from '@/components/MarketplaceCTA';
import { Eyebrow, Placeholder } from '@/components/ui/Bits';
import { BuyPair } from '@/components/ui/BuyButton';
import { CONTACT, LEGAL } from '@/data/site';
import Decor from '@/components/art/Decor';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Bapu Best Namkeen — Phalka Bazar, Lashkar, Gwalior, Madhya Pradesh. Customer care numbers, email and shipping information.',
  alternates: { canonical: '/contact' },
};

/**
 * Questions we can answer from evidence. Anything about delivery, returns or
 * wholesale belongs to the marketplace or the business, so those answers point
 * outward rather than inventing a policy.
 */
const FAQS = [
  {
    q: 'Where is Bapu Best namkeen made?',
    a: `At ${LEGAL.addressLine}, ${LEGAL.city}, ${LEGAL.state} ${LEGAL.postalCode} — the manufacturing address printed on the back of every pack, held under FSSAI licence ${LEGAL.fssai}.`,
  },
  {
    q: 'Is everything vegetarian?',
    a: 'Yes. Every pack across both brands carries the green vegetarian mark.',
  },
  {
    q: 'What allergens should I know about?',
    a: 'The 400 g Best Bites packs state: contains peanuts and soy, and are manufactured in a facility that also processes nuts, seeds and gluten. Always read the pack you receive.',
  },
  {
    q: 'How do I buy online?',
    a: 'Through Amazon or Flipkart. We do not take orders on this website, so delivery, payment and returns are handled by whichever marketplace you order from.',
  },
  {
    q: 'Do you supply wholesale or distribution?',
    a: '[ADD WHOLESALE / DISTRIBUTOR POLICY]',
  },
  {
    q: 'How long does the namkeen keep?',
    a: '[ADD SHELF LIFE — the best-before date is printed on each pack, but the standard shelf life has not been supplied.]',
  },
];

function isTodo(text: string) {
  return text.trim().startsWith('[');
}

export default function ContactPage() {
  return (
    <>
      <section className="grain relative bg-parchment pt-14 pb-16 md:pt-20 md:pb-20 overflow-hidden">
        <Decor variant="header" />
        <div className="mx-auto grid w-full max-w-[88rem] items-end gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Contact</Eyebrow>
            <TextReveal
              as="h1"
              text="Say hello to Gwalior."
              className="mt-5 text-[clamp(2.4rem,6.5vw,4.4rem)] leading-[1.0]"
            />
            <Reveal delay={0.2} y={12}>
              <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ink-soft">
                Call the shop, write to us, or come and stand at the counter. All three work.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-16/10 overflow-hidden rounded-[1.5rem] border border-ink/10">
              <Media
                name="store-counter"
                alt="The counter of a Bapu Best shop in Gwalior"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- details ---------------- */}
      <section className="bg-ivory py-16 md:py-20" aria-labelledby="details-heading">
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8">
          <h2 id="details-heading" className="sr-only">
            Contact details
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <Reveal>
              <h3 className="text-[0.66rem] font-semibold tracking-[0.2em] text-ink-faint uppercase">
                Visit
              </h3>
              <address className="mt-4 text-[1rem] leading-relaxed text-ink not-italic">
                {LEGAL.entity}
                <br />
                {LEGAL.addressLine}
                <br />
                {LEGAL.city}, {LEGAL.state} {LEGAL.postalCode}
                <br />
                India
              </address>
              <p className="mt-3 text-[0.82rem] text-ink-faint">
                {CONTACT.hours.startsWith('[') ? (
                  <Placeholder>Add opening hours</Placeholder>
                ) : (
                  CONTACT.hours
                )}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h3 className="text-[0.66rem] font-semibold tracking-[0.2em] text-ink-faint uppercase">
                Call
              </h3>
              <ul className="mt-4 space-y-2">
                {CONTACT.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={`tel:${p.replace(/\s/g, '')}`}
                      className="link-underline text-[1.05rem] font-medium text-ink"
                    >
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.78rem] text-ink-faint">
                Customer care numbers as printed on the pack.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <h3 className="text-[0.66rem] font-semibold tracking-[0.2em] text-ink-faint uppercase">
                Write
              </h3>
              <a
                href={`mailto:${CONTACT.email}`}
                className="link-underline mt-4 inline-block text-[1.05rem] font-medium break-all text-ink"
              >
                {CONTACT.email}
              </a>
              {CONTACT.emailNeedsConfirmation ? (
                <p className="mt-3">
                  <Placeholder>Confirm email spelling</Placeholder>
                </p>
              ) : null}
              <div className="mt-6">
                <h3 className="text-[0.66rem] font-semibold tracking-[0.2em] text-ink-faint uppercase">
                  On record
                </h3>
                <ul className="mt-3 space-y-1 text-[0.82rem] text-ink-soft">
                  <li>FSSAI Lic. No. {LEGAL.fssai}</li>
                  <li>GSTIN {LEGAL.gstin}</li>
                  <li>{LEGAL.iso} certified</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- shipping ---------------- */}
      <section
        id="shipping"
        className="grain scroll-mt-24 bg-parchment py-16 md:py-20"
        aria-labelledby="shipping-heading"
      >
        <div className="mx-auto grid w-full max-w-[88rem] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="shipping-heading" className="text-[clamp(1.7rem,3.8vw,2.5rem)] leading-tight">
              Shipping &amp; delivery
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <p className="text-[0.98rem] leading-relaxed text-ink-soft">
              This site does not take orders. Every pack is sold through Amazon and Flipkart,
              which means delivery timelines, shipping charges, cancellations and returns are
              set by the marketplace you order from — not by us. Check the listing before you
              buy.
            </p>
            <BuyPair className="mt-7" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- FAQs ---------------- */}
      <section id="faqs" className="scroll-mt-24 bg-ivory py-16 md:py-20" aria-labelledby="faq-heading">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <Reveal>
            <Eyebrow>FAQs</Eyebrow>
            <h2 id="faq-heading" className="mt-4 text-[clamp(1.8rem,4.2vw,2.8rem)] leading-tight">
              Questions we can answer.
            </h2>
          </Reveal>

          <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04} className="py-6">
                <dt className="font-display text-[1.12rem] leading-snug text-ink">{f.q}</dt>
                <dd className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-soft">
                  {isTodo(f.a) ? <Placeholder>{f.a.replace(/^\[|\]$/g, '')}</Placeholder> : f.a}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <MarketplaceCTA />
    </>
  );
}
