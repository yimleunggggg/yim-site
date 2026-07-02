# yimleung.com 域名接入 · 2026-07-01

## 已完成（Vercel）

- 项目 `yim-site` 已绑定 `yimleung.com`、`www.yimleung.com`
- 生产环境变量 `NEXT_PUBLIC_SITE_URL=https://yimleung.com`
- 代码默认域名：`src/lib/site-config.ts` → `https://yimleung.com`

## 待你在腾讯云 DNSPod 添加记录

域名 NS 已是 DNSPod（`sine.dnspod.net` / `stork.dnspod.net`），**不用改 NS**，在 [DNSPod 控制台](https://console.dnspod.cn/dns/list) → `yimleung.com` → 添加：

| 主机记录 | 记录类型 | 记录值 | TTL |
|---------|---------|--------|-----|
| `@` | A | `216.198.79.1` | 600 |
| `@` | A | `64.29.17.1` | 600 |
| `www` | CNAME | `5c05238d0247a221.vercel-dns-017.com` | 600 |

> 备用：根域也可只填一条 A `76.76.21.21`；`www` 备用 CNAME 为 `cname.vercel-dns.com`。

保存后等 5–30 分钟，本机验证：

```bash
cd ~/projects/yim-site
npx vercel domains verify yimleung.com
npx vercel domains verify www.yimleung.com
```

两条都 `ok: true` 后，Vercel 会自动签发 SSL。

## DNS 生效后

1. 重新部署（让 `NEXT_PUBLIC_SITE_URL` 进构建）：
   ```bash
   npm run deploy:prod
   ```
2. Vercel Dashboard → yim-site → Settings → Domains：确认 `yimleung.com` 为主域，`www` 301 到根域（默认即可）
3. 可选：旧 `ai-playbook-site-beige.vercel.app` 在 Domains 里设 Redirect → `https://yimleung.com`

## 验证清单

- [ ] https://yimleung.com 打开首页
- [ ] https://www.yimleung.com 跳转到根域
- [ ] 浏览器地址栏有 🔒（HTTPS）
- [ ] 分享链接 OG 预览域名显示 yimleung.com
