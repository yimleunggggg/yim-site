import { TimeBadge } from "./TimeBadge";

type Props = {
  name: string;
  asOf: string;
  summary: string;
  pros?: string;
  cons?: string;
  freeTier?: string;
};

export function ToolCard({ name, asOf, summary, pros, cons, freeTier }: Props) {
  return (
    <div className="relative my-4 rounded-sm border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <div className="absolute right-3 top-3">
        <TimeBadge variant="original" date={asOf} mini />
      </div>
      <h4 className="mb-1 pr-20 font-serif text-lg font-semibold">{name}</h4>
      <p className="mb-2 text-sm text-[var(--color-ink-muted)]">{summary}</p>
      {(pros || cons || freeTier) && (
        <p className="font-mono text-xs text-[var(--color-ink-muted)]">
          {[pros && `擅长：${pros}`, cons && `注意：${cons}`, freeTier && `额度：${freeTier}`]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}
    </div>
  );
}
