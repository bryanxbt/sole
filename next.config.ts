import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "sole";
const basePath = isProd ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  // Project site: https://bryanxbt.github.io/sole/
  basePath,
  assetPrefix: isProd ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    // Used by withBase() so public asset URLs work on GitHub Pages
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
