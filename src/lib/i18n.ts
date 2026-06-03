export type Locale = "zh" | "en";

export const defaultLocale: Locale = "zh";

const dict = {
  zh: {
    siteTitle: "LIFE × AI LAB",
    siteSubtitle: "Personal Experiments",
    nav: {
      home: "首页",
      about: "关于",
      guides: "教程",
      aiPlaybook: "AI",
      life: "生活",
      resume: "简历",
      projects: "项目",
      blog: "博客",
    },
    home: {
      greeting: "我叫梁言",
      greetingEn: "Yim Leung",
      tagline: "探索者 · 运营人 · AI 实践者",
      intro:
        "内蒙古人，14 岁开始独自旅行，走过 70+ 城市。冲浪、跑步、登山、潜水、拳击——身体是长期项目。从支付宝到京东到消费品牌，8 年用户运营经验。最近在用 AI 解决真实问题，并把学到的东西教给别人。",
      introEn:
        "From Inner Mongolia. Solo traveler since 14, 70+ cities. Surfer, runner, diver, boxer. 8 years in user ops across Alibaba, JD, and consumer brands. Currently exploring how AI fits into real life — and teaching others along the way.",
      now: "NOW · 最近在做",
      nowItems: [
        "整理 AI 培训内容为公开 Playbook",
        "做旅行效率小工具（行李称重 / 路线决策）",
        "运动 + AI 辅助训练复盘",
        "精酿啤酒自媒体与线下活动",
      ],
    },
    tracks: {
      title: "探索轨道",
      items: [
        {
          tag: "AI × 应用",
          title: "把 AI 融入真实生活",
          desc: "工具选型 · 培训设计 · 部署教程 · 效率工作流",
          href: "/ai-playbook",
        },
        {
          tag: "独立旅行",
          title: "在路上做决策实验",
          desc: "70+ 城市 · 斯里兰卡义工 · 清迈旅居 · 独旅方法论",
          href: "/about#journey",
        },
        {
          tag: "运动与身体",
          title: "身体是长期项目",
          desc: "清迈半马 · 斯巴达超级赛 · 越野跑 · 冲浪 · 潜水 · 拳击",
          href: "/about#sports",
        },
        {
          tag: "精酿与社群",
          title: "用兴趣连接人",
          desc: "精酿自媒体 · 线下活动策划 · 播客 · 电商闭环",
          href: "/about#craft",
        },
      ],
    },
    about: {
      title: "关于我",
      tags: "#独立 #有趣 #生命力 #好奇心 #热爱生活 #社交磁铁",
      motto: "点菜爱点没吃过的，聊天爱听不知道的。天生好奇，不拒新鲜，主动冒险。",
    },
    footer: "一个持续探索的个人实验站",
    switchLang: "EN",
  },
  en: {
    siteTitle: "LIFE × AI LAB",
    siteSubtitle: "Personal Experiments",
    nav: {
      home: "Home",
      about: "About",
      guides: "Guides",
      aiPlaybook: "AI",
      life: "Life",
      resume: "Resume",
      projects: "Projects",
      blog: "Blog",
    },
    home: {
      greeting: "I'm Yim Leung",
      greetingEn: "梁言",
      tagline: "Explorer · Operator · AI Practitioner",
      intro:
        "From Inner Mongolia. Solo traveler since 14, been to 70+ cities. Surfer, runner, diver, boxer — the body is a long-term project. 8 years in user ops across Alibaba, JD.com, and consumer brands. Currently exploring how AI fits into real life, and teaching others along the way.",
      introEn:
        "内蒙古人，14 岁开始独自旅行。冲浪、跑步、登山、潜水、拳击。从支付宝到京东到消费品牌，8 年运营经验。最近在用 AI 解决真实问题。",
      now: "NOW · Currently",
      nowItems: [
        "Building a public AI training Playbook",
        "Making travel utility tools (packing weight / route planning)",
        "Sports + AI-assisted training review",
        "Craft beer media & offline events",
      ],
    },
    tracks: {
      title: "Exploration Tracks",
      items: [
        {
          tag: "AI × Real Life",
          title: "AI in everyday problems",
          desc: "Tool selection · Training design · Deployment tutorials · Workflows",
          href: "/ai-playbook",
        },
        {
          tag: "Solo Travel",
          title: "Decision experiments on the road",
          desc: "70+ cities · Sri Lanka volunteering · Chiang Mai · Travel methodology",
          href: "/about#journey",
        },
        {
          tag: "Sports & Body",
          title: "The body is a long-term project",
          desc: "Half marathon · Spartan · Trail running · Surfing · Diving · Boxing",
          href: "/about#sports",
        },
        {
          tag: "Craft Beer & Community",
          title: "Connecting people through interests",
          desc: "Craft beer media · Offline events · Podcast · Commerce loop",
          href: "/about#craft",
        },
      ],
    },
    about: {
      title: "About Me",
      tags: "#Independent #Fun #Vitality #Curious #LovesLife #SocialMagnet",
      motto: "Always ordering something new. Always wanting to hear what I don't know. Born curious, open to the unfamiliar, actively seeking adventure.",
    },
    footer: "A personal experiment station for continuous exploration",
    switchLang: "中文",
  },
} as const;

export type Dict = (typeof dict)["zh"] | (typeof dict)["en"];

export function getDictionary(locale: Locale): Dict {
  return (dict[locale] ?? dict.zh) as Dict;
}
