"use client";

import { useCallback, useEffect, useRef } from "react";

type Props = {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  captions?: string[];
};

export function ImageLightbox({ images, index, onClose, onNavigate, captions }: Props) {
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const caption = captions?.[index];

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(index - 1);
  }, [hasPrev, index, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(index + 1);
  }, [hasNext, index, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goPrev, goNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <div
      className="image-lightbox fixed inset-0 z-50 flex flex-col bg-black/92 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
      role="dialog"
      aria-modal="true"
      aria-label="图片浏览"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex shrink-0 items-center justify-between gap-3 px-4 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <span className="text-sm text-white/70">
            {index + 1} / {images.length}
          </span>
          {caption ? (
            <p className="mt-0.5 truncate text-xs text-white/55">{caption}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="tap-target shrink-0 rounded-full px-4 text-sm text-white active:bg-white/15"
        >
          关闭
        </button>
      </div>

      <div
        className="image-lightbox-stage flex min-h-0 flex-1 items-center justify-center px-3 pb-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index]}
          alt={caption ?? ""}
          className="image-lightbox-img max-h-[min(78dvh,calc(100dvh-8rem))] max-w-[min(100%,42rem)] w-auto h-auto object-contain select-none"
        <img
          src={images[index]}
          alt={caption ?? ""}
          className="image-lightbox-img max-h-[min(78dvh,calc(100dvh-8rem))] max-w-[min(100%,42rem)] w-auto h-auto object-contain select-none"
          draggable={false}
        />
      </div>

      <div
        className="flex shrink-0 items-center justify-center gap-6 px-4 py-4 md:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          disabled={!hasPrev}
          onClick={goPrev}
          className="tap-target rounded-full px-5 py-2 text-sm text-white disabled:opacity-30 active:bg-white/15"
        >
          上一张
        </button>
        <button
          type="button"
          disabled={!hasNext}
          onClick={goNext}
          className="tap-target rounded-full px-5 py-2 text-sm text-white disabled:opacity-30 active:bg-white/15"
        >
          下一张
        </button>
      </div>

      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="tap-target absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-2xl text-white md:block"
          aria-label="上一张"
        >
          ‹
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="tap-target absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-2xl text-white md:block"
          aria-label="下一张"
        >
          ›
        </button>
      )}
    </div>
  );
}
