/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    server: "http://localhost:4060",
  },
  output: "export",
  basePath: "/web",
  distDir: "dist",
};

module.exports = nextConfig;
