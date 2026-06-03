type Props = {
  children: React.ReactNode;
};

export function PullQuote({ children }: Props) {
  return (
    <blockquote className="my-8 border-l-4 border-[var(--color-forest)] pl-6 font-serif text-xl leading-relaxed text-[var(--color-ink)] italic dark:text-[#e8e4dc]">
      {children}
    </blockquote>
  );
}
