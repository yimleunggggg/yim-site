"use client";

import Link from "next/link";
import { SiteHeader, SiteFooter, useLocale } from "@/components";
import { homeHub } from "@/lib/profile-config";
import type { LifeMoment } from "@/lib/life-content";
import { lifeModules } from "@/lib/site-data";

const stats = {
  zh: [
    { num: "70+", label: "城市" },
    { num: "8", label: "年运营经验" },
    { num: "6", label: "项运动" },
    { num: "∞", label: "好奇心" },
  ],
  en: [
    { num: "70+", label: "Cities" },
    { num: "8", label: "Yrs in Ops" },
    { num: "6", label: "Sports" },
    { num: "∞", label: "Curiosity" },
  ],
};

type Props = {
  recentMoments: LifeMoment[];
};

function formatShortDate(date: string, zh: boolean) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(zh ? "zh-CN" : "en-US", { month: "short", day: "numeric" });
}

export default function HomePage({ recentMoments }: Props) {
  const { locale, t } = useLocale();
  const s = stats[locale];
  const hubCards = homeHub[locale];
  const zh = locale === "zh";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4">
        <section className="grid min-h-[70vh] items-end gap-8 pb-16 pt-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="font-mono-index animate-fade-in text-[var(--color-terracotta)]">
              {zh ? "个人实验站" : "Personal Lab"} · {new Date().getFullYear()}
            </p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[1.15] tracking-tight md:text-7xl">
              {t.home.greeting}
            </h1>
            <p className="mt-2 font-serif text-2xl text-[var(--color-ink-muted)] md:text-3xl">
              {t.home.tagline}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-ink-muted)]">
              {t.home.intro}
            </p>
            <div className="mt-8 flex gap-8">
              {s.map((item) => (
                <div key={item.label}>
                  <span className="font-serif text-3xl font-bold text-[var(--color-forest)]">
                    {item.num}
                  </span>
                  <span className="ml-1 text-sm text-[var(--color-ink-muted)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="self-end rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <p className="font-mono-index text-[var(--color-forest)]">
              {zh ? "近期动态" : "Recent"}
            </p>
            {recentMoments.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {recentMoments.map((m) => {
                  const mod = lifeModules.find((x) => x.id === m.module);
                  const text = zh ? m.text : m.textEn ?? m.text;
                  const preview = text.split("\n")[0].slice(0, 72);
                  return (
                    <li key={m.id} className="text-sm">
                      <div className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
                        <span>{mod?.emoji}</span>
                        <time className="font-mono">{formatShortDate(m.date, zh)}</time>
                      </div>
                      <p className="mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                        {preview}
                        {text.length > 72 ? "…" : ""}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="mt-4 space-y-3 text-sm text-[var(--color-ink-muted)]">
                {t.home.nowItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-terracotta)]" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <Link
              href="/life#moments"
              className="mt-4 inline-block text-xs text-[var(--color-forest)] hover:underline"
            >
              {zh ? "全部动态 →" : "All moments →"}
            </Link>
          </aside>
        </section>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-[var(--color-border)]" />
          <span className="font-mono-index text-[var(--color-ink-muted)]">{t.tracks.title}</span>
          <div className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {hubCards.map((track, i) => (
            <Link
              key={track.title}
              href={track.href}
              className={`group relative overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:shadow-md ${
                i === 0 ? "md:col-span-2 md:row-span-2 md:flex md:flex-col md:justify-end md:p-8" : ""
              }`}
            >
              <div
                className="absolute left-0 top-0 h-full w-1 transition-all group-hover:w-1.5"
                style={{
                  background:
                    i === 0 ? "var(--color-forest)" : i === 1 ? "var(--color-terracotta)" : "#4a7c6f",
                }}
              />
              <span className="font-mono-index text-[var(--color-terracotta)]">{track.tag}</span>
              <h2
                className={`mt-2 font-serif font-semibold group-hover:text-[var(--color-forest)] ${
                  i === 0 ? "text-3xl" : "text-xl"
                }`}
              >
                {track.title}
              </h2>
              <p className={`mt-2 text-[var(--color-ink-muted)] ${i === 0 ? "text-base" : "text-sm"}`}>
                {track.desc}
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-16 grid grid-cols-3 gap-2 md:grid-cols-6">
          {[
            { emoji: "🏄", label: zh ? "冲浪" : "Surfing" },
            { emoji: "🏔", label: zh ? "徒步" : "Hiking" },
            { emoji: "🍺", label: zh ? "精酿" : "Craft Beer" },
            { emoji: "🧘", label: zh ? "冥想" : "Meditation" },
            { emoji: "🏃", label: zh ? "跑步" : "Running" },
            { emoji: "✈️", label: zh ? "旅行" : "Travel" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex aspect-[4/5] flex-col items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-callout)]"
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="mt-2 text-xs text-[var(--color-ink-muted)]">{item.label}</span>
            </div>
          ))}
        </section>

        <section className="my-20 text-center">
          <Link
            href="/about"
            className="inline-block rounded-md border border-[var(--color-forest)] px-6 py-2.5 text-sm text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-white"
          >
            {zh ? "了解更多关于我" : "More about me"}
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
