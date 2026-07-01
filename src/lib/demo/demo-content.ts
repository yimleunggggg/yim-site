import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";
import { pickText } from "./demo-data";
import { demoProjectBodies } from "./demo-project-bodies";

/* ------------------------------ 写作文章 ------------------------------ */

export type DemoWritingMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  readingMinutes: number;
  /** AI 类文章额外展示工具版本 / 更新日期 */
  isAI?: boolean;
  toolVersion?: string;
  updatedAt?: string;
};

export type DemoWriting = DemoWritingMeta & { body: string };

const WRITING_DIR = path.join(process.cwd(), "content/demo/writing");

function parseWriting(filename: string): DemoWriting {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(WRITING_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    tags: (data.tags as string[]) ?? [],
    summary: String(data.summary ?? ""),
    readingMinutes: Number(data.readingMinutes ?? 5),
    isAI: Boolean(data.isAI),
    toolVersion: data.toolVersion ? String(data.toolVersion) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    body: content.trim(),
  };
}

export function getAllDemoWriting(): DemoWriting[] {
  if (!fs.existsSync(WRITING_DIR)) return [];
  return fs
    .readdirSync(WRITING_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseWriting)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getDemoWritingSlugs(): string[] {
  return getAllDemoWriting().map((w) => w.slug);
}

export function getDemoWritingBySlug(slug: string): DemoWriting | null {
  const file = path.join(WRITING_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return parseWriting(`${slug}.mdx`);
}

/** 文末相关文章：同标签优先，取最多 2 篇 */
export function getRelatedDemoWriting(slug: string, limit = 2): DemoWritingMeta[] {
  const all = getAllDemoWriting();
  const current = all.find((w) => w.slug === slug);
  if (!current) return [];
  const scored = all
    .filter((w) => w.slug !== slug)
    .map((w) => ({
      w,
      score: w.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.w.date.localeCompare(a.w.date));
  return scored.slice(0, limit).map(({ w }) => w);
}

/* ------------------------------ 项目正文 ------------------------------ */

const PROJECTS_DIR = path.join(process.cwd(), "content/demo/projects");

/** 项目详情正文（可选）。双语条目见 demo-project-bodies.ts；否则读 MDX（中文）。 */
export function getDemoProjectBody(slug: string, locale: Locale = "zh"): string | null {
  const bilingual = demoProjectBodies[slug];
  if (bilingual) {
    return pickText(bilingual, locale === "zh");
  }
  const file = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { content } = matter(raw);
  return content.trim() || null;
}

/** 项目 MDX frontmatter 扩展字段（videoUrl 等） */
export function getDemoProjectFrontmatter(slug: string): Record<string, unknown> {
  const file = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return {};
  const raw = fs.readFileSync(file, "utf-8");
  const { data } = matter(raw);
  return data as Record<string, unknown>;
}
