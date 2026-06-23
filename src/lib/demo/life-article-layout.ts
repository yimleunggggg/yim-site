/** 将正文段落与图片编排成 editorial 流（非单列大图堆叠） */
export type LayoutBlock =
  | { type: "paragraph"; text: string }
  | { type: "figure"; src: string; variant: "full" | "wide" }
  | { type: "grid"; sources: string[] };

export function buildEditorialLayout(
  paragraphs: string[],
  images: string[],
  opts?: { imageFirst?: boolean; singleLongImage?: boolean },
): LayoutBlock[] {
  const blocks: LayoutBlock[] = [];

  if (opts?.singleLongImage && images.length === 1) {
    for (const text of paragraphs) blocks.push({ type: "paragraph", text });
    blocks.push({ type: "figure", src: images[0], variant: "full" });
    return blocks;
  }

  if (paragraphs.length === 0) {
    if (images.length === 0) return blocks;
    blocks.push({ type: "figure", src: images[0], variant: "wide" });
    let i = 1;
    while (i < images.length) {
      const pair = images.slice(i, i + 2);
      if (pair.length === 2) blocks.push({ type: "grid", sources: pair });
      else blocks.push({ type: "figure", src: pair[0], variant: "wide" });
      i += 2;
    }
    return blocks;
  }

  if (opts?.imageFirst && images.length > 0) {
    blocks.push({ type: "figure", src: images[0], variant: "wide" });
    for (let g = 1; g < images.length; g += 2) {
      const pair = images.slice(g, g + 2);
      if (pair.length === 2) blocks.push({ type: "grid", sources: pair });
      else blocks.push({ type: "figure", src: pair[0], variant: "wide" });
    }
    for (const text of paragraphs) blocks.push({ type: "paragraph", text });
    return blocks;
  }

  let p = 0;
  let i = 0;

  blocks.push({ type: "paragraph", text: paragraphs[p++] });

  if (i < images.length) {
    blocks.push({ type: "figure", src: images[i++], variant: "wide" });
  }

  while (p < paragraphs.length || i < images.length) {
    if (p < paragraphs.length) {
      blocks.push({ type: "paragraph", text: paragraphs[p++] });
    }
    if (p < paragraphs.length && i < images.length) {
      blocks.push({ type: "paragraph", text: paragraphs[p++] });
    }
    if (i < images.length) {
      const pair = images.slice(i, i + 2);
      if (pair.length === 2) {
        blocks.push({ type: "grid", sources: pair });
        i += 2;
      } else {
        blocks.push({ type: "figure", src: pair[0], variant: "wide" });
        i += 1;
      }
    }
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
