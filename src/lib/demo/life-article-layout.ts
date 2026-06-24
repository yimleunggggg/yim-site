/** 将正文段落与图片编排成 editorial 流（非单列大图堆叠） */
export type LayoutBlock =
  | { type: "paragraph"; text: string }
  | { type: "figure"; src: string; variant: "full" | "wide" }
  | { type: "masonry"; sources: string[] };

export function buildEditorialLayout(
  paragraphs: string[],
  images: string[],
  opts?: { imageFirst?: boolean; singleLongImage?: boolean },
): LayoutBlock[] {
  const blocks: LayoutBlock[] = [];

  /** 长图条目：正文段落后完整展示，不裁切 */
  if (opts?.singleLongImage && images.length === 1) {
    for (const text of paragraphs) blocks.push({ type: "paragraph", text });
    blocks.push({ type: "figure", src: images[0], variant: "full" });
    return blocks;
  }

  /** 纯长图、无段落 */
  if (paragraphs.length === 0 && images.length === 1) {
    blocks.push({ type: "figure", src: images[0], variant: "full" });
    return blocks;
  }

  if (paragraphs.length === 0) {
    if (images.length === 1) {
      blocks.push({ type: "figure", src: images[0], variant: "wide" });
    } else if (images.length > 1) {
      blocks.push({ type: "masonry", sources: images });
    }
    return blocks;
  }

  /** 默认：先全文，再图片组（双列 masonry 保持各自横竖幅） */
  for (const text of paragraphs) blocks.push({ type: "paragraph", text });

  if (images.length === 1) {
    blocks.push({ type: "figure", src: images[0], variant: "wide" });
  } else if (images.length > 1) {
    blocks.push({ type: "masonry", sources: images });
  }

  return blocks;
}

/** 把 \n\n 分段；保留「1.」开头的编号段为独立块 */
export function splitArticleBody(raw: string): string[] {
  return raw
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}
