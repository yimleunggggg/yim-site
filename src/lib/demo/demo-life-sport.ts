import type { LText } from "./demo-data";

export type LifeSportEntry = {
  id: string;
  date: string;
  title: LText;
  location?: LText;
  keywords: string[];
  cover?: string;
  /** 空则无展开文字 */
  body?: LText;
};

export const demoLifeSportIntro: LText = {
  zh: "身体是长期项目。比赛和训练留下时间、地点和一点点思考。",
  en: "The body is a long-term project — races, camps, and notes along the way.",
};

export const demoLifeSport: LifeSportEntry[] = [
  {
    id: "hoka-rain-2026-5",
    date: "2026-05-24",
    title: { zh: "Hoka 20km · 首次雨战" },
    location: { zh: "浙江湖州" },
    keywords: ["trail run", "越野"],
    cover: "/life/sport/首次雨战/cover.jpg",
  },
  {
    id: "running-milestone-2026-5",
    date: "2026-05-29",
    title: { zh: "跑步两周年 · 10km 进 1 小时" },
    location: { zh: "上海" },
    keywords: ["road run", "路跑"],
    body: {
      zh: "用了两年提升了一分钟配速。跑步两周年、越野跑一周年——菜腿第一次在 1h 内跑完 10km。\n\n24年5月 Aboro 拳击训练营开始跑步，路跑从 2km 终于能跑到 8km；25年5月凯乐石三个月越野训练营，菜腿也敢跑 40km+、两千多爬升的山了。\n\n24年12月第一次半马，25年5月第一次越野——加一加刚好 2 年，2 场半马、10 场越野。真的很菜，真的不是一开始就能跑。",
    },
  },
  {
    id: "moganshan-2026-4",
    date: "2026-04-13",
    title: { zh: "莫干山 by UTMB · 20km" },
    location: { zh: "浙江" },
    keywords: ["trail run", "越野"],
    cover: "/life/sport/2026-4-13-莫干山byutmb-20km组完赛/cover.jpg",
  },
  {
    id: "wengling-2026-3",
    date: "2026-03-22",
    title: { zh: "温岭黄金海岸越野赛 · 42km" },
    location: { zh: "浙江温岭" },
    keywords: ["trail run", "越野"],
    cover: "/life/sport/2026-3-22-温岭黄金海岸越野赛42km组完赛/cover.jpg",
  },
  {
    id: "sh-half-2026-3",
    date: "2026-03-15",
    title: { zh: "上海半马" },
    location: { zh: "上海" },
    keywords: ["road run", "半马"],
    cover: "/life/sport/2026-3-15-上海半马完赛-上海/cover.jpg",
    body: {
      zh: "又是个摸黑起床的周日，第二场半马。比一年多前清迈的首场 PB 了 11 分钟——速度加了一点点，心率降了一点点。春日大好，都没白练。",
    },
  },
  {
    id: "spartan-deka-2025-12",
    date: "2025-12-20",
    title: { zh: "斯巴达 Deka Fit · 首次完赛" },
    location: { zh: "上海" },
    keywords: ["Spartan", "障碍赛"],
    cover: "/life/sport/2025-12-20-首次斯巴达deka-fit组完赛/cover.jpg",
  },
  {
    id: "xterra-taihu-dnf-2025-12",
    date: "2025-12-06",
    title: { zh: "Xterra 太湖 · 50km 退赛" },
    location: { zh: "江苏苏州" },
    keywords: ["trail run", "Xterra"],
    cover: "/life/sport/2025-12-6-xterra-太湖-50km组退赛/cover.jpg",
    body: {
      zh: "XTERRA TAIHU TRAIL RUN，今年的最后一场比赛。刚开跑不久髂胫束就隐隐作痛，慢摇到 30km 完全复发没办法下坡，放弃了比赛。第一次退赛，第一次叫救援，但也跑的心满意足。来过很多次西山岛，但是第一次上山——官方形容得很好：「温柔而澄净」。享受赛道，玩的开心，下次再战！",
    },
  },
  {
    id: "wuyi-2025-11",
    date: "2025-11-10",
    title: { zh: "大武夷 · 35km 完赛（首次受伤）" },
    location: { zh: "福建武夷山" },
    keywords: ["trail run", "越野"],
    cover: "/life/sport/2025-11-10-大武夷35km安全完赛/cover.jpg",
    body: {
      zh: "开始跑步不到一年，从路跑到越野，跑的很菜，但无比享受这种换个角度看城市和自然的方式。\n\n35km 赛程，15km 开始膝盖外侧隐隐作痛，20km 开始连着腿刺痛——人生第一次经历了髂胫束疼的感觉。中途无数次想过退赛，但想着第一次尝试这距离，已经跑了过半放弃太可惜，咬着牙也得完赛了。\n\n最后 200m 临近冲线，突然在终点场边听到了有人叫我——居然看到了腿教！比赛是 3 月份刚从广州搬去深圳时候报的，没想过会在下半年来到杭州、加入跑山训练营。有时候事情就这样环环相扣起来。",
    },
  },
  {
    id: "xterra-zjj-2025-10",
    date: "2025-10-26",
    title: { zh: "Xterra 张家界 · 30km" },
    location: { zh: "湖南张家界" },
    keywords: ["trail run", "Xterra"],
    cover: "/life/sport/2025-10-26-xterra张家界-30km组完赛/cover.jpg",
    body: {
      zh: "10 月的张家界多雨，峰林隐在雾里。选手之夜在山风中的露天舞台，现代音乐、民俗舞蹈、本土精酿，很 Xterra 了。\n\n第二天开赛前太阳忽然从浓雾里显出来。第一次来张家界，因为赛道深入了更多的地方——石壁、溪流、竹林、村落，每一个转弯都不一样。第三个 CP 点进到村镇，路一边是补给桌，另一边是叔伯阿姨、爷爷奶奶，很好玩。\n\n跑到这一段才冒出个念头：原来张家界除了奇石，还有人家。一条山径，不仅是穿越的通道，它更像一本没有文字的史书。\n\n最后三四公里是连续的湿滑下坡，回来后我叫它们「大滑梯」。回到酒店，保洁阿姨兴冲冲地问「去跑步了呀，跑赢了吗？」——我说「赢」了，比上一次跑的又好了一点。",
    },
  },
  {
    id: "kailas-camp-2025-9",
    date: "2025-09 — 11",
    title: { zh: "凯乐石大坡王训练营" },
    location: { zh: "浙江杭州" },
    keywords: ["trail run", "训练营"],
    cover: "/life/sport/2025-9-11月-凯乐石大坡王训练营/cover.jpg",
    body: {
      zh: "加入之前半马的路跑就是我的极限，看到 15km+ 的距离总要后退几步。9 月底开始每周末早上 5:30 摸黑起床——虽然每次都比大家少完成大概 1/3 训练量，但每次都在刷新自己的纪录。\n\n除了数字，身体也在学着在上坡时调整呼吸，在疲惫时找到节奏。恐惧源于未知，而当一切逐渐清晰，底气就长出来了。过了「第二集」的考核，每次训练后大家都要打趣说「又多活了一集」。\n\n教练在一次周会上提到：「胜人者有力，自胜者强。」",
    },
  },
  {
    id: "hike-2025-9",
    date: "2025-09",
    title: { zh: "开始尝试徒步" },
    location: { zh: "广东广州" },
    keywords: ["hiking", "徒步"],
    cover: "/life/sport/2025-9-开始尝试徒步-广东广州/cover.jpg",
  },
  {
    id: "trail-first-2025-5",
    date: "2025-05-19",
    title: { zh: "人生首野 · 25km / 1675m 爬升" },
    location: { zh: "广东深圳" },
    keywords: ["trail run", "越野"],
    cover: "/life/sport/2025-5-19-人生首野完赛-jpg/cover.jpg",
  },
  {
    id: "spartan-super-2025-3",
    date: "2025-03-23",
    title: { zh: "斯巴达 Super · 首次完赛" },
    location: { zh: "深圳" },
    keywords: ["Spartan", "障碍赛"],
    cover: "/life/sport/2025-3-23-第一次斯巴达super组完赛/cover.jpg",
    body: {
      zh: "朋友问为什么唯一的休息日偏要顶着太阳去玩泥巴——因为起点线后面，就是山啊。\n\n1. 工具是身体的延伸线——劳工手套是整场最有用的工具。\n2. 不要先说「不行」，身体比大脑更懂通关。\n3. 先抄作业，当个理直气壮的观察者。\n4. 放弃就放弃，失败是诚实的老师——25 个障碍放弃了 4 个。\n5. 下坡接着冲，在安全区继续发力然后反超。\n6. In your own time zone——只管保持节奏，继续往前。\n7. 泥坑不回答假设题——别问难不难，去就知道了。",
    },
  },
  {
    id: "half-chiangmai-2024-12",
    date: "2024-12-22",
    title: { zh: "清迈半马 · Chiang Mai Marathon" },
    location: { zh: "泰国清迈" },
    keywords: ["road run", "半马"],
    cover: "/life/sport/2024-12-22-人生第一场半马-清迈半马/cover.jpg",
    body: {
      zh: "4am 开跑，出发天黑着跑完还黑着。人生首（半）马达成！今年四月份开始跑步，从 4km 到 8 到 12——给 2024 的没用的交代 +1。今天还活，很开心。",
    },
  },
  {
    id: "aboro-2024-4",
    date: "2024-04 — 06",
    title: { zh: "Aboro 拳击训练营 · 三个月" },
    location: { zh: "上海" },
    keywords: ["boxing", "训练营"],
    cover: "/life/sport/aboro三个月的拳击训练营/cover.jpg",
    body: {
      zh: "决定报名是因为看到这句：用「我会」三个字取代「我试试」，奇迹就会发生——Aboro 说这个信仰支撑着她成为了 7 次不败的世界拳击冠军。\n\n一周六练，放弃了周末的酒局和出行。有幸跟着优秀的教练，系统化学习这项运动。体能、技术、呼吸、修复——任何运动都不是单一的。学会如何「打人」和「挨打」，是在办公室生活中未曾设想的体验。我们会用「冷静」来形容拳击，因为暴力出拳只会遍体鳞伤和体力耗尽。\n\n日子也是如此，从学会挨打，学会冷静，到学会反击。",
    },
  },
  {
    id: "run-start-2024-4",
    date: "2024-04",
    title: { zh: "开始跑步 · 3km 到 5km" },
    location: { zh: "上海" },
    keywords: ["road run", "路跑"],
  },
  {
    id: "gym-2023-9",
    date: "2023-09",
    title: { zh: "走进健身房 · 力量训练" },
    location: { zh: "上海" },
    keywords: ["strength", "力量"],
    cover: "/life/sport/开始走进健身房-力量训练-jpg/cover.jpg",
  },
  {
    id: "ow-2023-8",
    date: "2023-08",
    title: { zh: "考取 OW 潜水证" },
    location: { zh: "马来西亚仙本那" },
    keywords: ["diving", "潜水"],
    cover: "/life/sport/考取了ow潜水证-马来西亚仙本那/cover.jpg",
  },
  {
    id: "surf-2023-7",
    date: "2023-07",
    title: { zh: "开始学习冲浪" },
    location: { zh: "广东惠州" },
    keywords: ["surf", "冲浪"],
    cover: "/life/sport/2023-7-开始学习冲浪-广东惠州/cover.jpg",
  },
];

export function getLifeSportIds(): string[] {
  return demoLifeSport.map((e) => e.id);
}

export function getLifeSportById(id: string): LifeSportEntry | undefined {
  return demoLifeSport.find((e) => e.id === id);
}

