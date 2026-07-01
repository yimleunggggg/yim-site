"use client";

import Link from "next/link";
import { useLocale } from "@/components";
import { pickText, type LText } from "@/lib/demo/demo-data";
import { framesUi } from "@/lib/demo/demo-frames-ui";
import type { FrameImageCaption } from "@/lib/demo/demo-frames-ui";
import { DemoSiteTrail } from "./DemoSiteTrail";
import { DemoLiveIndicator } from "./DemoPrimitives";
import { LazyImage } from "./LazyImage";

type FrameNeighbor = { slug: string; title: LText };

type FrameDetail = {
  slug: string;
  title: LText;
  location: LText;
  tags: LText[];
  intro: LText;
  images: string[];
  imagesFull: string[];
  imageCaptions: FrameImageCaption[];
  imageSizes: { width: number; height: number }[];
  ongoing?: boolean;
  prev: FrameNeighbor | null;
  next: FrameNeighbor | null;
};

export function DemoFrameDetail({ frame }: { frame: FrameDetail }) {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const title = pickText(frame.title, zh);

  const hasIntro = (zh ? frame.intro.zh : frame.intro.en ?? frame.intro.zh).trim().length > 0;

  return (
    <article className="site-shell demo-frames-detail py-10 sm:py-14">
      <div className="demo-frames-detail-inner">
        <DemoSiteTrail
          items={[
            { label: "Home", href: "/" },
            { label: "FRAMES", href: "/frames" },
            { label: title },
          ]}
        />

        <header className="mt-6 border-b border-[var(--color-border)] pb-7">
          <div className="flex flex-wrap items-center gap-2">
            <p className="demo-frames-location mb-0">{pickText(frame.location, zh)}</p>
            {frame.ongoing ? (
              <DemoLiveIndicator
                variant="inline"
                label={pickText(framesUi.ongoingLabel, zh)}
              />
            ) : null}
          </div>
          <h1 className="demo-frames-title mt-3">{title}</h1>
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
            const size = frame.imageSizes[i];
            return (
              <figure key={src} className="demo-frames-gallery-figure">
                <div className="demo-frames-gallery-item demo-frames-gallery-item--static">
                  <LazyImage
                    src={src}
                    alt={
                      cap
                        ? `${cap.date} · ${pickText(cap.place, zh)}`
                        : `${title} ${i + 1}`
                    }
                    width={size?.width}
                    height={size?.height}
                    priority={i < 6}
                    fit="contain"
                    className="demo-frames-gallery-img"
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

        {(frame.prev || frame.next) && (
          <nav className="demo-frames-album-nav" aria-label={zh ? "相册导航" : "Album navigation"}>
            {frame.prev ? (
              <Link href={`/frames/${frame.prev.slug}`} className="demo-frames-album-link">
                <span className="demo-frames-album-dir">{pickText(framesUi.prevAlbum, zh)}</span>
                <span className="demo-frames-album-title">{pickText(frame.prev.title, zh)}</span>
              </Link>
            ) : (
              <span />
            )}
            {frame.next ? (
              <Link
                href={`/frames/${frame.next.slug}`}
                className="demo-frames-album-link demo-frames-album-link--next"
              >
                <span className="demo-frames-album-dir">{pickText(framesUi.nextAlbum, zh)}</span>
                <span className="demo-frames-album-title">{pickText(frame.next.title, zh)}</span>
              </Link>
            ) : null}
          </nav>
        )}
      </div>
    </article>
  );
}
