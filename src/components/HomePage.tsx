"use client";

import Link from "next/link";
import Image from "next/image";
import { SiteHeader, SiteFooter, useLocale } from "@/components";
import { homeHub } from "@/lib/profile-config";
import type { LifeMoment } from "@/lib/life-content";
import { lifeModules } from "@/lib/site-data";
import { journeyHighlights, sports } from "@/lib/about-data";
import { WorkHistoryList } from "@/components/WorkHistoryList";
import { LifePhotoMarquee } from "@/components/LifePhotoMarquee";

const stats = {
  zh: [
    { num: "70+", label: "城市" },
    { num: "9", label: "年经验" },
    { num: "6", label: "项运动" },
    { num: "∞", label: "好奇心" },
  ],
  en: [
    { num: "70+", label: "Cities" },
    { num: "9", label: "Yrs" },
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
      <main className="pb-20">
        <div className="site-shell">
        {/* ── Hero：左介绍 + 右近期动态 ── */}
        <section className="grid gap-10 pb-16 pt-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-12 lg:pt-14">
          <div id="about">
            <p className="text-sm text-[var(--color-terracotta)]">
              {zh ? "个人实验站" : "Personal Lab"} · {new Date().getFullYear()}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {t.home.greeting}
            </h1>
            <p className="mt-2 font-serif text-xl text-[var(--color-ink-muted)] sm:text-2xl md:text-3xl">
              {t.home.tagline}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
              {t.home.intro}
            </p>
            <p className="mt-4 max-w-xl font-serif text-base italic text-[var(--color-ink-muted)] sm:text-lg">
              {t.about.motto}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {s.map((item) => (
                <div key={item.label}>
                  <span className="font-serif text-2xl font-bold text-[var(--color-forest)] sm:text-3xl">
                    {item.num}
                  </span>
                  <span className="ml-1.5 text-sm text-[var(--color-ink-muted)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="card-surface rounded-md p-5 sm:p-6 lg:self-end">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-medium text-[var(--color-forest)]">
                {zh ? "近期动态" : "Recent"}
              </p>
              <Link href="/life#moments" className="text-xs text-[var(--color-forest)] hover:underline">
                {zh ? "全部 →" : "All →"}
              </Link>
            </div>
            {recentMoments.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {recentMoments.map((m) => {
                  const mod = lifeModules.find((x) => x.id === m.module);
                  const text = zh ? m.text : m.textEn ?? m.text;
                  const thumb = m.images[0];
                  return (
                    <li key={m.id}>
                      <Link href="/life#moments" className="flex gap-3 active:opacity-80">
                        {thumb ? (
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-[var(--color-callout)] sm:h-14 sm:w-14">
                            <Image src={thumb} alt="" fill className="object-cover" sizes="56px" />
                          </div>
                        ) : (
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[var(--color-callout)] text-lg sm:h-14 sm:w-14">
                            {mod?.emoji ?? "·"}
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
                            {mod ? <span>{mod.emoji}</span> : null}
                            <time>{formatShortDate(m.date, zh)}</time>
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                            {text.split("\n")[0]}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink-muted)]">
                {t.home.nowItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-terracotta)]" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </section>
        </div>

        <LifePhotoMarquee zh={zh} />

        <div className="site-shell">
        {/* ── 入口卡片 ── */}
        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-[var(--color-border)]" />
          <span className="text-xs text-[var(--color-ink-muted)]">{t.tracks.title}</span>
          <div className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {hubCards.map((track, i) => (
            <Link
              key={track.title}
              href={track.href}
              className={`card-surface group relative overflow-hidden rounded-md p-5 transition-shadow hover:shadow-lg sm:p-6 ${
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
              <span className="text-xs text-[var(--color-terracotta)]">{track.tag}</span>
              <h2
                className={`mt-2 font-serif font-semibold group-hover:text-[var(--color-forest)] ${
                  i === 0 ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                }`}
              >
                {track.title}
              </h2>
              <p className={`mt-2 text-[var(--color-ink-muted)] ${i === 0 ? "text-sm sm:text-base" : "text-sm"}`}>
                {track.desc}
              </p>
            </Link>
          ))}
        </section>

        {/* ── 旅途 + 运动 ── */}
        <section className="mt-16 grid gap-10 border-t border-[var(--color-border)] pt-12 lg:grid-cols-2">
          <div id="journey" className="scroll-mt-24">
            <h2 className="font-serif text-xl font-semibold sm:text-2xl">
              {zh ? "旅途与成长" : "Journey"}
            </h2>
            <ul className="mt-4 space-y-3">
              {journeyHighlights.map((j) => (
                <li key={j.year + j.zh} className="text-sm sm:text-base">
                  <span className="text-[var(--color-terracotta)]">{j.year}</span>
                  <span className="ml-2 text-[var(--color-ink-muted)]">{zh ? j.zh : j.en}</span>
                </li>
              ))}
            </ul>
          </div>
          <div id="sports" className="scroll-mt-24">
            <h2 className="font-serif text-xl font-semibold sm:text-2xl">{zh ? "运动" : "Sports"}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
              {sports.map((item) => (zh ? item.zh : item.en)).join(" · ")}
            </p>
            <Link
              href="/life#moments"
              className="mt-4 inline-block text-sm text-[var(--color-forest)] hover:underline"
            >
              {zh ? "生活动态里的训练与赛事 →" : "Training & races in moments →"}
            </Link>
          </div>
        </section>

        {/* ── 工作经历（折叠 · 卡片时间线） ── */}
        <details
          id="work-history"
          className="group mt-16 scroll-mt-24 border-t border-[var(--color-border)] pt-8"
        >
          <summary className="tap-target cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <div className="flex items-end justify-between gap-4 pb-2">
              <div>
                <h2 className="font-serif text-2xl font-semibold">
                  {zh ? "工作经历" : "Work Experience"}
                </h2>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                  {zh ? "点击展开 · 招聘或合作时可查阅" : "Tap to expand for hiring / collaboration"}
                </p>
              </div>
              <span
                className="shrink-0 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-ink-muted)] transition-transform group-open:rotate-180"
                aria-hidden
              >
                ↓
              </span>
            </div>
          </summary>
          <div className="mt-4 pb-2">
            <WorkHistoryList locale={locale} zh={zh} />
          </div>
        </details>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
