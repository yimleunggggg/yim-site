当前 **V1.0.2** · 2026-07-01

## 待办

- [x] 腾讯云 DNSPod 添加 A / CNAME
- [x] DNS 生效 + 生产部署

---

## V1.0.2（2026-07-01）— yimleung.com 上线

**加了**
- （无）

**改了**
- DNS 验证通过；生产部署 alias → `https://yimleung.com`

**减去了 / 下线**
- （无）

**技术**：部署 `dpl_3QAyixvfj6WrCnn3B8APQir99Kan`

**详情**：[notes/2026-07-01-yimleung-domain.md](notes/2026-07-01-yimleung-domain.md)

---

## V1.0.1（2026-07-01）— 绑定 yimleung.com

**加了**
- Vercel 项目 `yim-site` 绑定 `yimleung.com`、`www.yimleung.com`
- `docs/notes/2026-07-01-yimleung-domain.md`：腾讯云 DNSPod 记录与验证步骤

**改了**
- 生产 `NEXT_PUBLIC_SITE_URL` → `https://yimleung.com`
- `src/lib/site-config.ts`、`.env.example` 默认域名同步

**减去了 / 下线**
- （无）

**技术**：Vercel env `NEXT_PUBLIC_SITE_URL`；DNS A `216.198.79.1` + `64.29.17.1`，CNAME `www` → `5c05238d0247a221.vercel-dns-017.com`

**详情**：[notes/2026-07-01-yimleung-domain.md](notes/2026-07-01-yimleung-domain.md)
