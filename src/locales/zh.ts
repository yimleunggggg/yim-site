export const zh = {
  nav: {
    home: "首页",
    about: "关于",
    guides: "教程",
    ai: "AI",
    projects: "项目",
    stories: "记录",
    resume: "简历",
  },
  hero: {
    eyebrow: "Yim · 自洽 · 自足 · 自在",
    title: "在动的人，<em>也在搭东西</em>",
    lead: "旅行、跑步、精酿、写教程——把生活里的好奇心，变成能跑起来的小工具和可复用的方法。这里是我的个人站：项目、讲义、记录，以及还在路上的事。",
    tags: ["Vibe Coding", "AI 培训", "屋久岛", "清迈", "精酿", "跑步"],
    stats: [
      { label: "现在在", value: "搭工具 & 写教程" },
      { label: "最近完成", value: "屋久岛公交查询站" },
      { label: "开放合作", value: "AI 培训 · 项目咨询" },
      { label: "联系", value: "yimlueng.ly@gmail.com" },
    ],
  },
  ticker: [
    "屋久岛公交 · yakushimabus.com",
    "Vibe Coding 从零到上线",
    "AI 培训讲义 · 7 章",
    "清迈 · 斯里兰卡 · 精酿",
    "跑步 · 徒步 · 在路上",
    "教程开源 · GitHub",
  ],
  hub: {
    eyebrow: "入口",
    title: "从这里开始",
    cards: [
      {
        index: "01",
        title: "教程中心",
        desc: "分主题、分路径的学习模块——Vibe Coding 实战、AI 培训讲义、SEO 自动化。",
        meta: "Guides →",
        href: "/guides",
      },
      {
        index: "02",
        title: "AI 培训",
        desc: "面向团队的 AI 协作讲义：从认知到落地，含案例与 FAQ。",
        meta: "AI Playbook →",
        href: "/ai-playbook",
      },
      {
        index: "03",
        title: "项目案例",
        desc: "屋久岛公交查询、培训工具链，以及还在迭代中的 side projects。",
        meta: "Projects →",
        href: "/projects",
      },
      {
        index: "04",
        title: "关于 & 简历",
        desc: "背景、旅行与运动、精酿——以及求职/合作时的在线简历。",
        meta: "About →",
        href: "/about",
      },
    ],
  },
  guides: {
    eyebrow: "Guides",
    title: "教程中心",
    lead: "按主题分块、按路径学习。每个模块都可以单独分享链接，也可以按顺序走完一条完整路径。",
    themes: [
      { icon: "🌱", label: "入门", title: "Vibe Coding 是什么", desc: "产品经理式做产品，AI 写代码" },
      { icon: "🗺️", label: "流程", title: "从想法到上线", desc: "需求、架构、部署一条龙" },
      { icon: "🏗️", label: "架构", title: "技术选型", desc: "Next.js、数据管线、成本" },
      { icon: "📈", label: "增长", title: "SEO 自动化", desc: "内容、索引、监控" },
      { icon: "🤖", label: "协作", title: "AI 培训", desc: "团队 AI 落地讲义" },
      { icon: "🔧", label: "工具", title: "Cursor & CLI", desc: "日常开发与环境" },
    ],
    paths: [
      {
        badge: "实战路径",
        title: "屋久岛 · 从零到上线",
        steps: [
          { num: "01", title: "Vibe Coding 是什么", href: "/guides/yakushima/01-vibe-coding是什么" },
          { num: "02", title: "从想法到上线", href: "/guides/yakushima/02-从想法到上线-总流程" },
          { num: "03", title: "架构一览", href: "/guides/yakushima/03-架构一览" },
          { num: "04", title: "产品与数据管线", href: "/guides/yakushima/04-产品与数据管线" },
          { num: "05", title: "部署与成本", href: "/guides/yakushima/05-部署与成本" },
          { num: "06", title: "SEO 与增长", href: "/guides/yakushima/06-SEO与增长自动化" },
          { num: "07", title: "踩坑与决策", href: "/guides/yakushima/07-踩坑·决策·思考" },
          { num: "08", title: "复用清单", href: "/guides/yakushima/08-下一个项目复用清单" },
        ],
      },
      {
        badge: "培训路径",
        title: "AI 协作培训",
        steps: [
          { num: "01", title: "培训总览", href: "/ai-playbook" },
          { num: "02", title: "各章节讲义", href: "/ai-playbook/manifesto" },
        ],
      },
    ],
    series: [
      {
        tag: "vibe",
        tagLabel: "Vibe Coding",
        title: "屋久岛公交 · 实战 Playbook",
        desc: "不动代码也能上线：用 Cursor 对话做出 yakushimabus.com 的完整复盘，8 章可独立阅读。",
        links: [
          { label: "开始阅读", href: "/guides/yakushima/01-vibe-coding是什么", primary: true },
          { label: "案例站", href: "https://yakushimabus.com", external: true },
          { label: "GitHub", href: "https://github.com/yimleunggggg/vibe-coding-static-site-guide", external: true },
        ],
      },
      {
        tag: "ai",
        tagLabel: "AI 培训",
        title: "AI Playbook 讲义",
        desc: "面向企业/团队的 AI 协作培训材料：认知框架、工具链、案例与常见问题。",
        links: [
          { label: "进入讲义", href: "/ai-playbook", primary: true },
          { label: "RSS", href: "/ai-playbook/feed.xml", external: true },
        ],
      },
      {
        tag: "seo",
        tagLabel: "SEO",
        title: "SEO 自动化教程",
        desc: "屋久岛项目衍生的 SEO 实操：内容策略、技术 SEO、监控与迭代（脱敏公开版）。",
        links: [
          { label: "开始阅读", href: "/guides/seo/01-目标与阶段", primary: true },
          { label: "SEO 模块", href: "/guides/seo", primary: false },
        ],
      },
    ],
  },
  about: {
    title: "梁言 · Yim",
    motto: "在动的人，也在搭东西。",
    tags: "旅行 跑步 精酿 冲浪 徒步 AI Vibe Coding",
  },
  footer: {
    brand: "Yim",
    tagline: "自洽 · 自足 · 自在",
    copy: "© 2026 Yim. 教程内容可引用，请注明出处。",
    links: [
      { label: "GitHub", href: "https://github.com/yimleunggggg" },
      { label: "邮箱", href: "mailto:yimlueng.ly@gmail.com" },
    ],
  },
} ;

export type LocaleDict = typeof zh;
