import type { NextConfig } from "next";

/**
 * Two deployment shapes from one config.
 *
 * Default (local dev, `next start`): a normal server build with the image
 * optimiser on and no base path.
 *
 * `GITHUB_PAGES=true`: a fully static export served from /<repo> on GitHub
 * Pages — hence basePath/assetPrefix, trailingSlash (Pages resolves /foo to
 * /foo/index.html) and `unoptimized` images (no optimiser on static hosting;
 * the WebP assets are already sized by `npm run images`).
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
      }
    : {}),
  images: isPages
    ? { loader: "custom", loaderFile: "./lib/image-loader.ts" }
    : { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
};

export default nextConfig;
