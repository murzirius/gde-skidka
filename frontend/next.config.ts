import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // images: { unoptimized: true }, // Required for static export when using next/image
};

export default nextConfig;
