"use client";

import Link from "next/link";
import { SiteFooter, SiteHeader, useLocale } from "@/components";

const projectSeeds = {
  zh: [
    {
      title: "AI Playbook 公开讲义",
      desc: "把部门 AI 培训体系整理成公开可读内容，持续补充案例和工具时效信息。",
      href: "/ai",
      status: "持续更新",
    },
    {
      title: "生活实验（多图多视频）",
      desc: "旅行、运动、冥想等长期项目，将逐步上线图文与视频案例。",
      href: "/about",
      status: "筹备中",
    },
  ],
  en: [
    {
      title: "AI Playbook (Public Training Notes)",
      desc: "A public, structured version of internal AI training with ongoing updates.",
      href: "/ai",
      status: "Active",
    },
    {
      title: "Life Experiments (Photo/Video)",
      desc: "Travel, sports, and mindfulness projects with visual storytelling.",
      href: "/about",
      status: "In planning",
    },
  ],
};

export default function ProjectsPage() {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const projects = projectSeeds[locale];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="font-mono-index text-[var(--color-terracotta)]">PROJECTS</p>
        <h1 className="mt-3 font-serif text-4xl font-bold">
          {zh ? "项目与案例" : "Projects & Cases"}
        </h1>
        <p className="mt-4 text-[var(--color-ink-muted)]">
          {zh
            ? "这里是可长期扩展的项目页骨架。后续你只需替换项目数据，不用改页面结构。"
            : "A long-term scalable skeleton for your projects and case studies."}
        </p>

        <section className="mt-8 space-y-4">
          {projects.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-5 hover:border-[var(--color-forest)]"
            >
              <p className="font-serif text-xl font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{item.desc}</p>
              <p className="mt-3 text-xs text-[var(--color-terracotta)]">{item.status}</p>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

