import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectPageView } from "@/components/demo/ProjectPageView";
import {
  getAllDemoProjectSlugs,
  getDemoAboutProject,
  getDemoProjectDetail,
  pickText,
} from "@/lib/demo/demo-data";
import { getAllDemoWriting, getDemoProjectBody, getDemoProjectFrontmatter } from "@/lib/demo/demo-content";
import { getDemoProjectMeta } from "@/lib/demo/demo-project-meta";
import { demoProjectBodies } from "@/lib/demo/demo-project-bodies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDemoProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const about = getDemoAboutProject(slug);
  const detail = getDemoProjectDetail(slug);
  const title = about ? pickText(about.title, true) : detail ? pickText(detail.title, true) : "";
  const description = about
    ? pickText(about.tagline, true)
    : detail
      ? pickText(detail.tagline, true)
      : "";
  if (!title) return {};
  return { title, description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const about = getDemoAboutProject(slug);
  if (about?.hasDetailPage === false) notFound();

  const detail = getDemoProjectDetail(slug);
  if (!about && !detail) notFound();

  const fm = getDemoProjectFrontmatter(slug);
  const liveUrl = about?.liveUrl ?? detail?.liveUrl;
  const demoUrl = about?.demoUrl ?? (typeof fm.demoUrl === "string" ? fm.demoUrl : undefined);
  const videoUrl =
    about?.videoUrl ?? (typeof fm.videoUrl === "string" ? fm.videoUrl : undefined);
  const projectMeta = getDemoProjectMeta(slug);
  const derived =
    slug === "ai-training"
      ? getAllDemoWriting()
          .filter((w) => w.tags.includes("AI教程"))
          .map((w) => ({ slug: w.slug, title: w.title, readingMinutes: w.readingMinutes }))
      : [];

  const bodyText = demoProjectBodies[slug] ?? null;
  const mdxBodyZh = bodyText ? null : getDemoProjectBody(slug, "zh");

  return (
    <ProjectPageView
      slug={slug}
      about={about}
      detail={detail}
      bodyText={bodyText}
      mdxBodyZh={mdxBodyZh}
      liveUrl={liveUrl}
      demoUrl={demoUrl}
      videoUrl={videoUrl}
      projectMeta={projectMeta}
      derived={derived}
    />
  );
}
