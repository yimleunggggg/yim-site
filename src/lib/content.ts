import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ChapterMeta } from "./site-config";

const CONTENT_DIR = path.join(process.cwd(), "content/ai-playbook");

export type Chapter = ChapterMeta & {
  content: string;
};

export function getChapterSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getChapterBySlug(slug: string): Chapter | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    summary: data.summary as string,
    originalDate: data.originalDate as string,
    week: data.week as number | undefined,
    chapterId: data.chapterId as string,
    readingMinutes: (data.readingMinutes as number) ?? 15,
    order: (data.order as number) ?? 0,
    section: (data.section as ChapterMeta["section"]) ?? "core",
    content,
  };
}

export function getAllChapters(): Chapter[] {
  return getChapterSlugs()
    .map((slug) => getChapterBySlug(slug))
    .filter((c): c is Chapter => c !== null)
    .sort((a, b) => a.order - b.order);
}

export function getAdjacentChapters(slug: string) {
  const chapters = getAllChapters().filter((c) => c.section !== "special");
  const idx = chapters.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? chapters[idx - 1] : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : null,
  };
}

export function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatMonth(date: string) {
  return date.slice(0, 7).replace("-", "年") + "月";
}
