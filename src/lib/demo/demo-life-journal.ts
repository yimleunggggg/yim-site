/**
 * Life Journal 条目注册表
 *
 * ┌────────────────────┬──────────────────────────────────────────────┐
 * │ 列表标题/日期/地点 │ 本文件 title / date / location               │
 * │ 列表摘要 oneLine   │ 本文件 oneLine（改完保存 + 刷新即生效）       │
 * │ 标签 tags          │ 本文件 tags                                  │
 * │ 正文段落           │ 写在本文件 body[]，或 life-journal-bodies.json │
 * │ 飞书篇正文+小标题  │ life-journal-flow.json（31岁/川西/斯里兰卡）  │
 * └────────────────────┴──────────────────────────────────────────────┘
 *
 * 注意：body 留空 [] 时会被 json/flow 覆盖，你在本文件改正文不会生效。
 * 双语：改 zh 时请同步 en；不维护英文可删掉 en，英文界面会回退显示中文。
 * 若只要本文件：设 importBodyFromFile: false，或把段落写进 body[]。
 * 若不要飞书 flow：设 useFlow: false。
 */
import type { LText } from "./demo-data";
import journalBodies from "./life-journal-bodies.json";
import journalFlow from "./life-journal-flow.json";
import journalImages from "./life-journal-images.json";
import type { LayoutBlock } from "./life-article-layout";

export type LifeJournalEntry = {
  id: string;
  date: string;
  title: LText;
  location?: LText;
  tags: string[];
  oneLine?: LText;
  cover: string;
  images: string[];
  /** 飞书导入的 ordered flow；优先于 body + images 拼装 */
  flow?: LayoutBlock[];
  /** 段落数组，空则仅展示图片 */
  body: LText[];
  /** 长图条目：modal 内图片完整展示 */
  imageFirst?: boolean;
  /** 无 flow 时：正文在前、图在文末 masonry 2–3 张混排（Life Archive 本地篇默认） */
  imagesAtEnd?: boolean;
  /** 默认读 life-journal-bodies.json；false = 只用本条目 body */
  importBodyFromFile?: boolean;
  /** 默认有 flow 就用；false = 不用飞书 flow */
  useFlow?: boolean;
};

function journalAssets(slug: string): { cover: string; images: string[] } {
  const a = journalImages[slug as keyof typeof journalImages];
  if (!a) return { cover: "", images: [] };
  return a;
}

function flowFromFile(id: string): LayoutBlock[] | null {
  const flow = journalFlow[id as keyof typeof journalFlow];
  if (!flow?.length) return null;
  return flow as LayoutBlock[];
}

function bodyFromFile(id: string): LText[] {
  const paragraphs = journalBodies[id as keyof typeof journalBodies];
  if (!paragraphs?.length) return [];
  return paragraphs.map((zh) => ({ zh }));
}

function withImportedBodies(entries: LifeJournalEntry[]): LifeJournalEntry[] {
  return entries.map((entry) => {
    const imported = bodyFromFile(entry.id);
    const assets = journalAssets(entry.id);
    const importedFlow = flowFromFile(entry.id);
    const localBody = entry.body.filter((p) => pickBodyText(p).trim().length > 0);
    const body =
      entry.importBodyFromFile === false
        ? entry.body
        : localBody.length > 0
          ? localBody
          : imported;
    // 本地写了正文时不用飞书 flow，否则文章页仍走 flow
    const flow =
      entry.useFlow === false || localBody.length > 0 || entry.importBodyFromFile === false
        ? undefined
        : (importedFlow ?? undefined);
    const imagesAtEnd = entry.imagesAtEnd ?? flow == null;
    return {
      ...entry,
      cover: assets.cover || entry.cover,
      images: assets.images.length ? assets.images : entry.images,
      flow,
      body,
      imagesAtEnd,
    };
  });
}

function pickBodyText(p: LText): string {
  return p.zh ?? p.en ?? "";
}

function sortJournalByDate(entries: LifeJournalEntry[]): LifeJournalEntry[] {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}

const journalEntriesBase: LifeJournalEntry[] = [
  {
    id: "yakushima",
    date: "2026-05",
    title: {
      zh: "海上原始森林，万物静默，野蛮生长",
      en: "Ancient forest by the sea — quiet, wild, and growing",
    },
    location: { zh: "日本，屋久岛", en: "Japan · Yakushima" },
    tags: ["露营", "徒步", "背包旅行"],
    oneLine: {
      zh: "自己在海边扎营，醒了就进山徒步，晚上找温泉洗漱，又野又自在的离岛生活",
      en: "Camped by the sea, hiked by day, hot springs at night — wild and free on a remote island",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "wonderfruit",
    date: "2025-12",
    title: {
      zh: "音乐，音乐太美好了",
      en: "The music — the music was so beautiful",
    },
    location: { zh: "泰国，芭提雅", en: "Thailand · Pattaya" },
    tags: ["音乐节", "冥想", "露营", "背包旅行"],
    oneLine: {
      zh: "在田中扎营、音乐、艺术和一堆脏脚丫",
      en: "Camped in the fields — music, art, and very dirty feet",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "turning-31",
    date: "2025-09",
    title: { zh: "写在 31 岁这一天", en: "On Turning 31" },
    location: { zh: "中国，杭州", en: "China · Hangzhou" },
    tags: ["随笔", "日记"],
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "west-sichuan-2025",
    date: "2025-05",
    title: {
      zh: "临时起意的road trip",
      en: "A last-minute road trip",
    },
    location: { zh: "中国，川藏", en: "China · Sichuan–Tibet route" },
    tags: ["公路", "自驾游", "旅行"],
    oneLine: {
      zh: "几天几段，与山与云",
      en: "Days and segments — with mountains and clouds",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "two-years-off",
    date: "2025-05",
    title: { zh: "离开职场两年", en: "Two Years Off Work" },
    tags: ["随笔"],
    oneLine: {
      zh: "没在职场的这段时间，成长速度比过去二十多年都快。",
      en: "Away from the office, I grew faster than in the previous twenty-plus years.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "pa-pae",
    date: "2025-01",
    title: {
      zh: "泰北山中禅修几日",
      en: "A few days of meditation in the northern hills",
    },
    location: { zh: "泰国，清迈", en: "Thailand · Chiang Mai" },
    tags: ["禅修", "旅行", "佛教"],
    oneLine: {
      zh: "学习审视自己的身体，和自己对话",
      en: "Learning to notice my body and talk to myself",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "keep-growing",
    date: "2024-09",
    title: { zh: "写在 30 岁这一天", en: "On Turning 30" },
    location: { zh: "中国，广东，广州", en: "China · Guangzhou, Guangdong" },
    tags: ["随笔", "日记"],
    oneLine: {
      zh: "好像来到了一个很大的人生节点，其实什么大事儿都没完成。",
      en: "Felt like a huge life milestone — hadn't actually finished anything big.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "lamma-island",
    date: "2024-09",
    title: {
      zh: "离岛上喝酒认识年长30岁的老友 一见十年",
      en: "Drinks on the island — a godfather thirty years older, ten years in one night",
    },
    location: { zh: "香港，南丫岛", en: "Hong Kong · Lamma Island" },
    tags: ["旅行", "随笔"],
    oneLine: {
      zh: "十年，时移势易，世界纷纭，小岛恒常。",
      en: "Ten years — the world shifts, the little island stays the same.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "aboro-boxing",
    date: "2024-06",
    title: { zh: "ABORO AKO · 拳击训练营", en: "ABORO AKO · Boxing Camp" },
    location: { zh: "上海", en: "Shanghai" },
    tags: ["拳击", "运动"],
    oneLine: {
      zh: "一周六练，学会如何「打人」和「挨打」。",
      en: "Six days a week — learning to throw and take a punch.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "sabah-ow",
    date: "2023-08",
    title: {
      zh: "「它将永远改变您体验世界的方式」",
      en: "It will forever change the way you experience the world",
    },
    location: { zh: "马来西亚，仙本那", en: "Malaysia · Semporna" },
    tags: ["潜水", "背包旅行"],
    oneLine: {
      zh: "亚庇学 OW，第一次咬着呼吸器在水下走路。",
      en: "Open Water in Kota Kinabalu — first steps underwater with a regulator.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "surf-volunteer",
    date: "2023-07",
    title: {
      zh: "风景是别的 人是别的 又是别的",
      en: "Different scenery, different people, something else again",
    },
    location: { zh: "中国，广东，惠州", en: "China · Huizhou, Guangdong" },
    tags: ["义工", "冲浪", "随笔"],
    oneLine: {
      zh: "在冲浪店做了一个月义工，生活满是海水味，满身夏天的痕迹",
      en: "A month volunteering at a surf shop — life smelled of seawater and traces of summer",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "sri-lanka",
    date: "2016-06",
    title: {
      zh: "印度洋上的明珠",
      en: "Pearl of the Indian Ocean",
    },
    location: { zh: "斯里兰卡", en: "Sri Lanka" },
    tags: ["义工", "旅行"],
    oneLine: {
      zh: "14 万报名者里选 30 人，17 岁第一次独自出国做义工。",
      en: "30 picked from 140k applicants — first solo trip abroad at 17.",
    },
    cover: "",
    images: [],
    body: [],
  },
];

export const demoLifeJournal = sortJournalByDate(withImportedBodies(journalEntriesBase));

export function getLifeJournalSlugs(): string[] {
  return demoLifeJournal.map((e) => e.id);
}

export function getLifeJournalBySlug(slug: string): LifeJournalEntry | undefined {
  return demoLifeJournal.find((e) => e.id === slug);
}
