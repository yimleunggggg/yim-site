import { pickText, type LText } from "./demo-data";

/** 国家 · 省/州 · 城市（中文用 · 连接；英文 City, Region, Country） */
export type LifeSportPlace = {
  country?: LText;
  region?: LText;
  city?: LText;
};

export type LifeSportEntry = {
  id: string;
  /** ISO：YYYY-MM-DD（运动墙统一格式化为 YY.MM.DD） */
  date: string;
  /** 区间结束日 YYYY-MM-DD → 26.05.01–05 */
  dateEnd?: string;
  title: LText;
  place?: LifeSportPlace;
  /** 角标：随语言切换中/英 */
  keyword: LText;
  cover?: string;
  /** 文章内图片（通常为 display 档） */
  images?: string[];
  /** 空则无展开文字 */
  body?: LText;
  /** 点击跳转（如 Life 日记文章） */
  href?: string;
};

function sportDisplay(cover?: string): string[] {
  if (!cover) return [];
  return [cover.replace("cover.jpg", "display.jpg")];
}

type ParsedSportDate = {
  y: string;
  yFull: number;
  mo: string;
  moIdx: number;
  d?: string;
  dNum?: number;
};

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function parseSportDate(raw: string): ParsedSportDate | null {
  const m = raw.match(/^(\d{4})[-./](\d{1,2})(?:[-./](\d{1,2}))?/);
  if (!m) return null;
  const [, y, mo, d] = m;
  const moIdx = Number(mo);
  return {
    y: y.slice(2),
    yFull: Number(y),
    mo: mo.padStart(2, "0"),
    moIdx,
    d: d ? d.padStart(2, "0") : undefined,
    dNum: d ? Number(d) : undefined,
  };
}

function formatParsedZh(d: ParsedSportDate): string {
  if (d.d) return `${d.y}.${d.mo}.${d.d}`;
  return `${d.y}.${d.mo}`;
}

function formatSportEntryDateZh(date: string, dateEnd?: string): string {
  const start = parseSportDate(date);
  if (!start) return date;
  if (!dateEnd) return formatParsedZh(start);

  const end = parseSportDate(dateEnd);
  if (!end) return formatParsedZh(start);

  if (start.y === end.y && start.mo === end.mo && start.d && end.d) {
    if (start.d === end.d) return `${start.y}.${start.mo}.${start.d}`;
    return `${start.y}.${start.mo}.${start.d}–${end.d}`;
  }

  if (start.y === end.y) {
    const startPart = start.d ? `${start.mo}.${start.d}` : start.mo;
    const endPart = end.d ? `${end.mo}.${end.d}` : end.mo;
    return `${start.y}.${startPart}–${endPart}`;
  }

  return `${formatParsedZh(start)}–${formatParsedZh(end)}`;
}

function formatSportEntryDateEn(date: string, dateEnd?: string): string {
  const start = parseSportDate(date);
  if (!start) return date;
  const startMo = MONTHS_SHORT[start.moIdx - 1];
  const yr = `'${start.y}`;

  if (!dateEnd) {
    if (start.dNum) return `${startMo} ${start.dNum}, ${yr}`;
    return `${startMo} ${yr}`;
  }

  const end = parseSportDate(dateEnd);
  if (!end) {
    if (start.dNum) return `${startMo} ${start.dNum}, ${yr}`;
    return `${startMo} ${yr}`;
  }

  const endMo = MONTHS_SHORT[end.moIdx - 1];

  if (start.y === end.y && start.moIdx === end.moIdx && start.dNum && end.dNum) {
    if (start.dNum === end.dNum) return `${startMo} ${start.dNum}, ${yr}`;
    return `${startMo} ${start.dNum}–${end.dNum}, ${yr}`;
  }

  if (start.y === end.y && start.moIdx === end.moIdx) {
    return `${startMo}–${endMo} ${yr}`;
  }

  if (start.y === end.y) {
    const startPart = start.dNum ? `${startMo} ${start.dNum}` : startMo;
    const endPart = end.dNum ? `${endMo} ${end.dNum}` : endMo;
    return `${startPart}–${endPart}, ${yr}`;
  }

  const startLabel = start.dNum ? `${startMo} ${start.dNum}, ${yr}` : `${startMo} ${yr}`;
  const endLabel = end.dNum ? `${endMo} ${end.dNum}, '${end.y}` : `${endMo} '${end.y}`;
  return `${startLabel}–${endLabel}`;
}

/** 运动墙 / 笔记弹窗：统一日期（中文 YY.MM.DD；英文 May 24, '26） */
export function formatSportEntryDate(date: string, dateEnd?: string, zh = true): string {
  return zh ? formatSportEntryDateZh(date, dateEnd) : formatSportEntryDateEn(date, dateEnd);
}

export function formatSportKeyword(keyword: LText | undefined, zh: boolean): string | null {
  if (!keyword) return null;
  const text = pickText(keyword, zh).trim();
  return text || null;
}

const PLACE_SEP_ZH = " · ";

/** 运动墙：统一地点（中文 国家·省·市；英文 City, Region, Country） */
export function formatSportPlace(place: LifeSportPlace | undefined, zh: boolean): string | null {
  if (!place) return null;

  const country = place.country ? pickText(place.country, zh) : null;
  const region = place.region ? pickText(place.region, zh) : null;
  const city = place.city ? pickText(place.city, zh) : null;

  if (zh) {
    const parts = [country, region, city].filter(Boolean);
    return parts.length ? parts.join(PLACE_SEP_ZH) : null;
  }

  const parts = [city, region, country].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

/** 排序键：优先 dateEnd（区间取结束日），其次 date */
function sportEntrySortKey(entry: LifeSportEntry): number {
  const raw = entry.dateEnd ?? entry.date;
  const parsed = parseSportDate(raw);
  if (!parsed) return 0;
  return parsed.yFull * 10000 + parsed.moIdx * 100 + (parsed.dNum ?? 1);
}

function compareSportEntries(a: LifeSportEntry, b: LifeSportEntry): number {
  const diff = sportEntrySortKey(b) - sportEntrySortKey(a);
  return diff !== 0 ? diff : a.id.localeCompare(b.id);
}

export const demoLifeSportIntro: LText = {
  zh: "冲线是另一个开场",
  en: "The finish line is another kind of opening.",
};

const demoLifeSportEntries: LifeSportEntry[] = [
  {
    id: "hoka-rain-2026-5",
    date: "2026-05-24",
    title: {
      zh: "Hoka 20km · 首次雨战",
      en: "HOKA Run Wilder Trail Run Moganshan · 20K · First Rain Race",
    },
    place: { region: { zh: "浙江", en: "Zhejiang" }, city: { zh: "湖州", en: "Huzhou" } },
    keyword: { zh: "越野", en: "trail run" },
    cover: "/life/sport/首次雨战/cover.jpg",
    images: sportDisplay("/life/sport/首次雨战/cover.jpg"),
  },
  {
    id: "yakushima-camp-2026-5",
    date: "2026-05-01",
    dateEnd: "2026-05-05",
    title: {
      zh: "背山向海的野营",
      en: "Camping — mountains behind, sea ahead",
    },
    place: { country: { zh: "日本", en: "Japan" }, city: { zh: "屋久岛", en: "Yakushima" } },
    keyword: { zh: "露营", en: "camping" },
    cover: "/life/sport/2026-5-1-屋久岛野营-日本/cover.jpg",
    images: sportDisplay("/life/sport/2026-5-1-屋久岛野营-日本/cover.jpg"),
    href: "/life/journal/yakushima",
  },
  {
    id: "moganshan-2026-4",
    date: "2026-04-13",
    title: {
      zh: "莫干山 by UTMB · 20km",
      en: "Ultra-Trail Moganshan by UTMB · EMG 20K",
    },
    place: { region: { zh: "浙江", en: "Zhejiang" } },
    keyword: { zh: "越野", en: "trail run" },
    cover: "/life/sport/2026-4-13-莫干山byutmb-20km组完赛/cover.jpg",
    images: sportDisplay("/life/sport/2026-4-13-莫干山byutmb-20km组完赛/cover.jpg"),
  },
  {
    id: "wengling-2026-3",
    date: "2026-03-22",
    title: {
      zh: "温岭黄金海岸越野赛 · 42km",
      en: "Wenling Golden Coast Mountain Running Race · 42K",
    },
    place: { region: { zh: "浙江", en: "Zhejiang" }, city: { zh: "温岭", en: "Wenling" } },
    keyword: { zh: "越野", en: "trail run" },
    cover: "/life/sport/2026-3-22-温岭黄金海岸越野赛42km组完赛/cover.jpg",
    images: sportDisplay("/life/sport/2026-3-22-温岭黄金海岸越野赛42km组完赛/cover.jpg"),
  },
  {
    id: "sh-half-2026-3",
    date: "2026-03-15",
    title: {
      zh: "终于跑上了上海半马 ",
      en: "Shanghai Half Marathon",
    },
    place: { city: { zh: "上海", en: "Shanghai" } },
    keyword: { zh: "半马", en: "road run" },
    cover: "/life/sport/2026-3-15-上海半马完赛-上海/cover.jpg",
    images: sportDisplay("/life/sport/2026-3-15-上海半马完赛-上海/cover.jpg"),
    body: {
      zh: "又是个摸黑起床的周日，第二场半马。比一年多前清迈的首场 PB 了 11min，速度加了一点点，心率降了一点点。春日大好！都没白练。",
      en: "Another pre-dawn Sunday — my second half marathon. Eleven minutes faster than my debut in Chiang Mai a year ago. A little more speed, a little lower heart rate. Perfect spring day. The training paid off.",
    },
  },
  {
    id: "spartan-deka-2025-12",
    date: "2025-12-20",
    title: {
      zh: "首次斯巴达 Deka Fit 组",
      en: "First Spartan Deka Fit",
    },
    place: { city: { zh: "上海", en: "Shanghai" } },
    keyword: { zh: "障碍赛", en: "Spartan" },
    cover: "/life/sport/2025-12-20-首次斯巴达deka-fit组完赛/cover.jpg",
    images: sportDisplay("/life/sport/2025-12-20-首次斯巴达deka-fit组完赛/cover.jpg"),
  },
  {
    id: "xterra-taihu-dnf-2025-12",
    date: "2025-12-06",
    title: {
      zh: "Xterra 太湖 · 50km 第一次退赛",
      en: "XTERRA Taihu Trail Run · 55K · DNF",
    },
    place: { region: { zh: "江苏", en: "Jiangsu" }, city: { zh: "苏州", en: "Suzhou" } },
    keyword: { zh: "越野", en: "trail run" },
    cover: "/life/sport/2025-12-6-xterra-太湖-50km组退赛/cover.jpg",
    images: sportDisplay("/life/sport/2025-12-6-xterra-太湖-50km组退赛/cover.jpg"),
    body: {
      zh: "XTERRA TAIHU TRAIL RUN，今年的最后一场比赛。在最长越野只跑过 30km+ 的情况下，大着胆子报了 55km 的组别。和去年路跑只有 10km 能力时候就去跑了 21km 的半马一样，总想在每个年末来一个大跃进，给自己一个没什么用的年终交代。\n\n刚开跑不久 5km 就开始髂胫束就隐隐作痛，上个月跑武夷山出现的毛病又冒出来了。慢摇跑到 30km 完全复发没办法下坡，放弃了比赛。第一次退赛，第一次叫救援，但也跑的心满意足。来过很多次西山岛，但是第一次上山，赶上大好的天气，穿过冬天的缥缈峰，茶园，古村，山林。官方的内容形容的很好——「温柔而澄净」。\n\n享受赛道，玩的开心，下次再战！",
      en: "XTERRA Taihu Trail Run — my last race of the year. My longest trail to date was barely 30 km, yet I signed up for 55K. Same pattern as last year: barely able to run 10 km on the road, then jumped into a half marathon. I always want a year-end leap — a useless but satisfying annual reckoning.\n\nAround 5 km in, my IT band started acting up — the same issue from Wuyi the month before. I jogged to 30 km until the pain came back full force and I couldn't descend. First DNF. First time calling for aid. Still a satisfying day. I'd been to Xishan Island many times but never up into the hills. Winter light on Piaomiao Peak, tea fields, old villages, forest. The official copy got it right: \"gentle and clear.\"\n\nEnjoyed the course. Had fun. See you next time!",
    },
  },
  {
    id: "wuyi-2025-11",
    date: "2025-11-10",
    title: {
      zh: "大武夷 · 35km组",
      en: "Grand Wuyi Trail Race · GWY-35K (First Injury)",
    },
    place: { region: { zh: "福建", en: "Fujian" }, city: { zh: "武夷山", en: "Wuyishan" } },
    keyword: { zh: "越野", en: "trail run" },
    cover: "/life/sport/2025-11-10-大武夷35km安全完赛/cover.jpg",
    images: sportDisplay("/life/sport/2025-11-10-大武夷35km安全完赛/cover.jpg"),
    body: {
      zh: "开始跑步不到一年，从路跑到越野，跑的很菜，但无比享受这种换个角度看城市和自然的方式。赛道会带你从不同的角度看山，穿过平常不会踏足的地方，无人交谈，身体疲惫，长时间的自我对话，感官会被放大，对周围一切的感知会变得格外清晰。省了做路线计划的过程，比赛好像渐渐变成了旅行方式之一。\n\n周六到时还在下雨，赛事群和社交媒体上出现了大批艰难的泥巴路段吐槽和受伤视频，晚上不少长距离赛的选手在群里说，「建议明天短距离的退赛，太危险了。」睡前反复看了几个平台的天气预报，都显示周日 75%+ 概率下雨。没想到今天开赛时，天气放晴，路段上原本湿滑的泥巴路几乎都干了，武夷山间的雾也散去，丹霞红岩、茶园梯田、玉带一样的九曲溪、秋日亮黄或锈红的树冠…在路上逐帧播放，像徐徐展开的山水长卷。\n\n上上周张家界比赛后，最近两周都没有练，这周六训练后连轴又跑了周日的比赛，一如往常的不当回事，练后不拉伸赛前不热身，连着两天只睡 4h——人生第一次经历了髂胫束疼的感觉。35km 的赛程，15km 开始膝盖外侧隐隐作痛，20km 开始连着腿刺痛，25km 开始一弯腿就疼的龇牙咧嘴，后程的下坡每走一步都要「嘶」一下，最后几公里就这么徒步回去了。中途无数次想过退赛，但想着第一次尝试这距离，已经跑了过半放弃太可惜，骂了无数次「死腿快跑」，咬着牙也得完赛了。后几公里满脑子在回想「到底哪里做错了」，好跑的路段和完美的天气，本应有个比之前好一点的成绩。不过不过，解锁了一些疼痛的新体验，高铁上翻看训练营教的拉伸和恢复，很幸运这次没有大的影响也没有产生其他伤病，了解身体，尊重身体，趁着经历又学到了新东西。\n\n最后 200m 临近冲线，咬着牙跑了几步，突然就在终点场边听到了有人叫我。回头懵了一下，居然看到了腿教！！！比赛是 3 月份刚从广州搬去深圳时候报的，没想过会在下半年来到杭州，更没想过会加入一个跑山训练营。本想着比赛时就是自己跑去武夷山观光玩耍一下，但有时候事情就这样环环相扣起来——杭州训练营还有三个同学也一起来跑了比赛，教练跑完前一天的长距离，第二条毫无预告的等在终点，迎接了每一个人，意外又开心。",
      en: "Less than a year into running — road to trail — slow but deeply in love with seeing cities and nature from another angle. A race route takes you around mountains, through places you'd never walk on your own. No conversation, a tired body, long stretches of talking to yourself. Senses turn up. Races are becoming a way to travel without planning every mile.\n\nIt rained when I arrived on Saturday. Race chats and social media filled with mud horror stories and injury clips. Many long-distance runners said short-course runners should consider dropping out — too dangerous. Every forecast said 75%+ rain on Sunday. Race morning: clear skies, mud mostly dried, mist lifted. Red sandstone, tea terraces, the Nine-Bend River like a jade belt, gold and rust leaves — frame by frame, like an unrolling scroll.\n\nAfter Zhangjiajie two weeks ago I barely trained. Saturday camp, Sunday race back-to-back — no stretching, no warm-up, four hours of sleep two nights running — first time feeling IT band pain. At 15 km, outer knee ache. At 20, shooting pain down the leg. By 25, every bend hurt. Downhills meant a hiss with every step; I walked the last few kilometres. Thought about quitting countless times but was past halfway on my first try at this distance. \"Run, stupid legs\" — finished anyway. Perfect weather, decent trails — should've been a better day. Still: new pain, new lessons. On the train I re-read the camp's stretch and recovery notes. Lucky — no lasting damage.\n\nLast 200 m, gritting my teeth into a jog, someone called my name at the finish. Turned around — my coach!! I'd signed up when I moved from Guangzhou to Shenzhen in March, never imagining I'd land in Hangzhou and join a trail camp. Thought I'd just tour Wuyishan solo. Instead three camp mates came, and the coach — after his own long run the day before — waited at the finish for everyone. Unexpected and wonderful.",
    },
  },
  {
    id: "xterra-zjj-2025-10",
    date: "2025-10-26",
    title: {
      zh: "Xterra 张家界 · 30km 组",
      en: "XTERRA Zhangjiajie Wulingyuan · 30K",
    },
    place: { region: { zh: "湖南", en: "Hunan" }, city: { zh: "张家界", en: "Zhangjiajie" } },
    keyword: { zh: "越野", en: "trail run" },
    cover: "/life/sport/2025-10-26-xterra张家界-30km组完赛/cover.jpg",
    images: sportDisplay("/life/sport/2025-10-26-xterra张家界-30km组完赛/cover.jpg"),
    body: {
      zh: "10 月的张家界多雨的，周六到时还是细雨绵绵，峰林隐在雾里。万亿年前的峰林不止是巍峨，雾气缠绕着，还多了一份灵气。周六到景区里「踩线」（其实是坐缆车观光），我们说的最多的是：哇！\n\n选手之夜是在山风中的露天舞台，现代音乐、民俗舞蹈、本土精酿，很 Xterra 了。9pm 在标志门，土家傩舞起，震山鼓敲响，所有人目送 88K 的选手们奔赴夜色深处。\n\n第二天轮到我们开赛前，太阳忽然从浓雾里显了出来，跑到转弯处，看到昨天掩在雾气里的山，轮廓逐渐清晰。有点兴奋，快跑几步到边上拍起照来。只求不被关门的跑山是这样的，随时可以停下来开启观光。\n\n第一次来张家界，因为赛道深入了更多的地方。比赛会带我们从不同的角度看山，沿途石壁、溪流、竹林、村落。每一个转弯都不一样。第三个 CP 点进到村镇，路一边是一排补给的桌子，另一边是当地的叔伯阿姨、爷爷奶奶，很好玩，奶奶们站一堆，爷爷们在另一堆，像是每天例行聚在村里聊八卦、晒太阳。离开补给点后的几公里我满脑子都是他们的样子，尝试在想象他们今天在做什么，站在路边聊什么好玩的事情。\n\n跑到这一段，才冒出个有点傻的念头：原来张家界除了奇石，还有人家。总是惯性觉得景区无非是商业，很少想到也是聚落和居所。想到这里突然觉得此时此地更真切了。刚接触到跑山时候，从几篇「风土志」开始关注到 Xterra，他们写：一条山径，不仅是穿越的通道，它更像一本没有文字的史书。贸易、游牧、朝圣、逃离、归属..人类的痕迹与自然的节奏在其中交织。待步道既是文化的承载体，也是人与土地之间的恒久对话。在地图和社交媒体的滤镜之外，步道是一种古老而温柔的记录:它记录脚步，也记录人与土地的关系。\n\n在凯乐石训练营短短几周的线下训练，得益于训练体系的综合性和循序渐进，从基本功，到怎么吃怎么喝，到赛前一周刚学到比赛策略。在实际的比赛中都一点点的生涩的用起来了，第一次感觉抬头看到长段爬升台阶时候，不心慌害怕了，看了看表上的海拔，也就是三趟「噔噔噔」训练。\n\n最后三四公里是连续的湿滑下坡，回来后我叫它们「大滑梯」。每一步落脚都踩不实，总要向前滑动一小截。陡的地方得抓绳子，路窄得只容一人慢行，侧滑一步就是山林。也险，也亢奋。如果不是表在这段前没电了，大概能看到分段心率因为紧张而飙高。和朋友开玩笑说「第 15K 开始就没有路了」。当然，你不能职责山怎么没有长出平整的路面，恰好的阴凉，山就是山。\n\n回到酒店，保洁阿姨兴冲冲的问，「去跑步了呀，跑赢了吗？」。我说「赢」了，比上一次跑的又好了一点。\n\n时隔四天，我坐在家里，边看那些沿途的视频，边写下这些的时候，感觉山间的雾气又升腾了上来。",
      en: "October in Zhangjiajie means rain. Drizzle when we arrived Saturday, peaks lost in mist. Ancient pillars aren't just grand — wrapped in fog they feel alive. We \"recced\" the course (cable car sightseeing). Mostly we said: wow!\n\nAthlete night: open-air stage, mountain wind, modern music, folk dance, local craft beer — very XTERRA. At 9 pm by the gate, Tujia nuo dance, thunder drums, everyone sending off the 88K runners into the dark.\n\nOur start: sun broke through. Around a bend, yesterday's hidden peaks came clear. I got excited, jogged to the edge for photos. Running just to beat cutoffs means you can stop and sightsee anytime.\n\nFirst visit to Zhangjiajie — because the course went deeper than any tourist loop. Cliffs, streams, bamboo, villages — every turn different. At the third aid station in a village: tables one side, aunties and grandpas the other. Grandmas in one cluster, grandpas in another, like daily gossip in the sun. For kilometres after I kept picturing them — what they're doing today, what they're laughing about.\n\nA silly thought: Zhangjiajie isn't only strange rocks — people live here. Scenic spots feel commercial; I forget they're also home. XTERRA's trail writing says a path isn't just passage — it's a wordless history book. Trade, nomads, pilgrimage, escape, belonging. Trails record footsteps and our bond with land.\n\nA few weeks of Kailas camp — basics, fueling, strategy learned the week before — all showed up clumsily in the race. Long stair climbs no longer panicked me; check altitude: three \"stomp-stomp-stomp\" sessions.\n\nLast 3–4 km: wet slides I call \"the big playground.\" Every step skidded. Ropes on the steep bits, single file, one slip from the forest. Scary and thrilling. Watch died before that section — heart rate probably spiked. Joked with friends: \"No trail after 15K.\" Mountains don't grow flat paths — mountains are mountains.\n\nHotel cleaner: \"You went running — did you win?\" I said yes — beat my last race.\n\nFour days later, watching course videos, writing this — the mountain mist rises again.",
    },
  },
  {
    id: "kailas-camp-2025-9",
    date: "2025-09",
    dateEnd: "2025-11",
    title: {
      zh: "3个月的凯乐石大坡王训练营",
      en: "Kailas FUGA Trail Training Camp",
    },
    place: { region: { zh: "浙江", en: "Zhejiang" }, city: { zh: "杭州", en: "Hangzhou" } },
    keyword: { zh: "训练营", en: "training" },
    cover: "/life/sport/2025-9-11月-凯乐石大坡王训练营/cover.jpg",
    images: sportDisplay("/life/sport/2025-9-11月-凯乐石大坡王训练营/cover.jpg"),
    body: {
      zh: "加入之前半马的路跑就是我的极限，看到 15km+ 的距离总要后退几步。每次训练前一晚都特紧张，距离太长/爬升太高/路线没跑过，满脑子都是「这我能跑？？？」\n\n9 月底开始每周末早上 5:30 摸黑起床。虽然每次都比大家少完成大概 1/3 训练量，但每次都在刷新自己的纪录。从纯粹紧张，变成更多是期待，期待自己再完成一个挑战。\n\n除了数字，身体也在学着在上坡时调整呼吸，在疲惫时找到节奏。脑子开始尝试理解：让我喘不过气、双腿灌铅的瞬间，不能被简单归因为「太菜」。教练的指导和周中的线上会议交流，告诉我这都是可以被拆解的具体课题：上下坡基本功、体能分配、补给时机…恐惧源于未知，而当一切逐渐清晰，底气就长出来了。\n\n过了「第二集」的考核，每次训练后，大家都要打趣说「又多活了一集」。能力各异，但没人卷数据，每次擦肩都互相喊一声加油，在自己的节奏里变强。\n\n教练在一次周会上提到，「胜人者有力，自胜者强。」",
      en: "Before joining, a half marathon was my ceiling. Anything over 15 km made me step back. Every training eve: too far, too much climb, unknown route — \"Can I even do this???\"\n\nFrom late September, 5:30 am dark starts every weekend. I always finished about a third less than the group but kept setting personal records. Nerves turned into anticipation — another challenge to clear.\n\nBeyond the numbers, my body learned breathing on climbs and rhythm when tired. Gasping and lead legs aren't simply \"too weak.\" Coach and weekly calls broke it into skills: uphill/downhill form, pacing, fueling… Fear comes from unknowns; clarity builds confidence.\n\nAfter passing \"Episode 2\" assessment we'd joke: \"Survived another episode.\" Different levels, no data wars — pass each other, shout encouragement, get stronger at your own pace.\n\nCoach quoted: \"He who conquers others is strong; he who conquers himself is mighty.\"",
    },
  },
  {
    id: "hike-2025-9",
    date: "2025-09",
    title: { zh: "开始尝试徒步", en: "Started Hiking" },
    place: { region: { zh: "广东", en: "Guangdong" }, city: { zh: "广州", en: "Guangzhou" } },
    keyword: { zh: "徒步", en: "hiking" },
    cover: "/life/sport/2025-9-开始尝试徒步-广东广州/cover.jpg",
    images: sportDisplay("/life/sport/2025-9-开始尝试徒步-广东广州/cover.jpg"),
  },
  {
    id: "trail-first-2025-5",
    date: "2025-05-19",
    title: {
      zh: "人生首野 · 25km / 1675m 爬升",
      en: "Outopia Racing in the Wild · TangMeiYin · 25K · First Trail",
    },
    place: { region: { zh: "广东", en: "Guangdong" }, city: { zh: "深圳", en: "Shenzhen" } },
    keyword: { zh: "越野", en: "trail run" },
    cover: "/life/sport/2025-5-19-人生首野完赛-jpg/cover.jpg",
    images: sportDisplay("/life/sport/2025-5-19-人生首野完赛-jpg/cover.jpg"),
  },
  {
    id: "spartan-super-2025-3",
    date: "2025-03-23",
    title: {
      zh: "第一次斯巴达 Super 组",
      en: "First Spartan Super",
    },
    place: { city: { zh: "深圳", en: "Shenzhen" } },
    keyword: { zh: "障碍赛", en: "Spartan" },
    cover: "/life/sport/2025-3-23-第一次斯巴达super组完赛/cover.jpg",
    images: sportDisplay("/life/sport/2025-3-23-第一次斯巴达super组完赛/cover.jpg"),
    body: {
      zh: "朋友问为什么唯一的休息日，为什么不在家补觉偏要顶着太阳去玩泥巴——因为起点线后面，就是山啊。\n\n平日运动时总爱放空乱想，比赛两个多小时里，潦草记下一些感知：\n\n1. 工具是身体的延伸线。这次匆忙，只带了双劳工手套，也是整场下来最有用的工具。很多需要抓握的项目，防滑耐磨的手套让我有勇气冲。重要的其实不是抓住什么，而是敢把手伸出去。\n\n2. 不要先说「不行」，身体比大脑更懂通关。第一个障碍就要先攀上一个远高于我的横杆，大脑还在慌张该怎么上，双腿已经甩了上去。后面的很多项目都是，用肚子、四肢、肩膀，调动能调动的，抓住一切能抓住的，站着够不到就爬，手撑不住就用膝盖顶。大多障碍越分析越怕，看似不可能翻越的，在直接上手「试试看」的瞬间被攻克。\n\n3. 先抄作业，当个理直气壮的观察者。很多项目有独特的过关技巧。上手前我都会站在旁边看一会。看人怎么过去，怎么过不去。不丢人，成年人的考场允许交头接耳。\n\n4. 放弃就放弃，失败是诚实的老师。25 个障碍，我放弃了 4 个。很兴奋的知道了有那么多以为过不去的，实际上我可以做到；也看到了平常的偷懒——锻炼总会跳过的上肢，结果就是所有悬挂类项目都放弃，换成了 30 个 burpees。「现在你更清楚该练哪里了。」\n\n5. 下坡接着冲，在安全区继续发力然后反超。路线在笔架山，会有不断的爬升和下降。我在所有下坡路段小跑，看到原本在我前面的人被超过去，心态上也一扫了前面的落后感。最轻盈的步伐，都发生在俯冲的失重时刻。\n\n6. In your own time zone。出发时候人非常多，但拉长时间后总会产生差距。有些路段只剩自己也不知道是跑的靠前还是落后。山把人群冲散，让你听见自己的节拍。只管保持节奏，继续往前就好。\n\n7. 泥坑不回答假设题，别问难不难，去就知道了。到了「大泥坑」边上，有人停下来讨论「水有多深」下面有什么」。我说下去就知道，一猛子蹦进去——水很凉爽，也不深，底下很平坦。所有预设的恐惧，在「下去」后消失了。用理性丈量泥坑时，也要期待着纵身跃入浑浊的快乐啊。",
      en: "Friends asked why I'd spend my only day off in the sun playing in mud instead of sleeping — because beyond the start line, there are mountains.\n\nNotes from two-plus hours of racing:\n\n1. Tools extend the body. I only brought work gloves — the most useful thing all day. Grip obstacles need courage to reach. What matters isn't what you grab but daring to reach.\n\n2. Don't say \"can't\" first — the body knows before the brain. First obstacle: a bar way above my head. Brain panicking, legs already over. Belly, limbs, shoulders — use everything, climb if you can't stand, knees if hands fail. Overthinking makes it worse; \"just try\" often works.\n\n3. Copy homework — watch shamelessly. Unique tricks on each obstacle. I stood aside and watched passes and fails. Grown-up exams allow whispering.\n\n4. Skipping is honest. 25 obstacles, 4 skipped. Surprised how many \"impossible\" ones I cleared; saw my lazy upper-body training — every hang became 30 burpees. \"Now you know what to work on.\"\n\n5. Charge the downhills. Bijia Mountain — constant up and down. I ran every descent, passed people ahead, felt lighter in the free-fall steps.\n\n6. In your own time zone. Crowded start, gaps open later. Sometimes alone, not sure if ahead or behind. Mountains scatter the crowd so you hear your own rhythm.\n\n7. Mud doesn't answer hypotheticals. At the big pit some debated depth and what's below. I said jump and see — cool, shallow, flat bottom. Fear vanished after going in. Measure with reason; still leap into muddy joy.",
    },
  },
  {
    id: "half-chiangmai-2024-12",
    date: "2024-12-22",
    title: {
      zh: "第一场半马 · 清迈半马",
      en: "First Half Marathon · Chiang Mai",
    },
    place: { country: { zh: "泰国", en: "Thailand" }, city: { zh: "清迈", en: "Chiang Mai" } },
    keyword: { zh: "半马", en: "road run" },
    cover: "/life/sport/2024-12-22-人生第一场半马-清迈半马/cover.jpg",
    images: sportDisplay("/life/sport/2024-12-22-人生第一场半马-清迈半马/cover.jpg"),
    body: {
      zh: "4am 开跑，出发天黑着跑完还黑着。人生首（半）马 🐴 达成！\n\n今年四月份开始跑步，从 4km 到 8 到 12，给 2024 的没用的交代 +1。今天还活，很开心🫡",
      en: "4 am start — dark at the gun, dark at the finish. First (half) marathon 🐴 done!\n\nStarted running in April, 4 km to 8 to 12 — another useless but happy milestone for 2024. Still alive, very glad 🫡",
    },
  },
  {
    id: "maclehose-2024-9",
    date: "2024-09-14",
    title: {
      zh: "首次中距离徒步",
      en: "First Medium-Distance Hike",
    },
    place: {
      country: { zh: "中国", en: "China" },
      region: { zh: "香港", en: "Hong Kong" },
      city: { zh: "麦理浩径", en: "MacLehose Trail" },
    },
    keyword: { zh: "徒步", en: "hiking" },
    cover: "/life/sport/2024-9-14-麦理浩径-香港/cover.jpg",
    images: sportDisplay("/life/sport/2024-9-14-麦理浩径-香港/cover.jpg"),
  },
  {
    id: "aboro-2024-4",
    date: "2024-04",
    dateEnd: "2024-06",
    title: {
      zh: "Aboro 三个月拳击训练营",
      en: "Aboro 3-Month Boxing Camp",
    },
    place: { city: { zh: "上海", en: "Shanghai" } },
    keyword: { zh: "拳击", en: "boxing" },
    cover: "/life/sport/aboro三个月的拳击训练营/cover.jpg",
    images: sportDisplay("/life/sport/aboro三个月的拳击训练营/cover.jpg"),
    body: {
      zh: "决定报名是因为当时看到这句：用「我会」三个字取代「我试试」，奇迹就会发生——Aboro 说这个信仰支撑着她成为了 7 次不败的世界拳击冠军。\n\n一周六练，放弃了周末的酒局和出行，把这场训练完整的参与了。有幸跟着优秀的教练，系统化的学习这项运动。体能、技术、呼吸、修复，任何运动都不是单一的。学会如何「打人」和「挨打」，是在办公室生活中未曾设想的体验。我们会用「冷静」来形容拳击，因为暴力出拳只会遍体鳞伤和体力耗尽。\n\n日子也是如此，从学会挨打，学会冷静，到学会反击。",
      en: "I signed up after reading: replace \"I'll try\" with \"I will\" and miracles happen — Aboro said that belief carried her to seven undefeated world titles.\n\nSix days a week, skipped weekend drinks and trips, finished the whole camp. Great coaches, systematic learning. Fitness, technique, breath, recovery — no sport is one thing. Learning to hit and be hit wasn't in my office-life script. We call boxing \"calm\" because wild swings only bruise and drain you.\n\nLife too: learn to take hits, stay calm, then counter.",
    },
  },
  {
    id: "run-start-2024-4",
    date: "2024-04",
    title: {
      zh: "开始跑步 · 3km 到 5km",
      en: "Started Running · 3K to 5K",
    },
    place: { city: { zh: "上海", en: "Shanghai" } },
    keyword: { zh: "路跑", en: "road run" },
  },
  {
    id: "gym-2023-9",
    date: "2023-09",
    title: {
      zh: "走进健身房 · 力量训练",
      en: "Started Strength Training",
    },
    place: { city: { zh: "上海", en: "Shanghai" } },
    keyword: { zh: "力量", en: "strength" },
    cover: "/life/sport/开始走进健身房-力量训练-jpg/cover.jpg",
    images: sportDisplay("/life/sport/开始走进健身房-力量训练-jpg/cover.jpg"),
  },
  {
    id: "sup-kk-2023-8",
    date: "2023-08-11",
    title: {
      zh: "首次海上浆板",
      en: "First Open-Water SUP",
    },
    place: { country: { zh: "马来西亚", en: "Malaysia" }, city: { zh: "亚庇", en: "Kota Kinabalu" } },
    keyword: { zh: "桨板", en: "SUP" },
    cover: "/life/sport/2023-8-11-亚庇海上浆板-马来西亚/cover.jpg",
    images: sportDisplay("/life/sport/2023-8-11-亚庇海上浆板-马来西亚/cover.jpg"),
  },
  {
    id: "ow-2023-8",
    date: "2023-08",
    title: {
      zh: "来到海里，考了OW",
      en: "Open Water Dive Certification",
    },
    place: { country: { zh: "马来西亚", en: "Malaysia" }, city: { zh: "仙本那", en: "Semporna" } },
    keyword: { zh: "潜水", en: "diving" },
    cover: "/life/sport/考取了ow潜水证-马来西亚仙本那/cover.jpg",
    images: sportDisplay("/life/sport/考取了ow潜水证-马来西亚仙本那/cover.jpg"),
    href: "/life/journal/sabah-ow",
  },
  {
    id: "surf-2023-7",
    date: "2023-07",
    title: {
      zh: "开始学冲浪",
      en: "Started Learning to Surf",
    },
    place: { region: { zh: "广东", en: "Guangdong" }, city: { zh: "惠州", en: "Huizhou" } },
    keyword: { zh: "冲浪", en: "surf" },
    cover: "/life/sport/2023-7-开始学习冲浪-广东惠州/cover.jpg",
    images: sportDisplay("/life/sport/2023-7-开始学习冲浪-广东惠州/cover.jpg"),
    href: "/life/journal/surf-volunteer",
  },
];

/** 运动墙：按日期倒序（新 → 旧） */
export const demoLifeSport: LifeSportEntry[] = [...demoLifeSportEntries].sort(compareSportEntries);

export function getLifeSportIds(): string[] {
  return demoLifeSport.filter((e) => e.body).map((e) => e.id);
}

export function getLifeSportById(id: string): LifeSportEntry | undefined {
  return demoLifeSport.find((e) => e.id === id);
}
