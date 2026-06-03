"use client";

import Link from "next/link";
import { SiteHeader, SiteFooter, useLocale } from "@/components";
import { zh } from "@/locales/zh";
import { en } from "@/locales/en";

export default function GuidesPage() {
  const { locale } = useLocale();
  const g = locale === "zh" ? zh.guides : en.guides;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <p className="font-mono-index text-[var(--color-terracotta)]">{g.eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-bold md:text-5xl">{g.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-muted)]">{g.lead}</p>

        <section className="mt-12">
          <h2 className="font-mono-index text-[var(--color-forest)]">
            {locale === "zh" ? "主题模块" : "Themes"}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.themes.map((theme) => (
              <div
                key={theme.title}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-5"
              >
                <p className="font-mono-index text-[var(--color-ink-muted)]">{theme.label}</p>
                <h3 className="mt-2 font-serif text-lg font-semibold">{theme.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{theme.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-mono-index text-[var(--color-forest)]">
            {locale === "zh" ? "学习路径" : "Learning paths"}
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {g.paths.map((path) => (
              <article
                key={path.title}
                className="overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-card)]"
              >
                <div className="border-b border-[var(--color-border)] px-5 py-4">
                  <p className="font-mono-index text-[var(--color-terracotta)]">{path.badge}</p>
                  <h3 className="mt-1 font-serif text-xl font-semibold">{path.title}</h3>
                </div>
                <ol className="divide-y divide-[var(--color-border)]">
                  {path.steps.map((step) => (
                    <li key={step.href}>
                      <Link
                        href={step.href}
                        className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-[var(--color-callout)]"
                      >
                        <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                          {step.num}
                        </span>
                        {step.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 pb-8">
          <h2 className="font-mono-index text-[var(--color-forest)]">
            {locale === "zh" ? "教程系列" : "Series"}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {g.series.map((series) => (
              <article
                key={series.title}
                className="flex flex-col rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-5"
              >
                <span className="font-mono-index text-[var(--color-forest)]">{series.tagLabel}</span>
                <h3 className="mt-2 font-serif text-xl font-semibold">{series.title}</h3>
                <p className="mt-2 flex-1 text-sm text-[var(--color-ink-muted)]">{series.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {series.links.map((link) =>
                    "external" in link && link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        className="rounded-sm border border-[var(--color-border)] px-3 py-1.5 text-xs hover:border-[var(--color-forest)]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={
                          "primary" in link && link.primary
                            ? "rounded-sm bg-[var(--color-forest)] px-3 py-1.5 text-xs text-white"
                            : "rounded-sm border border-[var(--color-border)] px-3 py-1.5 text-xs hover:border-[var(--color-forest)]"
                        }
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
