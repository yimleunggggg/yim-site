# 生活动态 · 怎么发一条「朋友圈」

在 `content/life/moments/` 新建 `2026-06-01-标题.md`：

```yaml
---
date: "2026-06-01"
module: sports        # sports | travel | craft | photo
tags: [跑步, 半马]
images:
  - /life/moments/2026-06-race/01.jpg
  - /life/moments/2026-06-race/02.jpg
pinToHome: true       # true = 同步到首页「近期动态」
---

几行中文说明，像朋友圈一样短。

---
Optional English version below the --- line.
```

图片放到 `public/life/moments/你的文件夹/`。

保存后刷新即可；`pinToHome: true` 的会优先出现在首页 NOW 卡片。
