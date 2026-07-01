"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components";
import {
  demoAbout,
  demoWork,
  getSortedAboutProjects,
  projectStatusLabel,
  projectCategoryLabel,
  pickText,
  type DemoWork,
  type ProjectCategory,
  type DemoAboutProject,
} from "@/lib/demo/demo-data";
import { DemoPageHeader, DemoSectionHeading, DemoStatusTag } from "./DemoPrimitives";

export function DemoAbout() {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const aboutTags = zh ? demoAbout.tags.zh : demoAbout.tags.en;

  return (
    <>
      <header className="site-shell demo-page-shell">
        <DemoPageHeader
          eyebrow="ABOUT"
          title={zh ? "梁言 · 一个持续在动的人" : "Yim · always in motion"}
        >
          <div className="demo-page-lead demo-page-lead-stack">
            {demoAbout.intro.map((p, i) => (
              <p key={i}>{pickText(p, zh)}</p>
            ))}
          </div>
        </DemoPageHeader>
        <div className="demo-about-tags demo-page-content">
          {aboutTags.map((t) => (
            <span key={t} className="demo-about-tag">
              {t}
            </span>
          ))}
        </div>
      </header>

      <section className="site-shell demo-page-section">
        <DemoSectionHeading eyebrow="WORK" title={zh ? "工作履历" : "Experience"} />
        <ul className="demo-work-list demo-page-content">
          {demoWork.map((w) => (
            <WorkRow key={w.id} work={w} zh={zh} />
          ))}
        </ul>
      </section>

      <section id="projects" className="site-shell demo-page-section scroll-mt-20">
        <DemoSectionHeading eyebrow="PROJECTS" title={zh ? "项目" : "Projects"} />
        <div className="demo-project-table demo-page-content">
          <div className="demo-project-table-head" aria-hidden>
            <span>{zh ? "名称" : "Name"}</span>
            <span>{zh ? "简介" : "About"}</span>
            <span>{zh ? "分类" : "Tags"}</span>
            <span>{zh ? "状态" : "Status"}</span>
          </div>
          <ul className="demo-project-table-body">
            {getSortedAboutProjects().map((p) => (
              <ProjectTableRow key={p.slug} project={p} zh={zh} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ProjectTableRow({ project: p, zh }: { project: DemoAboutProject; zh: boolean }) {
  const clickable = p.hasDetailPage !== false;
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
        <div className="demo-project-table-row demo-project-table-row--static">{inner}</div>
      </li>
    );
  }

  return (
    <li>
      <Link href={`/projects/${p.slug}`} className="demo-project-table-row tap-target">
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
    <li className="demo-work-item">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="demo-work-trigger tap-target"
      >
        <span className="demo-work-head">
          <span className="demo-work-line">
            <span className="demo-work-company">{pickText(work.company, zh)}</span>
            <span className="demo-work-sep" aria-hidden>
              ·
            </span>
            <span className="demo-work-role">{pickText(work.role, zh)}</span>
            <span className="demo-work-sep demo-work-sep--meta" aria-hidden>
              ·
            </span>
            <span className="demo-work-meta">
              {work.period} · {pickText(work.location, zh)}
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
