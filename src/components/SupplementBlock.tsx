import { TimeBadge } from "./TimeBadge";

type Props = {
  date: string;
  children: React.ReactNode;
};

export function SupplementBlock({ date, children }: Props) {
  return (
    <div className="my-6 border-l-2 border-[var(--color-forest)] pl-4">
      <div className="mb-2">
        <TimeBadge variant="supplement" date={date} />
      </div>
      <div className="text-[var(--color-ink-muted)] dark:text-[#a8a59f]">
        {children}
      </div>
    </div>
  );
}
