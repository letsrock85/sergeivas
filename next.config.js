/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Отключаем проверку ESLint при сборке на Vercel
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
