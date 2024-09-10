/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: '*.googleusercontent.com' },
      { hostname: 'authjs.dev' },
    ],
  },
};

export default nextConfig;
