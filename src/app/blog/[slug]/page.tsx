import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components";
import { MdxContent } from "@/lib/mdx";
import { getArticleBySlug, getArticleSlugs } from "@/lib/blog-content";
import { BLOG_TOPIC_LABELS } from "@/lib/blog-topics";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} · 博客`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const allowDraft = process.env.NODE_ENV === "development";

  if (
    !article ||
    article.externalUrl ||
    (article.status !== "published" && !allowDraft)
  ) {
    notFound();
  }

  const topicLabel = BLOG_TOPIC_LABELS[article.topic].zh;
  const isDraft = article.status === "draft";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/blog"
          className="text-sm text-[var(--color-forest)] hover:underline"
        >
          ← 博客
        </Link>

        {isDraft && (
          <p className="mt-4 rounded-md border border-dashed border-[var(--color-terracotta)] bg-[var(--color-callout)] px-3 py-2 text-sm text-[var(--color-terracotta)]">
            草稿预览 · 正式发布请把 frontmatter 里 status 改为 published
          </p>
        )}

        <article className="mt-6">
          <header className="border-b border-[var(--color-border)] pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-ink-muted)]">
              <time>{article.date}</time>
              <span>·</span>
              <span>{topicLabel}</span>
            </div>
            <h1 className="editorial-article-title mt-3">
              {article.title}
            </h1>
            {article.summary && (
              <p className="editorial-article-deck">{article.summary}</p>
            )}
          </header>

          <div className="prose-playbook editorial-content mt-8 max-w-none">
            <MdxContent source={article.body} />
          </div>

          {article.bodyEn && (
            <>
              <hr className="my-10 border-[var(--color-border)]" />
              <div className="prose-playbook max-w-none">
                <MdxContent source={article.bodyEn} />
              </div>
            </>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
