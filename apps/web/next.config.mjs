import bundleAnalyzer from '@next/bundle-analyzer';

import packageJson from './package.json' with { type: 'json' };

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75],
  },
  experimental: {
    esmExternals: true,
    inlineCss: true,
  },
  transpilePackages: ['@ariakit/react'],
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
};

export default withBundleAnalyzer(nextConfig);
