import Link from "next/link";
import type { Chapter } from "@/lib/content";
import { GitHubSourceLink } from "@/components/GitHubSourceLink";

type Props = {
  chapters: Chapter[];
  currentSlug?: string;
};

export function PlaybookSidebar({ chapters, currentSlug }: Props) {
  const core = chapters.filter((c) => c.section === "core");
  const appendix = chapters.filter((c) => c.section === "appendix");

  return (
    <aside className="no-print w-full shrink-0 lg:w-56">
      <Link
        href="/ai-playbook"
        className="font-mono text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-forest)]"
      >
        ← 目录
      </Link>

      <p className="font-mono-index mt-6 text-[var(--color-forest)]">章节</p>
      <nav className="mt-2 space-y-0.5">
        {core.map((ch) => (
          <Link
            key={ch.slug}
            href={`/ai-playbook/${ch.slug}`}
            className={`block rounded-sm px-2 py-1.5 text-sm leading-snug transition-colors ${
              ch.slug === currentSlug
                ? "bg-[var(--color-callout)] font-medium text-[var(--color-forest)]"
                : "text-[var(--color-ink-muted)] hover:text-[var(--color-forest)]"
            }`}
          >
            <span className="font-mono text-[10px] opacity-70">{ch.chapterId}</span>
            <span className="ml-1">{ch.title.replace(/^W\d+\s*·\s*/, "")}</span>
          </Link>
        ))}
      </nav>

      {appendix.length > 0 && (
        <>
          <p className="font-mono-index mt-6 text-[var(--color-ink-muted)]">附录</p>
          <nav className="mt-2 space-y-0.5">
            {appendix.map((ch) => (
              <Link
                key={ch.slug}
                href={`/ai-playbook/${ch.slug}`}
                className={`block rounded-sm px-2 py-1.5 text-sm transition-colors ${
                  ch.slug === currentSlug
                    ? "bg-[var(--color-callout)] font-medium text-[var(--color-forest)]"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-forest)]"
                }`}
              >
                {ch.title}
              </Link>
            ))}
          </nav>
        </>
      )}

      <div className="mt-8 border-t border-[var(--color-border)] pt-4 text-xs">
        <GitHubSourceLink className="text-xs" />
      </div>
    </aside>
  );
}
