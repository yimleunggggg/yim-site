import Link from "next/link";
import { SiteHeader, SiteFooter, GitHubSourceLink } from "@/components";
import { PlaybookSidebar } from "@/components/PlaybookSidebar";
import { getAllChapters } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { projectCases } from "@/lib/site-data";
import { TimeBadge } from "@/components/TimeBadge";

export default function AiPlaybookHome() {
  const chapters = getAllChapters();
  const coreChapters = chapters.filter((c) => c.section === "core");
  const appendix = chapters.filter((c) => c.section === "appendix");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="lg:flex lg:gap-12">
          <PlaybookSidebar chapters={chapters} />

          <div className="min-w-0 flex-1">
            <header className="border-b border-[var(--color-border)] pb-8">
              <p className="font-mono-index text-[var(--color-forest)]">
                {siteConfig.subtitle}
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">
                AI Playbook
              </h1>

              <div className="prose-playbook mt-6 max-w-none text-[var(--color-ink-muted)]">
                <p>
                  这里放两类东西：<strong className="text-[var(--color-ink)]">部门 AIGC 内训</strong>（2024–2025 给同事讲的，跟提示词、多模态、工作流相关）和<strong className="text-[var(--color-ink)]">项目 Cases</strong>（我真做出来的东西，以及基于项目写的复盘文档）。
                </p>
                <p>
                  不是系统课程，是按主题和项目拆开读。工具名会过期，看的是任务怎么拆、怎么验收、怎么复盘。
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <GitHubSourceLink />
                <Link
                  href={`${siteConfig.githubRepoUrl}/blob/main/docs/playbook-editing.md`}
                  className="font-mono text-xs text-[var(--color-ink-muted)] underline hover:text-[var(--color-forest)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  如何自己改内容 / 插图 →
                </Link>
              </div>
            </header>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-semibold">项目 Cases</h2>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                一个项目 = 上线产物 + 预览视频 + 基于同一项目写的文档（Vibe Coding、SEO 等）。
              </p>
              <ul className="mt-5 space-y-4">
                {projectCases.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={c.href}
                      className="group block rounded-sm border border-[var(--color-border)] bg-[var(--color-card)] p-5 hover:border-l-4 hover:border-l-[var(--color-terracotta)]"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono-index text-[var(--color-terracotta)]">CASE</span>
                        <span className="font-mono text-xs text-[var(--color-ink-muted)]">{c.status.zh}</span>
                      </div>
                      <p className="mt-2 font-serif text-xl font-semibold group-hover:text-[var(--color-forest)]">
                        {c.title.zh}
                      </p>
                      <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{c.tagline.zh}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section id="training" className="mt-12 border-t border-[var(--color-border)] pt-10">
              <h2 className="font-serif text-2xl font-semibold">部门 AIGC 内训</h2>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                2024–2025 内部培训整理。{" "}
                <Link href="/ai-playbook/manifesto" className="text-[var(--color-forest)] underline">
                  Manifesto
                </Link>
                {" · "}
                <Link href="/ai-playbook/facilitator" className="text-[var(--color-forest)] underline">
                  设计笔记
                </Link>
              </p>
              <ul className="mt-5 space-y-3">
                {coreChapters.map((ch) => (
                  <li key={ch.slug}>
                    <Link
                      href={`/ai-playbook/${ch.slug}`}
                      className="group block rounded-sm border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 transition-all hover:border-l-4 hover:border-l-[var(--color-forest)]"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono-index">{ch.chapterId}</span>
                        {ch.week != null && (
                          <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                            第 {ch.week} 周
                          </span>
                        )}
                        <TimeBadge variant="original" date={ch.originalDate} mini />
                        <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                          ~{ch.readingMinutes} 分钟
                        </span>
                      </div>
                      <p className="mt-2 font-serif text-lg font-semibold group-hover:text-[var(--color-forest)]">
                        {ch.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                        {ch.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {appendix.length > 0 && (
              <section className="mt-10 border-t border-[var(--color-border)] pt-8">
                <h2 className="font-serif text-xl font-semibold">附录</h2>
                <ul className="mt-4 space-y-2">
                  {appendix.map((ch) => (
                    <li key={ch.slug}>
                      <Link
                        href={`/ai-playbook/${ch.slug}`}
                        className="text-[var(--color-forest)] hover:underline"
                      >
                        {ch.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>
      <SiteFooter note="培训讲义 · 工具名会过期，思路可复用" />
    </>
  );
}
