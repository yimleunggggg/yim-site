"use client";

import { pickText } from "@/lib/demo/demo-data";
import type { DemoProjectMeta } from "@/lib/demo/demo-project-meta";
import { demoUiCopy } from "@/lib/demo/demo-ui-copy";
import { useLocale } from "@/components";

export function ProjectMetaPanels({ meta }: { meta: DemoProjectMeta }) {
  const { locale } = useLocale();
  const zh = locale === "zh";

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
    </div>
  );
}
