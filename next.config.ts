import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // 对于静态导出需要设置为true
  },
  // 静态导出设置
  output: 'export',
  // 使用仓库名作为basePath
  basePath: '/robot2',
  // 禁用基于服务器的特性
  trailingSlash: true,
};

export default nextConfig;
