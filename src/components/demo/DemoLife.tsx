"use client";

import Link from "next/link";
import { demoLifeHeader, demoLifeJournalIntro, pickText } from "@/lib/demo/demo-data";
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

      <section className="site-shell demo-page-section life-index-section" id="journal">
        <DemoSectionHeading
          eyebrow="JOURNAL"
          title={zh ? "日记" : "Journal"}
          subtitle={pickText(demoLifeJournalIntro, zh)}
        />
        <ul className="life-dispatch-feed demo-page-content">
          {demoLifeJournal.map((entry) => {
            const title = pickText(entry.title, zh);
            const location = entry.location ? pickText(entry.location, zh) : null;

            return (
              <li key={entry.id}>
                <Link
                  href={`/life/journal/${entry.id}`}
                  className="life-dispatch-card life-dispatch-link tap-target"
                  aria-label={title}
                >
                  <div className="life-dispatch-card-head">
                    <div className="life-dispatch-meta">
                      <time dateTime={entry.date}>{entry.date}</time>
                      {location ? (
                        <span className="life-dispatch-date-loc">{location}</span>
                      ) : null}
                    </div>
                    <span className="life-dispatch-arrow" aria-hidden>
                      →
                    </span>
                  </div>
                  <h3 className="life-dispatch-title">{title}</h3>
                  {entry.oneLine ? (
                    <p className="life-dispatch-oneline">
                      {pickText(entry.oneLine, zh)}
                    </p>
                  ) : null}
                  {entry.tags.length > 0 ? (
                    <div className="life-dispatch-tags">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="life-tag life-tag--meta">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section-band demo-page-section" id="sport">
        <div className="site-shell life-index-section">
          <DemoSectionHeading
            eyebrow="MOVEMENT"
            title={zh ? "运动探索" : "Movement"}
            subtitle={pickText(demoLifeSportIntro, zh)}
          />
          <div className="demo-page-content">
            <LifeSportGallery entries={demoLifeSport} zh={zh} />
          </div>
        </div>
      </section>
    </div>
  );
}
