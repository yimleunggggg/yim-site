/**
 * 站点内容配置 — 改数据不改页面结构
 */

export type AiLabCategory = "product" | "training" | "tutorial" | "doc";

export type AiLabEntry = {
  id: string;
  category: AiLabCategory;
  title: { zh: string; en: string };
  summary: { zh: string; en: string };
  tags: string[];
  status: { zh: string; en: string };
  href: string;
  fromProject?: { zh: string; en: string };
};

export type ProjectCase = {
  id: string;
  kind: "product" | "training";
  title: { zh: string; en: string };
  tagline: { zh: string; en: string };
  coverImage?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  status: { zh: string; en: string };
  href: string;
  derivedDocs?: {
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

export const aiLabEntries: AiLabEntry[] = [
  {
    id: "yakushima-bus",
    category: "product",
    title: { zh: "屋久岛公交查询", en: "Yakushima Bus Lookup" },
    summary: {
      zh: "旅行痛点 → Cursor Vibe Coding → 可访问的上线小工具。",
      en: "Travel pain point → Cursor vibe coding → live shipped tool.",
    },
    tags: ["Vibe Coding", "Next.js", "SEO"],
    status: { zh: "已上线", en: "Live" },
    href: "/ai-playbook/cases/yakushima-bus",
  },
  {
    id: "aigc-training",
    category: "training",
    title: { zh: "部门 AIGC 内训（4 周）", en: "AIGC Internal Training (4 weeks)" },
    summary: {
      zh: "给非技术同事：提示词、多模态、工作流、工具选型。完整章节公开。",
      en: "For non-technical teams: prompts, multimodal, workflows, tool selection.",
    },
    tags: ["Playbook", "Workshop", "Prompt"],
    status: { zh: "公开讲义", en: "Public notes" },
    href: "/ai-playbook#training",
  },
  {
    id: "methodology",
    category: "doc",
    title: { zh: "AI 工具交叉使用 · 方法论", en: "Cross-tool AI methodology" },
    summary: {
      zh: "任务导向选工具、组合路径、提问清单——不绑某个具体项目。",
      en: "Task-first tool selection, combo paths, question checklists.",
    },
    tags: ["Methodology", "Playbook"],
    status: { zh: "文档", en: "Doc" },
    href: "/ai-playbook/00-methodology",
  },
  {
    id: "vibe-coding-playbook",
    category: "doc",
    title: { zh: "Vibe Coding 从 0 到 1 上线", en: "Vibe Coding: zero to launch" },
    summary: {
      zh: "屋久岛项目的第一人称复盘，8 章可单独阅读。",
      en: "First-person build retrospective — 8 standalone chapters.",
    },
    tags: ["Vibe Coding", "Tutorial"],
    status: { zh: "文档", en: "Doc" },
    href: "/ai-playbook/cases/yakushima-bus/playbook/01-vibe-coding是什么",
    fromProject: { zh: "屋久岛公交", en: "Yakushima Bus" },
  },
  {
    id: "seo-playbook",
    category: "doc",
    title: { zh: "SEO 自动化实操（脱敏版）", en: "SEO automation notes" },
    summary: {
      zh: "同项目的 SEO 阶段目标、脚本与踩坑，可独立查阅。",
      en: "SEO goals, scripts, and pitfalls from the same build.",
    },
    tags: ["SEO", "Automation"],
    status: { zh: "文档", en: "Doc" },
    href: "/ai-playbook/cases/yakushima-bus/seo/01-目标与阶段",
    fromProject: { zh: "屋久岛公交", en: "Yakushima Bus" },
  },
  {
    id: "blog-vibe-coding",
    category: "tutorial",
    title: { zh: "Vibe Coding：不会写代码也能上线", en: "Vibe Coding without coding background" },
    summary: {
      zh: "博客短文：为什么做、怎么开始、链到完整文档。",
      en: "Blog post: why, how to start, links to full docs.",
    },
    tags: ["Blog", "AI"],
    status: { zh: "已发布", en: "Published" },
    href: "/blog/2025-vibe-coding-yakushima",
  },
  {
    id: "blog-playbook-why",
    category: "tutorial",
    title: { zh: "为什么把内训整理成公开 Playbook", en: "Why open-source training notes" },
    summary: {
      zh: "工具会过期，任务拆解和验收习惯可以留下。",
      en: "Tools expire; task breakdown habits don't.",
    },
    tags: ["Blog", "Training"],
    status: { zh: "已发布", en: "Published" },
    href: "/blog/2025-playbook-why",
  },
];

export const projectCases: ProjectCase[] = [
  {
    id: "yakushima-bus",
    kind: "product",
    title: { zh: "屋久岛公交查询", en: "Yakushima Bus Lookup" },
    tagline: {
      zh: "不会写代码，用 Cursor 做出可上线的小工具；附带 Vibe Coding 复盘与 SEO 文档。",
      en: "Shipped a live tool via Cursor — with build retrospective and SEO notes.",
    },
    coverImage: "/work/yakushima-cover.jpg",
    tags: ["Vibe Coding", "Next.js", "SEO"],
    liveUrl: "https://yakushimabus.com",
    githubUrl: "https://github.com/yimleunggggg/Yakushima-bus",
    status: { zh: "已上线", en: "Live" },
    href: "/ai-playbook/cases/yakushima-bus",
    derivedDocs: [
      {
        label: { zh: "从 0 到 1 上线", en: "Zero to launch" },
        href: "/ai-playbook/cases/yakushima-bus/playbook/01-vibe-coding是什么",
        desc: { zh: "Vibe Coding 第一人称复盘，8 章", en: "8-chapter build retrospective" },
      },
      {
        label: { zh: "SEO 自动化", en: "SEO automation" },
        href: "/ai-playbook/cases/yakushima-bus/seo/01-目标与阶段",
        desc: { zh: "同项目的 SEO 实操（脱敏公开版）", en: "Sanitized SEO notes from the same build" },
      },
    ],
  },
  {
    id: "aigc-training",
    kind: "training",
    title: { zh: "部门 AIGC 内训", en: "AIGC Internal Training" },
    tagline: {
      zh: "2024–2025 给非技术同事的 4 周培训：提示词、多模态、工作流、工具选型。",
      en: "4-week training for non-technical colleagues: prompts, multimodal, workflows.",
    },
    coverImage: "/work/training-cover.jpg",
    tags: ["Playbook", "Prompt", "Workshop"],
    status: { zh: "公开讲义", en: "Public notes" },
    href: "/ai-playbook#training",
    derivedDocs: [],
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
      num: "01",
      tag: "AI",
      title: "AI 实践",
      desc: "用 AI 做的产品、教程文档与内训讲义——不全是 Case。",
      href: "/work",
    },
    {
      num: "02",
      tag: "LIFE",
      title: "生活动态",
      desc: "图+短文",
      href: "/life",
    },
    {
      num: "03",
      tag: "BLOG",
      title: "博客",
      desc: "长文，按主题",
      href: "/blog",
    },
  ],
  en: [
    {
      num: "01",
      tag: "AI",
      title: "AI Lab",
      desc: "Products, tutorials, docs & training notes — not just cases.",
      href: "/work",
    },
    {
      num: "02",
      tag: "LIFE",
      title: "Moments",
      desc: "Photos + captions",
      href: "/life",
    },
    {
      num: "03",
      tag: "BLOG",
      title: "Blog",
      desc: "Long-form by topic",
      href: "/blog",
    },
  ],
} as const;
