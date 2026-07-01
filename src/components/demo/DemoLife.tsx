"use client";

import Link from "next/link";
import { useState } from "react";
import { demoLifeJournalIntro, pickText } from "@/lib/demo/demo-data";
import { demoLifeJournal } from "@/lib/demo/demo-life-journal";
import {
  demoLifeSport,
  demoLifeSportIntro,
} from "@/lib/demo/demo-life-sport";
import { demoUiCopy } from "@/lib/demo/demo-ui-copy";
import { useLocale } from "@/components";
import { DemoSectionHeading } from "./DemoPrimitives";
import { LifeSportGallery } from "./LifeSportGallery";

const MOBILE_LIST_INITIAL = 3;

export function DemoLife() {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const [journalExpanded, setJournalExpanded] = useState(false);
  const journalCollapsible = demoLifeJournal.length > MOBILE_LIST_INITIAL;

  return (
    <div className="life-page">
      <section className="site-shell demo-page-section life-index-section" id="journal">
        <DemoSectionHeading
          eyebrow="JOURNAL"
          title={zh ? "日记" : "Journal"}
          subtitle={pickText(demoLifeJournalIntro, zh)}
        />
        <ul
          className={`life-dispatch-feed demo-page-content${
            journalCollapsible && !journalExpanded ? " life-dispatch-feed--collapsed" : ""
          }`}
        >
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
        {journalCollapsible ? (
          <button
            type="button"
            className="demo-list-expand-btn"
            aria-expanded={journalExpanded}
            onClick={() => setJournalExpanded((v) => !v)}
          >
            {pickText(journalExpanded ? demoUiCopy.lifePage.showLess : demoUiCopy.lifePage.showAll, zh)}
          </button>
        ) : null}
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
