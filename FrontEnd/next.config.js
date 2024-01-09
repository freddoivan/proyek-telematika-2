/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/getfitimg/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/profile/**',
      },
      {
        protocol: 'http',
        hostname: 'apigetfit.duckdns.org',
        port: '',
        pathname: '/getfitimg/**',
      },
      {
        protocol: 'http',
        hostname: 'apigetfit.duckdns.org',
        port: '',
        pathname: '/profile/**',
      },
    ],
  },
}

module.exports = nextConfig
