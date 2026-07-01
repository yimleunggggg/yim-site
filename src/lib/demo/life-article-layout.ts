/** 将正文段落与图片编排成 editorial 流（错落 masonry，保持原比例） */
export type LayoutBlock =
  | { type: "paragraph"; text: string }
  | { type: "figure"; src: string; variant: "full" | "wide" }
  | { type: "masonry"; sources: string[] };

function pushImages(blocks: LayoutBlock[], sources: string[]) {
  if (sources.length === 0) return;
  if (sources.length === 1) {
    blocks.push({ type: "figure", src: sources[0], variant: "wide" });
    return;
  }
  blocks.push({ type: "masonry", sources: [...sources] });
}

function interleaveParagraphsAndImages(
  blocks: LayoutBlock[],
  paragraphs: string[],
  images: string[],
) {
  let imgIdx = 0;
  const n = paragraphs.length;

  for (let i = 0; i < n; i++) {
    blocks.push({ type: "paragraph", text: paragraphs[i] });
    const nextCut = Math.round(((i + 1) * images.length) / n);
    const slice = images.slice(imgIdx, nextCut);
    if (slice.length) {
      pushImages(blocks, slice);
      imgIdx = nextCut;
    }
  }

  const rest = images.slice(imgIdx);
  if (rest.length) pushImages(blocks, rest);
}

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
    pushImages(blocks, images);
    return blocks;
  }

  if (images.length === 0) {
    for (const text of paragraphs) blocks.push({ type: "paragraph", text });
    return blocks;
  }

  if (images.length === 1) {
    for (const text of paragraphs) blocks.push({ type: "paragraph", text });
    blocks.push({ type: "figure", src: images[0], variant: "wide" });
    return blocks;
  }

  interleaveParagraphsAndImages(blocks, paragraphs, images);
  return blocks;
}

/** 把 \n\n 分段；保留「1.」开头的编号段为独立块 */
export function splitArticleBody(raw: string): string[] {
  return raw
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}
