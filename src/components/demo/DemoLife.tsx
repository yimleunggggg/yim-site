"use client";

import Link from "next/link";
import { pickText, demoLifeHeader } from "@/lib/demo/demo-data";
import { demoLifeJournal } from "@/lib/demo/demo-life-journal";
import {
  demoLifeSport,
  demoLifeSportIntro,
} from "@/lib/demo/demo-life-sport";
import { useLocale } from "@/components";
import { DemoCover, DemoPageHeader, DemoSectionHeading } from "./DemoPrimitives";
import { LifeSportGallery } from "./LifeSportGallery";

export function DemoLife() {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <div className="life-page">
      <section className="site-shell pt-12 pb-10 sm:pt-16">
        <DemoPageHeader
          eyebrow="LIFE ARCHIVE"
          title={pickText(demoLifeHeader.title, zh)}
          lead={pickText(demoLifeHeader.tagline, zh)}
        />
      </section>

      <section className="site-shell life-section py-10 sm:py-14" id="journal">
        <DemoSectionHeading
          eyebrow="JOURNAL"
          subtitle={
            zh
              ? "旅行、义工、禅修、随笔——点标题看全文和图。"
              : "Travel, volunteering, retreats, essays — click for full text and photos."
          }
        />
        <ul className="life-dispatch-feed mt-7">
          {demoLifeJournal.map((entry) => (
            <li key={entry.id}>
              <Link
                href={`/life/journal/${entry.id}`}
                className="life-dispatch-row life-dispatch-link tap-target"
              >
                {entry.cover ? (
                  <div className="life-dispatch-thumb">
                    <DemoCover src={entry.cover} alt="" priority={entry.id === demoLifeJournal[0]?.id} />
                  </div>
                ) : (
                  <div className="life-dispatch-thumb life-dispatch-thumb--placeholder" />
                )}
                <div className="life-dispatch-copy">
                  <p className="life-dispatch-meta">
                    <span>{entry.date}</span>
                    {entry.location ? (
                      <>
                        <span aria-hidden> · </span>
                        <span>{pickText(entry.location, zh)}</span>
                      </>
                    ) : null}
                  </p>
                  <h3 className="life-dispatch-title">
                    {pickText(entry.title, zh)}
                  </h3>
                  <p className="life-dispatch-oneline">
                    {pickText(entry.oneLine, zh)}
                  </p>
                  {entry.tags.length > 0 ? (
                    <div className="life-tag-row">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="life-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <span className="life-dispatch-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-band" id="sport">
        <div className="site-shell py-12 sm:py-16">
          <div className="life-section">
            <DemoSectionHeading
              eyebrow="MOVEMENT"
              title={zh ? "运动探索" : "Movement"}
              subtitle={pickText(demoLifeSportIntro, zh)}
            />
          </div>
          <LifeSportGallery entries={demoLifeSport} zh={zh} />
        </div>
      </section>
    </div>
  );
}
