import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LifeJournalArticle } from "@/components/demo/LifeJournalArticle";
import {
  getLifeJournalBySlug,
  getLifeJournalSlugs,
} from "@/lib/demo/demo-life-journal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLifeJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLifeJournalBySlug(slug);
  if (!entry) return {};
  return {
    title: entry.title.zh,
    description: entry.oneLine.zh,
  };
}

export default async function LifeJournalPage({ params }: Props) {
  const { slug } = await params;
  const entry = getLifeJournalBySlug(slug);
  if (!entry) notFound();
  return <LifeJournalArticle entry={entry} />;
}
