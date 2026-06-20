# Demo 图片性能 · 2026-06-19

## 问题
所有页面共用 ~600KB/张 原图，列表/走马灯/详情首屏同时拉大图，体感慢。

## 做法（已落地）
1. `scripts/optimize-demo-images.sh`：thumb 480 · display 1200 · full 2000
2. `demo-frames.ts`：`images`（display）+ `imagesFull`（灯箱）
3. `DemoFrameDetail`：图墙 lazy display，点击才 load full
4. `next.config.ts`：`formats: ['avif','webp']`

## 体积（优化后）
- frames ~90MB（含 full 档，deploy 体积会涨；浏览时不再全量拉 full）
- marquee ~1.4MB（720px）
- 单张 display ~150–320KB，thumb ~30–80KB

## 下一步（可选）
- full 迁 CDN，repo 只留 thumb+display，控 Vercel 100MB 包体
- blur placeholder（build 时生成 base64）
- 详情页 intersection observer 预加载下一张 full
