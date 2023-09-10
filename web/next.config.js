/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    server: "http://localhost:4060",
  },
  output: "export",
  distDir: "dist",
  basePath: "/web",
  images: {
    domains: ["http://127.0.0.1"],
  },
};

module.exports = nextConfig;
