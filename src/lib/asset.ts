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
  if (!BASE) return path;
  // Idempotent: next/image applies basePath itself in some build modes but not
  // when `unoptimized` is set, so this must be safe to call either way.
  if (path.startsWith(`${BASE}/`)) return path;
  // Data URIs and absolute URLs are already complete.
  if (!path.startsWith('/')) return path;
  return `${BASE}${path}`;
}
