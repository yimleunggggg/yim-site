"use client";

import Link from "next/link";
import { useLocale } from "@/components";
import { pickText, type LText } from "@/lib/demo/demo-data";
import { framesIntro, framesIntroAttribution, framesUi } from "@/lib/demo/demo-frames-ui";
import { DemoPageHeader, DemoStatusTag } from "./DemoPrimitives";
import { LazyImage } from "./LazyImage";

type FrameCard = {
  slug: string;
  title: LText;
  location: LText;
  tags: LText[];
  intro: LText;
  cover: string;
  count: number;
  ongoing?: boolean;
};

export function DemoFrames({ frames }: { frames: FrameCard[] }) {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <div className="site-shell demo-frames-page pt-12 pb-14 sm:pt-16">
      <DemoPageHeader eyebrow="FRAMES" title={pickText(framesUi.pageTitle, zh)}>
        <blockquote className="demo-page-quote mt-5">
          <p>{pickText(framesIntro, zh)}</p>
          <footer className="demo-page-quote-source">
            {pickText(framesIntroAttribution, zh)}
          </footer>
        </blockquote>
      </DemoPageHeader>

      <div className="demo-frames-grid mt-10">
        {frames.map((f, i) => {
          const hasIntro = (zh ? f.intro.zh : f.intro.en ?? f.intro.zh).trim().length > 0;
          return (
            <Link
              key={f.slug}
              href={`/frames/${f.slug}`}
              className="demo-frames-card group"
            >
              <div className="demo-frames-cover">
                {f.cover ? (
                  <LazyImage
                    src={f.cover}
                    alt={pickText(f.title, zh)}
                    priority={i < 4}
                    className="demo-frames-cover-img"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : null}
                <span className="demo-frames-count">
                  {f.count} {pickText(framesUi.photoCount, zh)}
                </span>
                {f.ongoing ? (
                  <span className="demo-frames-live">
                    <DemoStatusTag tone="live">{pickText(framesUi.ongoingLabel, zh)}</DemoStatusTag>
                  </span>
                ) : null}
              </div>

              <div className="demo-frames-meta">
                <p className="demo-frames-location">{pickText(f.location, zh)}</p>
                <h2 className="demo-frames-card-title">{pickText(f.title, zh)}</h2>
                {hasIntro ? (
                  <p className="demo-frames-card-intro">{pickText(f.intro, zh)}</p>
                ) : null}
                <div className="demo-frames-tags">
                  {f.tags.map((t, j) => (
                    <span key={j}>{pickText(t, zh)}</span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
