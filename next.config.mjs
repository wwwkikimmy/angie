/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable the latest Next.js features
    serverComponentsExternalPackages: ['ai'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['blob.v0.dev'],
    unoptimized: true,
  },
}

export default nextConfig
