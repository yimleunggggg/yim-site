"use client";

import Link from "next/link";
import { MdxContent } from "@/lib/mdx";
import { DemoStatusTag } from "@/components/demo/DemoPrimitives";
import { DemoProjectVideo } from "@/components/demo/DemoProjectVideo";
import {
  pickText,
  projectCategoryLabel,
  projectStatusLabel,
  type DemoAboutProject,
  type DemoProject,
  type ProjectCategory,
} from "@/lib/demo/demo-data";
import type { DemoProjectMeta } from "@/lib/demo/demo-project-meta";
import { ProjectMetaPanels } from "@/components/demo/ProjectMetaPanels";
import { ProjectPageScreenshots } from "@/components/demo/ProjectPageScreenshots";
import { demoUiCopy } from "@/lib/demo/demo-ui-copy";
import { useLocale } from "@/components";
import type { LText } from "@/lib/demo/demo-data";

type WritingLink = { slug: string; title: string; readingMinutes: number };

export function ProjectPageView({
  slug,
  about,
  detail,
  bodyText,
  mdxBodyZh,
  liveUrl,
  demoUrl,
  videoUrl,
  projectMeta,
  derived,
}: {
  slug: string;
  about?: DemoAboutProject;
  detail?: DemoProject;
  bodyText?: LText | null;
  mdxBodyZh?: string | null;
  liveUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  projectMeta?: DemoProjectMeta;
  derived: WritingLink[];
}) {
  const { locale } = useLocale();
  const zh = locale === "zh";

  const title = about ? pickText(about.title, zh) : pickText(detail!.title, zh);
  const tagline = about ? pickText(about.tagline, zh) : pickText(detail!.tagline, zh);
  const period = detail?.period;
  const body = bodyText ? pickText(bodyText, zh) : mdxBodyZh ?? null;

  return (
    <article className="site-shell py-10 sm:py-14">
      <Link href="/about#projects" className="text-sm text-[var(--color-forest)] hover:underline">
        {pickText(demoUiCopy.projectPage.backLink, zh)}
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
              {pickText(projectCategoryLabel[c], zh)}
            </span>
          ))}
          {about ? (
            <DemoStatusTag tone={about.status}>
              {pickText(projectStatusLabel[about.status], zh)}
            </DemoStatusTag>
          ) : detail ? (
            <DemoStatusTag tone={detail.statusTone}>{pickText(detail.status, zh)}</DemoStatusTag>
          ) : null}
          {detail?.type ? (
            <span className="font-mono text-xs text-[var(--color-ink-muted)]">
              {pickText(detail.type, zh)}
            </span>
          ) : null}
          {period ? (
            <span className="font-mono text-xs text-[var(--color-ink-muted)]">{period}</span>
          ) : null}
        </div>
      </header>

      {(liveUrl || demoUrl) && (
        <div className="mt-5 flex flex-wrap gap-3">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center rounded-full bg-[var(--color-forest)] px-5 text-sm font-medium text-white"
            >
              {pickText(demoUiCopy.projectPage.visitLive, zh)}
            </a>
          ) : null}
          {demoUrl && demoUrl !== liveUrl ? (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center rounded-full border border-[var(--color-forest)] px-5 text-sm font-medium text-[var(--color-forest)]"
            >
              {pickText(demoUiCopy.projectPage.openDemo, zh)}
            </a>
          ) : null}
        </div>
      )}

      <div className="mt-8">
        <ProjectPageScreenshots slug={slug} />
      </div>

      {body ? (
        <div className="prose-playbook demo-article editorial-content mt-10 max-w-none">
          <MdxContent key={locale} source={body} />
        </div>
      ) : null}

      {videoUrl ? <DemoProjectVideo url={videoUrl} title={title} /> : null}

      {projectMeta ? (
        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <ProjectMetaPanels meta={projectMeta} />
        </div>
      ) : null}

      {derived.length > 0 && (
        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <p className="font-mono-index text-[var(--color-ink-muted)]">
            {pickText(demoUiCopy.projectPage.relatedWriting, zh)}
          </p>
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
