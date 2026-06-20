import type { Metadata } from "next";
import { DemoLife } from "@/components/demo/DemoLife";
import { getAllDemoWriting } from "@/lib/demo/demo-content";

export const metadata: Metadata = {
  title: "Life Archive",
};

export default function LifePage() {
  const writings = getAllDemoWriting().map((w) => ({
    slug: w.slug,
    title: w.title,
    date: w.date,
    tags: w.tags,
    summary: w.summary,
    readingMinutes: w.readingMinutes,
    isAI: w.isAI,
    toolVersion: w.toolVersion,
    updatedAt: w.updatedAt,
  }));
  return <DemoLife writings={writings} />;
}
