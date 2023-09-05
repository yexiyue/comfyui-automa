/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    server: "http://localhost:4060",
  },
  output: "export",
  distDir: "dist",
  basePath: "/web",
};

module.exports = nextConfig;
