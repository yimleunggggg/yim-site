import type { LText } from "./demo-data";

/** 各页面壳层 / 按钮 / 导航等前端 UI 文案（非 MDX 正文） */
export const demoUiCopy = {
  projectPage: {
    backLink: { zh: "← Projects", en: "← Projects" } as LText,
    visitLive: { zh: "访问网站", en: "Visit site" } as LText,
    openDemo: { zh: "打开 Demo", en: "Open demo" } as LText,
    vercelNetworkNotice: {
      zh: "Vercel 部署 · 访问时需要科学上网",
      en: "Vercel deployment · A VPN may be required",
    } as LText,
    screenshotHeading: { zh: "产品界面", en: "Product UI" } as LText,
    screenshotMeta: {
      zh: "共 {count} 张 · 点击查看大图",
      en: "{count} screens · tap to enlarge",
    } as LText,
    relatedWriting: { zh: "相关内容", en: "Related" } as LText,
  },
  projectMeta: {
    stackOverview: { zh: "技术概览", en: "Technical overview" } as LText,
    devTools: { zh: "开发工具", en: "Tools" } as LText,
    related: { zh: "延伸阅读", en: "Further reading" } as LText,
    relatedDemo: { zh: "Demo", en: "Demo" } as LText,
    relatedKind: {
      wechat: { zh: "微信公众号", en: "WeChat" } as LText,
      external: { zh: "外链", en: "External" } as LText,
      writing: { zh: "站内文章", en: "On-site" } as LText,
      demo: { zh: "Demo", en: "Demo" } as LText,
    },
  },
  lifePage: {
    backHome: { zh: "Home", en: "Home" } as LText,
    lifeArchive: { zh: "Life Archive", en: "Life Archive" } as LText,
    showAll: { zh: "展开全部", en: "Show all" } as LText,
    showLess: { zh: "收起", en: "Show less" } as LText,
  },
  aboutPage: {
    readMore: { zh: "继续阅读", en: "Read more" } as LText,
    jumpWork: { zh: "工作履历", en: "Experience" } as LText,
    jumpProjects: { zh: "项目", en: "Projects" } as LText,
    jumpToProjects: { zh: "查看项目 ↓", en: "See projects ↓" } as LText,
    moreProjects: { zh: "更多项目", en: "More projects" } as LText,
    allProjects: { zh: "全部项目", en: "All projects" } as LText,
    expandWorkDetail: { zh: "展开详情", en: "More detail" } as LText,
    workExpandHint: {
      zh: "含职责描述与技能标签 · 支付宝、京东、卡士等",
      en: "Roles, tags & highlights · Alipay, JD.com, CLASSY KISS, etc.",
    } as LText,
  },
  writingPage: {
    backLink: { zh: "← Writing", en: "← Writing" } as LText,
    related: { zh: "相关文章", en: "Related" } as LText,
  },
} as const;
