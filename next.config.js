/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  // Configuración para Vite
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "./client/src",
      "@components": "./client/src/components",
      "@pages": "./client/src/pages",
      "@hooks": "./client/src/hooks",
      "@lib": "./client/src/lib",
      "@types": "./client/src/types",
      "@config": "./client/src/config",
      "@shared": "./client/src/shared",
      "@context": "./client/src/context",
    };
    return config;
  },
};

module.exports = nextConfig; 