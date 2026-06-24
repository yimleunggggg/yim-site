# 第一波改动 · 文案 + 视觉锚点

## 已完成

### 1. 文案审计
- `demo-life-journal.ts`：9 条 oneLine 改为具体细节 + 补 en
- `demo-life-sport.ts`：intro 去 AI 腔；张家界笔记删结尾套话
- `demo-data.ts`：Writing intro、Explore Movement、自我探索系列、CineMate
- `DemoLife.tsx`：Journal 副标题
- `content/demo/projects/self-discovery.mdx` 同步

### 2. Accent + 层级
- Nav active：forest 实心底
- Movement 卡片 hover（含 static 轻 hover）
- 项目状态 tag：Live 实心 / Demo 加 ring / Fuzzy 虚线
- 摘要/meta 字重 500

## 待做（第一波 #3）
- 图片 WebP + srcset 构建管道

## FRAMES UX（Claude 反馈）

- 列表改 **规则 grid**：封面统一 4:5 + `object-fit: cover`
- 去掉地点 emoji，纯文字地点
- 「持续更新」→ 标题去括号 + **Live pill**（与 About 状态 tag 一致）
- 详情页：**breadcrumb** + 上一组/下一组相册导航
- Journal / Sport 文章页补 breadcrumb
- Nav active pill 字重统一 500，避免 active 显大

## 页面排版统一（2026-06-23）

- 新增 `DemoPageHeader`：About / Life / FRAMES 共用 eyebrow + 大标题 + 导语
- `DemoSectionHeading`：分区 eyebrow 与页眉对齐（无横线、同字号）；Life Journal 去掉重复「记录」标题
- FRAMES 引语：拆正文与出处，去掉左边框
- 正文字重统一 400，列表标题 500

## 项目详情文案（2026-06-23）

- Packlog / Yakushima Bus / OFFTRACK / 自我探索系列：更新 tagline、链接与 MDX 正文
- 产品截图：`产品截图/` → `public/work/projects/{slug}/01–NN.png`，按文件夹顺序嵌入详情页
