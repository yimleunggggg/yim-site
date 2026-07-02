"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { pickText } from "@/lib/demo/demo-data";
import { formatSportEntryDate, formatSportKeyword, formatSportPlace, type LifeSportEntry } from "@/lib/demo/demo-life-sport";
import { splitArticleBody } from "@/lib/demo/life-article-layout";
import { LazyImage } from "./LazyImage";

function isBriefNote(bodyRaw: string): boolean {
  const trimmed = bodyRaw.trim();
  if (!trimmed) return true;
  const paragraphs = splitArticleBody(trimmed);
  return paragraphs.length <= 2 && trimmed.length <= 360;
}

function modalHeroSrc(entry: LifeSportEntry): string | undefined {
  return entry.images?.[0] ?? entry.cover;
}

export function LifeSportNoteModal({
  entry,
  zh,
  onClose,
}: {
  entry: LifeSportEntry | null;
  zh: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!entry) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [entry]);

  useEffect(() => {
    if (!entry) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entry, onClose]);

  if (!entry?.body) return null;

  const title = pickText(entry.title, zh);
  const location = formatSportPlace(entry.place, zh);
  const bodyRaw = pickText(entry.body, zh);
  const paragraphs = splitArticleBody(bodyRaw);
  const brief = isBriefNote(bodyRaw);
  const hero = modalHeroSrc(entry);
  const keyword = formatSportKeyword(entry.keyword, zh);

  return createPortal(
    <div
      className="life-modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`life-modal-panel${brief ? " life-modal-panel--brief" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        {hero ? (
          <div
            className={`life-sport-modal-cover${brief ? " life-sport-modal-cover--brief" : ""}`}
          >
            <LazyImage src={hero} alt="" fit="contain" className="life-sport-modal-cover-img" />
          </div>
        ) : null}

        <div className="life-modal-header">
          <div className="life-modal-header-text">
            <h2 id={titleId} className="life-modal-title">
              {title}
            </h2>
            <p className="life-modal-meta">
              <time>{formatSportEntryDate(entry.date, entry.dateEnd, zh)}</time>
              {location ? (
                <>
                  <span aria-hidden> · </span>
                  <span>{location}</span>
                </>
              ) : null}
              {keyword ? (
                <>
                  <span aria-hidden> · </span>
                  <span>{keyword}</span>
                </>
              ) : null}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="life-modal-close tap-target"
            onClick={onClose}
            aria-label={zh ? "关闭" : "Close"}
          >
            ×
          </button>
        </div>

        <div className={`life-modal-body${brief ? " life-modal-body--brief" : ""}`}>
          {paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
