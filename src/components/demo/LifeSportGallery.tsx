"use client";

import Link from "next/link";
import { pickText } from "@/lib/demo/demo-data";
import type { LifeSportEntry } from "@/lib/demo/demo-life-sport";
import { LazyImage } from "./LazyImage";

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
}: {
  entry: LifeSportEntry;
  zh: boolean;
  priority?: boolean;
}) {
  const title = pickText(entry.title, zh);
  const location = entry.location ? pickText(entry.location, zh) : null;
  const hasNotes = Boolean(entry.body);
  const primaryKw = entry.keywords[0] ?? "";

  if (!entry.cover) {
    if (!hasNotes) return null;
    return (
      <Link
        href={`/life/sport/${entry.id}`}
        className="movement-tile movement-tile--text movement-tile--note"
      >
        <span className="movement-note-mark" aria-hidden>
          ◆
        </span>
        <time className="movement-text-date">{formatSportDate(entry.date)}</time>
        <p className="movement-text-title">{title}</p>
        {location ? <p className="movement-text-loc">{location}</p> : null}
        {primaryKw ? <span className="movement-kw movement-kw--text">{primaryKw}</span> : null}
      </Link>
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
      {hasNotes ? (
        <span className="movement-note-mark" title={zh ? "赛后笔记" : "Notes"} aria-hidden>
          ◆
        </span>
      ) : null}
      <div className="movement-tile-scrim">
        <time className="movement-tile-date">{formatSportDate(entry.date)}</time>
        <p className="movement-tile-title">{title}</p>
        {location ? <p className="movement-tile-loc">{location}</p> : null}
      </div>
    </>
  );

  if (hasNotes) {
    return (
      <Link
        href={`/life/sport/${entry.id}`}
        className="movement-tile movement-tile--note"
        aria-label={`${title}${zh ? "，阅读笔记" : ", read notes"}`}
      >
        {inner}
      </Link>
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
  const withNotes = entries.filter((e) => e.body).length;

  return (
    <div className="movement-wall-wrap">
      <p className="movement-wall-legend font-mono-index">
        {zh
          ? `${entries.length} 次记录 · ${withNotes} 篇笔记`
          : `${entries.length} moments · ${withNotes} with notes`}
      </p>
      <div className="movement-wall">
        {entries.map((entry, i) => (
          <SportTile key={entry.id} entry={entry} zh={zh} priority={i < 6} />
        ))}
      </div>
      <p className="movement-wall-hint">
        {zh ? "标 ◆ 的可点击查看赛后想法" : "◆ marks entries with race notes"}
      </p>
    </div>
  );
}
