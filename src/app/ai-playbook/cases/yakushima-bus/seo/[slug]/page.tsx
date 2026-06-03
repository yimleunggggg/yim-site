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

const SERIES: GuideSeries = "seo";
const BASE = "/ai-playbook/cases/yakushima-bus/seo";

export async function generateStaticParams() {
  return getAllGuideSlugs(SERIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(SERIES, slug);
  if (!guide) return {};
  return {
    title: `${guide.title} · 屋久岛 SEO`,
    description: "同项目的 SEO 自动化复盘",
  };
}

export default async function YakushimaSeoPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(SERIES, slug);
  if (!guide) notFound();

  return (
    <GuideReaderShell
      series={SERIES}
      seriesTitle={{ zh: "SEO 自动化", en: "SEO automation" }}
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
