"use client";

import Link from "next/link";
import { useLocale } from "@/components";
import { pickText, type LText } from "@/lib/demo/demo-data";
import { framesUi } from "@/lib/demo/demo-frames-ui";
import type { FrameImageCaption } from "@/lib/demo/demo-frames-ui";
import { LazyImage } from "./LazyImage";

type FrameDetail = {
  slug: string;
  title: LText;
  emoji: string;
  location: LText;
  tags: LText[];
  intro: LText;
  images: string[];
  imagesFull: string[];
  imageCaptions: FrameImageCaption[];
};

export function DemoFrameDetail({ frame }: { frame: FrameDetail }) {
  const { locale } = useLocale();
  const zh = locale === "zh";

  const hasIntro = (zh ? frame.intro.zh : frame.intro.en ?? frame.intro.zh).trim().length > 0;

  return (
    <article className="site-shell demo-frames-detail py-10 sm:py-14">
      <div className="demo-frames-detail-inner">
        <Link href="/frames" className="demo-text-link">
          {pickText(framesUi.backLink, zh)}
        </Link>

        <header className="mt-6 border-b border-[var(--color-border)] pb-7">
          <p className="demo-frames-location">
            <span className="mr-1">{frame.emoji}</span>
            {pickText(frame.location, zh)}
          </p>
          <h1 className="demo-frames-title mt-3">{pickText(frame.title, zh)}</h1>
          <div className="demo-frames-tags mt-4">
            {frame.tags.map((t, i) => (
              <span key={i}>{pickText(t, zh)}</span>
            ))}
          </div>
          {hasIntro ? (
            <p className="demo-frames-detail-intro mt-6">{pickText(frame.intro, zh)}</p>
          ) : null}
        </header>

        <div className="demo-frames-gallery mt-8">
          {frame.images.map((src, i) => {
            const cap = frame.imageCaptions[i];
            return (
              <figure key={src} className="demo-frames-gallery-figure">
                <div className="demo-frames-gallery-item demo-frames-gallery-item--static">
                  <LazyImage
                    src={src}
                    alt={
                      cap
                        ? `${cap.date} · ${pickText(cap.place, zh)}`
                        : `${pickText(frame.title, zh)} ${i + 1}`
                    }
                    priority={i < 1}
                    className="h-auto w-full select-none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                {cap?.date && cap.place ? (
                  <figcaption className="demo-frames-gallery-caption">
                    {cap.date} · {pickText(cap.place, zh)}
                  </figcaption>
                ) : null}
              </figure>
            );
          })}
        </div>
      </div>
    </article>
  );
}
