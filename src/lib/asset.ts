/**
 * Prefixes a public-folder path with the deployment's base path.
 *
 * `next/image` and `next/link` apply `basePath` themselves, but a raw <img src>
 * does not — and the marketplace logos are raw <img> because the image
 * optimiser rejects SVG. On GitHub Pages the site lives under a repository
 * sub-path, so those files would 404 without this.
 *
 * Empty everywhere else, so the same code serves a root-domain deploy.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  return `${BASE}${path}`;
}
