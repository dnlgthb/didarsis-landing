import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/numera/:path*",
        destination: "https://numera-plus.vercel.app/:path*",
      },
      {
        source: "/despeja/:path*",
        destination: "https://despeja-app.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
