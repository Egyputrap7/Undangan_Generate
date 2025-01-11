// import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    appDir: true, // Pastikan App Directory aktif
    suspense: true, // Aktifkan Suspense secara eksplisit
  },
  reactStrictMode: true, // Debug rendering
};

module.exports = nextConfig;
