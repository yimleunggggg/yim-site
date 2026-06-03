import type { LocaleDict } from "./zh";

export const en: LocaleDict = {
  nav: {
    home: "Home",
    about: "About",
    guides: "Guides",
    ai: "AI",
    projects: "Projects",
    stories: "Stories",
    resume: "Resume",
  },
  hero: {
    eyebrow: "Yim · Grounded · Capable · Free",
    title: "Always moving,<em> always building</em>",
    lead: "Travel, running, craft beer, tutorials—I turn curiosity into small tools and reusable playbooks. Projects, training notes, and stories from the road.",
    tags: ["Vibe Coding", "AI Training", "Yakushima", "Chiang Mai", "Craft Beer", "Running"],
    stats: [
      { label: "Now", value: "Building & writing guides" },
      { label: "Latest", value: "Yakushima bus site" },
      { label: "Open to", value: "AI training · consulting" },
      { label: "Contact", value: "yimlueng.ly@gmail.com" },
    ],
  },
  ticker: [
    "Yakushima bus · yakushimabus.com",
    "Vibe Coding: idea to launch",
    "AI Playbook · 7 chapters",
    "Chiang Mai · Sri Lanka · craft beer",
    "Running · hiking · on the road",
    "Open-source guides · GitHub",
  ],
  hub: {
    eyebrow: "Start here",
    title: "Pick an entry",
    cards: [
      {
        index: "01",
        title: "Guide hub",
        desc: "Themed blocks and learning paths—Vibe Coding, AI training, SEO automation.",
        meta: "Guides →",
        href: "/guides",
      },
      {
        index: "02",
        title: "AI training",
        desc: "Team-facing AI collaboration notes: mindset, tools, cases, and FAQ.",
        meta: "AI Playbook →",
        href: "/ai-playbook",
      },
      {
        index: "03",
        title: "Projects",
        desc: "Yakushima bus lookup, training toolchain, and side projects in progress.",
        meta: "Projects →",
        href: "/projects",
      },
      {
        index: "04",
        title: "About & resume",
        desc: "Background, travel, sports, craft beer—and an online resume for work.",
        meta: "About →",
        href: "/about",
      },
    ],
  },
  guides: {
    eyebrow: "Guides",
    title: "Guide hub",
    lead: "Themed blocks and sequenced paths. Each module has its own URL; follow a path start to finish or jump in anywhere.",
    themes: [
      { icon: "🌱", label: "Start", title: "What is Vibe Coding", desc: "You as PM; AI writes the code" },
      { icon: "🗺️", label: "Flow", title: "Idea to launch", desc: "Requirements, architecture, deploy" },
      { icon: "🏗️", label: "Stack", title: "Architecture", desc: "Next.js, data pipeline, cost" },
      { icon: "📈", label: "Growth", title: "SEO automation", desc: "Content, indexing, monitoring" },
      { icon: "🤖", label: "Teams", title: "AI training", desc: "Enterprise AI rollout notes" },
      { icon: "🔧", label: "Tools", title: "Cursor & CLI", desc: "Daily dev and environment" },
    ],
    paths: [
      {
        badge: "Build path",
        title: "Yakushima · zero to launch",
        steps: [
          { num: "01", title: "What is Vibe Coding", href: "/guides/yakushima/01-vibe-coding是什么" },
          { num: "02", title: "Idea to launch", href: "/guides/yakushima/02-从想法到上线-总流程" },
          { num: "03", title: "Architecture", href: "/guides/yakushima/03-架构一览" },
          { num: "04", title: "Product & data", href: "/guides/yakushima/04-产品与数据管线" },
          { num: "05", title: "Deploy & cost", href: "/guides/yakushima/05-部署与成本" },
          { num: "06", title: "SEO & growth", href: "/guides/yakushima/06-SEO与增长自动化" },
          { num: "07", title: "Pitfalls & decisions", href: "/guides/yakushima/07-踩坑·决策·思考" },
          { num: "08", title: "Reuse checklist", href: "/guides/yakushima/08-下一个项目复用清单" },
        ],
      },
      {
        badge: "Training path",
        title: "AI collaboration",
        steps: [
          { num: "01", title: "Playbook overview", href: "/ai-playbook" },
          { num: "02", title: "All chapters", href: "/ai-playbook/manifesto" },
        ],
      },
    ],
    series: [
      {
        tag: "vibe",
        tagLabel: "Vibe Coding",
        title: "Yakushima bus · build playbook",
        desc: "Ship without writing code: how Cursor conversations became yakushimabus.com—8 standalone chapters.",
        links: [
          { label: "Start reading", href: "/guides/yakushima/01-vibe-coding是什么", primary: true },
          { label: "Live site", href: "https://yakushimabus.com", external: true },
          { label: "GitHub", href: "https://github.com/yimleunggggg/vibe-coding-static-site-guide", external: true },
        ],
      },
      {
        tag: "ai",
        tagLabel: "AI training",
        title: "AI Playbook",
        desc: "Team training material: frameworks, toolchain, cases, and FAQ.",
        links: [
          { label: "Open playbook", href: "/ai-playbook", primary: true },
          { label: "RSS", href: "/ai-playbook/feed.xml", external: true },
        ],
      },
      {
        tag: "seo",
        tagLabel: "SEO",
        title: "SEO automation",
        desc: "From the Yakushima project: content strategy, technical SEO, monitoring (sanitized public version).",
        links: [
          { label: "Start reading", href: "/guides/seo/01-目标与阶段", primary: true },
          { label: "SEO module", href: "/guides/seo", primary: false },
        ],
      },
    ],
  },
  about: {
    title: "Yim Leung",
    motto: "Always moving, always building.",
    tags: "Travel Running Craft Beer Surf Hiking AI Vibe Coding",
  },
  footer: {
    brand: "Yim",
    tagline: "Grounded · Capable · Free",
    copy: "© 2026 Yim. Cite with attribution when reusing guides.",
    links: [
      { label: "GitHub", href: "https://github.com/yimleunggggg" },
      { label: "Email", href: "mailto:yimlueng.ly@gmail.com" },
    ],
  },
};
