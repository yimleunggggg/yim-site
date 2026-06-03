"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { SiteHeader, SiteFooter, useLocale } from "@/components";
import type { GuideChapter, GuideSeries } from "@/lib/guides-content";

type Props = {
  series: GuideSeries;
  seriesTitle: { zh: string; en: string };
  chapters: GuideChapter[];
  currentSlug: string;
  title: string;
  prev: GuideChapter | null;
  next: GuideChapter | null;
  breadcrumbHref: string;
  breadcrumbLabel: string;
  /** 默认 /guides/{series}；Case 内文档传自定义路径 */
  basePath?: string;
  children: ReactNode;
};

export function GuideReaderShell({
  series,
  seriesTitle,
  chapters,
  currentSlug,
  title,
  prev,
  next,
  breadcrumbHref,
  breadcrumbLabel,
  basePath,
  children,
}: Props) {
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const base = basePath ?? `/guides/${series}`;
  const seriesLabel = locale === "zh" ? seriesTitle.zh : seriesTitle.en;
  const idx = chapters.findIndex((c) => c.slug === currentSlug);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="lg:flex lg:gap-12">
          <aside className="no-print mb-8 hidden w-56 shrink-0 lg:block">
            <Link
              href={breadcrumbHref}
              className="font-mono text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-forest)]"
            >
              ← {breadcrumbLabel}
            </Link>
            <p className="font-mono-index mt-6 text-[var(--color-forest)]">
              {seriesLabel}
            </p>
            <nav className="mt-3 space-y-1">
              {chapters.map((ch) => (
                <Link
                  key={ch.slug}
                  href={`${base}/${ch.slug}`}
                  className={`block rounded-sm px-2 py-1.5 text-sm transition-colors ${
                    ch.slug === currentSlug
                      ? "bg-[var(--color-callout)] font-medium text-[var(--color-forest)]"
                      : "text-[var(--color-ink-muted)] hover:text-[var(--color-forest)]"
                  }`}
                >
                  {ch.title}
                </Link>
              ))}
            </nav>
          </aside>

          <article className="min-w-0 flex-1">
            <div className="mb-6 lg:hidden">
              <select
                value={pathname}
                onChange={(e) => router.push(e.target.value)}
                className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm"
                aria-label="Chapter"
              >
                {chapters.map((ch) => (
                  <option key={ch.slug} value={`${base}/${ch.slug}`}>
                    {ch.title}
                  </option>
                ))}
              </select>
            </div>

            <header className="mb-10 border-b border-[var(--color-border)] pb-8">
              <p className="font-mono-index text-[var(--color-terracotta)]">
                {seriesLabel}
              </p>
              <h1 className="mt-3 font-serif text-3xl font-bold md:text-4xl">{title}</h1>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                {locale === "zh"
                  ? `第 ${idx + 1} 章 / 共 ${chapters.length} 章`
                  : `Chapter ${idx + 1} of ${chapters.length}`}
              </p>
            </header>

            <div className="prose-playbook">{children}</div>

            <nav className="mt-12 flex justify-between gap-4 border-t border-[var(--color-border)] pt-8 text-sm">
              {prev ? (
                <Link href={`${base}/${prev.slug}`} className="text-[var(--color-forest)] hover:underline">
                  ← {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`${base}/${next.slug}`}
                  className="text-right text-[var(--color-forest)] hover:underline"
                >
                  {next.title} →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
