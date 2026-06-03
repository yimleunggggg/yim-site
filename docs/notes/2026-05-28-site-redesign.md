# 2026-05-28 站点改版结论

## 已完成

- 删除 Claude demo（`~/Downloads/yim-site`）
- 设计系统迁移：Cormorant / Plus Jakarta / DM Mono / Noto Serif SC，杂志风 globals.css
- 品牌：`Yim · 自洽 · 自足 · 自在`，弃用 `LIFE × AI LAB`
- 新首页：Hero + Ticker + 4 入口 Hub + 照片占位栅格（移动端 responsive）
- 新 `/guides` 教程中心（codexguide 风格：主题 block + 学习路径 + 系列卡片）
- 集成教程：
  - 屋久岛 Vibe Coding 8 章 → `/guides/yakushima/[slug]`
  - SEO 自动化 7 章 → `/guides/seo/[slug]`
  - AI Playbook 仍在 `/ai-playbook`
- 统一导航 SiteNav：About | Guides | Projects | AI | Stories | Resume
- build 通过：39 routes

## 待办

- [ ] 真实照片替换占位栅格
- [ ] feishu-cli 批量导出 Wiki → 更新 AI Playbook MDX + assets
- [ ] 域名 yimleung.com 绑定 Vercel
- [ ] ai-playbook 子页视觉与新设计系统进一步统一
