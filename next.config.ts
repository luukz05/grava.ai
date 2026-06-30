import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores stray lockfiles in parent
  // directories (e.g. ~/package-lock.json) and uses this project as the root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
