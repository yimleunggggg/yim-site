# 项目重命名 — 2026-05

## 现状

| 项 | 旧 | 新（代码内已改） |
|----|-----|------------------|
| npm 包名 | `ai-playbook-site` | `yim-site` |
| 站点 title | AI Playbook | Yim Leung · 个人站 |
| GitHub（假定） | `yimleunggggg/ai-playbook-site` | `yimleunggggg/yim-site`（**尚未创建**） |
| 本地文件夹 | `Projects/ai-playbook-site` | 建议改为 `Projects/yim-site` |
| Vercel 项目名 | `ai-playbook-site` | 可 Dashboard 改或新建项目 |

## 路由说明

站点不叫 Playbook，但 **`/ai-playbook` 保留**——只是顶栏「AI」栏目路径，不是整站名。

## 预览

- 本地：http://localhost:3000
- Vercel Preview（最新代码）：见部署输出或 `npx vercel ls`
- 旧 Production（未含生活/改版）：https://ai-playbook-site-beige.vercel.app

## 下一步

1. 本地文件夹 `mv ai-playbook-site yim-site` 后 Cursor 重新打开
2. `gh repo create yim-site --private --source=. --push`
3. `npx vercel --prod` 或 Vercel 绑定新 repo
