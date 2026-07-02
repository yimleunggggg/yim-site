/**
 * 项目详情页 · 结构化元数据（技术概览 / 开发工具 / 延伸阅读）
 * 文案使用 LText，随站点语言切换。
 */

import type { LText } from "./demo-data";

export type ProjectRelatedSubLink = {
  kind: "wechat" | "external" | "writing" | "demo";
  title: LText;
  url: string;
};

export type ProjectRelatedLink = {
  kind?: "wechat" | "external" | "writing" | "demo";
  title: LText;
  url?: string;
  note?: LText;
  items?: ProjectRelatedSubLink[];
};

export type ProjectStackGroup = {
  label: LText;
  items: LText[];
};

export type DemoProjectMeta = {
  summary?: LText;
  stack: ProjectStackGroup[];
  devTools: string[];
  related?: ProjectRelatedLink[];
};

export const demoProjectMeta: Record<string, DemoProjectMeta> = {
  "yakushima-bus-now": {
    stack: [
      {
        label: { zh: "产品形态", en: "Product shape" },
        items: [
          {
            zh: "多页静态网站，离岛交通信息场景优化",
            en: "Multi-page static site tuned for island transit lookup",
          },
          {
            zh: "班次 / 运价 / 船运 / 地图本地查询，弱网可用",
            en: "Local timetables, fares, ferries & maps — works on weak networks",
          },
        ],
      },
      {
        label: { zh: "数据与发布", en: "Data & publishing" },
        items: [
          {
            zh: "官方 PDF → Python 解析 → 生成前端数据文件",
            en: "Official PDFs → Python parsing → frontend data files",
          },
          {
            zh: "小范围改动用 JSON override，不必等整表更新",
            en: "Small edits via JSON overrides without full table rebuilds",
          },
          {
            zh: "GitHub Pages 托管，域名 yakushimabus.com",
            en: "Hosted on GitHub Pages at yakushimabus.com",
          },
        ],
      },
      {
        label: { zh: "增长与观测", en: "Growth & observability" },
        items: [
          {
            zh: "Google Analytics 4 关键行为追踪",
            en: "Google Analytics 4 for key behavior tracking",
          },
          {
            zh: "Search Console + sitemap + 结构化数据",
            en: "Search Console, sitemap & structured data",
          },
          {
            zh: "SEO 日报自动化（可复用教程仓）",
            en: "Automated SEO daily reports (reusable guide repo)",
          },
        ],
      },
    ],
    devTools: ["Cursor", "Codex", "Python", "Git / GitHub"],
    related: [
      {
        kind: "wechat",
        title: {
          zh: "上线 1 个月的产品优化：分销联盟、关键事件埋点等",
          en: "One month in: product optimizations, affiliates & analytics",
        },
        url: "https://mp.weixin.qq.com/s/32M4rwGXXC1zGSM_y4Lo8w",
        note: {
          zh: "时刻表修复、全岛地图、徒步页、GA4 与联盟接入",
          en: "Timetable fixes, island map, hiking, GA4 & affiliate setup",
        },
      },
      {
        kind: "wechat",
        title: { zh: "制作过程与经验总结", en: "Build log & lessons learned" },
        url: "https://mp.weixin.qq.com/s/bN7wbRI6TsWguZ59fTBYoQ",
        note: { zh: "从需求、数据到上线的完整记录", en: "From problem to launch" },
      },
      {
        kind: "external",
        title: { zh: "静态站 Vibe Coding 教程", en: "Static site vibe coding guide" },
        url: "https://github.com/yimleunggggg/vibe-coding-static-site-guide",
      },
    ],
  },
  packlog: {
    stack: [
      {
        label: { zh: "产品能力", en: "Capabilities" },
        items: [
          { zh: "多目的地行程、场景模板自动清单", en: "Multi-trip templates & auto packing lists" },
          { zh: "分箱包核对、重量统计（含 Big3 / 基础重量）", en: "Per-bag checks, weight stats incl. Big3 / base weight" },
          {
            zh: "个人装备库、社区经验贡献及装备复制、行后复盘",
            en: "Gear library, community tips, copy kits, post-trip review",
          },
          { zh: "中 / 英 / 日三语，离线目的地数据", en: "Chinese / English / Japanese, offline destination data" },
        ],
      },
      {
        label: { zh: "技术概览", en: "Technical overview" },
        items: [
          { zh: "React Web 应用，云端 Supabase 同步账号数据", en: "React web app, Supabase sync for signed-in users" },
          { zh: "未登录本地保存，登录后跨设备快照", en: "Local save when logged out; cross-device snapshots when signed in" },
          {
            zh: "Claude 辅助解析行程与装备识别（服务端调用）",
            en: "Claude-assisted trip parsing & gear recognition (server-side)",
          },
          { zh: "部署在 Cloudflare Workers", en: "Deployed on Cloudflare Workers" },
        ],
      },
    ],
    devTools: ["Cursor", "TypeScript", "Supabase", "Git / GitHub"],
    related: [
      {
        kind: "demo",
        title: { zh: "线上 Demo", en: "Live demo" },
        url: "https://packlog.yimleung-ly.workers.dev/",
        note: { zh: "可直接试用", en: "Try it now" },
      },
    ],
  },
  offtrack: {
    stack: [
      {
        label: { zh: "整体形态", en: "Shape" },
        items: [
          { zh: "网页 + App 同源开发（一套共享数据层）", en: "Web + app from one shared data layer" },
          { zh: "深色主题，移动端可 Expo 即时预览", en: "Dark theme, instant Expo preview on mobile" },
        ],
      },
      {
        label: { zh: "当前实现", en: "Current build" },
        items: [
          { zh: "等候名单、行为埋点、数据概览", en: "Waitlist, event tracking, data overview" },
          { zh: "验证期数据本地落盘，上线切换 Supabase", en: "Local storage in validation; Supabase at launch" },
          { zh: "Vercel 自动部署与预览链接", en: "Vercel auto deploy & preview URLs" },
        ],
      },
      {
        label: { zh: "规划中", en: "Planned" },
        items: [
          { zh: "AI 生成运动画像与破冰话题", en: "AI activity profiles & icebreaker prompts" },
          { zh: "接入 Strava、Garmin 等运动数据源", en: "Strava, Garmin and other activity sources" },
        ],
      },
    ],
    devTools: ["Cursor", "TypeScript", "Git / GitHub"],
    related: [
      {
        kind: "demo",
        title: { zh: "线上 Demo", en: "Live demo" },
        url: "https://offtrack-eta.vercel.app/",
        note: { zh: "内测预览", en: "Private beta preview" },
      },
    ],
  },
};

export function getDemoProjectMeta(slug: string): DemoProjectMeta | undefined {
  return demoProjectMeta[slug];
}
