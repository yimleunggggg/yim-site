"use client";

import Image from "next/image";
import type { LifeMoment } from "@/lib/life-content";
import { lifeModules } from "@/lib/site-data";

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
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {moments.map((m) => {
        const mod = lifeModules.find((x) => x.id === m.module);
        const body = zh ? m.text : m.textEn ?? m.text;

        return (
          <article
            key={m.id}
            className="mb-4 break-inside-avoid rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-4"
          >
            <header className="flex flex-wrap items-center gap-2 text-xs">
              <span>{mod?.emoji}</span>
              <time className="font-mono text-[var(--color-ink-muted)]">
                {formatDate(m.date, zh)}
              </time>
              {m.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-[var(--color-callout)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-forest)]"
                >
                  {tag}
                </span>
              ))}
            </header>

            {m.images.length > 0 ? (
              <div
                className={`mt-3 grid gap-1 ${m.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
              >
                {m.images.slice(0, 4).map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-sm bg-[var(--color-callout)] ${
                      m.images.length === 3 && i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 flex aspect-[16/10] items-center justify-center rounded-sm border border-dashed border-[var(--color-border)] bg-[var(--color-callout)] font-mono text-[10px] text-[var(--color-ink-muted)]">
                {zh ? "图片待上传 → public/life/moments/" : "Photos pending"}
              </div>
            )}

            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)] whitespace-pre-wrap">
              {body}
            </p>
          </article>
        );
      })}
    </div>
  );
}
