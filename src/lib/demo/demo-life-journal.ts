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
    oneLine: { zh: "杉林、苔原、雨中的岛——把步道当成另一种阅读方式。" },
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
    oneLine: { zh: "音乐、艺术、可持续——在热带把几天过成一种节奏。" },
    cover: "",
    images: [],
    body: [],
  },
  {
    id: "turning-31",
    date: "2025-09-22",
    title: { zh: "写在 31 岁这一天" },
    tags: ["随笔"],
    oneLine: { zh: "2025.9.22，写在 31 岁这一天。" },
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
    oneLine: { zh: "从田间到杯里——看一粒酒花怎么被认真对待。" },
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
    oneLine: { zh: "一周不说话、只走路和吃饭——把日子缩到最小单位。" },
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
    oneLine: { zh: "久违的暑假在海边度过了整个7月，生活满是海水味。" },
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
    oneLine: { zh: "第一次在水下呼吸，世界忽然安静下来。" },
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
    oneLine: { zh: "14 万人中选 30 人——第一次独自走向陌生的国家。" },
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
