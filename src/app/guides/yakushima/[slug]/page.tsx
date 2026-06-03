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

export async function generateStaticParams() {
  return getAllGuideSlugs(SERIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(SERIES, slug);
  if (!guide) return {};
  const meta = getSeriesMeta(SERIES);
  return {
    title: `${guide.title} · ${meta.title.zh}`,
    description: meta.description.zh,
  };
}

export default async function YakushimaGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(SERIES, slug);
  if (!guide) notFound();

  const meta = getSeriesMeta(SERIES);

  return (
    <GuideReaderShell
      series={SERIES}
      seriesTitle={meta.title}
      chapters={guide.chapters}
      currentSlug={slug}
      title={guide.title}
      prev={guide.prev}
      next={guide.next}
      breadcrumbHref="/guides"
      breadcrumbLabel="Guides"
    >
      <MdxContent source={guide.content} />
    </GuideReaderShell>
  );
}
