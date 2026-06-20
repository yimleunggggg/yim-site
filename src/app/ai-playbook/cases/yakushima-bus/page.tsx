import Link from "next/link";
import { SiteHeader, SiteFooter, GitHubSourceLink } from "@/components";
import { projectCases } from "@/lib/site-data";

export default function YakushimaCasePage() {
  const c = projectCases[0];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="font-mono-index text-[var(--color-terracotta)]">
          AI Playbook / Project Case
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold">{c.title.zh}</h1>
        <p className="mt-2 text-sm text-[var(--color-terracotta)]">{c.status.zh}</p>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-ink-muted)]">
          {c.tagline.zh}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {c.liveUrl && (
            <a
              href={c.liveUrl}
              className="rounded-sm bg-[var(--color-forest)] px-4 py-2 text-sm text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              案例站 ↗
            </a>
          )}
          {c.githubUrl && (
            <a
              href={c.githubUrl}
              className="rounded-sm border border-[var(--color-border)] px-4 py-2 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          )}
        </div>

        <section className="mt-10">
          <h2 className="font-mono-index text-[var(--color-forest)]">预览视频</h2>
          {c.videoUrl ? (
            <div className="mt-4 aspect-video overflow-hidden rounded-md border border-[var(--color-border)]">
              <iframe
                src={c.videoUrl}
                className="h-full w-full"
                allowFullScreen
                title="项目预览"
              />
            </div>
          ) : (
            <div className="mt-4 flex aspect-video items-center justify-center rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-callout)] font-mono text-sm text-[var(--color-ink-muted)]">
              视频 URL 待填入 site-data.ts → videoUrl
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="font-mono-index text-[var(--color-forest)]">
            基于这个项目写的
          </h2>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
            Vibe Coding 与 SEO 是同一个 bus 项目的复盘，不是独立「教程站」。
          </p>
          <ul className="mt-4 space-y-3">
            {(c.derivedDocs ?? []).map((doc) => (
              <li key={doc.href}>
                <Link
                  href={doc.href}
                  className="block rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-5 hover:border-l-4 hover:border-l-[var(--color-forest)]"
                >
                  <p className="font-serif text-lg font-semibold">{doc.label.zh}</p>
                  <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{doc.desc.zh}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-8">
          <Link href="/work" className="text-sm text-[var(--color-forest)] hover:underline">
            ← 返回项目
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
