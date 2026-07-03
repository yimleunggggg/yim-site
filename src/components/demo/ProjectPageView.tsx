"use client";

import Link from "next/link";
import { MdxContent } from "@/lib/mdx";
import { DemoStatusTag } from "@/components/demo/DemoPrimitives";
import { DemoProjectVideo } from "@/components/demo/DemoProjectVideo";
import {
  pickText,
  projectStatusLabel,
  type DemoAboutProject,
  type DemoProject,
  type LText,
} from "@/lib/demo/demo-data";
import type { DemoProjectMeta } from "@/lib/demo/demo-project-meta";
import { ProjectMetaPanels } from "@/components/demo/ProjectMetaPanels";
import { ProjectPageScreenshots } from "@/components/demo/ProjectPageScreenshots";
import { ProjectRelatedLinks } from "@/components/demo/ProjectRelatedLinks";
import { demoUiCopy } from "@/lib/demo/demo-ui-copy";
import { useLocale } from "@/components";
import { filterDuplicateProjectRelatedLinks, projectActionUrlsMatch } from "@/lib/demo/project-page-links";

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
  const relatedLinks = filterDuplicateProjectRelatedLinks(projectMeta?.related ?? [], [
    liveUrl,
    demoUrl,
  ]);
  const primaryUrl = liveUrl ?? demoUrl;
  const secondaryDemoUrl =
    demoUrl && liveUrl && !projectActionUrlsMatch(demoUrl, liveUrl) ? demoUrl : undefined;

  return (
    <article className="project-page-view site-shell py-8 sm:py-14">
      <Link href="/about#projects" className="text-sm text-[var(--color-forest)] hover:underline">
        {pickText(demoUiCopy.projectPage.backLink, zh)}
      </Link>

      <header className="project-page-header mt-5 pb-5 sm:mt-6 sm:pb-6">
        <h1 className="editorial-article-title">
          {title}
        </h1>
        <p className="editorial-article-deck mt-2.5 sm:mt-3">
          {tagline}
        </p>
        <div className="project-page-meta mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">
          {about?.tags.map((tag, i) => (
            <span key={i} className="demo-project-tag-pill">
              {pickText(tag, zh)}
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

      <div className="mt-8">
        <ProjectPageScreenshots slug={slug} title={title} />
      </div>

      {(primaryUrl || secondaryDemoUrl) && (
        <div className="project-page-actions mt-6">
          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-page-external-link tap-target"
            >
              {liveUrl
                ? pickText(demoUiCopy.projectPage.visitLive, zh)
                : pickText(demoUiCopy.projectPage.openDemo, zh)}
            </a>
          ) : null}
          {secondaryDemoUrl ? (
            <a
              href={secondaryDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-page-external-link project-page-external-link--secondary tap-target"
            >
              {pickText(demoUiCopy.projectPage.openDemo, zh)}
            </a>
          ) : null}
        </div>
      )}

      {relatedLinks.length > 0 ? <ProjectRelatedLinks links={relatedLinks} /> : null}

      {body ? (
        <div className="prose-playbook demo-article editorial-content mt-8 max-w-none sm:mt-10">
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
