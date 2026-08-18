import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [128, 200, 280, 360, 480],
  },
  poweredByHeader: false,
};

export default nextConfig;
