# 域名迁移 · 2026-06

## 变更
- Vercel 项目：`ai-playbook-site` → **`yim-site`**
- 生产 URL：**https://yim-site.vercel.app**
- 代码默认：`src/lib/site-config.ts` → `siteUrl`
- `layout.tsx` 已设 `metadataBase` + OG

## 未改（刻意保留）
- 路由 `/ai-playbook`：只是「AI 内训」栏目路径，不是整站品牌

## 环境变量
```
NEXT_PUBLIC_SITE_URL=https://yim-site.vercel.app
```

## 待办（可选）
- 绑定自定义域名（如 yimleung.com）
- 旧 `ai-playbook-site-beige.vercel.app` 在 Vercel Dashboard 设 301 到新域名
