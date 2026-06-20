import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogTopic } from "./blog-topics";

export type { BlogTopic } from "./blog-topics";
export { BLOG_TOPIC_LABELS } from "./blog-topics";

export type Article = {
  slug: string;
  date: string;
  topic: BlogTopic;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  body: string;
  bodyEn?: string;
  status: "draft" | "published";
  /** 外链文章（极少数）；默认走 /blog/[slug] */
  externalUrl?: string;
};

/** @deprecated 列表页别名 */
export type BlogPost = Article;

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function parseArticleFile(filename: string): Article {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const parts = content.trim().split(/\n---+\n/);

  const summaryFromFm = data.summary ? String(data.summary) : "";
  const body = (parts[0] ?? content).trim();
  const bodyEn = parts[1]?.trim();

  return {
    slug,
    date: String(data.date ?? ""),
    topic: (data.topic as BlogTopic) ?? "essay",
    title: String(data.title ?? slug),
    titleEn: data.titleEn ? String(data.titleEn) : undefined,
    summary: summaryFromFm || body.split("\n").find((l) => l.trim())?.slice(0, 120) || "",
    summaryEn: data.summaryEn ? String(data.summaryEn) : undefined,
    body,
    bodyEn,
    status: (data.status as Article["status"]) ?? "draft",
    externalUrl: data.externalUrl ? String(data.externalUrl) : undefined,
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(parseArticleFile)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticleSlugs(): string[] {
  return getAllArticles()
    .filter((a) => a.status === "published" && !a.externalUrl)
    .map((a) => a.slug);
}

export function getArticleBySlug(slug: string): Article | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return parseArticleFile(`${slug}.md`);
}

export function getArticlesByTopic(topic: BlogTopic | "all"): Article[] {
  const all = getAllArticles();
  if (topic === "all") return all;
  return all.filter((a) => a.topic === topic);
}

export const getAllBlogPosts = getAllArticles;
export const getBlogPostsByTopic = getArticlesByTopic;
