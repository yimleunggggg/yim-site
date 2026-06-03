import Link from "next/link";
import type { Chapter } from "@/lib/content";

type Props = {
  prev: Chapter | null;
  next: Chapter | null;
};

export function ChapterNav({ prev, next }: Props) {
  return (
    <nav className="mt-16 flex flex-col gap-6 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:justify-between">
      {prev ? (
        <Link
          href={`/ai-playbook/${prev.slug}`}
          className="group max-w-sm"
        >
          <span className="font-mono-index text-[var(--color-ink-muted)]">
            ← 上一章
          </span>
          <p className="mt-1 font-serif text-lg group-hover:text-[var(--color-forest)]">
            {prev.title}
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)] opacity-0 transition-opacity group-hover:opacity-100">
            {prev.summary}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/ai-playbook/${next.slug}`}
          className="group max-w-sm text-right sm:ml-auto"
        >
          <span className="font-mono-index text-[var(--color-ink-muted)]">
            下一章 →
          </span>
          <p className="mt-1 font-serif text-lg group-hover:text-[var(--color-forest)]">
            {next.title}
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)] opacity-0 transition-opacity group-hover:opacity-100">
            {next.summary}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}
