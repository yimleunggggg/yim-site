import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type LifeModuleId = "sports" | "travel" | "craft" | "photo";

export type LifeMoment = {
  id: string;
  date: string;
  module: LifeModuleId;
  tags: string[];
  images: string[];
  text: string;
  textEn?: string;
  pinToHome?: boolean;
};

const MOMENTS_DIR = path.join(process.cwd(), "content/life/moments");

export function getAllMoments(): LifeMoment[] {
  if (!fs.existsSync(MOMENTS_DIR)) return [];

  return fs
    .readdirSync(MOMENTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const id = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(MOMENTS_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      const parts = content.trim().split(/\n---+\n/);
      return {
        id,
        date: String(data.date ?? ""),
        module: (data.module as LifeModuleId) ?? "travel",
        tags: (data.tags as string[]) ?? [],
        images: (data.images as string[]) ?? [],
        text: parts[0]?.trim() ?? content.trim(),
        textEn: parts[1]?.trim(),
        pinToHome: Boolean(data.pinToHome),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** 首页 NOW / 近期动态：pin 优先，否则取最新 3 条 */
export function getRecentMoments(limit = 3): LifeMoment[] {
  const all = getAllMoments();
  const pinned = all.filter((m) => m.pinToHome);
  const rest = all.filter((m) => !m.pinToHome);
  return [...pinned, ...rest].slice(0, limit);
}

export function getMomentsByModule(module: LifeModuleId): LifeMoment[] {
  return getAllMoments().filter((m) => m.module === module);
}
