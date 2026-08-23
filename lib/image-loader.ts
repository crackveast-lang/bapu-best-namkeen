/**
 * next/image loader for the GitHub Pages static export.
 * There is no optimiser on Pages, so just return the file URL — prefixed with
 * the repository base path, which next/image does not add on its own.
 */
export default function pagesImageLoader({ src }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${base}${src}` : src;
}
