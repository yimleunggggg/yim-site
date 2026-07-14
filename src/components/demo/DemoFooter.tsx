"use client";

import { useLocale } from "@/components";
import { demoProfile, demoFooterUi, pickText } from "@/lib/demo/demo-data";

export function DemoFooter() {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const instagram = demoProfile.socials.find((s) => s.label === "Instagram");
  const xiaohongshu = demoProfile.socials.find((s) => s.label === "小红书");
  const xiaohongshuLabel = zh ? "小红书" : "REDnote";
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

        <nav className="demo-footer-links mt-8" aria-label={zh ? "联系方式" : "Contact links"}>
          <a
            href={`mailto:${demoProfile.email}`}
            className="demo-footer-link"
            aria-label={pickText(demoFooterUi.emailLabel, zh)}
            title={demoProfile.email}
          >
            Email
          </a>
          {instagram ? (
            <>
              <span className="demo-footer-separator" aria-hidden>
                /
              </span>
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-footer-link"
                aria-label={`Instagram ${instagram.handle ?? ""}`.trim()}
                title={`Instagram ${instagram.handle ?? ""}`.trim()}
              >
                Instagram
              </a>
            </>
          ) : null}
          {xiaohongshu ? (
            <>
              <span className="demo-footer-separator" aria-hidden>
                /
              </span>
              <a
                href={xiaohongshu.href}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-footer-link"
                aria-label={`小红书 ${xiaohongshu.handle ?? ""}`.trim()}
                title={`小红书 ${xiaohongshu.handle ?? ""}`.trim()}
              >
                {xiaohongshuLabel}
              </a>
            </>
          ) : null}
        </nav>

        <p className="demo-footer-meta mt-10">
          © {year} {pickText(demoProfile.name, zh)}
        </p>
      </div>
    </footer>
  );
}
