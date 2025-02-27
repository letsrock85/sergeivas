/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {urlImports: ['https://themer.sanity.build/']},
  eslint: {
    // Отключаем проверку ESLint при сборке на Vercel
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      { hostname: "icons.duckduckgo.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "www.google.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
}

module.exports = nextConfig


