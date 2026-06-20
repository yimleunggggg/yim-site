"use client";

import type { LifeMoment } from "@/lib/life-content";
import { lifeModules } from "@/lib/site-data";
import { MomentGallery } from "./MomentGallery";

type Props = {
  moments: LifeMoment[];
  locale: "zh" | "en";
};

function formatDate(date: string, zh: boolean) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(zh ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function LifeMomentsFeed({ moments, locale }: Props) {
  const zh = locale === "zh";

  if (moments.length === 0) {
    return (
      <p className="text-sm text-[var(--color-ink-muted)]">
        {zh ? "还没有动态，在 content/life/moments/ 加一条 .md 即可。" : "No moments yet."}
      </p>
    );
  }

  return (
    <div className="md:columns-2 md:gap-4 lg:columns-3">
      {moments.map((m) => {
        const mod = lifeModules.find((x) => x.id === m.module);
        const body = zh ? m.text : m.textEn ?? m.text;

        return (
          <article
            key={m.id}
            className="mb-5 break-inside-avoid border-b border-[var(--color-border)] pb-5 last:mb-0 last:border-0 md:mb-4 md:rounded-sm md:border md:p-4 md:pb-4"
          >
            <header className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
              <time className="text-[var(--color-ink-muted)]">{formatDate(m.date, zh)}</time>
              {mod && (
                <span className="text-[var(--color-ink-muted)]">
                  · {zh ? mod.label.zh : mod.label.en}
                </span>
              )}
            </header>

            {m.images.length > 0 ? (
              <MomentGallery images={m.images} />
            ) : (
              <div className="mt-3 flex aspect-[16/10] items-center justify-center rounded-sm border border-dashed border-[var(--color-border)] bg-[var(--color-callout)] font-mono text-[10px] text-[var(--color-ink-muted)]">
                {zh ? "图片待上传 → public/life/moments/" : "Photos pending"}
              </div>
            )}

            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink)] whitespace-pre-wrap sm:text-sm sm:text-[var(--color-ink-muted)]">
              {body}
            </p>
            {m.tags.length > 0 && (
              <p className="mt-2 text-xs text-[var(--color-ink-muted)]">
                {m.tags.join(" · ")}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
