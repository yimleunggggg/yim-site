# 写文章 · 只加文件，不改前端

所有长文、教程（AI、翻墙、运营、随笔）统一放：

```
content/blog/你的文件名.md
```

发布后自动出现在 `/blog` 列表，地址为 `/blog/你的文件名`（不含 `.md`）。

## 模板

复制 `content/blog/_template.md` 或任意已有文章，改 frontmatter + 正文即可。

```yaml
---
date: "2026-06-01"
topic: tools          # ai | tools | ops | travel | craft | essay
title: "文章标题"
summary: "列表页显示的一两句摘要"
status: published     # draft = 仅列表可见虚线框，不可打开
---
正文用 Markdown。支持 ## 标题、列表、链接、代码块、图片。

![配图说明](/blog/某文件夹/图.jpg)
```

## 图片

放到 `public/blog/某主题/` ，正文用 `/blog/某主题/xxx.jpg` 引用。

## 英文（可选）

正文下方加 `---` 再写英文段落（会显示在同一页分隔线后）。

## 外链（少用）

若必须链到站外而非站内渲染：

```yaml
externalUrl: "https://..."
status: published
```

列表会链出去，**不会**生成 `/blog/[slug]` 页。

## 与其他内容的关系

| 目录 | 用途 | 路由 |
|------|------|------|
| `content/blog/` | 独立文章、教程 | `/blog/[slug]` |
| `content/ai-playbook/` | 内训系列章节 | `/ai-playbook/[slug]` |
| `content/life/moments/` | 生活动态 | `/life` 瀑布流 |
| `content/guides/` | 项目衍生文档 | Case 子路由 |

改完保存 → 本地 `npm run dev` 刷新；部署时 Next 会自动 build 新页面。
