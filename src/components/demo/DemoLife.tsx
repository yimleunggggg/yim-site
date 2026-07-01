"use client";

import Link from "next/link";
import { pickText, demoLifeHeader } from "@/lib/demo/demo-data";
import { demoLifeJournal } from "@/lib/demo/demo-life-journal";
import {
  demoLifeSport,
  demoLifeSportIntro,
} from "@/lib/demo/demo-life-sport";
import { useLocale } from "@/components";
import { DemoPageHeader, DemoSectionHeading } from "./DemoPrimitives";
import { LifeSportGallery } from "./LifeSportGallery";

export function DemoLife() {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <div className="life-page">
      <header className="site-shell demo-page-shell">
        <DemoPageHeader
          eyebrow="LIFE ARCHIVE"
          title={pickText(demoLifeHeader.title, zh)}
          lead={pickText(demoLifeHeader.tagline, zh)}
        />
      </header>

      <section className="site-shell demo-page-section" id="journal">
        <DemoSectionHeading
          eyebrow="JOURNAL"
          subtitle={
            zh
              ? "旅行、义工、禅修、随笔——点标题进入全文。"
              : "Travel, volunteering, retreats, essays — open an entry to read."
          }
        />
        <ul className="life-dispatch-feed demo-page-content">
          {demoLifeJournal.map((entry) => {
            const title = pickText(entry.title, zh);
            const location = entry.location ? pickText(entry.location, zh) : null;
            const photoCount = entry.images.length;

            return (
              <li key={entry.id}>
                <Link
                  href={`/life/journal/${entry.id}`}
                  className="life-dispatch-row life-dispatch-link tap-target"
                  aria-label={title}
                >
                  <div className="life-dispatch-date">
                    <time dateTime={entry.date}>{entry.date}</time>
                    {location ? (
                      <span className="life-dispatch-date-loc">{location}</span>
                    ) : null}
                  </div>
                  <div className="life-dispatch-copy">
                    <h3 className="life-dispatch-title">{title}</h3>
                    <p className="life-dispatch-oneline">
                      {pickText(entry.oneLine, zh)}
                    </p>
                    {(entry.tags.length > 0 || photoCount > 0) ? (
                      <div className="life-dispatch-foot">
                        {entry.tags.length > 0 ? (
                          <div className="life-tag-row">
                            {entry.tags.map((tag) => (
                              <span key={tag} className="life-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        {photoCount > 0 ? (
                          <span className="life-dispatch-photos">
                            {photoCount} {zh ? "张图" : "photos"}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <span className="life-dispatch-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section-band demo-page-section" id="sport">
        <div className="site-shell">
          <div className="life-section">
            <DemoSectionHeading
              eyebrow="MOVEMENT"
              title={zh ? "运动探索" : "Movement"}
              subtitle={pickText(demoLifeSportIntro, zh)}
              subtitleEmphasis
            />
          </div>
          <div className="demo-page-content">
            <LifeSportGallery entries={demoLifeSport} zh={zh} />
          </div>
        </div>
      </section>
    </div>
  );
}
