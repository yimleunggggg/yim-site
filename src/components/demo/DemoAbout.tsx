"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components";
import {
  demoAbout,
  demoWork,
  getSortedAboutProjects,
  isAboutFeaturedProject,
  projectStatusLabel,
  pickText,
  type DemoWork,
  type DemoAboutProject,
} from "@/lib/demo/demo-data";
import { demoUiCopy } from "@/lib/demo/demo-ui-copy";
import { getProjectAboutThumb } from "@/lib/demo/project-screenshots";
import { DemoPageHeader, DemoSectionHeading, DemoStatusTag } from "./DemoPrimitives";

export function DemoAbout() {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const [introExpanded, setIntroExpanded] = useState(false);
  const introCollapsible = demoAbout.intro.length > 0;
  const allProjects = getSortedAboutProjects();

  return (
    <>
      <header className="site-shell demo-page-shell">
        <DemoPageHeader eyebrow="ABOUT" className="demo-about-header">
          <div
            className={`demo-page-lead demo-page-lead-stack demo-about-intro-stack${
              introCollapsible && !introExpanded ? " demo-about-intro-stack--collapsed" : ""
            }`}
          >
            {demoAbout.intro.map((block, i) => (
              <p key={i}>
                {block.parts.map((part, j) =>
                  part.type === "link" ? (
                    <Link key={j} href={part.href} className="demo-about-intro-link">
                      {pickText(part.label, zh)}
                    </Link>
                  ) : (
                    <span key={j}>{pickText(part.value, zh)}</span>
                  ),
                )}
              </p>
            ))}
          </div>
          {introCollapsible ? (
            <div className="demo-about-intro-actions">
              <button
                type="button"
                className="demo-list-expand-btn demo-list-expand-btn--mobile-only"
                aria-expanded={introExpanded}
                onClick={() => setIntroExpanded((v) => !v)}
              >
                {pickText(
                  introExpanded ? demoUiCopy.lifePage.showLess : demoUiCopy.aboutPage.readMore,
                  zh,
                )}
              </button>
            </div>
          ) : null}
        </DemoPageHeader>
      </header>

      <section id="projects" className="site-shell demo-page-section scroll-mt-20">
        <DemoSectionHeading
          eyebrow="PROJECTS"
          title={zh ? "项目" : "Projects"}
          subtitle={pickText(demoAbout.projectsLead, zh)}
          className="demo-section-heading--projects"
        />
        {allProjects.length > 0 ? (
          <ul className="demo-project-card-grid demo-page-content">
            {allProjects.map((p) => (
              <ProjectCard
                key={p.slug}
                project={p}
                zh={zh}
                featured={isAboutFeaturedProject(p.slug)}
              />
            ))}
          </ul>
        ) : null}
      </section>

      <section id="work" className="site-shell demo-page-section scroll-mt-20">
        <DemoSectionHeading eyebrow="WORK" title={zh ? "工作履历" : "Experience"} />
        <ul className="demo-work-list demo-page-content demo-work-list--detail">
          {demoWork.map((w) => (
            <WorkRow key={w.id} work={w} zh={zh} />
          ))}
        </ul>
      </section>
    </>
  );
}

function ProjectCardThumb({ slug, title }: { slug: string; title: string }) {
  const thumb = getProjectAboutThumb(slug, title);

  if (thumb.kind === "image") {
    return (
      <div className="demo-project-card-thumb">
        <Image
          src={thumb.src}
          alt=""
          width={thumb.width ?? 390}
          height={thumb.height ?? 844}
          sizes="(max-width: 767px) 45vw, 32vw"
          className="demo-project-card-thumb-img"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div
      className="demo-project-card-thumb demo-project-card-thumb--gradient"
      style={{ background: thumb.gradient }}
      aria-hidden
    />
  );
}

function ProjectCard({
  project: p,
  zh,
  featured = false,
}: {
  project: DemoAboutProject;
  zh: boolean;
  featured?: boolean;
}) {
  const clickable = p.hasDetailPage !== false;
  const title = pickText(p.title, zh);
  const cardClass = [
    "demo-project-featured-card",
    featured ? "demo-project-featured-card--highlight" : "",
    clickable ? "tap-target" : "demo-project-featured-card--static",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <ProjectCardThumb slug={p.slug} title={title} />
      <div className="demo-project-card-body">
        <div className="demo-project-featured-head">
          <span className="demo-project-featured-name">{title}</span>
          <DemoStatusTag tone={p.status} compact>
            {pickText(projectStatusLabel[p.status], zh)}
          </DemoStatusTag>
        </div>
        <p className="demo-project-featured-desc">{pickText(p.tagline, zh)}</p>
        <div className="demo-project-featured-foot">
          <span className="demo-project-featured-cats">
            {p.tags.map((tag, i) => (
              <span key={i} className="demo-project-tag-pill">
                {pickText(tag, zh)}
              </span>
            ))}
          </span>
          {clickable ? (
            <span className="demo-project-featured-go" aria-hidden>
              →
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  if (!clickable) {
    return (
      <li className="demo-project-card-grid-item">
        <div className={cardClass}>{inner}</div>
      </li>
    );
  }

  return (
    <li className="demo-project-card-grid-item">
      <Link href={`/projects/${p.slug}`} className={cardClass}>
        {inner}
      </Link>
    </li>
  );
}

function WorkRow({ work, zh }: { work: DemoWork; zh: boolean }) {
  const [open, setOpen] = useState(false);
  const tags = zh ? work.tags.zh : work.tags.en;
  const bullets = zh ? work.bullets.zh : work.bullets.en;

  return (
    <li className={`demo-work-item${open ? " is-open" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="demo-work-trigger tap-target"
      >
        <span className="demo-work-main">
          <span className="demo-work-top">
            <span className="demo-work-identity">
              <span className="demo-work-company">{pickText(work.company, zh)}</span>
              <span className="demo-work-role">{pickText(work.role, zh)}</span>
            </span>
            <span className="demo-work-meta">
              {work.period}
              <span className="demo-work-meta-sep" aria-hidden>
                ·
              </span>
              {pickText(work.location, zh)}
            </span>
          </span>
          {tags.length > 0 ? (
            <span className="demo-work-tags-row">
              {tags.map((tag) => (
                <span key={tag} className="demo-work-tag">
                  {tag}
                </span>
              ))}
            </span>
          ) : null}
        </span>
        <span className={`demo-work-chevron ${open ? "is-open" : ""}`} aria-hidden>
          ⌄
        </span>
      </button>
      <div className={`demo-work-body-wrap${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="demo-work-body-inner">
          <div className="demo-work-body">
            <ul className="demo-work-bullets">
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}
