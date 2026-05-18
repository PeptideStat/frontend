import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "peptidestat.com",
          },
        ],
        destination: "https://www.peptidestat.com/:path*",
        permanent: true,
      },
      {
        source: "/peptides/bryan-johnson-hair-products",
        destination: "/peptides/bryan-johnson-hair-protocol",
        permanent: true,
      },
    ];
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ascensionpeptides.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  // Pin the workspace root — a stray lockfile in the home directory would
  // otherwise make Turbopack infer the wrong root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
