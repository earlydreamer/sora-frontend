import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // Cloudflare Pages 정적 배포
  trailingSlash: true,   // CF Pages 호환
  images: {
    unoptimized: true,   // 정적 export에서 Image Optimization 비활성
  },
};

export default nextConfig;
