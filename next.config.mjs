/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [],
  },
  output: 'export',
  basePath: '/qrcode-generator',
  assetPrefix: '/qrcode-generator/',
};

export default nextConfig; 