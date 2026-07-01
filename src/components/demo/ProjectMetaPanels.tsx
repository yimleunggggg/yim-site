"use client";

import { pickText } from "@/lib/demo/demo-data";
import type { DemoProjectMeta, ProjectRelatedLink } from "@/lib/demo/demo-project-meta";
import { demoUiCopy } from "@/lib/demo/demo-ui-copy";
import { useLocale } from "@/components";

export function ProjectMetaPanels({ meta }: { meta: DemoProjectMeta }) {
  const { locale } = useLocale();
  const zh = locale === "zh";

  const relatedKind = (kind: ProjectRelatedLink["kind"]) =>
    pickText(demoUiCopy.projectMeta.relatedKind[kind], zh);

  return (
    <div className="project-meta-panels prose-playbook demo-article editorial-content max-w-none">
      {meta.stack.length > 0 ? (
        <section>
          <h2>{pickText(demoUiCopy.projectMeta.stackOverview, zh)}</h2>
          {meta.stack.map((group) => (
            <div key={group.label.zh} className="project-meta-stack-group">
              <h3>{pickText(group.label, zh)}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.zh}>{pickText(item, zh)}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ) : null}

      {meta.devTools.length > 0 ? (
        <section>
          <h2>{pickText(demoUiCopy.projectMeta.devTools, zh)}</h2>
          <div className="project-meta-pills">
            {meta.devTools.map((tool) => (
              <span key={tool} className="project-meta-pill">
                {tool}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {meta.related && meta.related.length > 0 ? (
        <section>
          <h2>{pickText(demoUiCopy.projectMeta.related, zh)}</h2>
          <ul className="project-related-list">
            {meta.related.map((link) => (
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
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
