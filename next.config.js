/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'api.dicebear.com',
      'lh3.googleusercontent.com'
    ],
  },
}

module.exports = nextConfig
