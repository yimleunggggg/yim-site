# 项目页排版与双语规范（2026-06-19）

- **时间**：Yakushima Bus → `2026.5`
- **截图**：`.project-shot-grid` 移动 2 列 / 桌面 3 列，缩略图限高，点击 Lightbox
- **排版**：`.editorial-content.prose-playbook` 统一 h2/h3/正文；技术概览与正文同规范，不再用小号 mono 标题
- **双语**：项目页 `ProjectPageView` 接 `useLocale`；正文 `demo-project-bodies.ts`（LText）；UI 文案 `demo-ui-copy.projectMeta`；MDX 未迁移项暂仅中文
