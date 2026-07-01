"use client";

import { pickText } from "@/lib/demo/demo-data";
import type { ProjectRelatedLink } from "@/lib/demo/demo-project-meta";
import { demoUiCopy } from "@/lib/demo/demo-ui-copy";
import { useLocale } from "@/components";

export function ProjectRelatedLinks({ links }: { links: ProjectRelatedLink[] }) {
  const { locale } = useLocale();
  const zh = locale === "zh";

  if (!links.length) return null;

  const relatedKind = (kind: NonNullable<ProjectRelatedLink["kind"]>) =>
    pickText(demoUiCopy.projectMeta.relatedKind[kind], zh);

  const sectionTitle = links.every((l) => l.kind === "demo" || l.items?.every((i) => i.kind === "demo"))
    ? pickText(demoUiCopy.projectMeta.relatedDemo, zh)
    : pickText(demoUiCopy.projectMeta.related, zh);

  return (
    <section className="project-related-section editorial-content mt-8">
      <h2 className="project-related-section-title">{sectionTitle}</h2>
      <ul className="project-related-list">
        {links.map((link) => {
          if (link.items?.length) {
            return (
              <li key={pickText(link.title, zh)}>
                <div className="project-related-card project-related-card--stacked">
                  <span className="project-related-title">{pickText(link.title, zh)}</span>
                  {link.note ? (
                    <span className="project-related-note">{pickText(link.note, zh)}</span>
                  ) : null}
                  <div className="project-related-actions">
                    {link.items.map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-related-action tap-target"
                      >
                        <span className="project-related-action-label">
                          <span className="project-related-kind">{relatedKind(item.kind)}</span>
                          <span>{pickText(item.title, zh)}</span>
                        </span>
                        <span className="project-related-arrow" aria-hidden>
                          →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            );
          }

          if (!link.url || !link.kind) return null;

          return (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-related-card tap-target"
              >
                <span className="project-related-kind">{relatedKind(link.kind)}</span>
                <span className="project-related-title">{pickText(link.title, zh)}</span>
                {link.note ? (
                  <span className="project-related-note">{pickText(link.note, zh)}</span>
                ) : null}
                <span className="project-related-arrow" aria-hidden>
                  →
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
