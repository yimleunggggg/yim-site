# FRAMES 图片灰块修复

- **问题**：列表/详情页封面与相册出现灰色占位块（Next.js `Image` lazy 解码异常）。
- **修复**：`DemoFrames.tsx`、`DemoFrameDetail.tsx` 改用原生 `<img>`（与 Life 一致）。
- **部署**：`3944f90` → https://ai-playbook-site-beige.vercel.app/frames
- **验证**：线上 `data-nimg` 已消失，封面 naturalWidth 均 > 0。
