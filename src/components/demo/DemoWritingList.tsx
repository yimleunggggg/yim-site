"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { demoWritingTags } from "@/lib/demo/demo-data";
import type { DemoWritingMeta } from "@/lib/demo/demo-content";

export function DemoWritingList({
  writings,
  zh,
  emptyMessage,
  showTagFilter = true,
}: {
  writings: DemoWritingMeta[];
  zh: boolean;
  emptyMessage?: string;
  /** Life 精选区默认关闭标签筛选，避免筛空后像「点不动」 */
  showTagFilter?: boolean;
}) {
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    for (const w of writings) for (const t of w.tags) set.add(t);
    return demoWritingTags.filter((t) => t === "全部" || set.has(t));
  }, [writings]);

  const [active, setActive] = useState<string>("全部");
  const filtered =
    active === "全部" ? writings : writings.filter((w) => w.tags.includes(active));

  return (
    <div className="relative z-10">
      {showTagFilter && availableTags.length > 1 ? (
        <div className="scroll-tabs flex gap-2 overflow-x-auto pb-1">
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              className={`tap-target shrink-0 rounded-full border px-3.5 text-sm ${
                active === tag
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                  : "border-[var(--color-border)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <ul
        className={`divide-y divide-[var(--color-border)] border-t border-[var(--color-border)] ${
          showTagFilter && availableTags.length > 1 ? "mt-6" : "mt-0"
        }`}
      >
        {filtered.map((w) => (
          <li key={w.slug}>
            <Link
              href={`/writing/${w.slug}`}
              className="group flex items-start justify-between gap-4 py-5 transition-colors hover:bg-[color-mix(in_srgb,var(--color-callout)_50%,transparent)]"
            >
              <span className="min-w-0 flex-1">
                <h3 className="font-serif text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-forest)] sm:text-xl">
                  {w.title}
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-[var(--color-ink-muted)]">
                  <time>{w.date}</time>
                  <span>·</span>
                  <span>{w.tags.join(" / ")}</span>
                  <span>·</span>
                  <span>{w.readingMinutes} min</span>
                  {w.isAI && (w.toolVersion || w.updatedAt) ? (
                    <span className="ml-1 rounded-full border border-[var(--color-accent-warm)] px-2 py-0.5 text-[var(--color-accent-warm)]">
                      {[w.toolVersion, w.updatedAt && `更新 ${w.updatedAt}`]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  ) : null}
                </div>
                {w.summary ? (
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {w.summary}
                  </p>
                ) : null}
              </span>
              <span
                className="mt-1 shrink-0 font-mono text-xs text-[var(--color-forest)] opacity-70 transition-opacity group-hover:opacity-100"
                aria-hidden
              >
                →
              </span>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-8 text-center text-sm text-[var(--color-ink-muted)]">
            {emptyMessage ?? (zh ? "这个标签下还没有文章。" : "No posts under this tag yet.")}
          </li>
        )}
      </ul>
    </div>
  );
}
