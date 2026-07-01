import type { LText } from "./demo-data";

/** 各页面壳层 / 按钮 / 导航等前端 UI 文案（非 MDX 正文） */
export const demoUiCopy = {
  projectPage: {
    backLink: { zh: "← Projects", en: "← Projects" } as LText,
    visitLive: { zh: "访问网站 →", en: "Visit site →" } as LText,
    openDemo: { zh: "打开 Demo →", en: "Open demo →" } as LText,
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
  writingPage: {
    backLink: { zh: "← Writing", en: "← Writing" } as LText,
    related: { zh: "相关文章", en: "Related" } as LText,
  },
} as const;
