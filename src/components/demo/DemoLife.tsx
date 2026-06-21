"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components";
import {
  demoDispatches,
  demoLifeHeader,
  demoMovement,
  demoWritingFeaturedSlugs,
  demoWritingIntro,
  pickText,
  type DemoDispatch,
} from "@/lib/demo/demo-data";
import type { DemoWritingMeta } from "@/lib/demo/demo-content";
import { DemoCover, DemoSectionHeading } from "./DemoPrimitives";
import { DemoWritingList } from "./DemoWritingList";

export function DemoLife({ writings }: { writings: DemoWritingMeta[] }) {
  const { locale } = useLocale();
  const zh = locale === "zh";

  const [dispatchIdx, setDispatchIdx] = useState<number | null>(null);

  const featuredWritings = demoWritingFeaturedSlugs
    .map((slug) => writings.find((w) => w.slug === slug))
    .filter((w): w is DemoWritingMeta => Boolean(w));

  return (
    <>
      <section className="site-shell pt-12 pb-8 sm:pt-16">
        <h1 className="max-w-4xl font-serif text-3xl font-bold leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
          {pickText(demoLifeHeader.title, zh)}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--color-ink-muted)] sm:text-lg">
          {pickText(demoLifeHeader.tagline, zh)}
        </p>
      </section>

      {/* 3.1 Dispatches */}
      <section className="site-shell py-10 sm:py-14" id="dispatches">
        <DemoSectionHeading eyebrow="DISPATCHES" title={zh ? "生活体验" : "Dispatches"} />
        <ul className="life-dispatch-feed mt-7">
          {demoDispatches.map((d, i) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => setDispatchIdx(i)}
                className="life-dispatch-row tap-target"
              >
                {d.cover ? (
                  <div className="life-dispatch-thumb">
                    <DemoCover
                      src={d.cover}
                      gradient={d.gradient}
                      alt=""
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <div
                    className="life-dispatch-thumb life-dispatch-thumb--placeholder"
                    style={{ background: d.gradient ?? "var(--color-callout)" }}
                  />
                )}
                <div className="life-dispatch-copy">
                  <p className="life-dispatch-meta">
                    <span>{d.date}</span>
                    {d.location ? (
                      <>
                        <span aria-hidden> · </span>
                        <span>{pickText(d.location, zh)}</span>
                      </>
                    ) : null}
                    {d.format === "diary" ? (
                      <span className="life-dispatch-badge">{zh ? "日记" : "Diary"}</span>
                    ) : null}
                  </p>
                  <h3 className="life-dispatch-title">{pickText(d.title, zh)}</h3>
                  <p className="life-dispatch-oneline">{pickText(d.oneLine, zh)}</p>
                </div>
                <span className="life-dispatch-arrow" aria-hidden>
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* 3.2 Writing */}
      <section className="section-band" id="writing">
        <div className="site-shell py-12 sm:py-16">
          <DemoSectionHeading
            eyebrow="WRITING"
            title={zh ? "关于自己的写作" : "Writing"}
            subtitle={pickText(demoWritingIntro, zh)}
          />
          <DemoWritingList writings={featuredWritings} zh={zh} showTagFilter={false} />
          <div className="mt-8">
            <Link
              href="/writing"
              className="inline-flex items-center gap-1 text-sm text-[var(--color-forest)] hover:underline"
            >
              {zh ? "查看全部写作（含 AI 教程、攻略等）→" : "All writing — tutorials, guides & more →"}
            </Link>
          </div>
        </div>
      </section>

      {/* 3.3 Movements */}
      <section className="site-shell py-12 sm:py-16" id="movements">
        <DemoSectionHeading
          eyebrow="MOVEMENTS"
          title={zh ? "运动" : "Movements"}
          subtitle={pickText(demoMovement.intro, zh)}
        />

        <div className="demo-timeline mt-10">
          {demoMovement.timeline.map((t, i) => (
            <div key={i} className="demo-timeline-item pb-6 last:pb-0">
              <span className="demo-timeline-dot" aria-hidden />
              <span className="font-mono text-xs text-[var(--color-forest)]">{t.date}</span>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink)]">
                {pickText(t.text, zh)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="font-mono-index text-[var(--color-ink-muted)]">
            {zh ? "比赛" : "Races"}
          </h3>
          <div className="mt-6 space-y-6">
            {demoMovement.races.map((race) => (
              <article key={race.id} className="life-race-card">
                <div className="life-race-copy">
                  <p className="font-mono text-xs text-[var(--color-forest)]">{race.date}</p>
                  <h4 className="mt-1 font-serif text-lg font-semibold text-[var(--color-ink)]">
                    {pickText(race.title, zh)}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {pickText(race.text, zh)}
                  </p>
                </div>
                {race.photos.length > 0 ? (
                  <div className="life-race-thumbs">
                    {race.photos.map((src, i) => (
                      <div key={`${race.id}-${src}-${i}`} className="life-race-thumb">
                        <DemoCover src={src} alt="" sizes="72px" />
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-mono-index text-[var(--color-ink-muted)]">
            {zh ? "参加过的训练营" : "Training Camps"}
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {demoMovement.camps.map((camp) => (
              <article key={camp.id} className="life-camp-card">
                {camp.photos[0] ? (
                  <div className="life-camp-thumb">
                    <DemoCover src={camp.photos[0]} alt="" sizes="(max-width:640px) 100vw, 320px" />
                  </div>
                ) : null}
                <div className="life-camp-copy">
                  <p className="font-mono text-xs text-[var(--color-forest)]">{camp.date}</p>
                  <h4 className="mt-1 font-serif text-base font-semibold text-[var(--color-ink)]">
                    {pickText(camp.title, zh)}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {pickText(camp.text, zh)}
                  </p>
                  {camp.dispatchId ? (
                    <button
                      type="button"
                      onClick={() => {
                        const idx = demoDispatches.findIndex((d) => d.id === camp.dispatchId);
                        if (idx >= 0) setDispatchIdx(idx);
                      }}
                      className="mt-3 text-sm text-[var(--color-forest)] hover:underline"
                    >
                      {zh ? "看 Dispatches 详情 →" : "View in Dispatches →"}
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {dispatchIdx !== null && (
        <DispatchModal
          dispatch={demoDispatches[dispatchIdx]}
          zh={zh}
          onClose={() => setDispatchIdx(null)}
        />
      )}
    </>
  );
}

function DispatchModal({
  dispatch,
  zh,
  onClose,
}: {
  dispatch: DemoDispatch;
  zh: boolean;
  onClose: () => void;
}) {
  const hasImage = Boolean(dispatch.cover || dispatch.images?.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 pt-[max(1rem,env(safe-area-inset-top))]"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="card-surface max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {hasImage ? (
          <div className="life-dispatch-modal-media">
            <DemoCover
              src={dispatch.cover ?? dispatch.images?.[0]}
              gradient={dispatch.gradient}
              alt=""
              sizes="480px"
            />
          </div>
        ) : (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
            <DemoCover gradient={dispatch.gradient} alt="" sizes="100vw" />
          </div>
        )}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-[var(--color-forest)]">{dispatch.date}</p>
              <h3 className="mt-1 font-serif text-xl font-semibold text-[var(--color-ink)]">
                {pickText(dispatch.title, zh)}
              </h3>
              {dispatch.location ? (
                <p className="mt-1 font-mono text-xs text-[var(--color-ink-muted)]">
                  {pickText(dispatch.location, zh)}
                </p>
              ) : null}
              {dispatch.format === "diary" ? (
                <span className="mt-2 inline-block rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-ink-muted)]">
                  {zh ? "日记体 · 按天展开" : "Diary · by day"}
                </span>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="tap-target -mr-2 -mt-2 rounded-full px-3 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            >
              {zh ? "关闭" : "Close"}
            </button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
            {pickText(dispatch.text, zh)}
          </p>
        </div>
      </div>
    </div>
  );
}
