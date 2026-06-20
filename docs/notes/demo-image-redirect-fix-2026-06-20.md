# 图片 404 根因 · 2026-06-20

## 现象
首页走马灯、FRAMES 封面全部 broken。

## 根因
`next.config.ts` 里 `{ source: "/demo/:path*", destination: "/:path*" }` 把**静态图**也重定向了：
- `/demo/marquee/01.jpg` → `/marquee/01.jpg`（不存在 → 404）
- `/demo/frames/.../cover.jpg` → `/frames/.../cover.jpg`（404）

图文件仍在 `public/demo/`，URL 必须是 `/demo/marquee/`、`/demo/frames/`。

## 修复
只重定向页面路由（about / life / frames / writing / projects），去掉 `/demo/:path*` 通配。

## 部署
```bash
npx vercel deploy --prod --force
```
