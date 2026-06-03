import { siteConfig } from "@/lib/site-config";

type Props = {
  href?: string;
  className?: string;
  label?: string;
};

export function GitHubSourceLink({
  href,
  className = "",
  label = "GitHub 完整版（含源码与导出素材）",
}: Props) {
  const url = href ?? siteConfig.githubContentUrl;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 font-mono text-sm text-[var(--color-forest)] underline underline-offset-2 hover:opacity-80 ${className}`}
    >
      {label}
      <span className="text-[10px] opacity-60">↗</span>
    </a>
  );
}

/** @deprecated 改用 GitHubSourceLink */
export function NotionLink(props: Props) {
  return <GitHubSourceLink {...props} label={props.label ?? "GitHub 完整版"} />;
}
