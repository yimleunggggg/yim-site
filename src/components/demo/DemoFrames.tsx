"use client";

import Link from "next/link";
import { useLocale } from "@/components";
import { pickText, type LText } from "@/lib/demo/demo-data";
import { framesIntro, framesIntroAttribution, framesUi } from "@/lib/demo/demo-frames-ui";
import { DemoPageHeader, DemoLiveIndicator } from "./DemoPrimitives";
import { LazyImage } from "./LazyImage";

type FrameCard = {
  slug: string;
  title: LText;
  location: LText;
  tags: LText[];
  intro: LText;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  coverOrientation: "portrait" | "landscape";
  count: number;
  ongoing?: boolean;
};

export function DemoFrames({ frames }: { frames: FrameCard[] }) {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <div className="site-shell demo-frames-page demo-page-shell">
      <DemoPageHeader
        eyebrow="FRAMES"
        title={pickText(framesUi.pageTitle, zh)}
        quote={pickText(framesIntro, zh)}
        attribution={pickText(framesIntroAttribution, zh)}
      />

      <div className="demo-page-content demo-frames-masonry">
        {frames.map((f, i) => {
          const hasIntro = (zh ? f.intro.zh : f.intro.en ?? f.intro.zh).trim().length > 0;
          return (
            <Link
              key={f.slug}
              href={`/frames/${f.slug}`}
              className={`demo-frames-card group demo-frames-card--${f.coverOrientation}`}
            >
              <div className={`demo-frames-cover demo-frames-cover--${f.coverOrientation}`}>
                {f.cover ? (
                  <LazyImage
                    src={f.cover}
                    alt={pickText(f.title, zh)}
                    width={f.coverWidth}
                    height={f.coverHeight}
                    priority={i < 8}
                    fit="contain"
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
                    <DemoLiveIndicator
                      variant="overlay"
                      label={pickText(framesUi.ongoingLabel, zh)}
                    />
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
