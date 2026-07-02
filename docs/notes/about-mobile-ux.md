# About 移动端视觉优化（2026-06-19）

## 问题
- 分区大标题 serif 粗黑，与列表 sans 脱节
- PROJECTS 区 eyebrow + 大标题 + 斜体导语，信息重复
- 工作履历折叠态仍展示整排技能标签，拥挤

## 改动
- `demo-about-page` 作用域：移动端分区标题改为 eyebrow · 中文名 单行 sans
- 隐藏项目区 `projectsLead` 导语（仅移动端）
- About 导语默认 2 行折叠
- 工作履历：标签仅在展开后显示
- 统一列表字重、去掉精选标签与箭头、收紧行距

## 文件
- `src/app/(personal)/about/page.tsx`
- `src/components/demo/DemoAbout.tsx`
- `src/app/globals.css`
