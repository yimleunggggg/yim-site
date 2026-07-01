import type { Metadata } from "next";
import { DemoFrames } from "@/components/demo/DemoFrames";
import { getAllFrames } from "@/lib/demo/demo-frames";

export const metadata: Metadata = {
  title: "FRAMES",
  description: "摄影与旅行照片合集",
};

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

  return <DemoFrames frames={frames} />;
}
