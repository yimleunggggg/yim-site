import type { ProjectRelatedLink } from "./demo-project-meta";

function normalizeProjectUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/$/, "") || "/";
    return `${parsed.origin}${path}${parsed.search}`;
  } catch {
    return url.replace(/\/$/, "");
  }
}

/** 去掉与页头「访问 / 试用」重复的延伸阅读链接 */
export function filterDuplicateProjectRelatedLinks(
  links: ProjectRelatedLink[],
  actionUrls: Array<string | undefined>,
): ProjectRelatedLink[] {
  const normalizedActions = new Set(
    actionUrls.filter(Boolean).map((url) => normalizeProjectUrl(url!)),
  );
  const isDuplicate = (url: string) => normalizedActions.has(normalizeProjectUrl(url));

  return links
    .map((link) => {
      if (link.items?.length) {
        const items = link.items.filter((item) => !isDuplicate(item.url));
        if (!items.length) return null;
        return { ...link, items };
      }
      if (link.url && isDuplicate(link.url)) return null;
      return link;
    })
    .filter((link): link is ProjectRelatedLink => Boolean(link));
}

export function projectActionUrlsMatch(a?: string, b?: string): boolean {
  if (!a || !b) return false;
  return normalizeProjectUrl(a) === normalizeProjectUrl(b);
}
