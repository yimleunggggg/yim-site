"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components";
import {
  demoAbout,
  demoWork,
  getAboutProjectsGrouped,
  isAboutFeaturedProject,
  projectStatusLabel,
  projectCategoryLabel,
  pickText,
  type DemoWork,
  type ProjectCategory,
  type DemoAboutProject,
} from "@/lib/demo/demo-data";
import { demoUiCopy } from "@/lib/demo/demo-ui-copy";
import { DemoPageHeader, DemoSectionHeading, DemoStatusTag } from "./DemoPrimitives";

export function DemoAbout() {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const [introExpanded, setIntroExpanded] = useState(false);
  const introCollapsible = demoAbout.intro.length > 0;
  const { featured: featuredProjects, rest: restProjects } = getAboutProjectsGrouped();
  const mobileProjects = [...featuredProjects, ...restProjects];

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
        {featuredProjects.length > 0 ? (
          <ul className="demo-project-featured-grid demo-page-content">
            {featuredProjects.map((p) => (
              <FeaturedProjectCard key={p.slug} project={p} zh={zh} />
            ))}
          </ul>
        ) : null}
        {mobileProjects.length > 0 ? (
          <div className="demo-project-table demo-page-content">
            {restProjects.length > 0 ? (
              <p className="demo-project-more-label">
                {pickText(demoUiCopy.aboutPage.moreProjects, zh)}
              </p>
            ) : null}
            <div className="demo-project-table-head" aria-hidden>
              <span>{zh ? "名称" : "Name"}</span>
              <span>{zh ? "简介" : "About"}</span>
              <span>{zh ? "分类" : "Tags"}</span>
              <span>{zh ? "状态" : "Status"}</span>
            </div>
            <ul className="demo-project-table-body demo-project-table-body--desktop">
              {restProjects.map((p) => (
                <ProjectTableRow key={p.slug} project={p} zh={zh} />
              ))}
            </ul>
            <ul className="demo-project-mobile-list demo-project-table-body--mobile">
              {mobileProjects.map((p) => (
                <ProjectMobileRow
                  key={p.slug}
                  project={p}
                  zh={zh}
                  featured={isAboutFeaturedProject(p.slug)}
                />
              ))}
            </ul>
          </div>
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

function ProjectMobileRow({
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
  const status = pickText(projectStatusLabel[p.status], zh);
  const desc = pickText(p.tagline, zh);

  const inner = (
    <>
      <div className="demo-project-mobile-head">
        <span className="demo-project-mobile-title">
          {featured ? (
            <span className="demo-project-pin">{zh ? "精选" : "Featured"}</span>
          ) : null}
          <span className="demo-project-mobile-name">{title}</span>
          {clickable ? (
            <span className="demo-project-mobile-go" aria-hidden>
              →
            </span>
          ) : null}
        </span>
        <DemoStatusTag tone={p.status} compact>
          {status}
        </DemoStatusTag>
      </div>
      <p className="demo-project-mobile-desc">{desc}</p>
    </>
  );

  if (!clickable) {
    return <li className="demo-project-mobile-item">{inner}</li>;
  }

  return (
    <li className="demo-project-mobile-item">
      <Link href={`/projects/${p.slug}`} className="demo-project-mobile-row tap-target">
        {inner}
      </Link>
    </li>
  );
}

function FeaturedProjectCard({ project: p, zh }: { project: DemoAboutProject; zh: boolean }) {
  return (
    <li>
      <Link href={`/projects/${p.slug}`} className="demo-project-featured-card tap-target">
        <div className="demo-project-featured-head">
          <span className="demo-project-featured-name">{pickText(p.title, zh)}</span>
          <DemoStatusTag tone={p.status}>{pickText(projectStatusLabel[p.status], zh)}</DemoStatusTag>
        </div>
        <p className="demo-project-featured-desc">{pickText(p.tagline, zh)}</p>
        <div className="demo-project-featured-foot">
          <span className="demo-project-featured-cats">
            {p.categories.map((c: ProjectCategory) => (
              <span key={c} className={`demo-cat-pill demo-cat-pill--${c}`}>
                {pickText(projectCategoryLabel[c], zh)}
              </span>
            ))}
          </span>
          <span className="demo-project-featured-go" aria-hidden>
            →
          </span>
        </div>
      </Link>
    </li>
  );
}

function ProjectTableRow({
  project: p,
  zh,
  featured = false,
}: {
  project: DemoAboutProject;
  zh: boolean;
  featured?: boolean;
}) {
  const clickable = p.hasDetailPage !== false;
  const rowClass = `demo-project-table-row${featured ? " demo-project-table-row--featured" : ""}`;
  const inner = (
    <>
      <span className="demo-project-table-name">{pickText(p.title, zh)}</span>
      <span className="demo-project-table-desc">{pickText(p.tagline, zh)}</span>
      <span className="demo-project-table-cats">
        {p.categories.map((c: ProjectCategory) => (
          <span key={c} className={`demo-cat-pill demo-cat-pill--${c}`}>
            {pickText(projectCategoryLabel[c], zh)}
          </span>
        ))}
      </span>
      <span className="demo-project-table-status">
        <DemoStatusTag tone={p.status}>{pickText(projectStatusLabel[p.status], zh)}</DemoStatusTag>
      </span>
    </>
  );

  if (!clickable) {
    return (
      <li>
        <div className={`${rowClass} demo-project-table-row--static`}>{inner}</div>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={`/projects/${p.slug}`}
        className={`${rowClass} demo-project-table-row--link tap-target`}
      >
        <span className="demo-project-table-name">
          {pickText(p.title, zh)}
          <span className="demo-project-table-go" aria-hidden>
            →
          </span>
        </span>
        <span className="demo-project-table-desc">{pickText(p.tagline, zh)}</span>
        <span className="demo-project-table-cats">
          {p.categories.map((c: ProjectCategory) => (
            <span key={c} className={`demo-cat-pill demo-cat-pill--${c}`}>
              {pickText(projectCategoryLabel[c], zh)}
            </span>
          ))}
        </span>
        <span className="demo-project-table-status">
          <DemoStatusTag tone={p.status}>{pickText(projectStatusLabel[p.status], zh)}</DemoStatusTag>
        </span>
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
      {open ? (
        <div className="demo-work-body">
          <ul className="demo-work-bullets">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}
