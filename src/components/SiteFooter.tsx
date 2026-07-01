"use client";

import Link from "next/link";
import { GitHubSourceLink } from "./GitHubSourceLink";
import { useLocale } from "./LocaleProvider";
import { profileConfig } from "@/lib/profile-config";

type SiteFooterProps = {
  note?: string;
};

export function SiteFooter({ note }: SiteFooterProps) {
  const { locale, t } = useLocale();
  const zh = locale === "zh";

  return (
    <footer
      id="contact"
      className="mt-10 scroll-mt-24 border-t border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-callout)_88%,var(--color-paper))] md:mt-20"
    >
      <div className="site-shell grid gap-6 py-8 md:grid-cols-2 md:gap-10 md:py-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="font-mono-index text-[var(--color-forest)]">{t.siteTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
            {note ?? t.footer}
          </p>
        </div>

        <div>
          <p className="font-mono-index text-[var(--color-ink-muted)]">
            {zh ? "导航" : "Navigate"}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-[var(--color-forest)]">
              {t.nav.home}
            </Link>
            <Link href="/work" className="hover:text-[var(--color-forest)]">
              {t.nav.work}
            </Link>
            <Link href="/life" className="hover:text-[var(--color-forest)]">
              {t.nav.life}
            </Link>
            <Link href="/blog" className="hover:text-[var(--color-forest)]">
              {t.nav.blog}
            </Link>
            <Link href="/#work-history" className="hover:text-[var(--color-forest)]">
              {zh ? "工作经历" : "Experience"}
            </Link>
          </div>
        </div>

        <div>
          <p className="font-mono-index text-[var(--color-ink-muted)]">
            {zh ? "联系" : "Contact"}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              href={`mailto:${profileConfig.contact.email}`}
              className="text-[var(--color-forest)] hover:underline"
            >
              {profileConfig.contact.email}
            </a>
            <Link href="/resume" className="text-[var(--color-ink-muted)] hover:text-[var(--color-forest)]">
              {zh ? "PDF 简历" : "PDF resume"}
            </Link>
          </div>
        </div>

        <div>
          <p className="font-mono-index text-[var(--color-ink-muted)]">
            {zh ? "更多" : "More"}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <GitHubSourceLink className="text-xs" label={zh ? "GitHub 源码" : "GitHub source"} />
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-ink-muted)]">
        © {new Date().getFullYear()} Yim Leung · {zh ? "公开信息最小化展示" : "Minimal public disclosure"}
      </div>
    </footer>
  );
}
