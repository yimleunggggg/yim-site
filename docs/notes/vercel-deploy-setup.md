# Vercel 部署说明（2026-06-20）

## 现状

- **GitHub `main` 已是最新代码**（含 Life Archive、FRAMES、导航 pill、静态图）
- **线上 `yim-site.vercel.app` 仍是初版** — Vercel 项目未从 GitHub 自动部署（GitHub Deployments 为 0）

## 立刻更新线上（推荐，2 分钟）

在本机终端：

```bash
cd ~/Projects/yim-site
npm run deploy:prod
```

或：

```bash
npx vercel login   # 若未登录
npx vercel deploy --prod
```

成功后访问：https://yim-site.vercel.app/life

## 长期：Git push 自动部署

### 方式 A — Vercel 控制台连 GitHub

1. 打开 https://vercel.com → 项目 **yim-site**
2. **Settings → Git** → Connect **yimleunggggg/yim-site**
3. Production Branch = `main`
4. 保存后点 **Redeploy** 或再 push 一次

### 方式 B — GitHub Actions（已加 workflow）

1. https://vercel.com/account/tokens 创建 Token
2. GitHub 仓库 **Settings → Secrets → Actions** 新增 `VERCEL_TOKEN`
3. **Actions → Deploy to Vercel → Run workflow**，或 push 到 `main`

## 本地预览

```bash
cd ~/Projects/yim-site && npm run dev
```

- http://localhost:3000/
- http://localhost:3000/life
- http://localhost:3000/frames

**不要**在 `ai-playbook-site` 目录跑 dev（那是空 workspace，不是站点代码）。
