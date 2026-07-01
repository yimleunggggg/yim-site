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
