"use client";

import { useLocale } from "@/components";
import { DemoWritingList } from "./DemoWritingList";
import type { DemoWritingMeta } from "@/lib/demo/demo-content";

export function DemoWritingIndex({ writings }: { writings: DemoWritingMeta[] }) {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return <DemoWritingList writings={writings} zh={zh} />;
}
