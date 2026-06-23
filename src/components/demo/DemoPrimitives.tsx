"use client";

import type { ReactNode } from "react";

/** 分区标题：mono eyebrow + serif 大标题 + 可选副标题 */
export function DemoSectionHeading({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="font-mono-index text-[var(--color-forest)]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[var(--color-ink)] sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-ink-muted)] sm:text-base">
          {subtitle}
        </p>
      ) : null}
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
  live: "border-[var(--color-forest)] text-[var(--color-forest)] bg-[color-mix(in_srgb,var(--color-forest)_8%,transparent)]",
  building: "border-[var(--color-terracotta)] text-[var(--color-terracotta)] bg-[color-mix(in_srgb,var(--color-terracotta)_8%,transparent)]",
  demo: "border-[var(--color-terracotta)] text-[var(--color-terracotta)] bg-[color-mix(in_srgb,var(--color-terracotta)_6%,transparent)]",
  fuzzy: "border-[var(--color-border)] text-[var(--color-ink-muted)] bg-[color-mix(in_srgb,var(--color-callout)_60%,transparent)]",
  planned: "border-[var(--color-accent-warm)] text-[var(--color-accent-warm)] bg-[color-mix(in_srgb,var(--color-accent-warm)_8%,transparent)]",
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
