# Life Archive 改版 · 2026-06-19

## 已完成
- 色调：暖白编辑风，去掉蓝色 accent（`--color-forest` → 墨灰）
- `/life`：写作 + 生活体验合并为 **Journal** 列表；**运动探索** 改为 4:3 封面 gallery + 弹窗
- 图片：`npm run import:life` 从 `生活体验/` → `public/life/journal|sport/`（HEIC 转 JPEG，限 8 张/篇）
- 数据：`demo-life-journal.ts`、`demo-life-sport.ts`

## 待补
- 斯里兰卡：源文件夹空，目前仅文字；飞书图文或 `照片等/` 原图需再导入
- Pa Pae / Wonderfruit / 屋久岛 / 酒花田：有图无正文，可按飞书补 `body`
- `git add public/life && commit && push` 后线上才显示图
