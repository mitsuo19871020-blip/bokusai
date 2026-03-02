/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  generateBuildId: async () => null,
}

module.exports = nextConfig
