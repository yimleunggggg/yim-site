"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useLocale } from "./LocaleProvider";

export function SiteHeader() {
  const { t, toggle } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: t.nav.about },
    { href: "/ai-playbook", label: t.nav.aiPlaybook },
    { href: "/life", label: t.nav.life },
  ];

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-paper)]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="group shrink-0">
          <span className="font-mono-index block text-[var(--color-forest)]">
            {t.siteTitle}
          </span>
          <span className="hidden font-serif text-xs text-[var(--color-ink-muted)] group-hover:text-[var(--color-forest)] sm:block">
            {t.siteSubtitle}
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[var(--color-forest)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-sm border border-[var(--color-border)] px-2.5 py-1 font-mono text-xs transition-colors hover:border-[var(--color-forest)] hover:text-[var(--color-forest)]"
            aria-label="Switch language"
          >
            {t.switchLang}
          </button>
          <ThemeToggle />
          <button
            className="ml-1 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
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
        <nav className="border-t border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[var(--color-forest)]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
