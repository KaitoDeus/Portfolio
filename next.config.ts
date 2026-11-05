import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Optimize hot module replacement and file watching on Windows drives
      config.watchOptions = {
        aggregateTimeout: 100, // Trigger fast rebuild within 100ms
        poll: 500, // Poll every 500ms so no atomic IDE write events are missed
        ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
      };
    }
    return config;
  },
};

export default nextConfig;
