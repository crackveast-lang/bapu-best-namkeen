import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Eyebrow, Placeholder } from '@/components/ui/Bits';
import { CONTACT, LEGAL } from '@/data/site';

/**
 * Legal pages are scaffolds only. Policy text is a legal document, not copy to
 * be written by a website build — each page states plainly that it is awaiting
 * the business's own wording rather than shipping a plausible-looking policy
 * nobody has approved.
 */
const POLICIES = {
  terms: {
    title: 'Terms of Use',
    lede: 'The terms that govern use of this website.',
    sections: [
      'Who we are and how to reach us',
      'Use of this website',
      'Product information and pack labelling',
      'Purchases made through Amazon and Flipkart',
      'Intellectual property',
      'Limitation of liability',
      'Governing law and jurisdiction',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    lede: 'What this website collects, and what it does not.',
    sections: [
      'What we collect',
      'How it is used',
      'Cookies and analytics',
      'Third parties and marketplaces',
      'Data retention',
      'Your rights',
      'How to contact us about your data',
    ],
  },
  refunds: {
    title: 'Refund Policy',
    lede: 'Returns and refunds for orders placed through our marketplace listings.',
    sections: [
      'Where your order was placed',
      'Amazon returns and refunds',
      'Flipkart returns and refunds',
      'Damaged or incorrect items',
      'How to raise a complaint with us directly',
    ],
  },
} as const;

type Policy = keyof typeof POLICIES;

export function generateStaticParams() {
  return Object.keys(POLICIES).map((policy) => ({ policy }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ policy: string }>;
}): Promise<Metadata> {
  const { policy } = await params;
  const entry = POLICIES[policy as Policy];
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.lede,
    alternates: { canonical: `/legal/${policy}` },
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ policy: string }> }) {
  const { policy } = await params;
  const entry = POLICIES[policy as Policy];
  if (!entry) notFound();

  return (
    <article className="bg-ivory">
      <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 md:py-24">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 text-[clamp(2.1rem,5.5vw,3.4rem)] leading-tight">{entry.title}</h1>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">{entry.lede}</p>

        <div className="mt-10 rounded-[1.1rem] border border-dashed border-crimson/35 bg-crimson/[0.04] p-6">
          <Placeholder>Awaiting approved policy text</Placeholder>
          <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-soft">
            This page is intentionally empty. A {entry.title.toLowerCase()} is a legal document
            and has to come from {LEGAL.entity} — drafting one here would put wording on the
            record that nobody has approved. The section headings below are the structure the
            page is built to take.
          </p>
        </div>

        <ol className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {entry.sections.map((s, i) => (
            <li key={s} className="flex items-baseline gap-4 py-4">
              <span className="font-display text-[0.85rem] text-ink-faint tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[0.98rem] text-ink">{s}</span>
              <span className="ml-auto text-[0.68rem] tracking-[0.12em] text-ink-faint uppercase">
                To be supplied
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-[0.85rem] leading-relaxed text-ink-soft">
          <p className="font-semibold text-ink">In the meantime</p>
          <p className="mt-2">
            Reach us at{' '}
            <a href={`mailto:${CONTACT.email}`} className="link-underline font-medium text-ink">
              {CONTACT.email}
            </a>{' '}
            or {CONTACT.phones[0]}. Orders placed on Amazon or Flipkart are covered by those
            marketplaces&rsquo; own returns and privacy policies.
          </p>
        </div>
      </div>
    </article>
  );
}
