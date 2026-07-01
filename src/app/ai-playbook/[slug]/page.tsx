import { notFound } from "next/navigation";
import {
  SiteHeader,
  SiteFooter,
  ChapterNav,
  ReadingProgress,
  KeyboardNav,
  GitHubSourceLink,
} from "@/components";
import { PlaybookSidebar } from "@/components/PlaybookSidebar";
import { TimeBadge } from "@/components/TimeBadge";
import {
  getChapterSlugs,
  getChapterBySlug,
  getAdjacentChapters,
  getAllChapters,
  formatDate,
} from "@/lib/content";
import { MdxContent } from "@/lib/mdx";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getChapterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return {};
  return {
    title: `${chapter.title} · AI Playbook`,
    description: chapter.summary,
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) notFound();

  const chapters = getAllChapters();
  const { prev, next } = getAdjacentChapters(slug);

  return (
    <>
      <ReadingProgress />
      <KeyboardNav prevSlug={prev?.slug} nextSlug={next?.slug} />
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="lg:flex lg:items-start lg:gap-12">
          <div className="mb-6 lg:sticky lg:top-20 lg:mb-0">
            <PlaybookSidebar chapters={chapters} currentSlug={slug} />
          </div>

          <article className="min-w-0 flex-1">
            <header className="mb-8 border-b border-[var(--color-border)] pb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-index">{chapter.chapterId}</span>
                {chapter.week != null && (
                  <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                    第 {chapter.week} 周
                  </span>
                )}
                <TimeBadge variant="original" date={chapter.originalDate} />
              </div>
              <h1 className="editorial-article-title mt-3">
                {chapter.title}
              </h1>
              <p className="editorial-article-deck">
                {chapter.summary}
              </p>
              <p className="mt-2 font-mono text-xs text-[var(--color-ink-muted)]">
                约 {chapter.readingMinutes} 分钟 · {formatDate(chapter.originalDate)} 整理
              </p>
            </header>

            <div className="prose-playbook editorial-content">
              <MdxContent source={chapter.content} />
            </div>

            <div className="mt-10 rounded-sm border border-[var(--color-border)] bg-[var(--color-callout)] px-4 py-3 text-sm text-[var(--color-ink-muted)]">
              配图与原始导出素材见{" "}
              <GitHubSourceLink className="inline text-xs" label="GitHub 仓库" />
              。本站正文与仓库同步维护。
            </div>

            <ChapterNav prev={prev} next={next} />
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
