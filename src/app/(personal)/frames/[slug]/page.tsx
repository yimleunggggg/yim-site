import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { DemoFrameDetail } from "@/components/demo/DemoFrameDetail";
import { getAdjacentFrames, getFrameBySlug, getFrameSlugs } from "@/lib/demo/demo-frames";
import { buildFrameDetailJsonLd, buildFrameDetailMetadata } from "@/lib/demo/frames-seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getFrameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const frame = getFrameBySlug(slug);
  if (!frame) return {};
  return buildFrameDetailMetadata(frame);
}

export default async function FrameDetailPage({ params }: Props) {
  const { slug } = await params;
  const frame = getFrameBySlug(slug);
  if (!frame) notFound();

  const { prev, next } = getAdjacentFrames(slug);

  return (
    <>
      <JsonLd data={buildFrameDetailJsonLd(frame)} />
      <DemoFrameDetail
        frame={{
          slug: frame.slug,
          title: frame.title,
          location: frame.location,
          tags: frame.tags,
          intro: frame.intro,
          images: frame.images,
          imagesFull: frame.imagesFull,
          imageCaptions: frame.imageCaptions,
          imageSizes: frame.imageSizes,
          ongoing: frame.ongoing,
          prev,
          next,
        }}
      />
    </>
  );
}
