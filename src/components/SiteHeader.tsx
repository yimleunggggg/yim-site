"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useLocale } from "./LocaleProvider";

export function SiteHeader() {
  const { t, toggle, locale } = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const zh = locale === "zh";

  const navLinks = [
    { href: "/", label: t.nav.home, match: (p: string) => p === "/" },
    {
      href: "/work",
      label: t.nav.work,
      match: (p: string) => p.startsWith("/work") || p.startsWith("/ai-playbook"),
    },
    { href: "/life", label: t.nav.life, match: (p: string) => p.startsWith("/life") },
    { href: "/blog", label: t.nav.blog, match: (p: string) => p.startsWith("/blog") },
  ];

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-paper)]/95 backdrop-blur-sm pt-[env(safe-area-inset-top)]">
      <div className="site-shell flex items-center justify-between gap-3 py-2.5">
        <Link href="/" className="tap-target shrink-0 font-serif text-lg font-semibold">
          {zh ? "梁言" : "Yim"}
        </Link>

        <nav className="hidden items-center gap-0.5 text-sm lg:flex">
          {navLinks.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-sm px-3 py-2 ${
                  active
                    ? "font-medium text-[var(--color-forest)]"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            className="tap-target rounded-sm px-2 text-xs text-[var(--color-ink-muted)] active:text-[var(--color-forest)]"
            aria-label="Switch language"
          >
            {t.switchLang}
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="tap-target ml-1 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              {menuOpen ? (
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" fill="none" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-[var(--color-border)] bg-[var(--color-card)] px-2 pb-3 lg:hidden">
          {navLinks.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`tap-target flex items-center rounded-sm px-3 text-base ${
                  active ? "font-medium text-[var(--color-forest)]" : "text-[var(--color-ink)]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
