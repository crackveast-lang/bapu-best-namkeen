import type { MetadataRoute } from 'next';
import { SITE } from '@/data/site';

// Emitted as a file at build time so the route survives the static export.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/legal/' },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
