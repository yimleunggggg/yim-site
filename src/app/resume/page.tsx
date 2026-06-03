"use client";

import Link from "next/link";
import { SiteFooter, SiteHeader, useLocale } from "@/components";
import { profileConfig } from "@/lib/profile-config";

export default function ResumePage() {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="font-mono-index text-[var(--color-terracotta)]">RESUME</p>
        <h1 className="mt-3 font-serif text-4xl font-bold">
          {zh ? "简历概览" : "Resume Overview"}
        </h1>
        <p className="mt-4 text-[var(--color-ink-muted)]">
          {zh
            ? "这页用于对外快速了解你的职业背景与项目能力。内容保持可持续更新，不写死在页面结构里。"
            : "This page gives a quick overview of your profile for hiring and collaboration. Content is designed to be updated continuously."}
        </p>

        <section className="mt-8 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <p className="font-semibold">{zh ? "下载 PDF 简历" : "Download PDF Resume"}</p>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
            {zh
              ? `当前路径：${profileConfig.resume.pdfPath}（你改完简历后，替换同路径文件即可）`
              : `Current path: ${profileConfig.resume.pdfPath} (replace the file after resume updates).`}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={profileConfig.resume.pdfPath}
              className="rounded-md bg-[var(--color-forest)] px-4 py-2 text-sm text-white hover:opacity-90"
            >
              {zh ? "下载简历 PDF" : "Download PDF"}
            </a>
            <Link
              href="/about"
              className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm hover:border-[var(--color-forest)]"
            >
              {zh ? "查看在线经历版" : "View online profile"}
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <p className="font-semibold">{zh ? "联络方式" : "Contact"}</p>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
            <a
              href={`mailto:${profileConfig.contact.email}`}
              className="hover:text-[var(--color-forest)]"
            >
              {profileConfig.contact.email}
            </a>
          </p>
          <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
            {zh
              ? `最后更新时间：${profileConfig.resume.updatedAt}`
              : `Last updated: ${profileConfig.resume.updatedAt}`}
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

