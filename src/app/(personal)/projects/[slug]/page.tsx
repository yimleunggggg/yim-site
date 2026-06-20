import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MdxContent } from "@/lib/mdx";
import { DemoCover, DemoStatusTag } from "@/components/demo/DemoPrimitives";
import { demoProjects, pickText } from "@/lib/demo/demo-data";
import { getDemoProjectBody, getAllDemoWriting } from "@/lib/demo/demo-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demoProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = demoProjects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: pickText(p.title, true), description: pickText(p.tagline, true) };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = demoProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const body = getDemoProjectBody(slug);
  const derived =
    slug === "ai-training" ? getAllDemoWriting().filter((w) => w.tags.includes("AI教程")) : [];

  return (
    <article className="pb-10 sm:pb-14">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-callout)] sm:aspect-[21/9]">
        <DemoCover
          src={project.cover}
          gradient={project.gradient}
          alt={pickText(project.title, true)}
          label={!project.cover ? pickText(project.title, true) : undefined}
          sizes="100vw"
          priority
        />
      </div>

      <div className="site-shell">
        <div className="mx-auto max-w-[680px]">
          <div className="pt-6">
            <Link href="/about#projects" className="text-sm text-[var(--color-forest)] hover:underline">
              ← Projects
            </Link>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-[var(--color-ink)] sm:text-4xl">
            {pickText(project.title, true)}
          </h1>
          <p className="mt-3 text-lg text-[var(--color-ink-muted)]">{pickText(project.tagline, true)}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-xs text-[var(--color-ink-muted)]">
              {pickText(project.type, true)}
            </span>
            <DemoStatusTag tone={project.statusTone}>{pickText(project.status, true)}</DemoStatusTag>
            <span className="font-mono text-xs text-[var(--color-ink-muted)]">{project.period}</span>
          </div>

          {(project.liveUrl && project.liveUrl !== "#") || project.githubUrl ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-target inline-flex items-center rounded-full bg-[var(--color-forest)] px-5 text-sm font-medium text-white"
                >
                  访问网站 →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-target inline-flex items-center rounded-full border border-[var(--color-border)] px-5 text-sm text-[var(--color-ink)] hover:border-[var(--color-forest)]"
                >
                  GitHub
                </a>
              )}
            </div>
          ) : null}

          {body && (
            <div className="prose-playbook demo-article mt-10 max-w-none">
              <MdxContent source={body} />
            </div>
          )}

          {derived.length > 0 && (
            <div className="mt-12 border-t border-[var(--color-border)] pt-8">
              <p className="font-mono-index text-[var(--color-ink-muted)]">相关内容</p>
              <ul className="mt-4 space-y-3">
                {derived.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/writing/${d.slug}`}
                      className="group flex items-baseline justify-between gap-3"
                    >
                      <span className="font-serif text-base font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-forest)]">
                        {d.title}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-[var(--color-ink-muted)]">
                        {d.readingMinutes} min
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
