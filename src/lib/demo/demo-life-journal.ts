import type { LText } from "./demo-data";
import journalBodies from "./life-journal-bodies.json";
import journalImages from "./life-journal-images.json";

export type LifeJournalEntry = {
  id: string;
  date: string;
  title: LText;
  location?: LText;
  tags: string[];
  oneLine: LText;
  cover: string;
  images: string[];
  /** 段落数组，空则仅展示图片 */
  body: LText[];
  /** 长图条目：modal 内图片完整展示 */
  imageFirst?: boolean;
};

function journalAssets(slug: string): { cover: string; images: string[] } {
  const a = journalImages[slug as keyof typeof journalImages];
  if (!a) return { cover: "", images: [] };
  return a;
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
    return {
      ...entry,
      cover: assets.cover || entry.cover,
      images: assets.images.length ? assets.images : entry.images,
      body: imported.length ? imported : entry.body,
    };
  });
}

const journalEntriesBase: LifeJournalEntry[] = [
  {
    id: "yakushima",
    date: "2026-05",
    title: { zh: "日本屋久岛 · 徒步与露营" },
    location: { zh: "鹿儿岛 · 屋久岛" },
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
    title: { zh: "Wonderfruit · 十周年" },
    location: { zh: "泰国" },
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
    title: { zh: "写在 31 岁这一天" },
    tags: ["随笔"],
    oneLine: {
      zh: "2025.9.22，31 岁这天写给自己的长图——向下滚动查看全文。",
      en: "Sep 22, 2025 — a long visual note to myself at 31. Scroll for the full image.",
    },
    cover: "",
    images: [],
    body: [],
    imageFirst: true,
  },
  {
    id: "gansu-hops",
    date: "2025-08",
    title: { zh: "甘肃酒花田 · 中国酒花共创计划" },
    location: { zh: "甘肃" },
    tags: ["精酿", "旅行"],
    oneLine: {
      zh: "甘肃酒花田，第一次见鲜啤酒花，闻起来像青柠和草。",
      en: "Gansu hop fields — first time smelling fresh hops, like lime and grass.",
    },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "pa-pae",
    date: "2025-01",
    title: { zh: "Pa Pae · 禅修营" },
    location: { zh: "泰国" },
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
    title: { zh: "继续生长 · 写在 30 岁" },
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
    id: "surf-volunteer",
    date: "2023-07",
    title: { zh: "冲浪店义工 · 七月的海水味" },
    location: { zh: "广东惠州" },
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
    title: { zh: "OW 潜水证 · 马来西亚亚庇" },
    location: { zh: "沙巴 · 亚庇" },
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
    title: { zh: "斯里兰卡 · 国际义工" },
    location: { zh: "斯里兰卡" },
    tags: ["义工", "旅行"],
    oneLine: {
      zh: "14 万报名者里选 30 人，17 岁第一次独自出国做义工。",
      en: "30 picked from 140k applicants — first solo trip abroad at 17.",
    },
    cover: "",
    images: [],
    body: [
      {
        zh: "2016 年夏天，参加斯里兰卡国际义工项目。从 14 万申请者中被选入 30 人，在 Yala 周边参与社区与环保相关的工作。",
      },
      {
        zh: "那是我较早的一次「把自己丢进完全陌生的环境」——语言不通、习俗不同，但学会了在不确定里把事情做完。后来很多次独旅和换城，都能追溯到这次的经验。",
      },
    ],
  },
];

export const demoLifeJournal = withImportedBodies(journalEntriesBase);

export function getLifeJournalSlugs(): string[] {
  return demoLifeJournal.map((e) => e.id);
}

export function getLifeJournalBySlug(slug: string): LifeJournalEntry | undefined {
  return demoLifeJournal.find((e) => e.id === slug);
}
