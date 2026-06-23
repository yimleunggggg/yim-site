import type { LText } from "./demo-data";

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

function imgs(slug: string, n: number): string[] {
  return Array.from({ length: n }, (_, i) =>
    `/life/journal/${slug}/${String(i + 1).padStart(2, "0")}.jpg`,
  );
}

export const demoLifeJournal: LifeJournalEntry[] = [
  {
    id: "yakushima",
    date: "2026-05",
    title: { zh: "日本屋久岛 · 徒步与露营" },
    location: { zh: "鹿儿岛 · 屋久岛" },
    tags: ["旅行", "徒步", "露营"],
    oneLine: { zh: "杉林、苔原、雨中的岛——把步道当成另一种阅读方式。" },
    cover: "/life/journal/yakushima/cover.jpg",
    images: imgs("yakushima", 8),
    body: [],
  },
  {
    id: "wonderfruit",
    date: "2025-12",
    title: { zh: "Wonderfruit · 十周年" },
    location: { zh: "泰国" },
    tags: ["音乐节", "旅行"],
    oneLine: { zh: "音乐、艺术、可持续——在热带把几天过成一种节奏。" },
    cover: "/life/journal/wonderfruit/cover.jpg",
    images: imgs("wonderfruit", 8),
    body: [],
  },
  {
    id: "turning-31",
    date: "2025-09-22",
    title: { zh: "写在 31 岁这一天" },
    tags: ["随笔"],
    oneLine: { zh: "2025.9.22，写在 31 岁这一天。" },
    cover: "/life/journal/turning-31/cover.jpg",
    images: ["/life/journal/turning-31/01.jpg"],
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
    cover: "/life/journal/gansu-hops/cover.jpg",
    images: imgs("gansu-hops", 8),
    body: [],
  },
  {
    id: "pa-pae",
    date: "2025-01",
    title: { zh: "Pa Pae · 禅修营" },
    location: { zh: "泰国" },
    tags: ["禅修", "旅行"],
    oneLine: { zh: "一周不说话、只走路和吃饭——把日子缩到最小单位。" },
    cover: "/life/journal/pa-pae/cover.jpg",
    images: imgs("pa-pae", 8),
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
    cover: "/life/journal/keep-growing/cover.jpg",
    images: imgs("keep-growing", 8),
    body: [
      {
        zh: "好像来到了一个，自然发生的，很大的「人生节点」，其实什么大事儿都没完成。一直对它充满莫名的兴奋和期待——终于更能称的上是一个大人了。也是离家的第11年，搬家第11次。",
      },
      {
        zh: "从上一个秋天到这个秋天，也是「自主失业」的一年。在惠州海边一个月晒太阳也尝试冲浪；在仙本那学习潜水；回到上海加入三个月、每周六练无休的拳击训练营；开始了夜跑和力量训练——感受到正在有一个越来越「好用」的身体。",
      },
      {
        zh: "我并不觉得，如果从头到尾一直做正确的判断，以一种最有效的方式度过人生，会让我比现在活得更好。永远三十来岁，是面对压力或无端质问时的无所谓态度——祝你拥抱阅历，接受衰老，依然年轻；祝你自由。",
      },
    ],
  },
  {
    id: "surf-volunteer",
    date: "2023-07",
    title: { zh: "冲浪店义工 · 七月的海水味" },
    location: { zh: "广东惠州" },
    tags: ["冲浪", "义工", "随笔"],
    oneLine: { zh: "久违的暑假在海边度过了整个7月，生活满是海水味。" },
    cover: "/life/journal/surf-volunteer/cover.jpg",
    images: imgs("surf-volunteer", 8),
    body: [
      {
        zh: "走时候和大家说，写字楼的光线和空气都太闷了，想去晒太阳和吹风以及无所事事。恰巧很久之前朋友推荐的冲浪店在招义工，就来了。",
      },
      {
        zh: "有时候早上九点开第一瓶酒，有时候中午，有时候下午。没有工作日和非工作日，靠游客变多来判断今天是不是周末。开始每天看一眼月亮，临近傍晚带着桨板下海，追着日落的方向。",
      },
      {
        zh: "2013-2023，离开内蒙刚好十年，给自己踩了个急刹车。呆的地方在惠州边边，离所有交通枢纽都百公里以上，还是见了三波上海、深圳、广州来的朋友。整个七月的记录更频繁了些——持续不断记录，意义自然浮现。",
      },
    ],
  },
  {
    id: "sabah-ow",
    date: "2023-08",
    title: { zh: "OW 潜水证 · 马来西亚亚庇" },
    location: { zh: "沙巴 · 亚庇" },
    tags: ["潜水", "旅行"],
    oneLine: { zh: "第一次在水下呼吸，世界忽然安静下来。" },
    cover: "/life/journal/sabah-ow/cover.jpg",
    images: imgs("sabah-ow", 8),
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
