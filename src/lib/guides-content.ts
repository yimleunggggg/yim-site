import fs from "fs";
import path from "path";

export type GuideSeries = "yakushima" | "seo";

export type GuideChapter = {
  slug: string;
  filename: string;
  title: string;
  order: number;
};

const CONTENT_ROOT = path.join(process.cwd(), "content/guides");

const SERIES_META: Record<
  GuideSeries,
  { title: { zh: string; en: string }; description: { zh: string; en: string } }
> = {
  yakushima: {
    title: { zh: "屋久岛 · Vibe Coding Playbook", en: "Yakushima · Vibe Coding Playbook" },
    description: {
      zh: "用 Cursor 做出 yakushimabus.com 的完整复盘",
      en: "Full retrospective: building yakushimabus.com with Cursor",
    },
  },
  seo: {
    title: { zh: "SEO 自动化教程", en: "SEO Automation Guide" },
    description: {
      zh: "内容策略、技术 SEO、监控与迭代（脱敏公开版）",
      en: "Content strategy, technical SEO, monitoring (sanitized)",
    },
  },
};

function extractTitle(content: string, filename: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) return match[1].trim();
  return filename.replace(/\.md$/, "").replace(/^\d+-/, "");
}

function orderFromFilename(filename: string): number {
  const m = filename.match(/^(\d+)-/);
  return m ? parseInt(m[1], 10) : 999;
}

function sanitizeContent(content: string): string {
  return content
    .replace(/\[PRIVATE_JOURNAL\]\([^)]+\)/g, "")
    .replace(/详见\s*时间线。/g, "详见项目 README。")
    .replace(/\(详见\s*\)/g, "");
}

export function getSeriesMeta(series: GuideSeries) {
  return SERIES_META[series];
}

export function getGuideChapters(series: GuideSeries): GuideChapter[] {
  const dir = path.join(CONTENT_ROOT, series);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "README.md" && f !== "TROUBLESHOOTING.md")
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const slug = filename.replace(/\.md$/, "");
      return {
        slug,
        filename,
        title: extractTitle(raw, filename),
        order: orderFromFilename(filename),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getGuideBySlug(series: GuideSeries, slug: string) {
  const dir = path.join(CONTENT_ROOT, series);
  const filename = `${slug}.md`;
  const filePath = path.join(dir, filename);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const chapters = getGuideChapters(series);
  const idx = chapters.findIndex((c) => c.slug === slug);
  const title = extractTitle(raw, filename);

  return {
    slug,
    title,
    content: sanitizeContent(raw),
    prev: idx > 0 ? chapters[idx - 1] : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : null,
    chapters,
  };
}

export function getAllGuideSlugs(series: GuideSeries): string[] {
  return getGuideChapters(series).map((c) => c.slug);
}
