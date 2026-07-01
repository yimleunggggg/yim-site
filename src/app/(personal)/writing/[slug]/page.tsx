import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MdxContent } from "@/lib/mdx";
import {
  getDemoWritingBySlug,
  getDemoWritingSlugs,
  getRelatedDemoWriting,
} from "@/lib/demo/demo-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDemoWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = getDemoWritingBySlug(slug);
  if (!w) return {};
  return { title: w.title, description: w.summary };
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const article = getDemoWritingBySlug(slug);
  if (!article) notFound();

  const related = getRelatedDemoWriting(slug);

  return (
    <article className="site-shell py-10 sm:py-14">
        <Link href="/writing" className="text-sm text-[var(--color-forest)] hover:underline">
          ← Writing
        </Link>

        <header className="mt-6 border-b border-[var(--color-border)] pb-6">
          <h1 className="editorial-article-title font-medium">
            {article.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[var(--color-ink-muted)]">
            <time>{article.date}</time>
            <span>·</span>
            <span>{article.tags.join(" / ")}</span>
            <span>·</span>
            <span>{article.readingMinutes} min</span>
          </div>
        </header>

        {article.isAI && (article.toolVersion || article.updatedAt) ? (
          <div className="mt-6 rounded-lg border border-[var(--color-accent-warm)] bg-[var(--color-callout)] px-4 py-3 text-sm text-[var(--color-ink-muted)]">
            <span className="font-medium text-[var(--color-accent-warm)]">AI 工具文章</span>
            <span className="ml-2">
              {[
                article.toolVersion && `工具版本：${article.toolVersion}`,
                article.updatedAt && `更新于 ${article.updatedAt}`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </div>
        ) : null}

        <div className="prose-playbook demo-article editorial-content mt-8 max-w-none">
          <MdxContent source={article.body} />
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-[var(--color-border)] pt-8">
            <p className="font-mono-index text-[var(--color-ink-muted)]">相关文章</p>
            <ul className="mt-4 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/writing/${r.slug}`}
                    className="group flex items-baseline justify-between gap-3"
                  >
                    <span className="font-serif text-base font-medium text-[var(--color-ink)] group-hover:text-[var(--color-forest)]">
                      {r.title}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-[var(--color-ink-muted)]">
                      {r.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
    </article>
  );
}
