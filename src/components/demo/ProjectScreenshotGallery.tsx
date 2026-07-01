"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "@/components/ImageLightbox";
import { useLocale } from "@/components";
import { pickText } from "@/lib/demo/demo-data";
import { demoUiCopy } from "@/lib/demo/demo-ui-copy";
import type { ProjectShot } from "@/lib/demo/project-screenshots";

const EAGER_COUNT = 3;

export function ProjectScreenshotGallery({ shots }: { shots: ProjectShot[] }) {
  const { locale } = useLocale();
  const zh = locale === "zh";
  const [index, setIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  if (!shots.length) return null;

  const urls = shots.map((s) => s.src);
  const heading = pickText(demoUiCopy.projectPage.screenshotHeading, zh);
  const meta = pickText(demoUiCopy.projectPage.screenshotMeta, zh).replace(
    "{count}",
    String(shots.length),
  );

  return (
    <section className="project-shot-section editorial-content" aria-label={heading}>
      <div className="project-shot-section-head">
        <h2 className="project-shot-section-title">{heading}</h2>
        <p className="project-shot-section-meta">{meta}</p>
      </div>

      <div className="project-shot-grid">
        {shots.map((shot, i) => {
          const isLoaded = loaded[i];
          return (
            <button
              key={shot.src}
              type="button"
              className="project-shot-cell tap-target"
              onClick={() => setIndex(i)}
              aria-label={shot.alt ? `查看大图：${shot.alt}` : `查看第 ${i + 1} 张截图`}
            >
              <div
                className={`project-shot-media${isLoaded ? " project-shot-media--loaded" : ""}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width ?? 390}
                  height={shot.height ?? 844}
                  sizes="(max-width: 767px) 50vw, 33vw"
                  className="project-shot-thumb"
                  priority={i < EAGER_COUNT}
                  quality={72}
                  onLoad={() => setLoaded((prev) => ({ ...prev, [i]: true }))}
                />
              </div>
              {shot.alt ? <span className="project-shot-label">{shot.alt}</span> : null}
            </button>
          );
        })}
      </div>

      {index !== null ? (
        <ImageLightbox
          images={urls}
          index={index}
          onClose={() => setIndex(null)}
          onNavigate={setIndex}
        />
      ) : null}
    </section>
  );
}
