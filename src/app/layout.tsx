import type { Metadata, Viewport } from 'next';
import { Caveat, Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyBuyBar from '@/components/StickyBuyBar';
import { CONTACT, LEGAL, SITE } from '@/data/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
  weight: ['500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Bapu Best Namkeen | Authentic Gwalior Namkeen',
    template: '%s | Bapu Best Namkeen',
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'Bapu Best Namkeen',
    'Bapu Best Bites',
    'Gwalior namkeen',
    'Ratlami sev',
    'khatta meetha namkeen',
    'Indian namkeen online',
  ],
  authors: [{ name: LEGAL.entity }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Bapu Best Namkeen | Authentic Gwalior Namkeen',
    description: SITE.description,
    images: [
      {
        url: '/images/hero-ratlami-sev.webp',
        width: 1448,
        height: 1086,
        alt: 'Bapu Best Bites Ratlami Sev pack beside a bowl of sev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bapu Best Namkeen | Authentic Gwalior Namkeen',
    description: SITE.description,
    images: ['/images/hero-ratlami-sev.webp'],
  },
  robots: { index: true, follow: true },
  category: 'food',
};

export const viewport: Viewport = {
  themeColor: '#4a0d16',
  colorScheme: 'light',
};

/** Organisation + local business, built only from evidenced facts. */
function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${SITE.url}#business`,
    name: SITE.name,
    legalName: LEGAL.entity,
    founder: { '@type': 'Person', name: LEGAL.proprietor },
    foundingDate: '1960',
    url: SITE.url,
    image: `${SITE.url}/images/hero-ratlami-sev.webp`,
    description: SITE.description,
    servesCuisine: 'Indian',
    telephone: CONTACT.phones[0],
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: LEGAL.addressLine,
      addressLocality: LEGAL.city,
      addressRegion: LEGAL.state,
      postalCode: LEGAL.postalCode,
      addressCountry: LEGAL.country,
    },
    brand: [
      { '@type': 'Brand', name: 'Bapu Best' },
      { '@type': 'Brand', name: 'Bapu Best Bites' },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <StickyBuyBar />
        <StructuredData />
      </body>
    </html>
  );
}
