import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/tml", destination: "/tml/index.html" },
    ];
  },
};

export default nextConfig;
