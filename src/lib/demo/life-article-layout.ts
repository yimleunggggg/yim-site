/** 将正文段落与图片编排成 editorial 流 */
export type LayoutBlock =
  | { type: "paragraph"; text: string }
  | { type: "figure"; src: string; variant: "full" | "wide" }
  | { type: "masonry"; sources: string[] };

export type LifeEditorialBlock =
  | { type: "section"; title: string; subtitle?: string }
  | { type: "paragraph"; text: string; lede?: boolean }
  | { type: "blockquote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; src: string; variant: "full" | "wide" }
  | { type: "masonry"; sources: string[] };

function isPlainParagraph(text: string) {
  return (
    !text.startsWith("## ") &&
    !text.startsWith("### ") &&
    !text.startsWith("- ") &&
    !text.startsWith("> ")
  );
}

/** 列表摘要 oneLine 并入正文首段，避免页头与正文重复分段 */
export function mergeIntroIntoBlocks(
  blocks: LayoutBlock[],
  intro?: string,
): LayoutBlock[] {
  const lead = intro?.trim();
  if (!lead) return blocks;

  const next = [...blocks];
  for (let i = 0; i < next.length; i++) {
    const block = next[i];
    if (block.type !== "paragraph" || !isPlainParagraph(block.text)) continue;
    if (block.text.startsWith(lead)) return next;
    next[i] = { type: "paragraph", text: `${lead}${block.text}` };
    return next;
  }
  return [{ type: "paragraph", text: lead }, ...next];
}

export type BuildLifeArticleOptions = {
  flow?: LayoutBlock[];
  paragraphs: string[];
  images: string[];
  intro?: string;
  imageFirst?: boolean;
  singleLongImage?: boolean;
  /** 正文在前、图片集中在文末（本地文件夹导入条目默认） */
  imagesAtEnd?: boolean;
};

/** 段落全部在前，图片在文末以 masonry 混排（2–3 张一组，不遗漏） */
export function buildImagesAtEndLayout(
  paragraphs: string[],
  images: string[],
): LayoutBlock[] {
  const blocks: LayoutBlock[] = [];
  for (const text of paragraphs) blocks.push({ type: "paragraph", text });
  pushImages(blocks, images);
  return blocks;
}

/** Life 文章统一块流（Life Archive 专用）
 *  - 有 flow：保留正文顺序，连续图片块一律合并为 2–3 张 masonry
 *  - 无 flow：正文在前 + manifest 全部图片文末 masonry
 */
export function buildLifeArticleBlocks(opts: BuildLifeArticleOptions): LayoutBlock[] {
  let base: LayoutBlock[];
  if (opts.flow?.length) {
    base = rebuildFlowImagesAsMasonry(opts.flow);
  } else if (opts.imagesAtEnd !== false) {
    base = buildImagesAtEndLayout(opts.paragraphs, opts.images);
  } else {
    base = buildEditorialLayout(opts.paragraphs, opts.images, {
      imageFirst: opts.imageFirst,
      singleLongImage: opts.singleLongImage,
    });
  }
  return mergeIntroIntoBlocks(base, opts.intro);
}

/** flow 中连续 figure/masonry 合并为 masonry 组，单图竖排不再出现 */
function rebuildFlowImagesAsMasonry(blocks: LayoutBlock[]): LayoutBlock[] {
  const out: LayoutBlock[] = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (block.type === "figure" || block.type === "masonry") {
      const sources: string[] = [];
      while (i < blocks.length) {
        const row = blocks[i];
        if (row.type === "figure") {
          sources.push(row.src);
          i += 1;
        } else if (row.type === "masonry") {
          sources.push(...row.sources);
          i += 1;
        } else {
          break;
        }
      }
      pushImages(out, sources);
      continue;
    }
    out.push(block);
    i += 1;
  }
  return out;
}

/** 飞书 / Life 正文统一预处理：章节标题成组、列表合并 */
export function preprocessLifeBlocks(blocks: LayoutBlock[]): LifeEditorialBlock[] {
  const out: LifeEditorialBlock[] = [];
  let i = 0;
  let ledeMarked = false;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === "figure" || block.type === "masonry") {
      out.push(block);
      i += 1;
      continue;
    }

    const text = block.text;

    if (text.startsWith("## ")) {
      const title = text.slice(3).trim();
      let subtitle: string | undefined;
      const next = blocks[i + 1];
      if (next?.type === "paragraph" && next.text.startsWith("### ")) {
        subtitle = next.text.slice(4).trim();
        i += 2;
      } else {
        i += 1;
      }
      out.push({ type: "section", title, subtitle });
      continue;
    }

    if (text.startsWith("### ")) {
      out.push({ type: "section", title: text.slice(4).trim() });
      i += 1;
      continue;
    }

    if (text.startsWith("- ")) {
      const items: string[] = [];
      while (i < blocks.length) {
        const row = blocks[i];
        if (row.type !== "paragraph" || !row.text.startsWith("- ")) break;
        items.push(row.text.slice(2).trim());
        i += 1;
      }
      out.push({ type: "list", items });
      continue;
    }

    if (text.startsWith("> ")) {
      out.push({ type: "blockquote", text: text.slice(2) });
      i += 1;
      continue;
    }

    out.push({ type: "paragraph", text, lede: ledeMarked ? undefined : true });
    if (!ledeMarked) ledeMarked = true;
    i += 1;
  }

  return out;
}

/** 2–3 张一组 masonry；余 1 张时并入上一组，避免末尾竖排单图 */
function galleryChunkSize(remaining: number): number {
  if (remaining <= 3) return remaining;
  if (remaining === 4) return 2;
  if (remaining % 3 === 1) return 2;
  return 3;
}

function pushImages(blocks: LayoutBlock[], sources: string[]) {
  if (sources.length === 0) return;
  if (sources.length === 1) {
    blocks.push({ type: "figure", src: sources[0], variant: "wide" });
    return;
  }
  let i = 0;
  while (i < sources.length) {
    const remaining = sources.length - i;
    const size = galleryChunkSize(remaining);
    const chunk = sources.slice(i, i + size);
    if (chunk.length === 1) {
      blocks.push({ type: "figure", src: chunk[0], variant: "wide" });
    } else {
      blocks.push({ type: "masonry", sources: chunk });
    }
    i += size;
  }
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
