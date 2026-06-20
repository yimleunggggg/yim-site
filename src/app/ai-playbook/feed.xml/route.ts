import { getAllChapters } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export async function GET() {
  const chapters = getAllChapters();
  const base = siteConfig.url;

  const items = chapters
    .map(
      (ch) => `
    <item>
      <title>${escapeXml(ch.title)}</title>
      <link>${base}/ai-playbook/${ch.slug}</link>
      <guid>${base}/ai-playbook/${ch.slug}</guid>
      <description>${escapeXml(ch.summary)}</description>
      <pubDate>${new Date(ch.originalDate).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${base}/ai-playbook</link>
    <description>${escapeXml(siteConfig.description)}</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
