"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components";
import {
  demoHero,
  demoNow,
  demoNowPreviewCount,
  demoExplore,
  demoHomeUi,
  pickText,
  type DemoExploreCard,
} from "@/lib/demo/demo-data";
import { DemoMarquee } from "./DemoMarquee";

export function DemoHome() {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const [nowOpen, setNowOpen] = useState(false);
  const preview = demoNow.slice(0, demoNowPreviewCount);
  const hasMore = demoNow.length > demoNowPreviewCount;

  return (
    <>
      <section className="site-shell demo-hero pt-10 pb-5 sm:pt-14 sm:pb-7">
        <div className="demo-hero-layout">
          <div className="demo-hero-copy">
            <p className="demo-eyebrow">{demoHero.eyebrow}</p>
            <h1 className="demo-hero-title mt-6">
              {demoHero.titleLine1}
              <br />
              <em>{demoHero.titleLine2Italic}</em>
              <br />
              {demoHero.titleLine3}
              <br />
              {demoHero.titleLine4}
            </h1>
          </div>

          <aside className="demo-now-panel">
            <div className="flex items-center justify-between gap-2">
              <p className="demo-eyebrow">NOW</p>
              {hasMore ? (
                <button type="button" onClick={() => setNowOpen(true)} className="demo-text-link">
                  {pickText(demoHomeUi.nowViewAll, zh)}
                </button>
              ) : null}
            </div>
            <ul className="mt-4 space-y-3">
              {preview.map((n, i) => (
                <NowRow key={i} item={n} zh={zh} compact />
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <DemoMarquee />

      <section className="site-shell demo-explore-section pb-20 pt-10 sm:pt-14 sm:pb-24">
        <p className="demo-eyebrow">{pickText(demoHomeUi.exploreEyebrow, zh)}</p>
        <div className="mt-8 grid gap-px bg-[var(--color-border)] md:grid-cols-3">
          {demoExplore.map((c) => (
            <ExploreCard key={c.id} card={c} zh={zh} />
          ))}
        </div>
      </section>

      {nowOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-4 backdrop-blur-[2px] sm:items-center"
          onClick={() => setNowOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="demo-modal max-h-[80vh] w-full max-w-md overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3">
              <p className="demo-eyebrow">NOW</p>
              <button type="button" onClick={() => setNowOpen(false)} className="demo-text-link">
                {pickText(demoHomeUi.modalClose, zh)}
              </button>
            </div>
            <ul className="mt-5 space-y-3">
              {demoNow.map((n, i) => (
                <NowRow key={i} item={n} zh={zh} />
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ExploreCard({ card, zh }: { card: DemoExploreCard; zh: boolean }) {
  return (
    <Link href={card.href} className="demo-explore-card group">
      <span className="text-[15px] leading-none text-[var(--color-ink-muted)]/80">{card.icon}</span>
      <p className="demo-eyebrow mt-5">{card.eyebrow}</p>
      <h3 className="demo-explore-title">{pickText(card.title, zh)}</h3>
      <p className="demo-explore-body">{pickText(card.desc, zh)}</p>
      <footer className="demo-explore-footer">
        <p className="demo-explore-footer-label">{card.status}</p>
        <p className="demo-explore-latest">
          {pickText(demoHomeUi.nowLatest, zh)} {pickText(card.latest, zh)}
        </p>
        <span className="demo-explore-cta">{pickText(card.linkLabel, zh)}</span>
      </footer>
      <span className="demo-explore-arrow" aria-hidden>
        ↗
      </span>
    </Link>
  );
}

function NowRow({
  item,
  zh,
  compact,
}: {
  item: (typeof demoNow)[number];
  zh: boolean;
  compact?: boolean;
}) {
  return (
    <li className={`flex gap-3 ${compact ? "items-baseline" : "items-start"}`}>
      <span className={`demo-now-date ${compact ? "w-[3.25rem]" : "w-[3.5rem]"}`}>{item.date}</span>
      <span className="demo-now-text">{pickText(item.text, zh)}</span>
    </li>
  );
}
