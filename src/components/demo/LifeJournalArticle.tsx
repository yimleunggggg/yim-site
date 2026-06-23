import Link from "next/link";
import { pickText } from "@/lib/demo/demo-data";
import type { LifeJournalEntry } from "@/lib/demo/demo-life-journal";

export function LifeJournalArticle({
  entry,
  zh = true,
}: {
  entry: LifeJournalEntry;
  zh?: boolean;
}) {
  const title = pickText(entry.title, zh);
  const location = entry.location ? pickText(entry.location, zh) : null;
  const body = entry.body.map((p) => pickText(p, zh));
  const hasImages = entry.images.length > 0;

  const imageBlock = hasImages ? (
    <div
      className={
        entry.imageFirst ? "life-article-gallery life-article-gallery--tall" : "life-article-gallery"
      }
    >
      {entry.images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={i === 0 ? title : ""}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className="life-article-img"
        />
      ))}
    </div>
  ) : null;

  const textBlock =
    body.length > 0 ? (
      <div className="prose-playbook demo-article mt-8 max-w-none">
        {body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    ) : null;

  return (
    <article className="site-shell py-10 sm:py-14">
      <div className="mx-auto max-w-[680px]">
        <Link
          href="/life#journal"
          className="text-sm text-[var(--color-forest)] hover:underline"
        >
          ← {zh ? "Life Archive" : "Life Archive"}
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

        {entry.imageFirst ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}

        {!hasImages && body.length === 0 ? (
          <p className="mt-8 text-sm text-[var(--color-ink-muted)]">
            {zh ? "正文整理中。" : "Content coming soon."}
          </p>
        ) : null}
      </div>
    </article>
  );
}
