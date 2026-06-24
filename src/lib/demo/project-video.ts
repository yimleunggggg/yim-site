/** 将 YouTube / Bilibili / 本地 mp4 转为可嵌入形式 */
export function resolveProjectVideo(
  url: string,
): { kind: "iframe"; src: string } | { kind: "video"; src: string } | null {
  const raw = url.trim();
  if (!raw) return null;

  if (raw.startsWith("/") || raw.endsWith(".mp4") || raw.endsWith(".webm")) {
    return { kind: "video", src: raw };
  }

  try {
    const u = new URL(raw);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "");
      if (id) return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }
    if (u.hostname.includes("bilibili.com")) {
      const m = u.pathname.match(/\/video\/(BV[\w]+)/i);
      if (m) return { kind: "iframe", src: `https://player.bilibili.com/player.html?bvid=${m[1]}&high_quality=1` };
    }
    if (u.hostname.includes("player.bilibili.com")) {
      return { kind: "iframe", src: raw };
    }
  } catch {
    return null;
  }

  return null;
}
