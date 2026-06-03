type Props = {
  type?: "心法" | "技巧" | "注意";
  title?: string;
  children: React.ReactNode;
};

export function Callout({ type = "心法", title, children }: Props) {
  return (
    <aside className="my-6 border-l-[3px] border-[var(--color-forest)] bg-[var(--color-callout)] px-4 py-3">
      <p className="font-mono-index mb-1 text-[var(--color-forest)]">{type}</p>
      {title && (
        <p className="mb-2 font-serif text-lg font-semibold">{title}</p>
      )}
      <div className="text-[var(--color-ink-muted)] dark:text-[#a8a59f]">
        {children}
      </div>
    </aside>
  );
}
