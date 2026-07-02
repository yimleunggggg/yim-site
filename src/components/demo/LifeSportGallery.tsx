"use client";

import { useState } from "react";
import Link from "next/link";
import { pickText } from "@/lib/demo/demo-data";
import { formatSportEntryDate, formatSportKeyword, formatSportPlace, type LifeSportEntry } from "@/lib/demo/demo-life-sport";
import { MovementNoteBadge } from "./DemoPrimitives";
import { LazyImage } from "./LazyImage";
import { LifeSportNoteModal } from "./LifeSportNoteModal";

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
  const location = formatSportPlace(entry.place, zh);
  const hasNotes = Boolean(entry.body);
  const primaryKw = formatSportKeyword(entry.keyword, zh);

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
        <time className="movement-text-date">{formatSportEntryDate(entry.date, entry.dateEnd, zh)}</time>
        <p className="movement-text-title">{title}</p>
        {location ? <p className="movement-text-loc">{location}</p> : null}
        {primaryKw ? (
          <span className={`movement-kw movement-kw--text${zh ? "" : " movement-kw--en"}`}>{primaryKw}</span>
        ) : null}
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
          fit="cover"
          className="movement-tile-img"
        />
      </div>
      {primaryKw ? (
        <span className={`movement-kw${zh ? "" : " movement-kw--en"}`}>{primaryKw}</span>
      ) : null}
      {hasNotes ? <MovementNoteBadge /> : null}
      <div className="movement-tile-scrim">
        <time className="movement-tile-date">{formatSportEntryDate(entry.date, entry.dateEnd, zh)}</time>
        <p className="movement-tile-title">{title}</p>
        {location ? <p className="movement-tile-loc">{location}</p> : null}
      </div>
    </>
  );

  if (entry.href) {
    return (
      <Link
        href={entry.href}
        className="movement-tile movement-tile--static movement-tile--link tap-target"
        aria-label={title}
      >
        {inner}
      </Link>
    );
  }

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
