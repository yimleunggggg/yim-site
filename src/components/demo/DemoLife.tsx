"use client";

import Link from "next/link";
import { pickText, demoLifeHeader } from "@/lib/demo/demo-data";
import { demoLifeJournal } from "@/lib/demo/demo-life-journal";
import {
  demoLifeSport,
  demoLifeSportIntro,
} from "@/lib/demo/demo-life-sport";
import { useLocale } from "@/components";
import { DemoCover, DemoSectionHeading } from "./DemoPrimitives";
import { LifeSportGallery } from "./LifeSportGallery";

export function DemoLife() {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <div className="life-page">
      <section className="site-shell life-page-header pt-12 pb-8 sm:pt-16">
        <h1 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
          {pickText(demoLifeHeader.title, zh)}
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--color-ink-muted)] sm:text-lg">
          {pickText(demoLifeHeader.tagline, zh)}
        </p>
      </section>

      <section className="site-shell life-section" id="journal">
        <DemoSectionHeading
          eyebrow="JOURNAL"
          title={zh ? "记录" : "Journal"}
          subtitle={
            zh
              ? "旅行、义工、禅修、随笔——点击进入全文。"
              : "Travel, volunteering, retreats, essays."
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
                    <DemoCover src={entry.cover} alt="" />
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
        <div className="site-shell life-sport-shell py-12 sm:py-16">
          <DemoSectionHeading
            eyebrow="MOVEMENT"
            title={zh ? "运动探索" : "Movement"}
            subtitle={pickText(demoLifeSportIntro, zh)}
          />
          <LifeSportGallery entries={demoLifeSport} zh={zh} />
        </div>
      </section>
    </div>
  );
}
