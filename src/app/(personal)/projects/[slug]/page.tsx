import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MdxContent } from "@/lib/mdx";
import { DemoStatusTag } from "@/components/demo/DemoPrimitives";
import { DemoProjectVideo } from "@/components/demo/DemoProjectVideo";
import {
  getAllDemoProjectSlugs,
  getDemoAboutProject,
  getDemoProjectDetail,
  pickText,
  projectCategoryLabel,
  projectStatusLabel,
  type ProjectCategory,
} from "@/lib/demo/demo-data";
import { getAllDemoWriting, getDemoProjectBody, getDemoProjectFrontmatter } from "@/lib/demo/demo-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDemoProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const about = getDemoAboutProject(slug);
  const detail = getDemoProjectDetail(slug);
  const title = about ? pickText(about.title, true) : detail ? pickText(detail.title, true) : "";
  const description = about
    ? pickText(about.tagline, true)
    : detail
      ? pickText(detail.tagline, true)
      : "";
  if (!title) return {};
  return { title, description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const about = getDemoAboutProject(slug);
  if (about?.hasDetailPage === false) notFound();

  const detail = getDemoProjectDetail(slug);
  if (!about && !detail) notFound();

  const title = about ? pickText(about.title, true) : pickText(detail!.title, true);
  const tagline = about ? pickText(about.tagline, true) : pickText(detail!.tagline, true);
  const body = getDemoProjectBody(slug);
  const fm = getDemoProjectFrontmatter(slug);
  const liveUrl = about?.liveUrl ?? detail?.liveUrl;
  const demoUrl = about?.demoUrl ?? (typeof fm.demoUrl === "string" ? fm.demoUrl : undefined);
  const githubUrl = about?.githubUrl ?? detail?.githubUrl ?? (typeof fm.githubUrl === "string" ? fm.githubUrl : undefined);
  const videoUrl =
    about?.videoUrl ??
    (typeof fm.videoUrl === "string" ? fm.videoUrl : undefined);
  const period = detail?.period;
  const derived =
    slug === "ai-training" ? getAllDemoWriting().filter((w) => w.tags.includes("AI教程")) : [];

  return (
    <article className="site-shell py-10 sm:py-14">
        <Link href="/about#projects" className="text-sm text-[var(--color-forest)] hover:underline">
          ← Projects
        </Link>

        <header className="mt-6 border-b border-[var(--color-border)] pb-6">
          <h1 className="font-serif text-3xl font-bold leading-tight text-[var(--color-ink)] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
            {tagline}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {about?.categories.map((c: ProjectCategory) => (
              <span key={c} className={`demo-cat-pill demo-cat-pill--${c}`}>
                {pickText(projectCategoryLabel[c], true)}
              </span>
            ))}
            {about ? (
              <DemoStatusTag tone={about.status}>
                {pickText(projectStatusLabel[about.status], true)}
              </DemoStatusTag>
            ) : detail ? (
              <DemoStatusTag tone={detail.statusTone}>{pickText(detail.status, true)}</DemoStatusTag>
            ) : null}
            {detail?.type ? (
              <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                {pickText(detail.type, true)}
              </span>
            ) : null}
            {period ? (
              <span className="font-mono text-xs text-[var(--color-ink-muted)]">{period}</span>
            ) : null}
          </div>
        </header>

        {(liveUrl || demoUrl || githubUrl) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center rounded-full bg-[var(--color-forest)] px-5 text-sm font-medium text-white"
              >
                访问网站 →
              </a>
            ) : null}
            {demoUrl && demoUrl !== liveUrl ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center rounded-full border border-[var(--color-forest)] px-5 text-sm font-medium text-[var(--color-forest)]"
              >
                打开 Demo →
              </a>
            ) : null}
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center rounded-full border border-[var(--color-border)] px-5 text-sm text-[var(--color-ink)] hover:border-[var(--color-forest)]"
              >
                GitHub
              </a>
            ) : null}
          </div>
        )}

        {videoUrl ? <DemoProjectVideo url={videoUrl} title={title} /> : null}

        {body ? (
          <div className="prose-playbook demo-article mt-10 max-w-none">
            <MdxContent source={body} />
          </div>
        ) : null}

        {derived.length > 0 && (
          <div className="mt-12 border-t border-[var(--color-border)] pt-8">
            <p className="font-mono-index text-[var(--color-ink-muted)]">相关内容</p>
            <ul className="mt-4 space-y-3">
              {derived.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/writing/${d.slug}`}
                    className="group flex items-baseline justify-between gap-3"
                  >
                    <span className="font-serif text-base font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-forest)]">
                      {d.title}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-[var(--color-ink-muted)]">
                      {d.readingMinutes} min
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
