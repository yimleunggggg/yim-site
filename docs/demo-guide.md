# Demo 个人站 · 录入与维护指南

一个完全独立的 demo 版本，命名空间隔离，不改动任何现有页面 / 组件 / 数据。

- 路由：`src/app/demo/`
- 组件：`src/components/demo/`
- 数据：`src/lib/demo/`
- 文章：`content/demo/writing/`、项目正文：`content/demo/projects/`
- 样式：复用 `globals.css` 设计 token；新样式只在文件末尾追加 `demo-` 前缀 class

预览地址：<https://yim-site.vercel.app>

---

## 一、改 `src/lib/demo/demo-data.ts`（唯一结构化入口）

所有结构化内容都在这一个文件。文案用 `{ zh, en? }`，中文为主，`en` 缺省自动回退中文。

| 想改什么 | 改哪个导出 |
| --- | --- |
| 首页 HERO（eyebrow / 标题 / 走马灯说明） | `demoHero` |
| NOW 动态（默认 4 条，其余弹窗） | `demoNow`、`demoNowPreviewCount` |
| 首页 Explore 三张卡 | `demoExplore` |
| 首页 UI 文案 | `demoHomeUi` |
| 走马灯照片 | `demoMarqueePhotos`（源文件夹「首页走马灯」，跑 `scripts/import-frames.sh`） |
| Footer 文案 | `demoFooterUi` |
| 关于页自我介绍 / 标签 / 头像 | `demoAbout` |
| 工作履历（可展开数字） | `demoWork` |
| 证书 6 格 | `demoCerts` |
| 完成的项目（横条 → 详情页） | `demoProjects` |
| 在做 & 计划中（表格） | `demoPlanned` |
| 生活页大标题 | `demoLifeHeader` |
| 生活体验 6 卡 | `demoMoments` |
| 运动观点 / 时间线 / 比赛照片墙 / 运动类型 | `demoMovement` |
| 旅行引言 / 摄影集 / 旅行故事卡 | `demoTravel` |
| FRAMES 摄影合集 | `src/lib/demo/demo-frames.ts`（元信息）+ `public/demo/frames/`（图片） |
| 写作引言 / 标签 | `demoWritingIntro`、`demoWritingTags` |
| 联系方式 / 现居 / 社交 | `demoProfile` |

### i18n 约定（全局）

- **所有面向用户的文案**必须写在 `demo-data.ts` / `demo-frames.ts` 的 `{ zh, en? }` 字段，或 `demoHomeUi` / `demoFooterUi` / `framesUi` 等 UI 导出里。
- **组件内禁止写死中文/英文**；用 `pickText(t, locale === "zh")` 读取。
- 英文短标签（如 MOVEMENT、NOW）可保持英文，但仍建议放入 data 层以便统一维护。

### 性能约定（全局）

成熟做法：**三档静态资源 + Next Image 按需格式**。

| 档位 | 尺寸 | 用途 | 文件名 |
| --- | --- | --- | --- |
| thumb | 480px | FRAMES 列表封面 | `cover-thumb.jpg` |
| display | 1200px | 详情图墙、走马灯 | `01.jpg`、`marquee/*.jpg` |
| full | 2000px | 灯箱放大（点击才加载） | `01-full.jpg` |

- **列表只用 thumb**；**详情墙用 display**；**灯箱用 full**（`imagesFull`）。
- **Next `<Image>`**：`sizes` + `lazy`（首屏前 2–3 张 `eager`）；`next.config.ts` 已开 AVIF/WebP。
- **导入 / 优化**：`bash scripts/import-frames.sh` → `bash scripts/optimize-demo-images.sh`（就地压缩三档）。
- **横竖封面**：CSS columns 瀑布流，原图比例，不裁切。
- **内容多了以后**：大图迁 Vercel Blob / Cloudinary，repo 只留 thumb + display。

### 加一条 NOW 动态

```ts
export const demoNow: DemoNowItem[] = [
  { date: "2026.06", text: { zh: "新的一条动态" } },
  // ...原有的
];
```

### 加一张照片（走马灯 / 照片墙）

把图片放到 `public/` 下（可复用现有 `public/life/...`），再在对应数组里加路径：

```ts
{ src: "/life/moments/xxx/01.jpg", label: { zh: "标题", en: "Title" } }
```

> 缺图的新项目（PACKLOG / Music DNA 等）用 `gradient` 字段做渐变占位，不会报错。

### 加一个项目卡

在 `demoProjects` 里加一项，`slug` 要唯一；正文见下一节。

```ts
{
  slug: "new-project",
  title: { zh: "新项目" },
  tagline: { zh: "一句话介绍" },
  type: { zh: "产品 · AI" },
  status: { zh: "Live" },
  statusTone: "live",       // live | done | wip
  period: "2026",
  liveUrl: "https://...",   // 可选；填 "#" 或省略则不显示按钮
  cover: "/work/xxx.jpg",   // 可选；不填用 gradient
  gradient: "linear-gradient(135deg,#2d4a3e,#4a7c6f)",
}
```

---

## 二、加 MDX 文章

### 写作文章 → `content/demo/writing/<slug>.mdx`

新建文件即自动出现在 `/demo/life#writing` 列表和 `/demo/writing/<slug>`。frontmatter：

```mdx
---
title: 文章标题
date: "2026-06-15"
tags: ["旅行", "运动"]      # 用于筛选，对应标签：AI教程 / 旅行 / 运动 / 随笔
summary: 列表与详情页摘要。
readingMinutes: 8
isAI: true                 # AI 类文章可选，列表 / 详情显示版本横幅
toolVersion: Cursor（2026.06）
updatedAt: "2026-06-15"
---

正文用 Markdown / MDX，复用 prose-playbook 渲染。
可用组件：Callout、PullQuote、PromptBlock、ToolCard、BeforeAfter、SupplementBlock、PipelineDiagram。
```

- 列表按 `date` 倒序；标签筛选在页面内原地完成。
- 文末「相关文章」按相同标签自动推荐。

### 项目正文 → `content/demo/projects/<slug>.mdx`

文件名与 `demoProjects` 里的 `slug` 对应即可，详情页自动渲染正文；没有对应 MDX 时详情页只显示卡片信息，不报错。

```mdx
---
title: 项目名
---

项目正文，图文混排，支持外链 markdown 链接。
```

> 特例：`ai-training` 详情页会自动列出所有带 `AI教程` 标签的写作文章作为「相关内容」。

---

## 三、`/demo` 路由清单

| 路由 | 内容 | 类型 |
| --- | --- | --- |
| `/demo` | 首页：HERO / NOW / WHAT I EXPLORE / 走马灯 / 精选 | 静态 |
| `/demo/about` | 关于：自我介绍 / 工作履历（可展开）/ 证书 / 项目（完成 + 计划） | 静态 |
| `/demo/about#projects` | 项目锚点 | — |
| `/demo/life` | 生活：MOMENTS / MOVEMENT / TRAVEL & PHOTOS / WRITING | 静态 |
| `/demo/life#writing` | 写作锚点 | — |
| `/demo/projects/[slug]` | 项目详情（6 个：packlog / music-dna / yakushima-bus-now / ai-training / beer-matters / classy-kiss-membership） | SSG |
| `/demo/writing/[slug]` | 文章详情（6 篇示例） | SSG |

导航（demo 自己的 header）：`Yim(→/demo) | About Life | EN/中`。

---

## 四、本地与部署

```bash
npm run dev      # 本地预览 http://localhost:3000/demo
npm run build    # 必须通过
npx vercel --yes # 部署 preview（切勿加 --prod，生产是另一套）
```

> 注意：仓库根目录有大体积个人素材文件夹（`个人照片/` 等），已在 `.vercelignore` 中排除，避免超过 100MB 单文件 / 上传体积限制。新增大文件夹记得同步加入。

## 五、复用与隔离边界

- **复用**：`LocaleProvider`、`ImageLightbox`、`MdxContent`、`prose-playbook`、走马灯 class、`site-shell`、设计 token、`public/` 图片。
- **未改动**：现有 `page.tsx` / `about` / `work` / `life` / `blog` / `projects`、`HomePage`、`SiteHeader`、`SiteFooter`、`WorkHistoryList`、`LifePhotoMarquee`、现有 `src/lib/*.ts`、`globals.css` 既有规则。
