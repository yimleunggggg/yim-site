"use client";

import type { ReactNode } from "react";

/** 页面顶栏：带横线的 mono eyebrow + serif 大标题 + 导语 / 引语（About · Life · FRAMES 共用） */
export function DemoPageHeader({
  eyebrow,
  title,
  lead,
  quote,
  attribution,
  children,
  className = "",
}: {
  eyebrow: string;
  title?: ReactNode;
  lead?: ReactNode;
  quote?: ReactNode;
  attribution?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`demo-page-header ${className}`.trim()}>
      <p className="demo-eyebrow">{eyebrow}</p>
      {title ? <h1 className="demo-page-title">{title}</h1> : null}
      {lead ? <p className="demo-page-lead">{lead}</p> : null}
      {quote ? (
        <blockquote className="demo-page-quote">
          <p>{quote}</p>
          {attribution ? (
            <footer className="demo-page-quote-source">{attribution}</footer>
          ) : null}
        </blockquote>
      ) : null}
      {children ? <div className="demo-page-extra">{children}</div> : null}
    </header>
  );
}

/** 分区标题：mono eyebrow + 可选 serif 标题 + 导语 */
export function DemoSectionHeading({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  /** @deprecated 与 subtitle 统一为 demo-section-lead */
  subtitleEmphasis?: boolean;
  className?: string;
}) {
  const hasTitle = title != null && title !== "";
  return (
    <div className={`demo-section-heading ${className}`.trim()}>
      {eyebrow ? <p className="demo-section-eyebrow">{eyebrow}</p> : null}
      {hasTitle ? <h2 className="demo-section-title">{title}</h2> : null}
      {subtitle ? <p className="demo-section-lead">{subtitle}</p> : null}
    </div>
  );
}

/** 封面：public 静态图用原生 img，避免 fill + lazy 导致「假裂图」 */
export function DemoCover({
  src,
  gradient,
  alt = "",
  label,
  className = "",
  priority,
}: {
  src?: string;
  gradient?: string;
  alt?: string;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        draggable={false}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`}
      style={{ background: gradient ?? "linear-gradient(145deg,#e8e2d8,#cfc7ba)" }}
    >
      {label ? (
        <span className="px-4 text-center font-serif text-lg font-semibold text-white/90">
          {label}
        </span>
      ) : null}
    </div>
  );
}

const TONE_CLASS: Record<string, string> = {
  live: "border-[var(--color-forest)] bg-[var(--color-forest)] text-[#fbf8f1] font-medium",
  building: "border-[var(--color-terracotta)] text-[var(--color-terracotta)] bg-[color-mix(in_srgb,var(--color-terracotta)_12%,transparent)] font-medium",
  demo: "border-[var(--color-terracotta)] text-[var(--color-terracotta)] bg-[color-mix(in_srgb,var(--color-terracotta)_14%,var(--color-paper))] font-semibold ring-1 ring-[color-mix(in_srgb,var(--color-terracotta)_25%,transparent)]",
  fuzzy: "border-dashed border-[var(--color-border)] text-[var(--color-ink-muted)] bg-transparent",
  planned: "border-[var(--color-accent-warm)] text-[var(--color-accent-warm)] bg-[color-mix(in_srgb,var(--color-accent-warm)_10%,transparent)]",
  done: "border-[var(--color-border)] text-[var(--color-ink-muted)]",
  wip: "border-[var(--color-terracotta)] text-[var(--color-terracotta)]",
  active: "border-[var(--color-forest)] text-[var(--color-forest)]",
  idea: "border-[var(--color-border)] text-[var(--color-ink-muted)]",
  someday: "border-[var(--color-accent-warm)] text-[var(--color-accent-warm)]",
};

export function DemoStatusTag({
  children,
  tone = "done",
}: {
  children: ReactNode;
  tone?: keyof typeof TONE_CLASS | string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs ${
        TONE_CLASS[tone] ?? TONE_CLASS.done
      }`}
    >
      {children}
    </span>
  );
}

/** 持续更新：脉冲圆点（无文案），供 FRAMES 等封面 overlay / 内页 inline 使用 */
export function DemoLiveIndicator({
  label,
  variant = "overlay",
}: {
  label: string;
  variant?: "overlay" | "inline";
}) {
  return (
    <span
      className={`demo-live-indicator demo-live-indicator--${variant}`}
      role="status"
      aria-label={label}
      title={label}
    >
      <span className="demo-live-indicator__ring" aria-hidden />
      <span className="demo-live-indicator__dot" aria-hidden />
    </span>
  );
}

/** 运动墙：有赛后笔记的卡片角标（文档图标，无 ◆ 文案） */
export function MovementNoteBadge() {
  return (
    <span className="movement-note-badge" aria-hidden>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M2.25 1.75h4.55l2.95 2.95v5.05H2.25z"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path d="M6.8 1.75v3h3" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" />
        <path
          d="M3.75 6.25h4.5M3.75 8.25h2.75"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
