# 2026-05-28 站点结构决策记录

## 本轮确认

- AI 内容保持单入口：`/ai`（跳转至 `/ai-playbook`）
- 主站保留统一导航，模块独立页面便于分享：
  - `/about`
  - `/resume`
  - `/projects`
  - `/blog`
  - `/ai`
- 首页作为综述中枢，可直达 AI / 简历 / 项目 / Blog

## 可维护性策略

- 不把关键信息写死在页面：
  - 联系邮箱、简历路径、首页 Hub 卡片统一放在 `src/lib/profile-config.ts`
- 简历更新策略：
  - 后续仅替换 `profileConfig.resume.pdfPath` 对应文件即可

## 当前合作联系方式

- `yimlueng.ly@gmail.com`

## 下一步

- 等简历最终版后替换 PDF
- 再补充项目卡片和 Blog 正文内容
- 做移动端验收（375/390/430）

