import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
  outputFileTracingRoot: path.join(process.cwd()),
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [160, 240, 320, 480],
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/demo", destination: "/", permanent: true },
      { source: "/demo/about", destination: "/about", permanent: true },
      { source: "/demo/life", destination: "/life", permanent: true },
      { source: "/demo/frames", destination: "/frames", permanent: true },
      { source: "/demo/frames/:slug", destination: "/frames/:slug", permanent: true },
      { source: "/demo/writing/:slug", destination: "/writing/:slug", permanent: true },
      { source: "/demo/projects/:slug", destination: "/projects/:slug", permanent: true },
      // 静态图仍在 public/demo/，勿用 /demo/:path* 通配（会把 /demo/marquee/*.jpg 错转到 /marquee/）
      { source: "/guides", destination: "/ai-playbook", permanent: false },
      { source: "/guides/yakushima", destination: "/ai-playbook/cases/yakushima-bus", permanent: false },
      { source: "/guides/yakushima/:slug", destination: "/ai-playbook/cases/yakushima-bus/playbook/:slug", permanent: false },
      { source: "/guides/seo", destination: "/ai-playbook/cases/yakushima-bus", permanent: false },
      { source: "/guides/seo/:slug", destination: "/ai-playbook/cases/yakushima-bus/seo/:slug", permanent: false },
      { source: "/frames/sichuan-windows", destination: "/frames/window-views", permanent: true },
      { source: "/frames/other-windows", destination: "/frames/window-views", permanent: true },
    ];
  },
};

export default nextConfig;
