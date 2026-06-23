import type { LText } from "./demo-data";

export type LifeSportEntry = {
  id: string;
  date: string;
  title: LText;
  location?: LText;
  keywords: string[];
  cover?: string;
  /** 文章内图片（通常为 display 档） */
  images?: string[];
  /** 空则无展开文字 */
  body?: LText;
};

function sportDisplay(cover?: string): string[] {
  if (!cover) return [];
  return [cover.replace("cover.jpg", "display.jpg")];
}

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
    images: sportDisplay("/life/sport/首次雨战/cover.jpg"),
  },
  {
    id: "running-milestone-2026-5",
    date: "2026-05-29",
    title: { zh: "跑步两周年 · 10km 进 1 小时" },
    location: { zh: "上海" },
    keywords: ["road run", "路跑"],
    body: {
      zh: "用了两年提升了一分钟配速。跑步两周年，越野跑一周年。到现在菜腿第一次在 1h 内跑完 10km 呜呜呜呜😭\n\n24年5月 Aboro 的拳击训练营开始跑步，三个月的训练，路跑从 2km 终于能跑到 8km 了。25年5月凯乐石的三个月越野跑训练营，菜腿也敢跑 40km+，两千多爬升的山了。\n\n24年12月第一次半马，25年5月第一次越野跑，加一加刚好 2 年时间，2 场半马，10 场越野。\n\n所以我真的很菜，真的不是一开始就能跑！！！大家加油啊！！",
    },
  },
  {
    id: "moganshan-2026-4",
    date: "2026-04-13",
    title: { zh: "莫干山 by UTMB · 20km 完赛" },
    location: { zh: "浙江" },
    keywords: ["trail run", "越野"],
    cover: "/life/sport/2026-4-13-莫干山byutmb-20km组完赛/cover.jpg",
    images: sportDisplay("/life/sport/2026-4-13-莫干山byutmb-20km组完赛/cover.jpg"),
  },
  {
    id: "wengling-2026-3",
    date: "2026-03-22",
    title: { zh: "温岭黄金海岸越野赛 · 42km 完赛" },
    location: { zh: "浙江温岭" },
    keywords: ["trail run", "越野"],
    cover: "/life/sport/2026-3-22-温岭黄金海岸越野赛42km组完赛/cover.jpg",
    images: sportDisplay("/life/sport/2026-3-22-温岭黄金海岸越野赛42km组完赛/cover.jpg"),
  },
  {
    id: "sh-half-2026-3",
    date: "2026-03-15",
    title: { zh: "上海半马完赛" },
    location: { zh: "上海" },
    keywords: ["road run", "半马"],
    cover: "/life/sport/2026-3-15-上海半马完赛-上海/cover.jpg",
    images: sportDisplay("/life/sport/2026-3-15-上海半马完赛-上海/cover.jpg"),
    body: {
      zh: "又是个摸黑起床的周日，第二场半马。比一年多前清迈的首场 PB 了 11min，速度加了一点点，心率降了一点点。春日大好！都没白练。",
    },
  },
  {
    id: "spartan-deka-2025-12",
    date: "2025-12-20",
    title: { zh: "首次斯巴达 Deka Fit 组完赛" },
    location: { zh: "上海" },
    keywords: ["Spartan", "障碍赛"],
    cover: "/life/sport/2025-12-20-首次斯巴达deka-fit组完赛/cover.jpg",
    images: sportDisplay("/life/sport/2025-12-20-首次斯巴达deka-fit组完赛/cover.jpg"),
  },
  {
    id: "xterra-taihu-dnf-2025-12",
    date: "2025-12-06",
    title: { zh: "Xterra 太湖 · 50km 组退赛" },
    location: { zh: "江苏苏州" },
    keywords: ["trail run", "Xterra"],
    cover: "/life/sport/2025-12-6-xterra-太湖-50km组退赛/cover.jpg",
    images: sportDisplay("/life/sport/2025-12-6-xterra-太湖-50km组退赛/cover.jpg"),
    body: {
      zh: "XTERRA TAIHU TRAIL RUN，今年的最后一场比赛。在最长越野只跑过 30km+ 的情况下，大着胆子报了 55km 的组别。和去年路跑只有 10km 能力时候就去跑了 21km 的半马一样，总想在每个年末来一个大跃进，给自己一个没什么用的年终交代。\n\n刚开跑不久 5km 就开始髂胫束就隐隐作痛，上个月跑武夷山出现的毛病又冒出来了。慢摇跑到 30km 完全复发没办法下坡，放弃了比赛。第一次退赛，第一次叫救援，但也跑的心满意足。来过很多次西山岛，但是第一次上山，赶上大好的天气，穿过冬天的缥缈峰，茶园，古村，山林。官方的内容形容的很好——「温柔而澄净」。\n\n享受赛道，玩的开心，下次再战！",
    },
  },
  {
    id: "wuyi-2025-11",
    date: "2025-11-10",
    title: { zh: "大武夷 · 35km 完赛（首次受伤）" },
    location: { zh: "福建武夷山" },
    keywords: ["trail run", "越野"],
    cover: "/life/sport/2025-11-10-大武夷35km安全完赛/cover.jpg",
    images: sportDisplay("/life/sport/2025-11-10-大武夷35km安全完赛/cover.jpg"),
    body: {
      zh: "开始跑步不到一年，从路跑到越野，跑的很菜，但无比享受这种换个角度看城市和自然的方式。赛道会带你从不同的角度看山，穿过平常不会踏足的地方，无人交谈，身体疲惫，长时间的自我对话，感官会被放大，对周围一切的感知会变得格外清晰。省了做路线计划的过程，比赛好像渐渐变成了旅行方式之一。\n\n周六到时还在下雨，赛事群和社交媒体上出现了大批艰难的泥巴路段吐槽和受伤视频，晚上不少长距离赛的选手在群里说，「建议明天短距离的退赛，太危险了。」睡前反复看了几个平台的天气预报，都显示周日 75%+ 概率下雨。没想到今天开赛时，天气放晴，路段上原本湿滑的泥巴路几乎都干了，武夷山间的雾也散去，丹霞红岩、茶园梯田、玉带一样的九曲溪、秋日亮黄或锈红的树冠…在路上逐帧播放，像徐徐展开的山水长卷。\n\n上上周张家界比赛后，最近两周都没有练，这周六训练后连轴又跑了周日的比赛，一如往常的不当回事，练后不拉伸赛前不热身，连着两天只睡 4h——人生第一次经历了髂胫束疼的感觉。35km 的赛程，15km 开始膝盖外侧隐隐作痛，20km 开始连着腿刺痛，25km 开始一弯腿就疼的龇牙咧嘴，后程的下坡每走一步都要「嘶」一下，最后几公里就这么徒步回去了。中途无数次想过退赛，但想着第一次尝试这距离，已经跑了过半放弃太可惜，骂了无数次「死腿快跑」，咬着牙也得完赛了。后几公里满脑子在回想「到底哪里做错了」，好跑的路段和完美的天气，本应有个比之前好一点的成绩。不过不过，解锁了一些疼痛的新体验，高铁上翻看训练营教的拉伸和恢复，很幸运这次没有大的影响也没有产生其他伤病，了解身体，尊重身体，趁着经历又学到了新东西。\n\n最后 200m 临近冲线，咬着牙跑了几步，突然就在终点场边听到了有人叫我。回头懵了一下，居然看到了腿教！！！比赛是 3 月份刚从广州搬去深圳时候报的，没想过会在下半年来到杭州，更没想过会加入一个跑山训练营。本想着比赛时就是自己跑去武夷山观光玩耍一下，但有时候事情就这样环环相扣起来——杭州训练营还有三个同学也一起来跑了比赛，教练跑完前一天的长距离，第二条毫无预告的等在终点，迎接了每一个人，意外又开心。",
    },
  },
  {
    id: "xterra-zjj-2025-10",
    date: "2025-10-26",
    title: { zh: "Xterra 张家界 · 30km 组完赛" },
    location: { zh: "湖南张家界" },
    keywords: ["trail run", "Xterra"],
    cover: "/life/sport/2025-10-26-xterra张家界-30km组完赛/cover.jpg",
    images: sportDisplay("/life/sport/2025-10-26-xterra张家界-30km组完赛/cover.jpg"),
    body: {
      zh: "10 月的张家界多雨的，周六到时还是细雨绵绵，峰林隐在雾里。万亿年前的峰林不止是巍峨，雾气缠绕着，还多了一份灵气。周六到景区里「踩线」（其实是坐缆车观光），我们说的最多的是：哇！\n\n选手之夜是在山风中的露天舞台，现代音乐、民俗舞蹈、本土精酿，很 Xterra 了。9pm 在标志门，土家傩舞起，震山鼓敲响，所有人目送 88K 的选手们奔赴夜色深处。\n\n第二天轮到我们开赛前，太阳忽然从浓雾里显了出来，跑到转弯处，看到昨天掩在雾气里的山，轮廓逐渐清晰。有点兴奋，快跑几步到边上拍起照来。只求不被关门的跑山是这样的，随时可以停下来开启观光。\n\n第一次来张家界，因为赛道深入了更多的地方。比赛会带我们从不同的角度看山，沿途石壁、溪流、竹林、村落。每一个转弯都不一样。第三个 CP 点进到村镇，路一边是一排补给的桌子，另一边是当地的叔伯阿姨、爷爷奶奶，很好玩，奶奶们站一堆，爷爷们在另一堆，像是每天例行聚在村里聊八卦、晒太阳。离开补给点后的几公里我满脑子都是他们的样子，尝试在想象他们今天在做什么，站在路边聊什么好玩的事情。\n\n跑到这一段，才冒出个有点傻的念头：原来张家界除了奇石，还有人家。总是惯性觉得景区无非是商业，很少想到也是聚落和居所。想到这里突然觉得此时此地更真切了。刚接触到跑山时候，从几篇「风土志」开始关注到 Xterra，他们写：一条山径，不仅是穿越的通道，它更像一本没有文字的史书。贸易、游牧、朝圣、逃离、归属..人类的痕迹与自然的节奏在其中交织。待步道既是文化的承载体，也是人与土地之间的恒久对话。在地图和社交媒体的滤镜之外，步道是一种古老而温柔的记录:它记录脚步，也记录人与土地的关系。\n\n在凯乐石训练营短短几周的线下训练，得益于训练体系的综合性和循序渐进，从基本功，到怎么吃怎么喝，到赛前一周刚学到比赛策略。在实际的比赛中都一点点的生涩的用起来了，第一次感觉抬头看到长段爬升台阶时候，不心慌害怕了，看了看表上的海拔，也就是三趟「噔噔噔」训练。\n\n最后三四公里是连续的湿滑下坡，回来后我叫它们「大滑梯」。每一步落脚都踩不实，总要向前滑动一小截。陡的地方得抓绳子，路窄得只容一人慢行，侧滑一步就是山林。也险，也亢奋。如果不是表在这段前没电了，大概能看到分段心率因为紧张而飙高。和朋友开玩笑说「第 15K 开始就没有路了」。当然，你不能职责山怎么没有长出平整的路面，恰好的阴凉，山就是山。\n\n回到酒店，保洁阿姨兴冲冲的问，「去跑步了呀，跑赢了吗？」。我说「赢」了，比上一次跑的又好了一点。\n\n时隔四天，我坐在家里，边看那些沿途的视频，边写下这些的时候，感觉山间的雾气又升腾了上来。\n\n自然，当然是我们和世界连接的方式。",
    },
  },
  {
    id: "kailas-camp-2025-9",
    date: "2025-09 — 11",
    title: { zh: "凯乐石大坡王训练营" },
    location: { zh: "浙江杭州" },
    keywords: ["trail run", "训练营"],
    cover: "/life/sport/2025-9-11月-凯乐石大坡王训练营/cover.jpg",
    images: sportDisplay("/life/sport/2025-9-11月-凯乐石大坡王训练营/cover.jpg"),
    body: {
      zh: "加入之前半马的路跑就是我的极限，看到 15km+ 的距离总要后退几步。每次训练前一晚都特紧张，距离太长/爬升太高/路线没跑过，满脑子都是「这我能跑？？？」\n\n9 月底开始每周末早上 5:30 摸黑起床。虽然每次都比大家少完成大概 1/3 训练量，但每次都在刷新自己的纪录。从纯粹紧张，变成更多是期待，期待自己再完成一个挑战。\n\n除了数字，身体也在学着在上坡时调整呼吸，在疲惫时找到节奏。脑子开始尝试理解：让我喘不过气、双腿灌铅的瞬间，不能被简单归因为「太菜」。教练的指导和周中的线上会议交流，告诉我这都是可以被拆解的具体课题：上下坡基本功、体能分配、补给时机…恐惧源于未知，而当一切逐渐清晰，底气就长出来了。\n\n过了「第二集」的考核，每次训练后，大家都要打趣说「又多活了一集」。能力各异，但没人卷数据，每次擦肩都互相喊一声加油，在自己的节奏里变强。\n\n教练在一次周会上提到，「胜人者有力，自胜者强。」",
    },
  },
  {
    id: "hike-2025-9",
    date: "2025-09",
    title: { zh: "开始尝试徒步" },
    location: { zh: "广东广州" },
    keywords: ["hiking", "徒步"],
    cover: "/life/sport/2025-9-开始尝试徒步-广东广州/cover.jpg",
    images: sportDisplay("/life/sport/2025-9-开始尝试徒步-广东广州/cover.jpg"),
  },
  {
    id: "trail-first-2025-5",
    date: "2025-05-19",
    title: { zh: "人生首野完赛 · 25km / 1675m 爬升" },
    location: { zh: "广东深圳" },
    keywords: ["trail run", "越野"],
    cover: "/life/sport/2025-5-19-人生首野完赛-jpg/cover.jpg",
    images: sportDisplay("/life/sport/2025-5-19-人生首野完赛-jpg/cover.jpg"),
  },
  {
    id: "spartan-super-2025-3",
    date: "2025-03-23",
    title: { zh: "第一次斯巴达 Super 组完赛" },
    location: { zh: "深圳" },
    keywords: ["Spartan", "障碍赛"],
    cover: "/life/sport/2025-3-23-第一次斯巴达super组完赛/cover.jpg",
    images: sportDisplay("/life/sport/2025-3-23-第一次斯巴达super组完赛/cover.jpg"),
    body: {
      zh: "朋友问为什么唯一的休息日，为什么不在家补觉偏要顶着太阳去玩泥巴——因为起点线后面，就是山啊。\n\n平日运动时总爱放空乱想，比赛两个多小时里，潦草记下一些感知：\n\n1. 工具是身体的延伸线。这次匆忙，只带了双劳工手套，也是整场下来最有用的工具。很多需要抓握的项目，防滑耐磨的手套让我有勇气冲。重要的其实不是抓住什么，而是敢把手伸出去。\n\n2. 不要先说「不行」，身体比大脑更懂通关。第一个障碍就要先攀上一个远高于我的横杆，大脑还在慌张该怎么上，双腿已经甩了上去。后面的很多项目都是，用肚子、四肢、肩膀，调动能调动的，抓住一切能抓住的，站着够不到就爬，手撑不住就用膝盖顶。大多障碍越分析越怕，看似不可能翻越的，在直接上手「试试看」的瞬间被攻克。\n\n3. 先抄作业，当个理直气壮的观察者。很多项目有独特的过关技巧。上手前我都会站在旁边看一会。看人怎么过去，怎么过不去。不丢人，成年人的考场允许交头接耳。\n\n4. 放弃就放弃，失败是诚实的老师。25 个障碍，我放弃了 4 个。很兴奋的知道了有那么多以为过不去的，实际上我可以做到；也看到了平常的偷懒——锻炼总会跳过的上肢，结果就是所有悬挂类项目都放弃，换成了 30 个波比跳。「现在你更清楚该练哪里了。」\n\n5. 下坡接着冲，在安全区继续发力然后反超。路线在笔架山，会有不断的爬升和下降。我在所有下坡路段小跑，看到原本在我前面的人被超过去，心态上也一扫了前面的落后感。最轻盈的步伐，都发生在俯冲的失重时刻。\n\n6. In your own time zone。出发时候人非常多，但拉长时间后总会产生差距。有些路段只剩自己也不知道是跑的靠前还是落后。山把人群冲散，让你听见自己的节拍。只管保持节奏，继续往前就好。\n\n7. 泥坑不回答假设题，别问难不难，去就知道了。到了「大泥坑」边上，有人停下来讨论「水有多深」下面有什么」。我说下去就知道，一猛子蹦进去——水很凉爽，也不深，底下很平坦。所有预设的恐惧，在「下去」后消失了。用理性丈量泥坑时，也要期待着纵身跃入浑浊的快乐啊。",
    },
  },
  {
    id: "half-chiangmai-2024-12",
    date: "2024-12-22",
    title: { zh: "人生第一场半马 · 清迈半马" },
    location: { zh: "泰国清迈" },
    keywords: ["road run", "半马"],
    cover: "/life/sport/2024-12-22-人生第一场半马-清迈半马/cover.jpg",
    images: sportDisplay("/life/sport/2024-12-22-人生第一场半马-清迈半马/cover.jpg"),
    body: {
      zh: "4am 开跑，出发天黑着跑完还黑着。人生首（半）马 🐴 达成！\n\n今年四月份开始跑步，从 4km 到 8 到 12，给 2024 的没用的交代 +1。今天还活，很开心🫡",
    },
  },
  {
    id: "aboro-2024-4",
    date: "2024-04 — 06",
    title: { zh: "Aboro 三个月拳击训练营" },
    location: { zh: "上海" },
    keywords: ["boxing", "训练营"],
    cover: "/life/sport/aboro三个月的拳击训练营/cover.jpg",
    images: sportDisplay("/life/sport/aboro三个月的拳击训练营/cover.jpg"),
    body: {
      zh: "决定报名是因为当时看到这句：用「我会」三个字取代「我试试」，奇迹就会发生——Aboro 说这个信仰支撑着她成为了 7 次不败的世界拳击冠军。\n\n一周六练，放弃了周末的酒局和出行，把这场训练完整的参与了。有幸跟着优秀的教练，系统化的学习这项运动。体能、技术、呼吸、修复，任何运动都不是单一的。学会如何「打人」和「挨打」，是在办公室生活中未曾设想的体验。我们会用「冷静」来形容拳击，因为暴力出拳只会遍体鳞伤和体力耗尽。\n\n日子也是如此，从学会挨打，学会冷静，到学会反击。",
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
    images: sportDisplay("/life/sport/开始走进健身房-力量训练-jpg/cover.jpg"),
  },
  {
    id: "ow-2023-8",
    date: "2023-08",
    title: { zh: "考取 OW 潜水证" },
    location: { zh: "马来西亚仙本那" },
    keywords: ["diving", "潜水"],
    cover: "/life/sport/考取了ow潜水证-马来西亚仙本那/cover.jpg",
    images: sportDisplay("/life/sport/考取了ow潜水证-马来西亚仙本那/cover.jpg"),
  },
  {
    id: "surf-2023-7",
    date: "2023-07",
    title: { zh: "开始学习冲浪" },
    location: { zh: "广东惠州" },
    keywords: ["surf", "冲浪"],
    cover: "/life/sport/2023-7-开始学习冲浪-广东惠州/cover.jpg",
    images: sportDisplay("/life/sport/2023-7-开始学习冲浪-广东惠州/cover.jpg"),
  },
];

export function getLifeSportIds(): string[] {
  return demoLifeSport.filter((e) => e.body).map((e) => e.id);
}

export function getLifeSportById(id: string): LifeSportEntry | undefined {
  return demoLifeSport.find((e) => e.id === id);
}
