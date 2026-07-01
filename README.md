# Yim Leung · 个人站

探索者 · 运营人 · AI 实践者。首页、关于、生活、摄影与 AI 内训笔记。

**生产**：https://yimleung.com（DNS 配置中；Vercel 预览 https://ai-playbook-site-beige.vercel.app）  
**说明**：个人站已迁到根路径 `/`（原 `/demo` 会自动跳转）

## 链接结构

| 页面 | 路径 |
|------|------|
| 首页 | `/` |
| Demo 个人站 | `/`（旧 `/demo` 已 301 跳转） |
| 关于 | `/about` |
| 生活 | `/life` |
| AI 内训 | `/ai-playbook` |
| 简历 PDF | `/resume` |

## 开发

```bash
npm install
npm run dev
```

本地预览：http://localhost:3000

## 内容维护

- AI 章节：`content/ai-playbook/*.mdx`
- 生活动态：`content/life/moments/*.md`
- Demo 数据：`src/lib/demo/`
- 站点 URL / 文案：`src/lib/site-config.ts`

## 部署

Vercel 项目名：**`yim-site`**（已从 `ai-playbook-site` 更名）。  
环境变量 `NEXT_PUBLIC_SITE_URL` 设为生产域名。
