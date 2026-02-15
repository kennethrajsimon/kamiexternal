/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3001/uploads/:path*',
      },
    ];
  },
  webpack: (config) => {
    // Handle figma:asset imports
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Add custom loader for figma assets
    config.module.rules.push({
      test: /figma:asset\/.+\.(png|jpg|jpeg|gif|webp|svg)$/,
      type: 'asset/resource',
    });

    return config;
  },
};

module.exports = nextConfig;
