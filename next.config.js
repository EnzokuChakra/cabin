/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Add any other image domains you'll be using
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };
    return config;
  },
  // Enable server actions (if needed in the future)
  // experimental: {
  //   serverActions: true,
  // },
};

module.exports = nextConfig;
