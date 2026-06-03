import Link from "next/link";
import { getGuideChapters, getSeriesMeta } from "@/lib/guides-content";
import { SiteHeader, SiteFooter } from "@/components";

export const metadata = {
  title: "屋久岛 Playbook · Guides",
};

export default function YakushimaIndexPage() {
  const chapters = getGuideChapters("yakushima");
  const meta = getSeriesMeta("yakushima");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="font-mono-index text-[var(--color-terracotta)]">Guides / Vibe Coding</p>
        <h1 className="mt-3 font-serif text-4xl font-bold">{meta.title.zh}</h1>
        <p className="mt-4 text-[var(--color-ink-muted)]">{meta.description.zh}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="https://yakushimabus.com"
            className="rounded-sm border border-[var(--color-border)] px-4 py-2 text-sm hover:border-[var(--color-forest)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            案例站 ↗
          </a>
          <a
            href="https://github.com/yimleunggggg/vibe-coding-static-site-guide"
            className="rounded-sm border border-[var(--color-border)] px-4 py-2 text-sm hover:border-[var(--color-forest)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
        <ol className="mt-8 divide-y divide-[var(--color-border)] rounded-md border border-[var(--color-border)] bg-[var(--color-card)]">
          {chapters.map((ch, i) => (
            <li key={ch.slug}>
              <Link
                href={`/guides/yakushima/${ch.slug}`}
                className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[var(--color-callout)]"
              >
                <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif">{ch.title}</span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-6">
          <Link href="/guides" className="text-sm text-[var(--color-forest)] hover:underline">
            ← 返回教程中心
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
