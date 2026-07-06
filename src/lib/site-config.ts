/** 生产域名：Vercel 项目 yim-site；本地可用 .env 覆盖 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://yimleung.com";

/** GA4 衡量 ID；可用 NEXT_PUBLIC_GA_MEASUREMENT_ID 覆盖 */
export const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-GQXX5KDN2D";

export const siteConfig = {
  url: siteUrl,
  title: "Yim Leung",
  subtitle: "个人站",
  description:
    "探索者 · 运营人 · AI 实践者。独立旅行、运动、精酿、AI 应用——持续探索的个人实验站。",
  githubRepoUrl:
    process.env.NEXT_PUBLIC_GITHUB_REPO_URL ??
    "https://github.com/yimleunggggg/yim-site",
  githubContentUrl:
    process.env.NEXT_PUBLIC_GITHUB_CONTENT_URL ??
    "https://github.com/yimleunggggg/yim-site/tree/main/content/ai-playbook",
  author: "Yim",
};

export type ChapterMeta = {
  slug: string;
  title: string;
  summary: string;
  originalDate: string;
  week?: number;
  chapterId: string;
  readingMinutes: number;
  order: number;
  section: "core" | "appendix" | "special";
};
