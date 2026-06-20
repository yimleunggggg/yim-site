"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SiteFooter, SiteHeader, useLocale } from "@/components";
import type { BlogPost } from "@/lib/blog-content";
import { BLOG_TOPIC_LABELS, type BlogTopic } from "@/lib/blog-topics";

type Filter = BlogTopic | "all";

type Props = {
  posts: BlogPost[];
};

export default function BlogPageClient({ posts }: Props) {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const [filter, setFilter] = useState<Filter>("all");
  const labels = BLOG_TOPIC_LABELS;

  const topics: { id: Filter; label: string }[] = [
    { id: "all", label: zh ? "全部" : "All" },
    ...(Object.entries(labels) as [BlogTopic, { zh: string; en: string }][]).map(
      ([id, l]) => ({ id, label: zh ? l.zh : l.en }),
    ),
  ];

  const filtered = useMemo(
    () => (filter === "all" ? posts : posts.filter((p) => p.topic === filter)),
    [posts, filter],
  );

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">
          {zh ? "博客" : "Blog"}
        </h1>
        <p className="mt-3 text-base text-[var(--color-ink-muted)]">
          {zh
            ? "Markdown 驱动：在 content/blog/ 加 .md 即可，格式统一、不用改前端。"
            : "Markdown in content/blog/ — one template, no frontend changes."}
        </p>

        <div className="scroll-tabs mt-6 flex gap-2 overflow-x-auto border-b border-[var(--color-border)] pb-4 sm:flex-wrap sm:overflow-visible">
          {topics.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className={`tap-target shrink-0 rounded-full px-4 py-2 text-sm ${
                filter === t.id
                  ? "bg-[var(--color-forest)] text-white"
                  : "text-[var(--color-ink-muted)] active:bg-[var(--color-callout)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <ul className="mt-8 space-y-6">
          {filtered.map((post) => {
            const title = zh ? post.title : post.titleEn ?? post.title;
            const summary = zh ? post.summary : post.summaryEn ?? post.summary;
            const topicLabel = labels[post.topic][zh ? "zh" : "en"];
            const inner = (
              <>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <time className="font-mono text-[var(--color-ink-muted)]">{post.date}</time>
                  <span className="rounded-sm bg-[var(--color-callout)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-forest)]">
                    {topicLabel}
                  </span>
                  {post.status === "draft" && (
                    <span className="font-mono text-[10px] text-[var(--color-terracotta)]">
                      {zh ? "草稿" : "draft"}
                    </span>
                  )}
                </div>
                <h2 className="mt-2 font-serif text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)] line-clamp-2">
                  {summary}
                </p>
              </>
            );

            const href =
              post.status === "published"
                ? post.externalUrl ?? `/blog/${post.slug}`
                : `/blog/${post.slug}?preview=1`;

            if (href) {
              return (
                <li key={post.slug}>
                  <Link
                    href={href}
                    {...(post.externalUrl
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`block py-5 active:bg-[var(--color-callout)] ${
                      post.status === "draft"
                        ? "border-b border-dashed border-[var(--color-border)]"
                        : "border-b border-[var(--color-border)]"
                    }`}
                  >
                    {inner}
                  </Link>
                </li>
              );
            }

            return (
              <li key={post.slug} className="border-b border-dashed border-[var(--color-border)] py-5">
                {inner}
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-8 text-sm text-[var(--color-ink-muted)]">
            {zh ? "该主题暂无文章。" : "No posts in this topic yet."}
          </p>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
