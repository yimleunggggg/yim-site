import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LifeSportArticle } from "@/components/demo/LifeSportArticle";
import { getLifeSportById, getLifeSportIds } from "@/lib/demo/demo-life-sport";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getLifeSportIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const entry = getLifeSportById(id);
  if (!entry) return {};
  return { title: entry.title.zh };
}

export default async function LifeSportPage({ params }: Props) {
  const { id } = await params;
  const entry = getLifeSportById(id);
  if (!entry?.body) notFound();
  return <LifeSportArticle entry={entry} />;
}
