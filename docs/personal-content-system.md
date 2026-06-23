# 个人站内容结构建议

这份是长期更新用的规则：以后写作、照片、项目都尽量只加内容和图片，不改前端。

## 推荐结构

```txt
content/
  demo/
    writing/          # 当前 /writing 使用：长文、随笔、工具文章
    projects/         # 当前 /projects/[slug] 使用：项目详情
  life/
    moments/          # 当前 /life 的短动态

public/
  writing/<slug>/     # 文章配图
  life/moments/<slug>/# 生活动态配图
  life/journal/<slug>/# 长旅行/生活体验图片
  life/sport/<slug>/  # 运动经历图片
  media/frames/<slug>/# 摄影集，保留 thumb/display/full 分层
```

## 内容类型怎么选

| 类型 | 放哪里 | 路由 | 适合内容 |
| --- | --- | --- | --- |
| 长文 / 随笔 | `content/demo/writing/*.mdx` | `/writing/[slug]` | 人生阶段、旅行复盘、AI 工具文章 |
| 短动态 | `content/life/moments/*.md` | `/life` | 像朋友圈一样的几行记录 |
| 摄影集 | `public/media/frames/<slug>/` + `src/lib/demo/demo-frames.ts` metadata | `/frames/[slug]` | 一组照片，一个主题 |
| 项目 | `content/demo/projects/*.mdx` + `src/lib/demo/demo-data.ts` metadata | `/projects/[slug]` | 产品、活动、训练营、作品集 |
| 旧博客 | `content/blog/*.md` | `/blog/[slug]` | 暂时保留，后续可迁移 |

## 图片规则

每组图片建议保留三档：

```txt
cover.jpg       # 列表封面，宽 480-720px
01.jpg          # 正文展示图，长边 1400-1800px
01-full.jpg     # 需要灯箱/高清查看时才用
01-thumb.jpg    # 瀑布流、缩略图、预览条使用
```

列表页、首页、跑马灯不要引用 `*-full.jpg`。正文可以用 `01.jpg`，灯箱或下载才用 `01-full.jpg`。

## 发布检查

1. 新文章先复制一个已有 MDX，统一 frontmatter。
2. 图片放进对应的 `public/.../<slug>/` 文件夹。
3. 大图先压缩，长边通常 1400-1800px 足够。
4. 跑 `npm run check:assets`，确认代码引用的图片存在。
5. 本地看 `/writing`、文章详情页、手机宽度下的排版。

## 后续可做的收敛

现在 `content/demo/*` 是新版个人站的实际内容目录，但名字还带 demo。等站点视觉和内容稳定后，建议迁移为：

```txt
content/personal/writing
content/personal/projects
src/lib/personal/*
```

迁移时再加 redirect 或保留原 slug，不影响公开 URL。
