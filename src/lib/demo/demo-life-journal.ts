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
  /** 无 flow 时：正文在前、图在文末 */
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
    const imagesAtEnd =
      entry.imagesAtEnd ?? (flow == null && assets.images.length > 0);
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

const journalEntriesBase: LifeJournalEntry[] = [
  {
    id: "yakushima",
    date: "2026-05",
    title: { zh: "日本屋久岛 · 徒步与露营", en: "Yakushima · Trekking & Camping" },
    location: { zh: "鹿儿岛 · 屋久岛", en: "Kagoshima · Yakushima" },
    tags: ["旅行", "徒步", "露营"],
    oneLine: {
      zh: "屋久岛重装徒步，雨下了整整六小时，鞋里灌满水。",
      en: "Backpacking Yakushima — six hours of rain, shoes full of water.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "wonderfruit",
    date: "2025-12",
    title: { zh: "Wonderfruit · 十周年", en: "Wonderfruit · 10th Anniversary" },
    location: { zh: "泰国", en: "Thailand" },
    tags: ["音乐节", "旅行"],
    oneLine: {
      zh: "Wonderfruit 十周年，帐篷、音乐、艺术和一堆脏脚丫。",
      en: "Wonderfruit at ten — tents, music, art, and very dirty feet.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "turning-31",
    date: "2025-09-22",
    title: { zh: "写在 31 岁这一天", en: "On Turning 31" },
    tags: ["随笔"],
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "west-sichuan-2025",
    date: "2025-06",
    title: { zh: "川西 Road Trip", en: "West Sichuan Road Trip" },
    location: { zh: "四川 · 川西", en: "Sichuan · Western Sichuan" },
    tags: ["旅行", "川西"],
    oneLine: {
      zh: "几天几段，车窗外的山与云。",
      en: "Days on the road — mountains and clouds through the window.",
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
    title: { zh: "Pa Pae · 禅修营", en: "Pa Pae · Meditation Retreat" },
    location: { zh: "泰国", en: "Thailand" },
    tags: ["禅修", "旅行"],
    oneLine: {
      zh: "泰国 Pa Pae，一周禁语，只剩走路、吃饭和坐着。",
      en: "Pa Pae, Thailand — a week of silence, walking, eating, sitting.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "keep-growing",
    date: "2024-09-22",
    title: { zh: "继续生长 · 写在 30 岁", en: "Keep Growing · On Turning 30" },
    tags: ["随笔"],
    oneLine: {
      zh: "好像来到了一个很大的「人生节点」，其实什么大事儿都没完成。",
      en: "Felt like a big life milestone — hadn't actually finished anything big.",
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
    id: "surf-volunteer",
    date: "2023-07",
    title: { zh: "冲浪店义工 · 七月的海水味", en: "Surf Shop Volunteer · July by the Sea" },
    location: { zh: "广东惠州", en: "Huizhou, Guangdong" },
    tags: ["冲浪", "义工", "随笔"],
    oneLine: {
      zh: "惠州冲浪店义工，整个七月泡在海水和防晒里。",
      en: "Surf shop volunteer in Huizhou — all of July in salt water and sunscreen.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "sabah-ow",
    date: "2023-08",
    title: { zh: "OW 潜水证 · 马来西亚亚庇", en: "OW Certification · Kota Kinabalu" },
    location: { zh: "沙巴 · 亚庇", en: "Sabah · Kota Kinabalu" },
    tags: ["潜水", "旅行"],
    oneLine: {
      zh: "亚庇学 OW，第一次咬着呼吸器在水下走路。",
      en: "Open Water in Kota Kinabalu — first steps underwater with a regulator.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "sri-lanka",
    date: "2016-06",
    title: { zh: "斯里兰卡 · 国际义工", en: "Sri Lanka · International Volunteer" },
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

export const demoLifeJournal = withImportedBodies(journalEntriesBase);

export function getLifeJournalSlugs(): string[] {
  return demoLifeJournal.map((e) => e.id);
}

export function getLifeJournalBySlug(slug: string): LifeJournalEntry | undefined {
  return demoLifeJournal.find((e) => e.id === slug);
}
