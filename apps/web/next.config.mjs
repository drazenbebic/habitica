import bundleAnalyzer from '@next/bundle-analyzer';

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
      {
        protocol: 'https',
        hostname: 'authjs.dev',
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
};

export default withBundleAnalyzer(nextConfig);
