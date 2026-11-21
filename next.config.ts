import type { NextConfig } from "next";

// Tailwind runs via postcss.config.mjs — works with both Turbopack (default) and Webpack (`--webpack`).
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
