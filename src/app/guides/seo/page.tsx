import Link from "next/link";
import { getGuideChapters, getSeriesMeta } from "@/lib/guides-content";
import { SiteHeader, SiteFooter } from "@/components";

export const metadata = {
  title: "SEO 自动化教程 · Guides",
};

export default function SeoIndexPage() {
  const chapters = getGuideChapters("seo");
  const meta = getSeriesMeta("seo");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="font-mono-index text-[var(--color-terracotta)]">Guides / SEO</p>
        <h1 className="mt-3 font-serif text-4xl font-bold">{meta.title.zh}</h1>
        <p className="mt-4 text-[var(--color-ink-muted)]">{meta.description.zh}</p>
        <ol className="mt-8 divide-y divide-[var(--color-border)] rounded-md border border-[var(--color-border)] bg-[var(--color-card)]">
          {chapters.map((ch, i) => (
            <li key={ch.slug}>
              <Link
                href={`/guides/seo/${ch.slug}`}
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
