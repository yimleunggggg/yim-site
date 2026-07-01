"use client";

import { useLocale } from "@/components";
import { demoProfile, demoFooterUi, pickText } from "@/lib/demo/demo-data";

export function DemoFooter() {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const instagram = demoProfile.socials.find((s) => s.label === "Instagram");
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="demo-footer">
      <div className="site-shell">
        <p className="demo-eyebrow">{pickText(demoFooterUi.sectionEyebrow, zh)}</p>
        <blockquote className="demo-footer-quote mt-6">
          <span>{pickText(demoFooterUi.markLine1, zh)}</span>
          <br />
          <em>{pickText(demoFooterUi.markLine2, zh)}</em>
        </blockquote>

        <div className="demo-footer-links mt-8">
          <a
            href={`mailto:${demoProfile.email}`}
            className="demo-footer-link"
            aria-label={pickText(demoFooterUi.emailLabel, zh)}
          >
            <MailIcon />
            <span>{demoProfile.email}</span>
          </a>
          {instagram ? (
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-footer-link demo-footer-link--icon"
              aria-label={`Instagram ${instagram.handle ?? ""}`.trim()}
            >
              <InstagramIcon />
            </a>
          ) : null}
        </div>

        <p className="demo-footer-meta mt-10">
          © {year} {pickText(demoProfile.name, zh)}
        </p>
      </div>
    </footer>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 7.5 12 13l8-5.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="6" width="16" height="12" rx="1.5" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
