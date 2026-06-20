"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components";
import type { LText } from "@/lib/demo/demo-data";
import { pickText } from "@/lib/demo/demo-data";

const NAV: { href: string; label: LText; shortLabel?: LText; match?: (p: string) => boolean }[] = [
  {
    href: "/",
    label: { zh: "HOME", en: "HOME" },
    match: (p) => p === "/",
  },
  { href: "/about", label: { zh: "ABOUT", en: "ABOUT" } },
  {
    href: "/life",
    label: { zh: "LIFE ARCHIVE", en: "LIFE ARCHIVE" },
    shortLabel: { zh: "LIFE", en: "LIFE" },
  },
  { href: "/frames", label: { zh: "FRAMES", en: "FRAMES" } },
];

export function DemoHeader() {
  const { toggle, locale } = useLocale();
  const pathname = usePathname();
  const zh = locale === "zh";

  return (
    <header className="demo-header no-print sticky top-0 z-40 pt-[env(safe-area-inset-top)]">
      <div className="site-shell demo-header-inner">
        <Link href="/" className="demo-logo tap-target">
          Yim
        </Link>

        <nav className="demo-header-nav" aria-label="Main">
          {NAV.map((link) => {
            const active = link.match ? link.match(pathname) : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`demo-nav-item tap-target ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className="demo-nav-item-long">{pickText(link.label, zh)}</span>
                <span className="demo-nav-item-short">{pickText(link.shortLabel ?? link.label, zh)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="demo-header-actions">
          <button
            type="button"
            onClick={toggle}
            className="demo-nav-item demo-nav-item--ghost tap-target"
            aria-label="Switch language"
          >
            {zh ? "EN" : "中"}
          </button>
        </div>
      </div>
    </header>
  );
}
