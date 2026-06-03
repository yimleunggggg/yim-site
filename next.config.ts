import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
  outputFileTracingRoot: path.join(process.cwd()),
  async redirects() {
    return [
      { source: "/guides", destination: "/ai-playbook", permanent: false },
      { source: "/guides/yakushima", destination: "/ai-playbook/cases/yakushima-bus", permanent: false },
      { source: "/guides/yakushima/:slug", destination: "/ai-playbook/cases/yakushima-bus/playbook/:slug", permanent: false },
      { source: "/guides/seo", destination: "/ai-playbook/cases/yakushima-bus", permanent: false },
      { source: "/guides/seo/:slug", destination: "/ai-playbook/cases/yakushima-bus/seo/:slug", permanent: false },
      { source: "/projects", destination: "/ai-playbook", permanent: false },
      { source: "/blog", destination: "/life", permanent: false },
    ];
  },
};

export default nextConfig;
