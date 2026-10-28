import type { NextConfig } from "next";

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: "/tao-trade-school",
        assetPrefix: "/tao-trade-school",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
