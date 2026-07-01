# 飞书文档 → 站点内容

## 一句话

把飞书 Wiki 链接里的**正文 + 图片**按原文顺序导入站点。以后给我链接 + 目标（Life / Writing）即可。

## 前置（一次性）

1. 本机浏览器**已登录**飞书（能打开该 Wiki）
2. 启动 web-access **CDP Proxy**（默认 `http://localhost:3456`）

## 常用命令

```bash
# Life Archive 文章（例：31 岁）
npm run import:feishu -- --slug turning-31

# 临时链接（不必先写 manifest）
npm run import:feishu -- \
  --url "https://my.feishu.cn/wiki/..." \
  --target life \
  --slug my-slug \
  --title "标题" \
  --date 2025-09-22 \
  --tags 随笔 \
  --toc

# Writing 随笔 MDX
npm run import:feishu -- \
  --url "https://my.feishu.cn/wiki/..." \
  --target writing \
  --slug my-essay \
  --title "标题" \
  --date 2025-06-01 \
  --tags 随笔,旅行

# 批量：scripts/feishu-imports.json 里全部
npm run import:feishu -- --all
```

## 产出位置

| target | 正文 | 图片 |
|--------|------|------|
| `life` | `life-journal-bodies.json` + **`life-journal-flow.json`**（图文顺序） | `public/life/journal/<slug>/` |
| `writing` | `content/demo/writing/<slug>.mdx` | `public/writing/<slug>/` |

## 持久化配置

在 `scripts/feishu-imports.json` 追加条目后，以后只需：

```bash
npm run import:feishu -- --slug <slug>
```

## 给 Agent 的口令

> 飞书链接：https://my.feishu.cn/wiki/…  
> 导入到 Life，slug 叫 xxx，标题 xxx

Agent 应：确认 CDP Proxy → 跑 `npm run import:feishu` → 必要时更新 `demo-life-journal.ts` 条目 → `npm run build`。

## 排版标准（自动，无需每次手改）

飞书 Life 文章导入后由 **`LifeArticleBody` + `preprocessLifeBlocks`** 统一渲染：

| 飞书块 | 站点展示 |
|--------|----------|
| heading1 | 章节主标题（`.life-section-title`） |
| heading2 | 章节副标题 / deck（`.life-section-deck`，紧跟主标题成组） |
| text / quote | 正文段落 / 引用 |
| bullet | 合并为 `<ul>` 列表 |
| 连续图片 | 2–3 列 grid（`.life-gallery`），单图限高 ~34rem |
| 单张图片 | 居中宽图（`.life-figure--wide`），限高防竖图撑满屏 |

**不要**在 `demo-life-journal.ts` 写「从飞书同步」类占位 `oneLine`；页头只保留文章标题 + 日期/标签。

`oneLine` 仅用于 Life 列表摘要；**文章页**会自动并入正文首段（`mergeIntroIntoBlocks`），不与正文重复分段。

正文排版统一走 `.editorial-content.prose-playbook`（serif、行高 2、首段 `.life-lede`）。
