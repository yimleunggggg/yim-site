"use client";

import Link from "next/link";
import { pickText } from "@/lib/demo/demo-data";
import type { LifeSportEntry } from "@/lib/demo/demo-life-sport";
import { DemoCover } from "./DemoPrimitives";

export function LifeSportList({
  entries,
  zh,
}: {
  entries: LifeSportEntry[];
  zh: boolean;
}) {
  return (
    <ul className="life-dispatch-feed mt-7">
      {entries.map((entry, i) => {
        const title = pickText(entry.title, zh);
        const hasNotes = Boolean(entry.body);
        const row = (
          <>
            {entry.cover ? (
              <div className="life-dispatch-thumb">
                <DemoCover src={entry.cover} alt="" priority={i < 2} />
              </div>
            ) : (
              <div className="life-dispatch-thumb life-dispatch-thumb--placeholder" />
            )}
            <div className="life-dispatch-copy">
              <p className="life-dispatch-meta">
                <span>{entry.date}</span>
                {entry.location ? (
                  <>
                    <span aria-hidden> · </span>
                    <span>{pickText(entry.location, zh)}</span>
                  </>
                ) : null}
              </p>
              <h3 className="life-dispatch-title">{title}</h3>
              {entry.keywords.length > 0 ? (
                <div className="life-tag-row">
                  {entry.keywords.map((kw) => (
                    <span key={kw} className="life-tag">
                      {kw}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            {hasNotes ? (
              <span className="life-dispatch-arrow" aria-hidden>
                →
              </span>
            ) : null}
          </>
        );

        if (!hasNotes) {
          return (
            <li key={entry.id} className="life-dispatch-row life-dispatch-row--static">
              {row}
            </li>
          );
        }

        return (
          <li key={entry.id}>
            <Link
              href={`/life/sport/${entry.id}`}
              className="life-dispatch-row life-dispatch-link tap-target"
            >
              {row}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
