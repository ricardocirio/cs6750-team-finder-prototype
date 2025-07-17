/** @type {import('next').NextConfig} */
// Configuration for Next.js
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivityPosition: 'bottom-left',
  },
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    basePath: '/cs6750-team-finder-prototype',
    images: {
      unoptimized: true,
    }
  } : {
    images: {
      unoptimized: true,
    }
  })
}

module.exports = nextConfig
