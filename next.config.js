/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
  transpilePackages: ['react-toastify'],
  // ... outras configurações que você já tenha
}

module.exports = nextConfig 