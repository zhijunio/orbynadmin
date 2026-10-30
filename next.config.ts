import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      // DiceBear — algorithmically generated, MIT-licensed avatars & shapes
      // (no real people, safe for commercial & open-source use).
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
