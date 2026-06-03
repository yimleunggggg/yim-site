# 如何编辑 AI Playbook

培训正文都在 **`content/ai-playbook/*.mdx`**。改完保存，本地 `npm run dev` 刷新即可看到；push 后 Vercel 会自动发布。

## 改某一章

1. 打开对应文件，例如 `content/ai-playbook/01-w1-language-image.mdx`
2. 顶部 **frontmatter**（两个 `---` 之间）控制标题、摘要、阅读时长等，一般不用动
3. 下面正文用 Markdown + 站点组件（见下）

## 插入图片

1. 把图片放到 **`public/ai-playbook/assets/`**（例如 `w1-nano-banana.png`）
2. 在 MDX 里写：

```mdx
![Nano Banana 界面示例](/ai-playbook/assets/w1-nano-banana.png)
```

`[]` 里是说明文字，会显示在图下方。

批量从飞书导出时，可用项目里的 `feishu-cli`，把 assets 拷到上述目录，再把 md 里的相对路径改成 `/ai-playbook/assets/...`。

## 常用 MDX 组件

```mdx
<Callout type="注意" title="课堂实录 · 2025-01">
提示内容
</Callout>

<PullQuote>
一句想强调的话
</PullQuote>

<PromptBlock title="示例 Prompt">
你的 prompt 文本
</PromptBlock>
```

## 新增一章

1. 复制现有 `.mdx`，改 `slug`、`order`、`chapterId`
2. 文件名必须与 `slug` 一致：`{slug}.mdx`
3. 保存后重新 build，会自动出现 `/ai-playbook/{slug}`

## 完整版 / 源码

- 阅读：**本站** `/ai-playbook`
- 编辑：**GitHub** `content/ai-playbook/`（页脚有链接）
- 环境变量可改仓库地址：`NEXT_PUBLIC_GITHUB_CONTENT_URL`

## 目前缺的内容

飞书原文里的截图、视频尚未全部导入。补图步骤：导出 → 放入 `public/ai-playbook/assets/` → MDX 里引用 → push。
