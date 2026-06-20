# Writing 飞书导入 & 中文加粗修复

**日期**：2026-06-21

## 已完成

### 中文「莫名加粗」
- `globals.css`：`.prose-playbook strong` 与 `.demo-article.prose-playbook` 下标题/strong 改为 `font-weight: 400~500`，避免 MDX/飞书残留 bold 过粗。

### Writing 三篇（来自飞书 Wiki）
| slug | 飞书 | 形式 |
|------|------|------|
| `july-sea-salt` | YznJwdUxPiZkcrkhMVecUBxfnPb | 纯文字，标点与飞书 innerText 一致 |
| `keep-growing` | IWbUwP50liNJRJkFR86ci61GnKg | 纯文字 |
| `turning-31` | Q0KBwWI5wiocEBkX8abcLP2XnMd | **正文为长图**，`public/writing/turning-31/01.png` |

### 构建
- 移除 `mdx-components` 中 `onError`（RSC 不兼容），`npm run build` 通过。

## 待办
- [ ] commit + push（含 `public/writing/`）
- [ ] Vercel Production 确认部署到最新 commit

## 导出脚本
- `scripts/export-feishu-writing.mjs`（需 Chrome CDP proxy `localhost:3456`）
