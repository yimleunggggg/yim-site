import { notFound } from "next/navigation";
import {
  getAllGuideSlugs,
  getGuideBySlug,
  getSeriesMeta,
  type GuideSeries,
} from "@/lib/guides-content";
import { MdxContent } from "@/lib/mdx";
import { GuideReaderShell } from "@/components/GuideReaderShell";

type Props = {
  params: Promise<{ slug: string }>;
};

const SERIES: GuideSeries = "yakushima";
const BASE = "/ai-playbook/cases/yakushima-bus/playbook";

export async function generateStaticParams() {
  return getAllGuideSlugs(SERIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(SERIES, slug);
  if (!guide) return {};
  return {
    title: `${guide.title} · 屋久岛公交 Case`,
    description: "Vibe Coding 从 0 到 1",
  };
}

export default async function YakushimaPlaybookPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(SERIES, slug);
  if (!guide) notFound();

  const meta = getSeriesMeta(SERIES);

  return (
    <GuideReaderShell
      series={SERIES}
      seriesTitle={{ zh: "从 0 到 1 上线", en: "Zero to launch" }}
      chapters={guide.chapters}
      currentSlug={slug}
      title={guide.title}
      prev={guide.prev}
      next={guide.next}
      breadcrumbHref="/ai-playbook/cases/yakushima-bus"
      breadcrumbLabel="屋久岛公交 Case"
      basePath={BASE}
    >
      <MdxContent source={guide.content} />
    </GuideReaderShell>
  );
}
