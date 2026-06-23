/**
 * FRAMES · 摄影 / 旅行照片合集
 * ------------------------------------------------------------
 * 元信息（标题 / 地点 emoji / 标签 / 引言）写在 FRAMES_META，
 * 图片由脚本规范化到 public/media/frames/<slug>/：
 *   cover.jpg  + 01.jpg 02.jpg ...
 * 以后加新主题：新增一段素材跑 scripts/import-frames.sh，
 * 再在 FRAMES_META 里补一条即可，不用动页面代码。
 *
 * 地点 location 统一格式：国家 · 城市/区域（中国可加省：中国 · 广东 · 潮州）
 * 持续更新类：多地 · 持续更新 / 多国 · 路途
 */
import fs from "fs";
import path from "path";
import type { LText } from "./demo-data";

export { framesIntro, framesUi } from "./demo-frames-ui";
export type { FrameImageCaption } from "./demo-frames-ui";
import type { FrameImageCaption } from "./demo-frames-ui";

export type FrameMeta = {
  slug: string;
  /** 顶部排序，越小越靠前 */
  order: number;
  title: LText;
  /** 地点表情 */
  emoji: string;
  location: LText;
  tags: LText[];
  /** 3 句话内引言，可留空待补 */
  intro: LText;
};

export type Frame = FrameMeta & {
  cover: string;
  coverThumb: string;
  coverWidth: number;
  coverHeight: number;
  coverOrientation: "portrait" | "landscape";
  /** 详情页瀑布流：display 档（~1200px） */
  images: string[];
  /** 灯箱 / 放大：full 档（~2000px） */
  imagesFull: string[];
  /** 单张说明（如日落：文件名里的时间地点） */
  imageCaptions: FrameImageCaption[];
};

export const FRAMES_META: FrameMeta[] = [
  {
    slug: "semporna-bajau",
    order: 1,
    title: { zh: "海上游牧民族 巴瑶族", en: "The Bajau · Sea Nomads" },
    emoji: "🌊",
    location: { zh: "马来西亚 · 仙本那", en: "Malaysia · Semporna" },
    tags: [
      { zh: "海洋游牧", en: "Sea nomads" },
      { zh: "人文纪实", en: "Documentary" },
    ],
    intro: { zh: "", en: "" },
  },
  {
    slug: "sichuan-people",
    order: 2,
    title: { zh: "川西藏民生活画卷", en: "Life in Tibetan Sichuan" },
    emoji: "🧑‍🤝‍🧑",
    location: { zh: "中国 · 川西", en: "China · West Sichuan" },
    tags: [
      { zh: "人文", en: "People" },
      { zh: "纪实", en: "Documentary" },
      { zh: "肖像", en: "Portrait" },
    ],
    intro: { zh: "", en: "" },
  },
  {
    slug: "sichuan-landscape",
    order: 3,
    title: { zh: "藏地青绿与冷岩", en: "Green Valleys & Cold Rock" },
    emoji: "⛰️",
    location: { zh: "中国 · 川西", en: "China · West Sichuan" },
    tags: [
      { zh: "风光", en: "Landscape" },
      { zh: "高原", en: "Plateau" },
      { zh: "公路旅行", en: "Road trip" },
    ],
    intro: { zh: "", en: "" },
  },
  {
    slug: "window-views",
    order: 4,
    title: { zh: "前挡风玻璃外的电影帧（持续更新）", en: "Frames Through the Windshield · Ongoing" },
    emoji: "🚗",
    location: { zh: "多国 · 路途", en: "Multi · On the road" },
    tags: [
      { zh: "车窗", en: "Car window" },
      { zh: "路途", en: "Journey" },
      { zh: "持续更新", en: "Ongoing" },
    ],
    intro: { zh: "", en: "" },
  },
  {
    slug: "chaozhou",
    order: 5,
    title: { zh: "古城灯火 市井百态", en: "Old Town Lights & Street Life" },
    emoji: "🏯",
    location: { zh: "中国 · 广东 · 潮州", en: "China · Chaozhou, Guangdong" },
    tags: [
      { zh: "古城", en: "Old town" },
      { zh: "人文", en: "People" },
      { zh: "街巷", en: "Alleys" },
    ],
    intro: { zh: "", en: "" },
  },
  {
    slug: "daily",
    order: 6,
    title: { zh: "生活片段（持续更新）", en: "Life Fragments · Ongoing" },
    emoji: "📷",
    location: { zh: "多地 · 日常", en: "Multi · Daily life" },
    tags: [
      { zh: "日常", en: "Daily" },
      { zh: "街拍", en: "Street" },
      { zh: "碎片", en: "Fragments" },
    ],
    intro: { zh: "", en: "" },
  },
  {
    slug: "sunsets",
    order: 7,
    title: { zh: "永远喜欢日落", en: "Always the Sunset" },
    emoji: "🌅",
    location: { zh: "多地 · 日落", en: "Multi · Sunsets" },
    tags: [
      { zh: "日落", en: "Sunset" },
      { zh: "天空", en: "Sky" },
    ],
    intro: { zh: "", en: "" },
  },
  {
    slug: "gangneung",
    order: 8,
    title: { zh: "东海之滨", en: "By the East Sea" },
    emoji: "🌊",
    location: { zh: "韩国 · 江陵", en: "Korea · Gangneung" },
    tags: [
      { zh: "海岸", en: "Coast" },
      { zh: "小城", en: "Small town" },
      { zh: "东亚", en: "East Asia" },
    ],
    intro: { zh: "", en: "" },
  },
  {
    slug: "sri-lanka",
    order: 9,
    title: { zh: "在印度洋畔做志愿者", en: "Volunteering by the Indian Ocean" },
    emoji: "🤝",
    location: { zh: "斯里兰卡 · 南部", en: "Sri Lanka · South" },
    tags: [
      { zh: "义工", en: "Volunteer" },
      { zh: "人文", en: "People" },
      { zh: "印度洋", en: "Indian Ocean" },
    ],
    intro: { zh: "", en: "" },
  },
];

const FRAMES_ROOT = path.join(process.cwd(), "public/media/frames");

function readJpegSize(filePath: string): { width: number; height: number } | null {
  try {
    const buf = fs.readFileSync(filePath);
    let i = 2;
    while (i < buf.length - 8) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      if (marker === 0xc0 || marker === 0xc2 || marker === 0xc1) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  } catch {
    /* ignore */
  }
  return null;
}

function readCaptions(slug: string): FrameImageCaption[] {
  const p = path.join(FRAMES_ROOT, slug, "captions.json");
  if (!fs.existsSync(p)) return [];
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as FrameImageCaption[];
  } catch {
    return [];
  }
}

function readImages(slug: string): Omit<Frame, keyof FrameMeta> {
  const dir = path.join(FRAMES_ROOT, slug);
  const empty = {
    cover: "",
    coverThumb: "",
    coverWidth: 4,
    coverHeight: 3,
    coverOrientation: "landscape" as const,
    images: [] as string[],
    imagesFull: [] as string[],
    imageCaptions: [] as FrameImageCaption[],
  };
  if (!fs.existsSync(dir)) return empty;
  const files = fs.readdirSync(dir);
  const images = files
    .filter((f) => /^\d+\.jpg$/.test(f))
    .sort()
    .map((f) => {
      const thumb = f.replace(/\.jpg$/, "-thumb.jpg");
      const use = files.includes(thumb) ? thumb : f;
      return `/media/frames/${slug}/${use}`;
    });
  const imagesFull = files
    .filter((f) => /^\d+-full\.jpg$/.test(f))
    .sort()
    .map((f) => `/media/frames/${slug}/${f}`);
  const fullFallback = imagesFull.length > 0 ? imagesFull : images;
  const cover = files.includes("cover.jpg") ? `/media/frames/${slug}/cover.jpg` : images[0] ?? "";
  const coverThumb = files.includes("cover-thumb.jpg")
    ? `/media/frames/${slug}/cover-thumb.jpg`
    : cover;
  const sizePath = path.join(
    dir,
    files.includes("cover.jpg") ? "cover.jpg" : files.includes("cover-thumb.jpg") ? "cover-thumb.jpg" : "",
  );
  const size = sizePath && fs.existsSync(sizePath) ? readJpegSize(sizePath) : null;
  const coverWidth = size?.width ?? 4;
  const coverHeight = size?.height ?? 3;
  const coverOrientation: "portrait" | "landscape" =
    coverHeight > coverWidth ? "portrait" : "landscape";
  return {
    cover,
    coverThumb,
    coverWidth,
    coverHeight,
    coverOrientation,
    images,
    imagesFull: fullFallback,
    imageCaptions: readCaptions(slug).slice(0, images.length),
  };
}

export function getAllFrames(): Frame[] {
  return FRAMES_META.slice()
    .sort((a, b) => a.order - b.order)
    .map((m) => ({ ...m, ...readImages(m.slug) }));
}

export function getFrameSlugs(): string[] {
  return FRAMES_META.map((m) => m.slug);
}

export function getFrameBySlug(slug: string): Frame | null {
  const meta = FRAMES_META.find((m) => m.slug === slug);
  if (!meta) return null;
  return { ...meta, ...readImages(slug) };
}
