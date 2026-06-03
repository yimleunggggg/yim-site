/**
 * 站点内容配置 — 改数据不改页面结构
 */

export type ProjectCase = {
  id: string;
  title: { zh: string; en: string };
  tagline: { zh: string; en: string };
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string; // 预览视频（YouTube / 本地 mp4）
  status: { zh: string; en: string };
  derivedDocs: {
    label: { zh: string; en: string };
    href: string;
    desc: { zh: string; en: string };
  }[];
};

export type LifeModule = {
  id: string;
  label: { zh: string; en: string };
  emoji: string;
};

export type LifeStory = {
  id: string;
  title: { zh: string; en: string };
  module: LifeModule["id"];
  format: { zh: string; en: string };
  status: "draft" | "ready";
  href?: string;
};

export const projectCases: ProjectCase[] = [
  {
    id: "yakushima-bus",
    title: { zh: "屋久岛公交查询", en: "Yakushima Bus Lookup" },
    tagline: {
      zh: "不会写代码，用 Cursor 对话做出可上线的小工具 —— 同项目的 Vibe Coding 复盘与 SEO 文档都在下面。",
      en: "Shipped a live tool via Cursor without writing code — playbook and SEO notes from the same project.",
    },
    liveUrl: "https://yakushimabus.com",
    githubUrl: "https://github.com/yimleunggggg/Yakushima-bus",
    videoUrl: undefined, // TODO: 填入预览视频 URL
    status: { zh: "已上线", en: "Live" },
    derivedDocs: [
      {
        label: { zh: "从 0 到 1 上线", en: "Zero to launch" },
        href: "/ai-playbook/cases/yakushima-bus/playbook/01-vibe-coding是什么",
        desc: {
          zh: "Vibe Coding 第一人称复盘，8 章",
          en: "8-chapter build retrospective",
        },
      },
      {
        label: { zh: "SEO 自动化", en: "SEO automation" },
        href: "/ai-playbook/cases/yakushima-bus/seo/01-目标与阶段",
        desc: {
          zh: "同项目的 SEO 实操（脱敏公开版）",
          en: "Sanitized SEO notes from the same build",
        },
      },
    ],
  },
];

export const lifeModules: LifeModule[] = [
  { id: "sports", label: { zh: "运动", en: "Sports" }, emoji: "🏃" },
  { id: "travel", label: { zh: "旅行", en: "Travel" }, emoji: "✈️" },
  { id: "craft", label: { zh: "精酿", en: "Craft Beer" }, emoji: "🍺" },
  { id: "photo", label: { zh: "摄影", en: "Photography" }, emoji: "📷" },
];

/** 故事卡片占位 — 你写好一篇就改 status → ready 并填 href */
export const lifeStories: LifeStory[] = [
  {
    id: "sri-lanka",
    title: { zh: "斯里兰卡义工 · 14 万选 30", en: "Sri Lanka volunteering" },
    module: "travel",
    format: { zh: "图文故事", en: "Photo story" },
    status: "draft",
  },
  {
    id: "chiangmai-half",
    title: { zh: "清迈旅居 + 意外半马", en: "Chiang Mai & surprise half marathon" },
    module: "sports",
    format: { zh: "图文 + 路线", en: "Story + route" },
    status: "draft",
  },
  {
    id: "lamma",
    title: { zh: "南丫岛 · 十年老朋友", en: "Lamma Island — a decade" },
    module: "travel",
    format: { zh: "随笔", en: "Essay" },
    status: "draft",
  },
  {
    id: "shanghai-group",
    title: { zh: "疫情上海团长 · 60 次开团", en: "Shanghai group-buy lead" },
    module: "travel",
    format: { zh: "随笔", en: "Essay" },
    status: "draft",
  },
  {
    id: "craft-hk",
    title: { zh: "精酿局：香港徒步 + 酒厂 + 离岛", en: "Craft beer hike HK" },
    module: "craft",
    format: { zh: "活动图集", en: "Gallery" },
    status: "draft",
  },
  {
    id: "bishan-fest",
    title: { zh: "碧山村 / 新疆酒花农场", en: "Bishan & hop farm" },
    module: "craft",
    format: { zh: "活动图集", en: "Gallery" },
    status: "draft",
  },
  {
    id: "papae",
    title: { zh: "Pa Pae 禅修营", en: "Pa Pae retreat" },
    module: "travel",
    format: { zh: "图文", en: "Photo story" },
    status: "draft",
  },
  {
    id: "yakushima-hike",
    title: { zh: "屋久岛 21km 雨中独行", en: "Yakushima 21km in rain" },
    module: "sports",
    format: { zh: "图文", en: "Photo story" },
    status: "draft",
  },
];

export const homeHub = {
  zh: [
    {
      tag: "AI",
      title: "AI Playbook",
      desc: "部门内训讲义 + 项目 Cases（屋久岛公交等）",
      href: "/ai-playbook",
    },
    {
      tag: "ABOUT",
      title: "关于我",
      desc: "履历、经历、合作方式",
      href: "/about",
    },
    {
      tag: "LIFE",
      title: "生活记录",
      desc: "旅行、运动、精酿、摄影",
      href: "/life",
    },
  ],
  en: [
    {
      tag: "AI",
      title: "AI Playbook",
      desc: "Training notes + project cases",
      href: "/ai-playbook",
    },
    {
      tag: "ABOUT",
      title: "About",
      desc: "Background & collaboration",
      href: "/about",
    },
    {
      tag: "LIFE",
      title: "Life",
      desc: "Travel, sports, craft beer, photos",
      href: "/life",
    },
  ],
} as const;
