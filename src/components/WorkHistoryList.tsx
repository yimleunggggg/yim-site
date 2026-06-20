import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { workHistory } from "@/lib/about-data";

type Props = {
  locale: Locale;
  zh: boolean;
  resumeLink?: boolean;
};

export function WorkHistoryList({ locale, zh, resumeLink = true }: Props) {
  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        {workHistory.map((job) => (
          <article
            key={job.period + job.org.zh}
            className="card-surface group grid gap-4 rounded-md p-5 transition-all hover:border-l-4 hover:border-l-[var(--color-forest)] sm:p-6 md:grid-cols-[11rem_1fr] md:gap-6 lg:grid-cols-[12.5rem_1fr]"
          >
            <div className="md:border-r md:border-[var(--color-border)] md:pr-5 lg:pr-6">
              <p className="font-mono text-xs text-[var(--color-terracotta)]">{job.period}</p>
              <p className="mt-2 font-semibold leading-snug">{job.role[locale]}</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                {job.org[locale]}
              </p>
            </div>
            <ul className="space-y-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              {job.highlights[locale].map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-forest)]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {resumeLink ? (
        <p className="mt-6 text-sm">
          <Link href="/resume" className="text-[var(--color-forest)] underline underline-offset-2">
            {zh ? "PDF 简历" : "PDF resume"}
          </Link>
        </p>
      ) : null}
    </>
  );
}
