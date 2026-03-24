import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // (임시)정적 배포 시 Next.js 기본 이미지 최적화는 서버가 없어서 못 씁니다.
  },
};

export default nextConfig;
