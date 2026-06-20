# Demo 首页 & FRAMES · 2026-06-19

## 已完成

- **导航**：HOME / ABOUT / LIFE ARCHIVE / FRAMES（全英文标签，走 i18n data）
- **HOME**（`/demo`）：Hero（Living with *intention*…）→ 走马灯（`public/demo/marquee/`）→ NOW（默认 4 条 + 弹窗）→ Explore 三卡（可点击跳转）
- **FRAMES**（`/demo/frames`）：8 个摄影合集 + 详情页瀑布流；刘子超引言在列表页顶部
- **Footer**：Not one thing. *Never was.* + email + Instagram
- **i18n**：文案集中在 `demo-data.ts` / `demo-frames-ui.ts`；组件用 `pickText`，禁止写死

## 录入

- 走马灯源：`首页走马灯/` → 跑 `bash scripts/import-frames.sh`
- FRAMES 源：`摄影及旅行/` 各子文件夹 → 同上脚本；元信息改 `src/lib/demo/demo-frames.ts` 的 `FRAMES_META`

## 预览

本地 `npm run dev` → http://localhost:3000/demo  
生产：https://yim-site.vercel.app（根路径，非 /demo）
