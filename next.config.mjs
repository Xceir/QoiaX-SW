/** @type {import('next').NextConfig} */
const nextConfig = {
  // API routes and Playwright require a Node.js server; static export / GitHub Pages is not supported.
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default nextConfig;
