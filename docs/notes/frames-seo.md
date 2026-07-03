# Frames SEO / GEO（2026-06-19）

## 做了什么

- **仅 Frames 可索引**：`(personal)/layout` 全站 `noindex,follow`；`frames/layout` 覆盖为 `index,follow`
- **sitemap.xml**：只含 `/frames` + 9 个相册 slug
- **robots.txt**：`allow /frames`，`disallow /about /life /writing`
- **Meta**：标题/描述/keywords/OG/canonical；空 intro 时用「标题 · 地点 · 标签」生成描述
- **JSON-LD**：列表 `CollectionPage`+`ItemList`；详情 `ImageGallery`+`contentLocation`（GEO）

## 文件

- `src/lib/demo/frames-seo.ts`
- `src/app/(personal)/frames/layout.tsx`
- `src/app/sitemap.ts`、`src/app/robots.ts`

## 待办（可选）

- 各相册补 `intro.zh` 可进一步提升 snippet 质量
- `/resume`、`/work` 等旧路由若也要隐藏，需单独加 noindex
