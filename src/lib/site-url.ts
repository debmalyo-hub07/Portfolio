/**
 * Absolute site origin for metadata, sitemap and link previews.
 * Order: explicit NEXT_PUBLIC_SITE_URL → Vercel's production domain (set automatically on Vercel) → local dev.
 */
function resolve(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolve();
