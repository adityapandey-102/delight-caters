import type { NextConfig } from "next";
import os from "os";

/**
 * This machine's own LAN IPv4 addresses, so the dev server can be opened from a
 * phone on the same Wi-Fi (http://<lan-ip>:3000) while checking the mobile
 * layouts. Next 16 otherwise blocks the cross-origin /_next/* requests, which
 * breaks hydration. No effect on the production build.
 */
function lanIPv4s(): string[] {
  const addrs: string[] = [];
  for (const iface of Object.values(os.networkInterfaces())) {
    for (const net of iface ?? []) {
      const isV4 = net.family === "IPv4" || (net.family as unknown as number) === 4;
      if (isV4 && !net.internal) addrs.push(net.address);
    }
  }
  return addrs;
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: ["localhost", "127.0.0.1", ...lanIPv4s()],
  images: {
    qualities: [75, 85],
  },
  /** The old Delight Caterers URLs, so existing links and search results land on their new homes. */
  redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/service", destination: "/eatry/delight-caterers", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
