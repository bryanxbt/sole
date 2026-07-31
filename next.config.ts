import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "sole";

const nextConfig: NextConfig = {
  output: "export",
  // Project site: https://buildtogetherlabs.github.io/sole/
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
