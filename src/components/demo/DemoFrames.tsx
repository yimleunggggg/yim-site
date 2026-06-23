"use client";

import Link from "next/link";
import { useLocale } from "@/components";
import { pickText, type LText } from "@/lib/demo/demo-data";
import { framesIntro, framesUi } from "@/lib/demo/demo-frames-ui";

type FrameCard = {
  slug: string;
  title: LText;
  emoji: string;
  location: LText;
  tags: LText[];
  intro: LText;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  coverOrientation: "portrait" | "landscape";
  count: number;
};

export function DemoFrames({ frames }: { frames: FrameCard[] }) {
  const { locale } = useLocale();
  const zh = locale === "zh";

  return (
    <div className="site-shell demo-frames-page py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="demo-eyebrow">FRAMES</p>
        <h1 className="demo-frames-title mt-5">{pickText(framesUi.pageTitle, zh)}</h1>
        <p className="demo-frames-intro mt-5">{pickText(framesIntro, zh)}</p>
      </header>

      {/* 瀑布流：横竖封面自然比例 */}
      <div className="demo-frames-masonry mt-10">
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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={f.cover}
                    alt={pickText(f.title, zh)}
                    width={f.coverWidth}
                    height={f.coverHeight}
                    loading={i < 4 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={i < 2 ? "high" : "auto"}
                    className="demo-frames-cover-img"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : null}
                <span className="demo-frames-count">
                  {f.count} {pickText(framesUi.photoCount, zh)}
                </span>
              </div>

              <div className="demo-frames-meta">
                <p className="demo-frames-location">
                  <span className="mr-1">{f.emoji}</span>
                  {pickText(f.location, zh)}
                </p>
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
