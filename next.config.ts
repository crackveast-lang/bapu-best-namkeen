import type { NextConfig } from 'next';

/**
 * Two deployment shapes from one config.
 *
 * Default (local dev, `next start`, Vercel): a normal server build with the
 * image optimiser on and no base path.
 *
 * `GITHUB_PAGES=true`: a fully static export. Every route in this app is
 * prerendered — there are no API routes, server actions or runtime data — so an
 * export loses nothing. Pages serves the site from a repository sub-path, hence
 * basePath/assetPrefix, and there is no optimiser there, hence `unoptimized`
 * (the images in public/images are already sized and compressed by
 * `npm run assets`).
 */
const isPages = process.env.GITHUB_PAGES === 'true';
const basePath = isPages ? process.env.NEXT_PUBLIC_BASE_PATH ?? '' : '';

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: 'export' as const,
        // Pages resolves /foo to /foo/index.html, so emit directories.
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
      }
    : {}),
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [128, 200, 280, 360, 480],
    unoptimized: isPages,
  },
  poweredByHeader: false,
};

export default nextConfig;
