import { pickText } from "@/lib/demo/demo-data";
import type { LifeSportEntry } from "@/lib/demo/demo-life-sport";
import {
  buildEditorialLayout,
  splitArticleBody,
} from "@/lib/demo/life-article-layout";
import { DemoSiteTrail } from "./DemoSiteTrail";
import { LifeArticleBody } from "./LifeArticleBody";

export function LifeSportArticle({
  entry,
  zh = true,
}: {
  entry: LifeSportEntry;
  zh?: boolean;
}) {
  const title = pickText(entry.title, zh);
  const location = entry.location ? pickText(entry.location, zh) : null;
  const bodyRaw = entry.body ? pickText(entry.body, zh) : "";
  const paragraphs = splitArticleBody(bodyRaw);
  const images = entry.images ?? [];
  const blocks = buildEditorialLayout(paragraphs, images);

  return (
    <article className="site-shell py-10 sm:py-14">
        <DemoSiteTrail
          items={[
            { label: "Home", href: "/" },
            { label: zh ? "Life Archive" : "Life Archive", href: "/life#sport" },
            { label: title },
          ]}
        />

        <header className="mt-6 border-b border-[var(--color-border)] pb-6">
          <h1 className="font-serif text-3xl font-bold leading-tight text-[var(--color-ink)] sm:text-4xl">
            {title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[var(--color-ink-muted)]">
            <time>{entry.date}</time>
            {location ? (
              <>
                <span>·</span>
                <span>{location}</span>
              </>
            ) : null}
            {entry.keywords.length > 0 ? (
              <>
                <span>·</span>
                <span>{entry.keywords.join(" / ")}</span>
              </>
            ) : null}
          </div>
        </header>

        <LifeArticleBody blocks={blocks} />
    </article>
  );
}
