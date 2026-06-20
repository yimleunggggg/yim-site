"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteFooter, SiteHeader, useLocale } from "@/components";
import { aiLabEntries, type AiLabCategory, type AiLabEntry } from "@/lib/site-data";

type Filter = "all" | AiLabCategory;

const CATEGORY_LABELS: Record<
  AiLabCategory,
  { zh: string; en: string; color: string }
> = {
  product: { zh: "产品", en: "Product", color: "var(--color-forest)" },
  training: { zh: "内训", en: "Training", color: "var(--color-terracotta)" },
  tutorial: { zh: "教程", en: "Tutorial", color: "#4a7c6f" },
  doc: { zh: "文档", en: "Doc", color: "var(--color-ink-muted)" },
};

function EntryRow({ entry, zh }: { entry: AiLabEntry; zh: boolean }) {
  const cat = CATEGORY_LABELS[entry.category];
  const title = zh ? entry.title.zh : entry.title.en;
  const summary = zh ? entry.summary.zh : entry.summary.en;
  const status = zh ? entry.status.zh : entry.status.en;
  const fromProject = entry.fromProject
    ? zh
      ? entry.fromProject.zh
      : entry.fromProject.en
    : null;

  return (
    <article className="group border-b border-[var(--color-border)] py-5 sm:py-6">
      <Link href={entry.href} className="block active:opacity-90">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span
            className="rounded-sm px-2 py-0.5 font-medium text-white"
            style={{ background: cat.color }}
          >
            AI · {zh ? cat.zh : cat.en}
          </span>
          <span className="text-[var(--color-ink-muted)]">{status}</span>
          {fromProject ? (
            <span className="text-[var(--color-ink-muted)]">
              · {zh ? "来自" : "from"} {fromProject}
            </span>
          ) : null}
        </div>
        <h2 className="mt-2 font-serif text-lg font-semibold group-hover:text-[var(--color-forest)] sm:text-xl">
          {title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
          {summary}
        </p>
        {entry.tags.length > 0 && (
          <p className="mt-3 text-xs text-[var(--color-ink-muted)]">{entry.tags.join(" · ")}</p>
        )}
      </Link>
    </article>
  );
}

export default function WorkPage() {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; zh: string; en: string }[] = [
    { id: "all", zh: "全部", en: "All" },
    { id: "product", zh: "产品", en: "Products" },
    { id: "doc", zh: "文档", en: "Docs" },
    { id: "tutorial", zh: "教程", en: "Tutorials" },
    { id: "training", zh: "内训", en: "Training" },
  ];

  const items =
    filter === "all" ? aiLabEntries : aiLabEntries.filter((e) => e.category === filter);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-sm text-[var(--color-forest)]">AI Lab</p>
        <h1 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">
          {zh ? "AI 实践" : "AI Lab"}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-ink-muted)]">
          {zh
            ? "用 AI 做的产品、独立教程与文档、内训讲义——按类型浏览，不必都套进「项目 Case」。"
            : "AI products, standalone tutorials & docs, and training notes — browse by type, not only as cases."}
        </p>

        <div className="scroll-tabs mt-6 flex gap-2 overflow-x-auto border-b border-[var(--color-border)] pb-4 sm:flex-wrap sm:overflow-visible">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`tap-target shrink-0 rounded-full px-4 py-2 text-sm ${
                filter === f.id
                  ? "bg-[var(--color-forest)] text-white"
                  : "text-[var(--color-ink-muted)] active:bg-[var(--color-callout)]"
              }`}
            >
              {zh ? f.zh : f.en}
            </button>
          ))}
        </div>

        <div className="mt-2">
          {items.map((entry) => (
            <EntryRow key={entry.id} entry={entry} zh={zh} />
          ))}
        </div>

        <p className="mt-10 text-sm text-[var(--color-ink-muted)]">
          {zh ? "新内容：在 " : "Add content via "}
          <Link href="/blog" className="text-[var(--color-forest)] underline">
            {zh ? "博客 Markdown" : "blog Markdown"}
          </Link>
          {zh ? " 或 " : " or "}
          <Link href="/ai-playbook" className="text-[var(--color-forest)] underline">
            Playbook 章节
          </Link>
          {zh ? "，再在此页 aiLabEntries 里加一行即可。" : ", then add a row in aiLabEntries."}
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
