import { JsonLd } from "@/components/JsonLd";
import { DemoFrames } from "@/components/demo/DemoFrames";
import { getAllFrames } from "@/lib/demo/demo-frames";
import { buildFramesIndexJsonLd, buildFramesIndexMetadata } from "@/lib/demo/frames-seo";

export const metadata = buildFramesIndexMetadata();

export default function FramesPage() {
  const frames = getAllFrames().map((f) => ({
    slug: f.slug,
    title: f.title,
    location: f.location,
    tags: f.tags,
    intro: f.intro,
    cover: f.cover,
    coverWidth: f.coverWidth,
    coverHeight: f.coverHeight,
    coverOrientation: f.coverOrientation,
    count: f.images.length,
    ongoing: f.ongoing,
  }));

  const allFrames = getAllFrames();

  return (
    <>
      <JsonLd data={buildFramesIndexJsonLd(allFrames)} />
      <DemoFrames frames={frames} />
    </>
  );
}
