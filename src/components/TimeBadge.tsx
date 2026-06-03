"use client";

type Variant = "original" | "supplement" | "archived";

type Props = {
  variant?: Variant;
  date: string;
  mini?: boolean;
  title?: string;
};

export function TimeBadge({
  variant = "original",
  date,
  mini = false,
  title,
}: Props) {
  const month = date.slice(0, 7);
  const labels: Record<Variant, string> = {
    original: mini ? month : `课堂实录 · ${month}`,
    supplement: `补充 · ${month}`,
    archived: `历史参考 · ${month}`,
  };

  const classes: Record<Variant, string> = {
    original:
      "bg-[#efebe3] border border-[#d4cfc4] text-[#5c5a54] dark:bg-[#2a2826] dark:border-[#3a3835] dark:text-[#8a877f]",
    supplement: "text-[var(--color-forest)] font-medium",
    archived:
      "border border-dashed border-[#c8c4bc] text-[#8a877f] dark:border-[#4a4845]",
  };

  return (
    <span
      className={`inline-block whitespace-nowrap rounded-[2px] px-2 py-0.5 font-mono text-[11px] tracking-wide uppercase ${classes[variant]}`}
      title={title ?? `${date} · 飞书最后修改`}
    >
      {labels[variant]}
    </span>
  );
}
