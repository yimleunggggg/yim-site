# 移动端专项（2026-06）

以当前代码为准，仅 `@media (max-width: 767px)`，桌面不变。

## 已做

- 首页 Explore：独立卡片边框、去 `min-height:20rem`、隐藏 latest 行、收紧 section 间距
- 正文 `.editorial-content`：移动端正文/标题略小、段距更紧
- 项目页：标题/meta pill 移动端缩小
- About 工作履历 / Life 日记：默认显 3 条，`展开全部`/`收起`（仅移动端按钮）
- Footer：移动 `mt`/`py`/`gap` 收紧
- 工作履历展开区：标签/ bullets 移动排版优化

## 文件

- `src/app/globals.css` 末尾 mobile 块
- `DemoHome.tsx` / `DemoAbout.tsx` / `DemoLife.tsx` / `SiteFooter.tsx` / `ProjectPageView.tsx`
- `demo-ui-copy.ts`：`showAll` / `showLess`
