/**
 * Prefix public asset paths with the GitHub Pages basePath in production.
 * Next/Image does not always apply basePath for unoptimized static export.
 *
 * Use for: <img src>, <a href> (plain anchors), metadata images.
 * Do NOT use with next/link or next/navigation — they already apply basePath
 * (wrapping those causes /sole/sole/... on GitHub Pages).
 */
export function withBase(path: string): string {
  if (!path || path.startsWith("http") || path.startsWith("data:")) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!base) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // avoid double-prefix
  if (normalized === base || normalized.startsWith(`${base}/`)) {
    return normalized;
  }
  return `${base}${normalized}`;
}
