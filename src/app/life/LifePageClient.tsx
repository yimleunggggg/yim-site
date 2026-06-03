"use client";

import Link from "next/link";
import { SiteFooter, SiteHeader, useLocale } from "@/components";
import { LifeMomentsFeed } from "@/components/LifeMomentsFeed";
import type { LifeMoment } from "@/lib/life-content";
import { siteConfig } from "@/lib/site-config";
import { lifeModules, lifeStories } from "@/lib/site-data";

const NAV = [
  { id: "moments", zh: "动态", en: "Moments" },
  { id: "stories", zh: "故事", en: "Stories" },
  { id: "albums", zh: "相册", en: "Albums" },
] as const;

type Props = {
  moments: LifeMoment[];
};

export default function LifePageClient({ moments }: Props) {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="font-mono-index text-[var(--color-terracotta)]">
          {zh ? "生活" : "LIFE"}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold md:text-5xl">
          {zh ? "生活记录" : "Life"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-muted)]">
          {zh
            ? "动态像朋友圈，随手发图+几句话；故事是长文；相册是主题合集。不用一次看完。"
            : "Moments for quick updates, stories for long reads, albums for collections."}
        </p>

        <nav className="mt-8 flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-4">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-sm border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 font-mono text-xs transition-colors hover:border-[var(--color-forest)]"
            >
              {zh ? item.zh : item.en}
            </a>
          ))}
          {lifeModules.map((m) => (
            <span
              key={m.id}
              className="rounded-sm bg-[var(--color-callout)] px-2 py-1.5 font-mono text-[10px] text-[var(--color-ink-muted)]"
            >
              {m.emoji} {zh ? m.label.zh : m.label.en}
            </span>
          ))}
        </nav>

        <section id="moments" className="mt-10 scroll-mt-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold">
              {zh ? "动态" : "Moments"}
            </h2>
            <Link
              href={`${siteConfig.githubRepoUrl}/blob/main/docs/life-moments.md`}
              className="font-mono text-xs text-[var(--color-forest)] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {zh ? "怎么发一条 →" : "How to post →"}
            </Link>
          </div>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            {zh
              ? "图+短文，按时间瀑布流。带 pinToHome 的会同步到首页近期动态。"
              : "Photo + caption feed. pinToHome syncs to the homepage."}
          </p>
          <div className="mt-6">
            <LifeMomentsFeed moments={moments} locale={locale} />
          </div>
        </section>

        <section id="stories" className="mt-16 scroll-mt-24 border-t border-[var(--color-border)] pt-10">
          <h2 className="font-serif text-2xl font-semibold">
            {zh ? "故事" : "Stories"}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            {zh ? "值得单独成篇的长内容，筹备中。" : "Long-form pieces — in progress."}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {lifeStories.map((story) => {
              const mod = lifeModules.find((m) => m.id === story.module);
              const inner = (
                <>
                  <div className="flex items-center gap-2">
                    <span>{mod?.emoji}</span>
                    <span className="font-mono-index text-[var(--color-ink-muted)]">
                      {zh ? story.format.zh : story.format.en}
                    </span>
                    {story.status === "draft" && (
                      <span className="font-mono text-[10px] text-[var(--color-terracotta)]">
                        {zh ? "待写" : "draft"}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-serif text-lg font-semibold">
                    {zh ? story.title.zh : story.title.en}
                  </h3>
                </>
              );
              if (story.href && story.status === "ready") {
                return (
                  <Link
                    key={story.id}
                    href={story.href}
                    className="block rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-5 hover:border-[var(--color-forest)]"
                  >
                    {inner}
                  </Link>
                );
              }
              return (
                <div
                  key={story.id}
                  className="rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-callout)]/50 p-5"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        <section id="albums" className="mt-16 scroll-mt-24 border-t border-[var(--color-border)] pt-10 pb-8">
          <h2 className="font-serif text-2xl font-semibold">
            {zh ? "相册" : "Albums"}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            {zh ? "主题合集（音乐节、赛事、旅行…）待整理。" : "Themed collections — coming soon."}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { zh: "碧山村音乐节", en: "Bishan fest" },
              { zh: "赛事记录", en: "Race log" },
              { zh: "精酿局", en: "Craft beer" },
            ].map((a) => (
              <div
                key={a.zh}
                className="flex aspect-[4/3] flex-col items-center justify-center rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-card)] p-4 text-center"
              >
                <span className="font-serif font-semibold">{zh ? a.zh : a.en}</span>
                <span className="mt-1 font-mono text-[10px] text-[var(--color-ink-muted)]">
                  {zh ? "相册占位" : "placeholder"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
