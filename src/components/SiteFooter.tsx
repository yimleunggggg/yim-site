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
    <footer className="mt-20 border-t border-[var(--color-border)] bg-[var(--color-callout)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-mono-index text-[var(--color-forest)]">{t.siteTitle}</p>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
            {note ?? t.footer}
          </p>
        </div>
        <div>
          <p className="font-mono-index text-[var(--color-ink-muted)]">
            {zh ? "导航" : "NAVIGATE"}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-[var(--color-forest)]">
              {t.nav.home}
            </Link>
            <Link href="/about" className="hover:text-[var(--color-forest)]">
              {t.nav.about}
            </Link>
            <Link href="/life" className="hover:text-[var(--color-forest)]">
              {t.nav.life}
            </Link>
            <Link href="/resume" className="hover:text-[var(--color-forest)]">
              {t.nav.resume}
            </Link>
            <Link href="/ai-playbook" className="hover:text-[var(--color-forest)]">
              {t.nav.aiPlaybook}
            </Link>
          </div>
        </div>
        <div>
          <p className="font-mono-index text-[var(--color-ink-muted)]">
            {zh ? "更多" : "MORE"}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <GitHubSourceLink className="text-xs" label={zh ? "GitHub 源码" : "GitHub source"} />
            <a
              href={`mailto:${profileConfig.contact.email}`}
              className="hover:text-[var(--color-forest)]"
            >
              {zh ? "邮件联系" : "Email"}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-ink-muted)]">
        © {new Date().getFullYear()} Yim Leung · {zh ? "公开信息最小化展示" : "Minimal public disclosure"}
      </div>
    </footer>
  );
}
