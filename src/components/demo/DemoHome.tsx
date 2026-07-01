"use client";

import Link from "next/link";
import { useLocale } from "@/components";
import {
  demoHero,
  demoExplore,
  demoHomeUi,
  pickText,
  type DemoExploreCard,
} from "@/lib/demo/demo-data";
import { DemoMarquee } from "./DemoMarquee";

export function DemoHome() {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <>
      <section className="site-shell demo-hero pt-8 pb-4 sm:pt-14 sm:pb-7">
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
      </section>

      <DemoMarquee />

      <section className="site-shell demo-explore-section pb-12 pt-6 sm:pt-14 sm:pb-24">
        <p className="demo-eyebrow">{pickText(demoHomeUi.exploreEyebrow, zh)}</p>
        <div className="demo-explore-grid mt-5 sm:mt-8">
          {demoExplore.map((c) => (
            <ExploreCard key={c.id} card={c} zh={zh} />
          ))}
        </div>
      </section>
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
