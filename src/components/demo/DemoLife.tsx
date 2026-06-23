"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { pickText, demoLifeHeader } from "@/lib/demo/demo-data";
import {
  demoLifeJournal,
  type LifeJournalEntry,
} from "@/lib/demo/demo-life-journal";
import {
  demoLifeSport,
  demoLifeSportIntro,
  type LifeSportEntry,
} from "@/lib/demo/demo-life-sport";
import { useLocale } from "@/components";
import { DemoCover, DemoSectionHeading } from "./DemoPrimitives";

export function DemoLife() {
  const { locale } = useLocale();
  const zh = locale === "zh";

  const [journalIdx, setJournalIdx] = useState<number | null>(null);
  const [sportIdx, setSportIdx] = useState<number | null>(null);

  const closeAll = useCallback(() => {
    setJournalIdx(null);
    setSportIdx(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  return (
    <div className="life-page">
      <section className="site-shell life-page-header pt-12 pb-8 sm:pt-16">
        <h1 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
          {pickText(demoLifeHeader.title, zh)}
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--color-ink-muted)] sm:text-lg">
          {pickText(demoLifeHeader.tagline, zh)}
        </p>
      </section>

      {/* Journal：写作 + 生活体验 */}
      <section className="site-shell life-section" id="journal">
        <DemoSectionHeading
          eyebrow="JOURNAL"
          title={zh ? "记录" : "Journal"}
          subtitle={
            zh
              ? "旅行、义工、禅修、随笔——图文都在这儿。"
              : "Travel, volunteering, retreats, essays."
          }
        />
        <ul className="life-dispatch-feed mt-7">
          {demoLifeJournal.map((entry, i) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => setJournalIdx(i)}
                className="life-dispatch-row tap-target"
              >
                {entry.cover ? (
                  <div className="life-dispatch-thumb">
                    <DemoCover src={entry.cover} alt="" />
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
                  <h3 className="life-dispatch-title">
                    {pickText(entry.title, zh)}
                  </h3>
                  <p className="life-dispatch-oneline">
                    {pickText(entry.oneLine, zh)}
                  </p>
                  {entry.tags.length > 0 ? (
                    <div className="life-tag-row">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="life-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <span className="life-dispatch-arrow" aria-hidden>
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Sport gallery */}
      <section className="section-band" id="sport">
        <div className="site-shell life-sport-shell py-12 sm:py-16">
          <DemoSectionHeading
            eyebrow="MOVEMENT"
            title={zh ? "运动探索" : "Movement"}
            subtitle={pickText(demoLifeSportIntro, zh)}
          />
          <div className="life-sport-grid mt-8">
            {demoLifeSport.map((entry, i) => (
              <button
                key={entry.id}
                type="button"
                className="life-sport-card tap-target"
                onClick={() => {
                  if (entry.body || entry.cover) setSportIdx(i);
                }}
                aria-disabled={!entry.body && !entry.cover}
              >
                <div className="life-sport-cover">
                  {entry.cover ? (
                    <DemoCover src={entry.cover} alt="" />
                  ) : (
                    <div className="life-sport-cover--empty" />
                  )}
                </div>
                <div className="life-sport-meta">
                  <time className="life-sport-date">{entry.date}</time>
                  <h3 className="life-sport-title">{pickText(entry.title, zh)}</h3>
                  {entry.location ? (
                    <p className="life-sport-loc">{pickText(entry.location, zh)}</p>
                  ) : null}
                  <div className="life-tag-row">
                    {entry.keywords.map((kw) => (
                      <span key={kw} className="life-tag life-tag--sm">
                        {kw}
                      </span>
                    ))}
                  </div>
                  {entry.body ? (
                    <span className="life-sport-more">
                      {zh ? "展开" : "Read"}
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {journalIdx !== null ? (
        <JournalModal
          entry={demoLifeJournal[journalIdx]}
          zh={zh}
          onClose={() => setJournalIdx(null)}
        />
      ) : null}

      {sportIdx !== null ? (
        <SportModal
          entry={demoLifeSport[sportIdx]}
          zh={zh}
          onClose={() => setSportIdx(null)}
        />
      ) : null}
    </div>
  );
}

function JournalModal({
  entry,
  zh,
  onClose,
}: {
  entry: LifeJournalEntry;
  zh: boolean;
  onClose: () => void;
}) {
  const hasImages = entry.images.length > 0;

  return (
    <LifeModal onClose={onClose} wide={entry.imageFirst}>
      <header className="life-modal-header">
        <div>
          <p className="font-mono text-xs text-[var(--color-ink-muted)]">
            {entry.date}
            {entry.location ? ` · ${pickText(entry.location, zh)}` : ""}
          </p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-[var(--color-ink)]">
            {pickText(entry.title, zh)}
          </h3>
          {entry.tags.length > 0 ? (
            <div className="life-tag-row mt-2">
              {entry.tags.map((tag) => (
                <span key={tag} className="life-tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <CloseBtn zh={zh} onClose={onClose} />
      </header>

      {hasImages ? (
        <div
          className={
            entry.imageFirst ? "life-modal-images--tall" : "life-modal-images"
          }
        >
          {entry.images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className={entry.imageFirst ? "life-modal-longimg" : undefined}
            />
          ))}
        </div>
      ) : null}

      {entry.body.length > 0 ? (
        <div className="life-modal-body">
          {entry.body.map((para, i) => (
            <p key={i}>{pickText(para, zh)}</p>
          ))}
        </div>
      ) : null}
    </LifeModal>
  );
}

function SportModal({
  entry,
  zh,
  onClose,
}: {
  entry: LifeSportEntry;
  zh: boolean;
  onClose: () => void;
}) {
  return (
    <LifeModal onClose={onClose}>
      {entry.cover ? (
        <div className="life-sport-modal-cover">
          <DemoCover src={entry.cover.replace("cover.jpg", "display.jpg")} alt="" />
        </div>
      ) : null}
      <header className="life-modal-header">
        <div>
          <p className="font-mono text-xs text-[var(--color-ink-muted)]">
            {entry.date}
            {entry.location ? ` · ${pickText(entry.location, zh)}` : ""}
          </p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-[var(--color-ink)]">
            {pickText(entry.title, zh)}
          </h3>
          <div className="life-tag-row mt-2">
            {entry.keywords.map((kw) => (
              <span key={kw} className="life-tag">
                {kw}
              </span>
            ))}
          </div>
        </div>
        <CloseBtn zh={zh} onClose={onClose} />
      </header>
      {entry.body ? (
        <div className="life-modal-body life-modal-body--pre">
          {pickText(entry.body, zh).split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      ) : null}
    </LifeModal>
  );
}

function LifeModal({
  children,
  onClose,
  wide,
}: {
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <div
      className="life-modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`life-modal-panel card-surface${wide ? " life-modal-panel--wide" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function CloseBtn({ zh, onClose }: { zh: boolean; onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="tap-target rounded-full px-3 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
    >
      {zh ? "关闭" : "Close"}
    </button>
  );
}
