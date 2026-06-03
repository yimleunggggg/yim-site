type Props = {
  before: string;
  after: string;
  issue?: string;
};

export function BeforeAfter({ before, after, issue }: Props) {
  return (
    <div className="my-6">
      {issue && (
        <p className="mb-3 font-mono-index text-[var(--color-terracotta)]">
          学员常见问题 · {issue}
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-sm border border-[var(--color-border)] border-t-2 border-t-[var(--color-terracotta)] p-4">
          <p className="font-mono-index mb-2 text-[var(--color-terracotta)]">
            常见写法
          </p>
          <p className="text-sm">{before}</p>
        </div>
        <div className="rounded-sm border border-[var(--color-border)] border-t-2 border-t-[var(--color-forest)] p-4 transition-colors hover:bg-[var(--color-callout)]">
          <p className="font-mono-index mb-2 text-[var(--color-forest)]">
            推荐写法
          </p>
          <p className="text-sm">{after}</p>
        </div>
      </div>
    </div>
  );
}
