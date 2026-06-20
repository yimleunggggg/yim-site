"use client";

import { useState } from "react";
import Link from "next/link";
import { demoWritingTags } from "@/lib/demo/demo-data";
import type { DemoWritingMeta } from "@/lib/demo/demo-content";

export function DemoWritingList({
  writings,
  zh,
  emptyMessage,
}: {
  writings: DemoWritingMeta[];
  zh: boolean;
  emptyMessage?: string;
}) {
  const [active, setActive] = useState<string>("全部");
  const filtered =
    active === "全部" ? writings : writings.filter((w) => w.tags.includes(active));

  return (
    <div>
      <div className="scroll-tabs -mx-1 flex gap-2 overflow-x-auto pb-1">
        {demoWritingTags.map((tag) => (
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

      <ul className="mt-6 divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
        {filtered.map((w) => (
          <li key={w.slug}>
            <Link href={`/writing/${w.slug}`} className="group block py-5">
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
