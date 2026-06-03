# Notion 公开知识库设置

与网页章节对齐的 Notion 结构：

```
AI Playbook（根 · 公开分享）
├── 00 方法论 · 任务导向选工具
├── 01 W1 语言与图像
├── 02 W2 提示词与视频
├── 03 W3 音乐语音与实战
├── 04 W4 工作流进阶
├── 05 非专业视角
├── 附录 A 工具地图
├── 附录 B 提示词速查
└── English（可选，后续增补）
```

## 步骤

1. 创建根页面，点击 **Share → Publish to web**
2. 复制公开链接，写入 `.env.local`：
   ```
   NEXT_PUBLIC_NOTION_URL=https://www.notion.so/...
   ```
3. 将 `content/ai-playbook/*.mdx` 正文粘贴到对应 Notion 页（可保留更多图片与英文版）
4. 更新各 MDX frontmatter 的 `notionUrl` 为子页面链接

## 权限检查

- [ ] 仅公开页，无 workspace 成员信息泄露
- [ ] 已脱敏品牌与内部作业标题
- [ ] 网页 NotionLink 指向正确 URL
