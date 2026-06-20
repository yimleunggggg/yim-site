import type { Metadata } from "next";
import Link from "next/link";
import { DemoWritingIndex } from "@/components/demo/DemoWritingIndex";
import { getAllDemoWriting } from "@/lib/demo/demo-content";
import { demoWritingIntro } from "@/lib/demo/demo-data";

export const metadata: Metadata = {
  title: "Writing",
  description: demoWritingIntro.zh,
};

export default function WritingIndexPage() {
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

  return (
    <div className="site-shell py-10 sm:py-14">
      <Link href="/life#writing" className="text-sm text-[var(--color-forest)] hover:underline">
        ← Life Archive
      </Link>
      <header className="mt-6 max-w-2xl">
        <p className="font-mono-index text-[var(--color-forest)]">WRITING</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
          写作
        </h1>
        <p className="mt-3 text-base text-[var(--color-ink-muted)]">{demoWritingIntro.zh}</p>
      </header>
      <div className="mt-10 max-w-3xl">
        <DemoWritingIndex writings={writings} />
      </div>
    </div>
  );
}
