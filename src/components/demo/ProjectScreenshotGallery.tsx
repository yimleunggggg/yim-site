"use client";

import { useState } from "react";
import { ImageLightbox } from "@/components/ImageLightbox";
import type { ProjectShot } from "@/lib/demo/project-screenshots";

export function ProjectScreenshotGallery({ shots }: { shots: ProjectShot[] }) {
  const [index, setIndex] = useState<number | null>(null);

  if (!shots.length) return null;

  const urls = shots.map((s) => s.src);

  return (
    <>
      <div className="project-shot-grid">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            className="project-shot-cell tap-target"
            onClick={() => setIndex(i)}
            aria-label={shot.alt ? `查看大图：${shot.alt}` : "查看大图"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.src}
              alt={shot.alt}
              className="project-shot-thumb"
              loading="lazy"
              decoding="async"
            />
            {shot.alt ? <span className="project-shot-label">{shot.alt}</span> : null}
          </button>
        ))}
      </div>

      {index !== null ? (
        <ImageLightbox
          images={urls}
          index={index}
          onClose={() => setIndex(null)}
          onNavigate={setIndex}
        />
      ) : null}
    </>
  );
}
