export const siteConfig = {
  title: "Yim Leung",
  subtitle: "个人站 · Life × AI Lab",
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
