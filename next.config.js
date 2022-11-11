/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.dicebear.com'],
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
    SHARED_SECRET:process.env.SHARED_SECRET,
  }
}

module.exports = nextConfig
