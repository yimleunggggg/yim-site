import Link from "next/link";
import { pickText } from "@/lib/demo/demo-data";
import type { LifeSportEntry } from "@/lib/demo/demo-life-sport";
import { DemoCover } from "./DemoPrimitives";

export function LifeSportArticle({
  entry,
  zh = true,
}: {
  entry: LifeSportEntry;
  zh?: boolean;
}) {
  const title = pickText(entry.title, zh);
  const location = entry.location ? pickText(entry.location, zh) : null;
  const displaySrc = entry.cover?.replace("cover.jpg", "display.jpg");

  return (
    <article className="site-shell py-10 sm:py-14">
      <div className="mx-auto max-w-[680px]">
        <Link
          href="/life#sport"
          className="text-sm text-[var(--color-forest)] hover:underline"
        >
          ← {zh ? "运动探索" : "Movement"}
        </Link>

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

        {displaySrc ? (
          <div className="life-article-hero mt-8 overflow-hidden rounded-lg bg-[var(--color-callout)]">
            <DemoCover src={displaySrc} alt="" priority />
          </div>
        ) : null}

        {entry.body ? (
          <div className="prose-playbook demo-article mt-8 max-w-none">
            {pickText(entry.body, zh)
              .split("\n\n")
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
