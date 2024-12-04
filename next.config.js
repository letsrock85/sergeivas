/** @type {import('next').NextConfig} */
const nextConfig = {
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
