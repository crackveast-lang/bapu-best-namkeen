import type { MetadataRoute } from 'next';
import { SITE } from '@/data/site';
import { PRODUCTS } from '@/data/products';

// Emitted as a file at build time so the route survives the static export.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = [
    { path: '', priority: 1 },
    { path: '/namkeen', priority: 0.9 },
    { path: '/brands', priority: 0.8 },
    { path: '/our-story', priority: 0.7 },
    { path: '/stores', priority: 0.7 },
    { path: '/contact', priority: 0.6 },
  ];

  const products = PRODUCTS.map((p) => ({
    path: `/namkeen/${p.slug}`,
    priority: 0.8,
  }));

  return [...pages, ...products].map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority,
  }));
}
