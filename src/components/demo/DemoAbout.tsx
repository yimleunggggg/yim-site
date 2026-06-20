"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components";
import {
  demoAbout,
  demoWork,
  demoAboutProjects,
  projectStatusLabel,
  projectCategoryLabel,
  pickText,
  type DemoAboutProject,
  type DemoWork,
  type ProjectCategory,
} from "@/lib/demo/demo-data";
import { DemoSectionHeading, DemoStatusTag } from "./DemoPrimitives";

export function DemoAbout() {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const aboutTags = zh ? demoAbout.tags.zh : demoAbout.tags.en;

  return (
    <>
      <section className="site-shell pt-12 pb-10 sm:pt-16">
        <p className="demo-eyebrow">ABOUT</p>
        <h1 className="demo-about-title mt-5">
          {zh ? "梁言 · 一个持续在动的人" : "Yim · always in motion"}
        </h1>
        <div className="demo-about-intro mt-5 max-w-2xl">
          {demoAbout.intro.map((p, i) => (
            <p key={i}>{pickText(p, zh)}</p>
          ))}
        </div>
        <div className="demo-about-tags mt-6">
          {aboutTags.map((t) => (
            <span key={t} className="demo-about-tag">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="site-shell py-10 sm:py-14">
        <DemoSectionHeading eyebrow="WORK" title={zh ? "工作履历" : "Experience"} />
        <ul className="demo-work-list mt-7">
          {demoWork.map((w) => (
            <WorkRow key={w.id} work={w} zh={zh} />
          ))}
        </ul>
      </section>

      <section id="projects" className="site-shell scroll-mt-20 py-10 sm:py-14">
        <DemoSectionHeading eyebrow="PROJECTS" title={zh ? "项目" : "Projects"} />
        <ul className="demo-project-list mt-7">
          {demoAboutProjects.map((p) => (
            <ProjectRow key={pickText(p.title, zh)} project={p} zh={zh} />
          ))}
        </ul>
      </section>
    </>
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
        <span className="demo-work-summary">
          <span className="demo-work-company">{pickText(work.company, zh)}</span>
          <span className="demo-work-role">{pickText(work.role, zh)}</span>
          <span className="demo-work-meta">
            {work.period} · {pickText(work.location, zh)}
          </span>
        </span>
        <span className={`demo-work-chevron ${open ? "is-open" : ""}`} aria-hidden>
          ⌄
        </span>
      </button>
      {open ? (
        <div className="demo-work-body">
          <div className="demo-work-tags">
            {tags.map((tag) => (
              <span key={tag} className="demo-work-tag">
                {tag}
              </span>
            ))}
          </div>
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

function ProjectRow({ project, zh }: { project: DemoAboutProject; zh: boolean }) {
  const [open, setOpen] = useState(false);
  const hasExpand = Boolean(project.desc);
  const statusLabel = projectStatusLabel[project.status];

  return (
    <li className="demo-project-item">
      <div className="demo-project-row">
        {hasExpand ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="demo-project-trigger tap-target"
          >
            <ProjectSummary project={project} zh={zh} statusLabel={statusLabel} />
            <span className={`demo-work-chevron ${open ? "is-open" : ""}`} aria-hidden>
              ⌄
            </span>
          </button>
        ) : (
          <div className="demo-project-trigger demo-project-trigger--static">
            <ProjectSummary project={project} zh={zh} statusLabel={statusLabel} />
          </div>
        )}
      </div>
      {open && project.desc ? (
        <div className="demo-project-body">
          <p className="demo-project-desc">{pickText(project.desc, zh)}</p>
          <div className="demo-project-actions">
            {project.slug ? (
              <Link href={`/projects/${project.slug}`} className="demo-text-link">
                {zh ? "查看详情 →" : "View detail →"}
              </Link>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-text-link"
              >
                {zh ? "访问链接 →" : "Visit site →"}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </li>
  );
}

function ProjectSummary({
  project,
  zh,
  statusLabel,
}: {
  project: DemoAboutProject;
  zh: boolean;
  statusLabel: { zh: string; en?: string };
}) {
  return (
    <span className="demo-project-summary">
      <span className="demo-project-head">
        <span className="demo-work-company">{pickText(project.title, zh)}</span>
        <DemoStatusTag tone={project.status}>{pickText(statusLabel, zh)}</DemoStatusTag>
      </span>
      <span className="demo-project-cats">
        {project.categories.map((c: ProjectCategory) => (
          <span key={c} className="demo-project-cat">
            {pickText(projectCategoryLabel[c], zh)}
          </span>
        ))}
      </span>
      <span className="demo-project-tagline">{pickText(project.tagline, zh)}</span>
    </span>
  );
}
