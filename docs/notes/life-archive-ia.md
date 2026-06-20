# Life Archive 结构（2026-06-19）

## 页面 `/life`

- **页眉**：Life Archive + tagline `Field Notes from Movement, Places and People`
- **3.1 Dispatches**：15 条生活体验（时间倒序），点击弹层；无图用渐变占位
- **3.2 Writing**：精选 3 篇 + 链到 `/writing` 全量列表（标签筛选）
- **3.3 Movements**：引言 + 时间线 + 比赛卡片 + 训练营（Aboro / 凯乐石）

## 写作 `/writing`

全站长篇入口：随笔、旅行、运动、AI教程、攻略等，标签筛选。

精选 slug：`turning-31`、`keep-growing`、`july-sea-salt`

## 待补

- 各 Dispatch 正文与真实照片
- 比赛照片补全至每场 2–3 张
- 斯里兰卡视频

## 图片不显示（2026-06-20）

**原因**：静态图曾放在 `/demo/marquee`、`/demo/frames`，与 `/demo` 路由冲突，线上易 404。

**2026-06-20 修复**：迁到 `/marquee`、`/media/frames`，旧路径 301 重定向。

**本地**：`cd ~/Projects/yim-site && npm run dev` → http://localhost:3000（本地 public/ 存在则图正常）

**线上修复（二选一）**：
1. 本机：`npm run deploy:prod`（CLI 会打包本地 public/，无需先 commit）
2. 长期：`git add public/demo public/life public/work && git commit && git push`
