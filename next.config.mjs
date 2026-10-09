/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',

  basePath: isProduction ? '/QoiaX-SW' : '',

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;
