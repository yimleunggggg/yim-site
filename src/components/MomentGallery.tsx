"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "./ImageLightbox";

type Props = {
  images: string[];
};

export function MomentGallery({ images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const hero = images[0];
  const thumbs = images.slice(1);

  return (
    <>
      <div className="mt-3 -mx-1 sm:mx-0">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="relative block w-full overflow-hidden rounded-sm bg-[var(--color-callout)] active:opacity-90"
        >
          <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
            <Image
              src={hero}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
          {images.length > 1 && (
            <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
              共 {images.length} 张
            </span>
          )}
        </button>

        {thumbs.length > 0 && (
          <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
            {thumbs.map((src, i) => {
              const idx = i + 1;
              const hiddenOnMobile = i >= 3 && thumbs.length > 4;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`tap-target relative aspect-square w-[22%] shrink-0 snap-start overflow-hidden rounded-sm bg-[var(--color-callout)] active:opacity-90 md:w-auto ${
                    hiddenOnMobile ? "hidden md:block" : ""
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="96px" />
                </button>
              );
            })}
            {thumbs.length > 4 && (
              <button
                type="button"
                onClick={() => setLightboxIndex(4)}
                className="tap-target flex aspect-square w-[22%] shrink-0 items-center justify-center rounded-sm bg-[var(--color-callout)] text-xs text-[var(--color-ink-muted)] active:opacity-90 md:hidden"
              >
                +{thumbs.length - 3}
              </button>
            )}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
