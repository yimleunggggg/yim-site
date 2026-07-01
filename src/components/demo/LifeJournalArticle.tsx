import { pickText } from "@/lib/demo/demo-data";
import type { LifeJournalEntry } from "@/lib/demo/demo-life-journal";
import {
  buildEditorialLayout,
} from "@/lib/demo/life-article-layout";
import { DemoSiteTrail } from "./DemoSiteTrail";
import { LifeArticleBody } from "./LifeArticleBody";

export function LifeJournalArticle({
  entry,
  zh = true,
}: {
  entry: LifeJournalEntry;
  zh?: boolean;
}) {
  const title = pickText(entry.title, zh);
  const location = entry.location ? pickText(entry.location, zh) : null;
  const paragraphs = entry.body.map((p) => pickText(p, zh));
  const blocks =
    entry.flow ??
    buildEditorialLayout(paragraphs, entry.images, {
      imageFirst: entry.imageFirst,
      singleLongImage: entry.imageFirst && entry.images.length === 1,
    });

  return (
    <article className="site-shell py-10 sm:py-14">
        <DemoSiteTrail
          items={[
            { label: "Home", href: "/" },
            { label: "Life Archive", href: "/life#journal" },
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
            {entry.tags.length > 0 ? (
              <>
                <span>·</span>
                <span>{entry.tags.join(" / ")}</span>
              </>
            ) : null}
          </div>
          {entry.oneLine ? (
            <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-muted)]">
              {pickText(entry.oneLine, zh)}
            </p>
          ) : null}
        </header>

        <LifeArticleBody blocks={blocks} />
    </article>
  );
}
