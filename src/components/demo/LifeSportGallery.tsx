"use client";

import { useState } from "react";
import { pickText } from "@/lib/demo/demo-data";
import type { LifeSportEntry } from "@/lib/demo/demo-life-sport";
import { MovementNoteBadge } from "./DemoPrimitives";
import { LazyImage } from "./LazyImage";
import { LifeSportNoteModal } from "./LifeSportNoteModal";

function formatSportDate(raw: string): string {
  const m = raw.match(/^(\d{4})[-./](\d{1,2})(?:[-./](\d{1,2}))?/);
  if (!m) return raw;
  const [, y, mo, d] = m;
  if (d) return `${y.slice(2)}.${mo.padStart(2, "0")}.${d.padStart(2, "0")}`;
  return `${y.slice(2)}.${mo.padStart(2, "0")}`;
}

function SportTile({
  entry,
  zh,
  priority,
  onOpenNote,
}: {
  entry: LifeSportEntry;
  zh: boolean;
  priority?: boolean;
  onOpenNote: (entry: LifeSportEntry) => void;
}) {
  const title = pickText(entry.title, zh);
  const location = entry.location ? pickText(entry.location, zh) : null;
  const hasNotes = Boolean(entry.body);
  const primaryKw = entry.keywords[0] ?? "";

  if (!entry.cover) {
    if (!hasNotes) return null;
    return (
      <button
        type="button"
        className="movement-tile movement-tile--text movement-tile--note"
        aria-label={`${title}${zh ? "，阅读笔记" : ", read notes"}`}
        onClick={() => onOpenNote(entry)}
      >
        <MovementNoteBadge />
        <time className="movement-text-date">{formatSportDate(entry.date)}</time>
        <p className="movement-text-title">{title}</p>
        {location ? <p className="movement-text-loc">{location}</p> : null}
        {primaryKw ? <span className="movement-kw movement-kw--text">{primaryKw}</span> : null}
        <span className="movement-text-read-hint" aria-hidden>
          {zh ? "阅读笔记" : "Read notes"}
        </span>
      </button>
    );
  }

  const inner = (
    <>
      <div className="movement-tile-media">
        <LazyImage
          src={entry.cover}
          alt=""
          priority={priority}
          className="movement-tile-img h-full w-full object-cover"
        />
      </div>
      {primaryKw ? <span className="movement-kw">{primaryKw}</span> : null}
      {hasNotes ? <MovementNoteBadge /> : null}
      <div className="movement-tile-scrim">
        <time className="movement-tile-date">{formatSportDate(entry.date)}</time>
        <p className="movement-tile-title">{title}</p>
        {location ? <p className="movement-tile-loc">{location}</p> : null}
        {hasNotes ? (
          <span className="movement-tile-read-hint" aria-hidden>
            {zh ? "阅读笔记" : "Read notes"}
          </span>
        ) : null}
      </div>
    </>
  );

  if (hasNotes) {
    return (
      <button
        type="button"
        className="movement-tile movement-tile--note"
        aria-label={`${title}${zh ? "，阅读笔记" : ", read notes"}`}
        onClick={() => onOpenNote(entry)}
      >
        {inner}
      </button>
    );
  }

  return (
    <figure className="movement-tile movement-tile--static" aria-label={title}>
      {inner}
    </figure>
  );
}

export function LifeSportGallery({
  entries,
  zh,
}: {
  entries: LifeSportEntry[];
  zh: boolean;
}) {
  const [activeEntry, setActiveEntry] = useState<LifeSportEntry | null>(null);

  return (
    <>
      <div className="movement-wall-wrap">
        <div className="movement-wall">
          {entries.map((entry, i) => (
            <SportTile
              key={entry.id}
              entry={entry}
              zh={zh}
              priority={i < 6}
              onOpenNote={setActiveEntry}
            />
          ))}
        </div>
      </div>
      <LifeSportNoteModal
        entry={activeEntry}
        zh={zh}
        onClose={() => setActiveEntry(null)}
      />
    </>
  );
}
