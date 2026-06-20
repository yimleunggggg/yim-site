/**
 * Demo 个人站 · 唯一的结构化内容入口
 * ------------------------------------------------------------
 * 改这一个文件就能更新：NOW 动态、走马灯照片、运动时间线、
 * 生活体验、项目卡、首页探索卡 / 精选卡、关于页履历 / 证书等。
 *
 * 约定：
 * - 文案用 { zh, en? }，中文为主；en 缺省时回退中文（见 pickText）。
 * - slogan / eyebrow 等英文短句直接写英文字符串。
 * - 图片路径复用 public/ 下现有资源；缺图用 demo-gradient 占位。
 */

export type LText = { zh: string; en?: string };

export function pickText(t: LText, zh: boolean): string {
  return zh ? t.zh : t.en ?? t.zh;
}

/* ----------------------------- 个人信息 ----------------------------- */

export const demoProfile = {
  name: { zh: "梁言", en: "Yim" } as LText,
  email: "yimleung.ly@gmail.com",
  location: { zh: "杭州，偶尔上海", en: "Hangzhou, sometimes Shanghai" } as LText,
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/yiiimleung/", handle: "@yiiimleung" },
    { label: "即刻", href: "#" },
    { label: "小红书", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "https://github.com/yimleunggggg" },
  ],
};

/* ----------------------------- 首页 HERO ---------------------------- */

export const demoHero = {
  eyebrow: "Currently in Hangzhou · Exploring",
  titleLine1: "Living with",
  titleLine2Italic: "intention,",
  titleLine3: "building with",
  titleLine4: "curiosity.",
  marqueeCaption: {
    zh: "冲浪、潜水、越野、精酿——生活里的真实片段",
    en: "Surf, dive, trail, craft beer — real fragments of life",
  } as LText,
};

/* ------------------------------- NOW ------------------------------- */

export type DemoNowItem = { date: string; emoji: string; text: LText };

export const demoNow: DemoNowItem[] = [
  {
    date: "2026.06",
    emoji: "🏃",
    text: {
      zh: "Xterra 苏州虞阳夜跑 21km 完赛",
      en: "Xterra Suzhou Yuyang Night Run, 21km",
    },
  },
  {
    date: "2026.05",
    emoji: "🛠️",
    text: {
      zh: "yakushimabus 上线",
      en: "yakushimabus shipped",
    },
  },
  {
    date: "2026.05",
    emoji: "🏃",
    text: {
      zh: "NNormal Cadi、Hoka 莫干山 20km 完赛",
      en: "NNormal Cadi & Hoka Moganshan, 20km",
    },
  },
  {
    date: "2026.05",
    emoji: "🥾",
    text: {
      zh: "屋久岛重装徒步，海滩露营",
      en: "Yakushima backpacking, beach camp",
    },
  },
  {
    date: "2026.04",
    emoji: "🏃",
    text: {
      zh: "莫干山 UTMB EMG 20km 完赛",
      en: "Moganshan UTMB EMG, 20km",
    },
  },
  {
    date: "2026.03",
    emoji: "⛰️",
    text: {
      zh: "黄金海岸 43km 越野，2207m 爬升",
      en: "Gold Coast 43km, 2207m gain",
    },
  },
  {
    date: "2026.03",
    emoji: "💼",
    text: { zh: "再次离职", en: "Left my job again" },
  },
  {
    date: "2026.03",
    emoji: "🏅",
    text: {
      zh: "上海半马 2:10:45，比清迈首场 PB 11 分钟",
      en: "Shanghai HM 2:10:45, 11-min PB",
    },
  },
  {
    date: "2026.01",
    emoji: "🎓",
    text: {
      zh: "开始部门 AIGC 培训",
      en: "Started team AIGC training",
    },
  },
];

/** NOW 侧栏默认展示条数 */
export const demoNowPreviewCount = 5;

/* --------------------------- WHAT I EXPLORE ------------------------- */

export type DemoExploreCard = {
  id: string;
  icon: string;
  eyebrow: string;
  title: LText;
  desc: LText;
  status: string;
  latest: LText;
  linkLabel: LText;
  href: string;
};

export const demoExplore: DemoExploreCard[] = [
  {
    id: "movement",
    icon: "⛰",
    eyebrow: "MOVEMENT",
    title: { zh: "Trails & Movement" },
    desc: {
      zh: "越野跑、徒步、冲浪、潜水、拳击。身体知道的，心智还在慢慢想明白。",
      en: "Trail running, hiking, surfing, diving, boxing. The body knows things the mind is still figuring out.",
    },
    status: "ONGOING",
    latest: { zh: "屋久岛 21KM · 2025.05", en: "Yakushima 21KM · 2025.05" },
    linkLabel: { zh: "LIFE ARCHIVE →", en: "LIFE ARCHIVE →" },
    href: "/life",
  },
  {
    id: "building",
    icon: "◈",
    eyebrow: "BUILDING",
    title: { zh: "Learning in progress" },
    desc: {
      zh: "用 AI 做自己想用的工具，顺便把过程写下来。没有大项目，只有持续在做、在试、在学的状态。",
      en: "Building the tools I want with AI, writing the process down. No big projects — just doing, trying, and learning.",
    },
    status: "CURRENT FOCUS",
    latest: { zh: "PACKLOG 上线 · 2026.05", en: "PACKLOG shipped · 2026.05" },
    linkLabel: { zh: "PROJECTS & WRITING →", en: "PROJECTS & WRITING →" },
    href: "/about#projects",
  },
  {
    id: "elsewhere",
    icon: "○",
    eyebrow: "ELSEWHERE",
    title: { zh: "Travel, people & the rest" },
    desc: {
      zh: "旅行、禅修、精酿、音乐节、志愿者、与陌生人喝酒认识了十年的朋友——不太好分类的那些事。",
      en: "Travel, retreats, craft beer, festivals, volunteering, friends made over drinks — things that don't fit a box.",
    },
    status: "ALWAYS",
    latest: { zh: "大阪 · 2026.06", en: "Osaka · 2026.06" },
    linkLabel: { zh: "FRAMES →", en: "FRAMES →" },
    href: "/frames",
  },
];

/* --------------------------- 走马灯照片带 --------------------------- */

export type DemoMarqueePhoto = { src: string; label: LText; width: number; height: number };

/** 首页走马灯：public/marquee/，由 scripts/import-frames.sh 生成；width/height 用于横竖比例展示 */
export const demoMarqueePhotos: DemoMarqueePhoto[] = [
  { src: "/marquee/01.jpg", label: { zh: "越野跑", en: "Trail" }, width: 1333, height: 2000 },
  { src: "/marquee/02.jpg", label: { zh: "生活", en: "Life" }, width: 1333, height: 2000 },
  { src: "/marquee/03.jpg", label: { zh: "打包", en: "Packing" }, width: 1500, height: 2000 },
  { src: "/marquee/04.jpg", label: { zh: "徒步", en: "Hike" }, width: 1315, height: 2000 },
  { src: "/marquee/05.jpg", label: { zh: "越野", en: "Trail run" }, width: 1317, height: 2000 },
  { src: "/marquee/06.jpg", label: { zh: "跑步", en: "Run" }, width: 1333, height: 2000 },
  { src: "/marquee/07.jpg", label: { zh: "半马", en: "Half marathon" }, width: 1326, height: 2000 },
  { src: "/marquee/08.jpg", label: { zh: "摩托", en: "Ride" }, width: 1334, height: 2000 },
  { src: "/marquee/09.jpg", label: { zh: "斯巴达", en: "Spartan" }, width: 1334, height: 2000 },
  { src: "/marquee/10.jpg", label: { zh: "精酿", en: "Craft beer" }, width: 2000, height: 1333 },
  { src: "/marquee/11.jpg", label: { zh: "生活", en: "Life" }, width: 1500, height: 2000 },
  { src: "/marquee/12.jpg", label: { zh: "户外", en: "Outdoors" }, width: 1500, height: 2000 },
  { src: "/marquee/13.jpg", label: { zh: "探索", en: "Explore" }, width: 1499, height: 2000 },
];

/** 首页 UI 文案（全部走 i18n，组件内不写死） */
export const demoHomeUi = {
  nowTitle: { zh: "近期动态", en: "Recent" } as LText,
  nowViewAll: { zh: "全部 →", en: "All →" } as LText,
  nowLatest: { zh: "LATEST", en: "LATEST" } as LText,
  exploreEyebrow: { zh: "WHAT I EXPLORE", en: "WHAT I EXPLORE" } as LText,
  exploreTitle: { zh: "我在探索的三件事", en: "Three things I explore" } as LText,
  marqueeViewAll: { zh: "全部 →", en: "All →" } as LText,
  modalClose: { zh: "关闭", en: "Close" } as LText,
};

/** Footer UI 文案 */
export const demoFooterUi = {
  sectionEyebrow: { zh: "联系我", en: "GET IN TOUCH" } as LText,
  contactHint: {
    zh: "合作、招聘或随便聊聊，邮件即可。",
    en: "For work, collaboration, or a hello — email works.",
  } as LText,
  markLine1: { zh: "Not one thing.", en: "Not one thing." } as LText,
  markLine2: { zh: "Never was.", en: "Never was." } as LText,
  copyright: { zh: "Demo 版本", en: "Demo build" } as LText,
  emailLabel: { zh: "发送邮件", en: "Email" } as LText,
  instagramLabel: { zh: "Instagram", en: "Instagram" } as LText,
};

/* ----------------------------- 首页精选 ----------------------------- */

export type DemoFeatured = {
  id: string;
  kind: "project" | "writing";
  badge: LText;
  title: LText;
  desc: LText;
  href: string;
  cta: LText;
  // 占位渐变（缺图项目用）
  gradient?: string;
  cover?: string;
};

export const demoFeatured: DemoFeatured[] = [
  {
    id: "packlog",
    kind: "project",
    badge: { zh: "产品 · Live" },
    title: { zh: "PACKLOG · 背包侠" },
    desc: { zh: "管理户外装备的小工具，称重、清单、出行决策一站搞定。" },
    href: "/projects/packlog",
    cta: { zh: "View all work →" },
    gradient: "linear-gradient(135deg,#2d4a3e,#4a7c6f)",
  },
  {
    id: "yakushima-21km",
    kind: "writing",
    badge: { zh: "旅行随笔" },
    title: { zh: "屋久岛雨中 21km" },
    desc: { zh: "一个人、一场雨、一条没有捷径的路。" },
    href: "/writing/yakushima-21km",
    cta: { zh: "Read more →" },
    cover: "/life/moments/sichuan/01.jpg",
  },
  {
    id: "ai-shipped-product",
    kind: "writing",
    badge: { zh: "教程" },
    title: { zh: "怎么用 AI 做了一个上线产品" },
    desc: { zh: "不会写代码的人，如何把一个想法真的推到线上。" },
    href: "/writing/ai-shipped-product",
    cta: { zh: "Read more →" },
    gradient: "linear-gradient(135deg,#b85c38,#c4956a)",
  },
];

/* ------------------------------ 关于页 ------------------------------ */

export const demoAbout = {
  intro: [
    {
      zh: "做过 8 年用户运营与品牌数字化，现在在杭州探索 AI 工具、户外运动和独立构建。",
      en: "Eight years in user ops and brand digitalization — now in Hangzhou, exploring AI tools, the outdoors, and building on my own.",
    },
  ] as LText[],
  tags: {
    zh: ["Builder", "户外", "独旅", "精酿", "INTP"],
    en: ["Builder", "Outdoors", "Solo travel", "Craft beer", "INTP"],
  },
};

/* ----------------------------- 工作履历 ----------------------------- */

export type DemoWork = {
  id: string;
  company: LText;
  role: LText;
  period: string;
  location: LText;
  tags: { zh: string[]; en: string[] };
  bullets: { zh: string[]; en: string[] };
};

export const demoWork: DemoWork[] = [
  {
    id: "tanlink",
    company: { zh: "棠联科技 · Tanlink Corp", en: "Tanlink Corp" },
    role: { zh: "私域经理", en: "Owned Channel & User Operations Manager" },
    period: "2025.07 – 2026.03",
    location: { zh: "杭州", en: "Hangzhou" },
    tags: {
      zh: ["消费电子", "DTC", "海外社区", "CDP", "用户数据", "AI培训", "活动策划"],
      en: ["Consumer Electronics", "DTC", "Overseas Community", "CDP", "User Data", "AI Training", "Event Planning"],
    },
    bullets: {
      zh: [
        "出海 DTC 品牌用户运营与海外社区建设",
        "WOLFBOX 海外社区 0→1，参与产品选型、内容结构与冷启动规划",
        "参与 CDP 规划与全渠道用户数据整合",
        "负责品牌部门 AI 工具培训，覆盖 20+ 人，落地内容生产与工作流提效",
      ],
      en: [
        "User ops and overseas community for outbound DTC brands",
        "WOLFBOX community 0 to 1 — platform selection, content structure and cold-start planning",
        "CDP planning and cross-channel data integration",
        "Led AI training for brand team (20+ people), covering content production and workflow efficiency",
      ],
    },
  },
  {
    id: "beer-matters",
    company: { zh: "啤酒事务局 · Beer Matters", en: "Beer Matters" },
    role: { zh: "合伙人（电商 & 线下活动）", en: "Partner, E-commerce & Events" },
    period: "2023.07 – 2025.06",
    location: { zh: "远程", en: "Remote" },
    tags: {
      zh: ["精酿啤酒", "线下活动", "电商运营", "社群运营", "小红书", "视频内容", "商务合作"],
      en: ["Craft Beer", "Offline Events", "E-commerce", "Community", "Xiaohongshu", "Video Content", "Business Dev"],
    },
    bullets: {
      zh: [
        "电商运营 × 线下活动 × 内容，小团队远程协作",
        "与全国 50+ 酒厂沟通合作，管理商务与平台运营",
        "策划并带队精酿主题活动，香港、安徽、甘肃等地",
      ],
      en: [
        "E-commerce, events and content in a small remote team",
        "Business partnerships with 50+ breweries nationwide",
        "Planned and led themed trips across China and HK",
      ],
    },
  },
  {
    id: "classy-kiss",
    company: { zh: "卡士乳业 · CLASSY KISS Yoghurt", en: "CLASSY KISS Yoghurt" },
    role: { zh: "全域会员运营经理", en: "Membership & Digital Operations Manager" },
    period: "2021.08 – 2023.07",
    location: { zh: "上海", en: "Shanghai" },
    tags: {
      zh: ["食品快消", "团队管理", "用户数字化", "CRM", "CDP", "用户增长", "私域电商"],
      en: ["FMCG", "Team Management", "User Digitalization", "CRM", "CDP", "User Growth", "Private Domain"],
    },
    bullets: {
      zh: [
        "管理 6–7 人团队，主导品牌数字化会员体系建设",
        "从 0 搭建会员中心小程序，参与产品需求与数据埋点，负责 CDP 标签体系与全渠道数据打通",
        "年增会员 48 万，周留存同比 +15pp",
      ],
      en: [
        "Led 6–7 person team on digital membership system",
        "Mini-program from 0 to 1 — product requirements, data tracking, CDP tagging and cross-channel integration",
        "+480K members in one year · Weekly retention +15pp YoY",
      ],
    },
  },
  {
    id: "jd",
    company: { zh: "京东 · JD.com", en: "JD.com" },
    role: { zh: "商家运营", en: "Merchant Operations" },
    period: "2021.01 – 2021.08",
    location: { zh: "北京", en: "Beijing" },
    tags: {
      zh: ["互联网电商", "户外露营", "商家管理", "品类运营", "商务合作"],
      en: ["E-commerce", "Outdoor & Camping", "Merchant Management", "Category Ops", "Business Dev"],
    },
    bullets: {
      zh: [
        "户外露营类目，170+ 商家分层运营与品类结构梳理",
        "通过 ISPO 等行业展会拓展户外品牌商务合作",
        "头腰部 GMV 占比同比 +11%",
      ],
      en: [
        "170+ merchants in outdoor and camping, tiered operations",
        "Brand BD via ISPO and industry events",
        "Head/mid-tier GMV share +11% YoY",
      ],
    },
  },
  {
    id: "ant",
    company: { zh: "蚂蚁集团 · Alipay / Ant Group", en: "Alipay / Ant Group" },
    role: { zh: "产品运营", en: "Product Operations" },
    period: "2020.06 – 2021.01",
    location: { zh: "杭州", en: "Hangzhou" },
    tags: {
      zh: ["互联网", "用户增长", "工具活跃", "用户分层", "A/B测试", "产品协作"],
      en: ["Internet", "User Growth", "Tool Activation", "User Segmentation", "A/B Testing", "Product Collaboration"],
    },
    bullets: {
      zh: [
        "支付宝端内记账本工具用户增长",
        "用户分层运营，A/B 测试优化投放 ROI",
        "与产品团队协作推动功能迭代",
      ],
      en: [
        "User growth for Alipay's in-app bookkeeping tool",
        "Segmentation and A/B testing to optimize channel ROI",
        "Collaborated with product team on feature iteration",
      ],
    },
  },
  {
    id: "simplove",
    company: { zh: "简爱酸奶 · Simple Love Yogurt", en: "Simple Love Yogurt" },
    role: { zh: "运营经理", en: "Operations Manager" },
    period: "2018.04 – 2020.02",
    location: { zh: "广州 / 上海", en: "Guangzhou / Shanghai" },
    tags: {
      zh: ["食品快消", "私域0→1", "电商运营", "用户分层", "小程序", "产品规划", "活动策划"],
      en: ["FMCG", "Private Domain 0→1", "E-commerce", "User Segmentation", "Mini-program", "Product Planning", "Event Planning"],
    },
    bullets: {
      zh: [
        "品牌微信私域商城从 0 到 1，参与小程序产品规划与转化漏斗优化",
        "复购率 16% → 33%，全年销售 4500 万，KPI 165%",
      ],
      en: [
        "WeChat private domain store from 0 to 1 — mini-program product planning and conversion funnel optimization",
        "Repurchase 16% → 33% · Sales RMB 45M · KPI 165%",
      ],
    },
  },
];

/* ------------------------------ 关于页 · 项目 ------------------------------- */

export type ProjectStatus = "live" | "building" | "demo" | "fuzzy" | "planned";
export type ProjectCategory = "product" | "travel" | "sport" | "experience";

export const projectStatusLabel: Record<ProjectStatus, LText> = {
  live: { zh: "已上线", en: "Live" },
  building: { zh: "在做", en: "Building" },
  demo: { zh: "Demo 中", en: "Demo" },
  fuzzy: { zh: "想法中", en: "Fuzzy" },
  planned: { zh: "计划中", en: "Planned" },
};

export const projectCategoryLabel: Record<ProjectCategory, LText> = {
  product: { zh: "产品", en: "Product" },
  travel: { zh: "旅行", en: "Travel" },
  sport: { zh: "运动", en: "Sport" },
  experience: { zh: "体验", en: "Experience" },
};

export type DemoAboutProject = {
  slug: string;
  title: LText;
  tagline: LText;
  desc?: LText;
  status: ProjectStatus;
  categories: ProjectCategory[];
  liveUrl?: string;
};

export const demoAboutProjects: DemoAboutProject[] = [
  {
    slug: "packlog",
    title: { zh: "Packlog", en: "Packlog" },
    tagline: {
      zh: "面向户外与频繁出行者的场景化装备管理工具",
      en: "Gear and packing management tool for outdoor and frequent travelers",
    },
    desc: {
      zh: "基于徒步、旅行和多场景打包需求独立开发。支持场景化行程创建、克级重量统计、装备库管理及社区清单克隆，集成 Supabase 认证与云端同步。",
      en: "Built from personal hiking and travel packing needs. Supports trip-based packing, gram-level weight tracking, gear library management and community list cloning. Integrated Supabase auth and cloud sync.",
    },
    status: "demo",
    categories: ["product"],
  },
  {
    slug: "yakushima-bus-now",
    title: { zh: "Yakushima Bus", en: "Yakushima Bus" },
    tagline: {
      zh: "屋久岛交通查询工具，三语静态站",
      en: "Trilingual transit info tool for Yakushima island travelers",
    },
    desc: {
      zh: "日本旅行期间发现离岛交通讯息分散且查询不便，开发并上线当地交通查询工具。含视频介绍、功能说明与访问链接。",
      en: "Built during a Japan trip when island transit info was scattered and hard to query — a dedicated local transit tool with video intro, feature overview and live link.",
    },
    status: "live",
    categories: ["product", "travel"],
    liveUrl: "https://yakushimabus.com",
  },
  {
    slug: "offtrack",
    title: { zh: "OFFTRACK · 野路子", en: "OFFTRACK" },
    tagline: {
      zh: "户外运动爱好者的社交平台，接入 Strava、Garmin 等运动数据",
      en: "Social platform for outdoor athletes, powered by Strava, Garmin and activity data",
    },
    desc: {
      zh: "AI 驱动的户外运动社交平台，通过接入 Strava、Garmin 等运动数据 API，利用 AI 分析用户运动行为模式，自动生成运动画像标签，并基于行为数据的语义匹配实现精准社交推荐。区别于传统社交 APP 的自报告式匹配，用行为代替说话。",
      en: "AI-powered social platform for outdoor athletes. Integrates Strava, Garmin and activity APIs to analyze behavior patterns, auto-generate sport profile tags, and match people through semantic behavior data — actions over self-descriptions.",
    },
    status: "demo",
    categories: ["product", "sport"],
  },
  {
    slug: "self-discovery",
    title: { zh: "自我探索系列", en: "Self-discovery series" },
    tagline: { zh: "用工具了解自己", en: "Tools for self-knowledge" },
    desc: {
      zh: "Music DNA 是起点。延伸方向包括：用电影了解自己（CineMate）、结合日记、日程和人生 milestone 的记录工具——把碎片变成可以回望的轨迹。核心逻辑是：不是你说自己是什么样的人，而是你的行为告诉你。",
      en: "Music DNA is the starting point. Extensions include using film as a mirror (CineMate), and a journaling tool that connects diary entries, schedules and life milestones into something you can look back on. Your behavior knows you better than your self-description.",
    },
    status: "fuzzy",
    categories: ["product", "experience"],
  },
  {
    slug: "camino-de-santiago",
    title: { zh: "西班牙朝圣之路 · Camino de Santiago", en: "Camino de Santiago" },
    tagline: { zh: "步行穿越西班牙", en: "Walking across Spain" },
    status: "planned",
    categories: ["travel", "sport"],
  },
  {
    slug: "triathlon",
    title: { zh: "铁人三项", en: "Triathlon" },
    tagline: { zh: "学游泳中", en: "Currently learning to swim" },
    status: "planned",
    categories: ["sport", "experience"],
  },
  {
    slug: "kazakhstan-horse-trek",
    title: { zh: "哈萨克斯坦 Horse Trek", en: "Kazakhstan Horse Trek" },
    tagline: { zh: "骑马穿越草原", en: "Horseback across the steppe" },
    status: "planned",
    categories: ["travel", "experience"],
  },
];

/* ------------------------------ 项目（详情页） ------------------------------- */

export type DemoProject = {
  slug: string;
  title: LText;
  tagline: LText;
  type: LText;
  status: LText;
  statusTone: "live" | "wip" | "done";
  period: string;
  liveUrl?: string;
  githubUrl?: string;
  cover?: string;
  gradient?: string;
};

/** 完成的项目 → 各自有独立详情页 /projects/[slug] */
export const demoProjects: DemoProject[] = [
  {
    slug: "packlog",
    title: { zh: "PACKLOG · 背包侠" },
    tagline: { zh: "户外装备管理工具：称重、清单、出行决策。" },
    type: { zh: "产品 · Vibe Coding" },
    status: { zh: "Live" },
    statusTone: "live",
    period: "2026",
    liveUrl: "#",
    gradient: "linear-gradient(135deg,#2d4a3e,#4a7c6f)",
  },
  {
    slug: "music-dna",
    title: { zh: "Music DNA · 音乐 DNA" },
    tagline: { zh: "用 AI 分析你的听歌习惯，生成专属音乐身份。" },
    type: { zh: "产品 · AI" },
    status: { zh: "Live" },
    statusTone: "live",
    period: "2026",
    liveUrl: "#",
    gradient: "linear-gradient(135deg,#b85c38,#c4956a)",
  },
  {
    slug: "yakushima-bus-now",
    title: { zh: "Yakushima Bus Now" },
    tagline: { zh: "屋久岛巴士查询，三语静态站，旅行刚需。" },
    type: { zh: "产品 · 静态站" },
    status: { zh: "Live" },
    statusTone: "live",
    period: "2025",
    liveUrl: "https://yakushimabus.com",
    githubUrl: "https://github.com/yimleunggggg/Yakushima-bus",
    cover: "/work/yakushima-cover.jpg",
  },
  {
    slug: "ai-training",
    title: { zh: "AI 内部培训" },
    tagline: { zh: "为公司搭建 AI 工作流，沉淀多篇可复用内容。" },
    type: { zh: "培训 · 内容" },
    status: { zh: "多篇内容" },
    statusTone: "done",
    period: "2024–2025",
    cover: "/work/training-cover.jpg",
  },
  {
    slug: "beer-matters",
    title: { zh: "啤酒事务局" },
    tagline: { zh: "精酿内容 × 社群 × 活动 × 电商，一条龙。" },
    type: { zh: "社群 · 品牌" },
    status: { zh: "运营中" },
    statusTone: "done",
    period: "2023–至今",
    cover: "/life/moments/bishan-fest/01.jpg",
  },
  {
    slug: "classy-kiss-membership",
    title: { zh: "卡士会员中心" },
    tagline: { zh: "职业项目：从 0 搭建全域会员体系。" },
    type: { zh: "职业项目 · CRM" },
    status: { zh: "已交付" },
    statusTone: "done",
    period: "2021–2023",
    gradient: "linear-gradient(135deg,#5c5a54,#8a877f)",
  },
];

/** About 页项目 + 详情页 slug 并集 */
export function getAllDemoProjectSlugs(): string[] {
  const slugs = new Set<string>();
  for (const p of demoAboutProjects) slugs.add(p.slug);
  for (const p of demoProjects) slugs.add(p.slug);
  return [...slugs];
}

export function getDemoAboutProject(slug: string): DemoAboutProject | undefined {
  return demoAboutProjects.find((p) => p.slug === slug);
}

export function getDemoProjectDetail(slug: string): DemoProject | undefined {
  return demoProjects.find((p) => p.slug === slug);
}

/** 在做 & 计划中 → 表格 */
export type DemoPlanned = {
  name: string;
  desc: LText;
  status: LText;
  tone: "active" | "idea" | "someday";
};

export const demoPlanned: DemoPlanned[] = [
  { name: "OFFTRACK", desc: { zh: "找到和你一样能动的人" }, status: { zh: "在做" }, tone: "active" },
  { name: "CineMate", desc: { zh: "用电影了解自己" }, status: { zh: "在做" }, tone: "active" },
  { name: "自我探索系列", desc: { zh: "模糊的概念" }, status: { zh: "模糊的概念" }, tone: "idea" },
  { name: "3D 打印玩具跨境", desc: { zh: "只是在想" }, status: { zh: "只是在想" }, tone: "idea" },
  { name: "朝圣之路 Camino de Santiago", desc: { zh: "心里一直放着" }, status: { zh: "心里放着" }, tone: "someday" },
  { name: "铁人三项", desc: { zh: "迟早的事" }, status: { zh: "迟早的事" }, tone: "someday" },
];

/* ------------------------------ 生活页 ------------------------------ */

export const demoLifeHeader = {
  title: { zh: "Life Archive", en: "Life Archive" } as LText,
  tagline: {
    zh: "Field Notes from Movement, Places and People",
    en: "Field Notes from Movement, Places and People",
  } as LText,
};

/** 3.1 生活体验 Dispatches */
export type DemoDispatch = {
  id: string;
  title: LText;
  location?: LText;
  date: string;
  oneLine: LText;
  cover?: string;
  gradient?: string;
  images?: string[];
  text: LText;
  format?: "default" | "diary";
  media?: "photos" | "photos-video";
};

export const demoDispatches: DemoDispatch[] = [
  {
    id: "yakushima-2026",
    title: { zh: "日本屋久岛徒步及露营", en: "Yakushima Trek & Camp" },
    location: { zh: "日本 · 屋久岛", en: "Yakushima, Japan" },
    date: "2026.5",
    oneLine: { zh: "一周重装，在苔藓与雨里走。", en: "A week of backpacking through moss and rain." },
    cover: "/life/moments/japan-camp/01.jpg",
    images: ["/life/moments/japan-camp/01.jpg"],
    text: { zh: "正文与更多照片整理中。", en: "Photos and notes coming soon." },
  },
  {
    id: "wonderfruit-2025",
    title: { zh: "Wonderfruit 十周年", en: "Wonderfruit 10th Anniversary" },
    location: { zh: "泰国 · 春武里", en: "Chonburi, Thailand" },
    date: "2025.12",
    oneLine: { zh: "稻田、音乐、艺术装置，和来自世界各地的怪人。", en: "Rice fields, music, art — and beautiful strangers." },
    cover: "/life/moments/bishan-fest/01.jpg",
    images: ["/life/moments/bishan-fest/01.jpg"],
    text: { zh: "正文与更多照片整理中。", en: "Photos and notes coming soon." },
  },
  {
    id: "kailas-trail-camp",
    title: { zh: "凯乐石大坡王越野训练营", en: "Kailas Trail Training Camp" },
    location: { zh: "中国", en: "China" },
    date: "2025.9–11",
    oneLine: { zh: "爬坡、下坡、再爬坡——把腿练成工具。", en: "Climb, descend, repeat — legs as tools." },
    cover: "/life/moments/hoka-trail/01.jpg",
    images: ["/life/moments/hoka-trail/01.jpg", "/life/moments/hoka-trail/02.jpg"],
    text: { zh: "正文与更多照片整理中。", en: "Photos and notes coming soon." },
  },
  {
    id: "gansu-hops",
    title: { zh: "甘肃酒花田之旅 · 中国酒花共创计划", en: "Gansu Hop Fields · China Hop Co-creation" },
    location: { zh: "甘肃", en: "Gansu" },
    date: "2025.8",
    oneLine: { zh: "从田到杯，看一颗酒花怎么变成风味。", en: "From field to glass — how hops become flavor." },
    cover: "/life/moments/brewery-jiaxing/01.jpg",
    images: ["/life/moments/brewery-jiaxing/01.jpg"],
    text: { zh: "正文与更多照片整理中。", en: "Photos and notes coming soon." },
  },
  {
    id: "sichuan-roadtrip",
    title: { zh: "川西 Road Trip", en: "Western Sichuan Road Trip" },
    location: { zh: "四川 · 川西", en: "Western Sichuan" },
    date: "2025.6",
    oneLine: { zh: "几天几段，车窗外的山与云。", en: "Days on the road — mountains and clouds through the window." },
    format: "diary",
    cover: "/life/moments/sichuan/01.jpg",
    images: ["/life/moments/sichuan/01.jpg"],
    text: { zh: "日记体正文整理中，会按天展开。", en: "Diary entries by day — coming soon." },
  },
  {
    id: "hk-brewery-lamma",
    title: { zh: "香港酒厂探访及离岛徒步", en: "HK Brewery Tour & Island Hike" },
    location: { zh: "香港", en: "Hong Kong" },
    date: "2025.3",
    oneLine: { zh: "带队走酒厂，再坐船去离岛。", en: "Leading a brewery crawl, then ferry to the islands." },
    cover: "/life/moments/lamma/01.png",
    images: ["/life/moments/lamma/01.png"],
    text: { zh: "正文与更多照片整理中。", en: "Photos and notes coming soon." },
  },
  {
    id: "pa-pae-2025",
    title: { zh: "Pa Pae Meditation Retreat", en: "Pa Pae Meditation Retreat" },
    location: { zh: "泰国 · Pa Pae", en: "Pa Pae, Thailand" },
    date: "2025.1",
    oneLine: { zh: "断网一周，只和自己的念头待在一起。", en: "A week offline — just you and your thoughts." },
    cover: "/life/moments/pa-pae/01.jpg",
    images: ["/life/moments/pa-pae/01.jpg"],
    text: { zh: "没有手机、没有交谈，每天打坐、走路、吃饭。安静到能听见脑子里的噪音，然后它慢慢退潮。", en: "No phone, no talking — meditate, walk, eat. Notes coming soon." },
  },
  {
    id: "chiang-mai-2024",
    title: { zh: "清迈旅居 · 因半马而留下", en: "Chiang Mai — Stayed for a Half Marathon" },
    location: { zh: "泰国 · 清迈", en: "Chiang Mai, Thailand" },
    date: "2024.12",
    oneLine: { zh: "本来只待几天，跑完半马后租房住了 1.5 个月。", en: "Planned a few days; stayed 1.5 months after the half." },
    cover: "/life/moments/pa-pae/01.jpg",
    images: ["/life/moments/pa-pae/01.jpg"],
    text: { zh: "正文与更多照片整理中。", en: "Photos and notes coming soon." },
  },
  {
    id: "ningxia-wine",
    title: { zh: "宁夏红酒酒庄探访", en: "Ningxia Wine Country" },
    location: { zh: "宁夏", en: "Ningxia" },
    date: "2024.8",
    oneLine: { zh: "戈壁上的葡萄藤，和意外好喝的一杯。", en: "Vines in the Gobi — and a surprisingly good glass." },
    gradient: "linear-gradient(135deg,#5c2a2a,#8b4a4a)",
    text: { zh: "正文与更多照片整理中。", en: "Photos and notes coming soon." },
  },
  {
    id: "aboro-ako",
    title: { zh: "ABORO AKO 全集训练营", en: "ABORO AKO Full Training Camp" },
    location: { zh: "中国", en: "China" },
    date: "2024.4–6",
    oneLine: { zh: "拳击、体能、对抗——被规律地揍也规律地变强。", en: "Boxing, conditioning, sparring — getting hit, getting stronger." },
    cover: "/life/moments/spartan/01.jpg",
    images: ["/life/moments/spartan/01.jpg"],
    text: { zh: "正文与更多照片整理中。", en: "Photos and notes coming soon." },
  },
  {
    id: "beer-fest-stall",
    title: { zh: "啤酒节摆摊", en: "Beer Festival Stall" },
    location: { zh: "中国", en: "China" },
    date: "2024.3",
    oneLine: { zh: "站在吧台后面，看人群和杯子。", en: "Behind the bar — watching crowds and glasses." },
    cover: "/life/moments/bishan-fest/01.jpg",
    images: ["/life/moments/bishan-fest/01.jpg"],
    text: { zh: "正文整理中。", en: "Notes coming soon." },
  },
  {
    id: "sabah-ow",
    title: { zh: "马来西亚亚庇 · OW 潜水证", en: "Kota Kinabalu · Open Water Cert" },
    location: { zh: "马来西亚 · 亚庇", en: "Kota Kinabalu, Malaysia" },
    date: "2023.8",
    oneLine: { zh: "第一次用呼吸器在水下呼吸。", en: "First time breathing underwater with a regulator." },
    cover: "/life/moments/sup-malaysia/01.jpg",
    images: ["/life/moments/sup-malaysia/01.jpg"],
    text: { zh: "正文整理中。", en: "Notes coming soon." },
  },
  {
    id: "surf-volunteer",
    title: { zh: "冲浪店义工 · 一个月", en: "Surf Shop Volunteer · One Month" },
    location: { zh: "广东 · 惠州", en: "Huizhou, Guangdong" },
    date: "2023.7",
    oneLine: { zh: "在海边做义工，顺便把冲浪练成了习惯。", en: "Volunteering by the sea — surfing became a habit." },
    cover: "/life/moments/surf-cafe/01.jpg",
    images: ["/life/moments/surf-cafe/01.jpg"],
    text: { zh: "每天看潮汐、看浪、看人。海浪不会等你准备好，这一点很像生活。", en: "Tides, waves, people — the ocean doesn't wait. Notes coming soon." },
  },
  {
    id: "shanghai-group-leader",
    title: { zh: "上海疫情团长 · 两个月", en: "Shanghai Lockdown Group Leader" },
    location: { zh: "上海", en: "Shanghai" },
    date: "2022.4–6",
    oneLine: { zh: "疫情里当社区团长，开了 60 多次团。", en: "Community group leader — 60+ rounds of orders." },
    cover: "/life/moments/lamma/01.png",
    images: ["/life/moments/lamma/01.png"],
    text: { zh: "那两个月，一栋楼的吃喝都靠一个微信群。我学会了在混乱里组织、在焦虑里给人确定感。", en: "Two months, one WeChat group, a whole building fed. Full story in Writing." },
  },
  {
    id: "sri-lanka-volunteer",
    title: { zh: "斯里兰卡国际义工", en: "Sri Lanka Volunteer Program" },
    location: { zh: "斯里兰卡", en: "Sri Lanka" },
    date: "2016.6",
    oneLine: { zh: "14 万人里选 30 个，我是其中之一。", en: "30 chosen from 140,000 applicants." },
    media: "photos-video",
    gradient: "linear-gradient(135deg,#2d4a3e,#6b8f71)",
    text: { zh: "第一次真正意义上的「走出去」。语言不通、条件简陋，却是开始相信「世界很大、我能去」的起点。照片与视频整理中。", en: "First real step abroad. Photos and video coming soon." },
  },
];

/** 3.2 写作 WRITING */
export const demoWritingIntro = {
  zh: "持续不断的记录，意义自然浮现。",
  en: "Keep writing — meaning emerges on its own.",
} as LText;

/** Life 页精选；完整列表见 /writing */
export const demoWritingFeaturedSlugs = [
  "turning-31",
  "keep-growing",
  "july-sea-salt",
] as const;

export const demoWritingTags = ["全部", "随笔", "旅行", "运动", "AI教程", "攻略"] as const;

/** 3.3 运动 Movements */
export type DemoRace = {
  id: string;
  title: LText;
  date: string;
  text: LText;
  photos: string[];
};

export type DemoTrainingCamp = {
  id: string;
  title: LText;
  date: string;
  text: LText;
  photos: string[];
  dispatchId?: string;
};

export const demoMovement = {
  intro: {
    zh: "运动是一种和自己对话的方式，用这些过程去确认自己的能力到底在哪，边界在哪，再去小心地推一推……做的越多，能做的越多。",
    en: "Movement is a conversation with yourself — finding where you are, where the edge is, then nudging it gently. The more you do, the more you can do.",
  } as LText,
  timeline: [
    { date: "2023.07", text: { zh: "冲浪店义工，开始规律接触水。", en: "Surf shop volunteer — regular time in the water." } as LText },
    { date: "2023.08", text: { zh: "亚庇考 OW 潜水证。", en: "Open Water cert in Kota Kinabalu." } as LText },
    { date: "2024.04", text: { zh: "开始跑步，最远 5km。", en: "Started running — max 5km at first." } as LText },
    { date: "2024.04–06", text: { zh: "ABORO AKO 全集训练营。", en: "ABORO AKO full training camp." } as LText },
    { date: "2024.12", text: { zh: "清迈半马，跑完第一个 21km。", en: "Chiang Mai half marathon — first 21km." } as LText },
    { date: "2025.09–11", text: { zh: "凯乐石大坡王越野训练营。", en: "Kailas trail training camp." } as LText },
    { date: "2026.05", text: { zh: "屋久岛重装徒步一周。", en: "Yakushima backpacking week." } as LText },
  ],
  races: [
    {
      id: "chiang-mai-half",
      title: { zh: "清迈半马", en: "Chiang Mai Half Marathon" },
      date: "2024.12",
      text: {
        zh: "本来只是去清迈玩，顺手报了个半马。赛前最远只跑过 10km，发枪后前半程意外轻松，后半程在清迈的湿热里硬撑完赛。它让我相信：边界往往比想象远一步。",
        en: "Signed up on a whim in Chiang Mai. Longest training run was 10km — finished anyway. The edge is usually one step farther than you think.",
      },
      photos: ["/life/moments/pa-pae/01.jpg"],
    },
    {
      id: "spartan",
      title: { zh: "斯巴达", en: "Spartan Race" },
      date: "2024",
      text: { zh: "障碍、泥地、攀爬——身体被用到极限，但完赛那一刻很干净。", en: "Obstacles, mud, climbs — body at the limit, finish line clarity." },
      photos: ["/life/moments/spartan/01.jpg"],
    },
    {
      id: "xterra",
      title: { zh: "XTERRA", en: "XTERRA" },
      date: "2024",
      text: { zh: "越野三项，游泳骑车跑步连在一起。中间有一段真的想放弃。", en: "Off-road tri — swim, bike, run. Wanted to quit mid-race." },
      photos: ["/life/moments/xterra/01.jpg"],
    },
    {
      id: "hoka-trail",
      title: { zh: "Hoka 越野赛", en: "Hoka Trail Race" },
      date: "2025",
      text: { zh: "大坡王训练营之后的第一场正式越野赛，腿还记得爬坡的感觉。", en: "First trail race after camp — legs still remembered the climbs." },
      photos: ["/life/moments/hoka-trail/01.jpg", "/life/moments/hoka-trail/02.jpg"],
    },
    {
      id: "yakushima-21km",
      title: { zh: "屋久岛 21km 重装", en: "Yakushima 21km Backpacking" },
      date: "2026.05",
      text: { zh: "雨中、苔藓、负重——没有捷径，只有下一步。", en: "Rain, moss, weight on your back — no shortcuts, just the next step." },
      photos: ["/life/moments/japan-camp/01.jpg"],
    },
  ] satisfies DemoRace[],
  camps: [
    {
      id: "aboro-camp",
      title: { zh: "ABORO AKO 全集训练营", en: "ABORO AKO Full Camp" },
      date: "2024.4–6",
      text: { zh: "拳击、体能、对抗。被规律地揍，也规律地变强。", en: "Boxing, conditioning, sparring — hit often, stronger often." },
      photos: ["/life/moments/spartan/01.jpg"],
      dispatchId: "aboro-ako",
    },
    {
      id: "kailas-camp",
      title: { zh: "凯乐石大坡王越野训练营", en: "Kailas Trail Camp" },
      date: "2025.9–11",
      text: { zh: "爬坡、下坡、技术路段——把腿和心练成能跑远的那种。", en: "Climbs, descents, technical trails — training legs and nerve." },
      photos: ["/life/moments/hoka-trail/01.jpg", "/life/moments/hoka-trail/02.jpg"],
      dispatchId: "kailas-trail-camp",
    },
  ] satisfies DemoTrainingCamp[],
};
