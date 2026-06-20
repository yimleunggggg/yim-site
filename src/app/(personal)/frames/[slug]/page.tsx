import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DemoFrameDetail } from "@/components/demo/DemoFrameDetail";
import { getFrameBySlug, getFrameSlugs } from "@/lib/demo/demo-frames";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getFrameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const frame = getFrameBySlug(slug);
  if (!frame) return {};
  return { title: `${frame.title.zh} · FRAMES`, description: frame.intro.zh || undefined };
}

export default async function FrameDetailPage({ params }: Props) {
  const { slug } = await params;
  const frame = getFrameBySlug(slug);
  if (!frame) notFound();

  return (
    <DemoFrameDetail
      frame={{
        slug: frame.slug,
        title: frame.title,
        emoji: frame.emoji,
        location: frame.location,
        tags: frame.tags,
        intro: frame.intro,
        images: frame.images,
        imagesFull: frame.imagesFull,
        imageCaptions: frame.imageCaptions,
      }}
    />
  );
}
