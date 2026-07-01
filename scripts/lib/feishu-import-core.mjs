/**
 * 飞书 Wiki 抓取核心（依赖 web-access CDP Proxy :3456）
 */
import fs from "fs";
import path from "path";

export const FEISHU_PROXY = process.env.FEISHU_PROXY ?? "http://localhost:3456";

export async function proxyNew(url) {
  const res = await fetch(`${FEISHU_PROXY}/new`, { method: "POST", body: url });
  const data = await res.json();
  if (!data.targetId) throw new Error(`open failed: ${url}`);
  return data.targetId;
}

export async function proxyEval(targetId, js) {
  const res = await fetch(`${FEISHU_PROXY}/eval?target=${targetId}`, { method: "POST", body: js });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  const raw = data.value ?? data.result;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  return raw;
}

export async function proxyClose(targetId) {
  await fetch(`${FEISHU_PROXY}/close?target=${targetId}`);
}

const EXTRACT_BLOCKS_JS = `(() => {
  const root = document.querySelector(".render-unit-wrapper");
  if (!root) return "[]";
  const blocks = [];
  for (const el of root.querySelectorAll("[data-block-type]")) {
    const t = el.getAttribute("data-block-type");
    if (t === "grid" || t === "grid_column") continue;
    let md = "";
    if (t === "image") {
      const img = el.querySelector("img");
      const src = img?.currentSrc || img?.src;
      if (src && (img?.naturalWidth || 0) > 80 && !/v3_0011o_2a552573/.test(src))
        md = "[[IMG:" + src + "]]";
    } else if (t.startsWith("heading") || t === "text" || t === "quote" || t === "bullet") {
      md = el.innerText.replace(/\\u200b/g, "").trim();
      if (t === "bullet") md = md.replace(/^•\\s*/, "");
    }
    if (!md || /^绊绊/.test(md)) continue;
    blocks.push({ t, md });
  }
  return JSON.stringify(blocks);
})()`;

const CAPTURE_IMAGES_JS = `(() => {
  const out = [];
  for (const img of document.querySelectorAll("img")) {
    const src = img.currentSrc || img.src;
    const w = img.naturalWidth || 0;
    if (w < 120 || /v3_0011o_2a552573|avatar|72x72/.test(src)) continue;
    try {
      const c = document.createElement("canvas");
      c.width = w;
      c.height = img.naturalHeight;
      c.getContext("2d").drawImage(img, 0, 0);
      out.push({ src, data: c.toDataURL("image/jpeg", 0.9) });
    } catch (e) {
      out.push({ src, err: e.message });
    }
  }
  return JSON.stringify(out);
})()`;

const SCROLL_JS = `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let i = 0; i < 14; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(200);
  }
  return "ok";
})()`;

function mergeBlocks(all, incoming) {
  const seen = new Set(all.map((b) => b.t + "|" + b.md));
  for (const b of incoming) {
    const key = b.t + "|" + b.md;
    if (!seen.has(key)) {
      seen.add(key);
      all.push(b);
    }
  }
}

export function normalizeFeishuText(md) {
  return md
    .replace(/\*\*([^*\n]{1,3})\*\*/g, "$1")
    .replace(/(?<![\u4e00-\u9fff])--(?![\u4e00-\u9fff])/g, "——")
    .replace(/一-(?=祝)/g, "——");
}

async function getToc(targetId) {
  const js = `(() => JSON.stringify([...document.querySelectorAll(".catalogue__item-title")].map((el) => el.textContent.trim()).filter(Boolean)))()`;
  return proxyEval(targetId, js);
}

async function clickTocItem(targetId, title) {
  const js = `(() => {
    const item = [...document.querySelectorAll(".catalogue__item-title")].find((el) => el.textContent.trim() === ${JSON.stringify(title)});
    item?.click();
    return item ? "ok" : "miss";
  })()`;
  return proxyEval(targetId, js);
}

/** 从已登录浏览器抓取飞书 Wiki 块列表 + 图片 base64 */
export async function fetchFeishuDoc(url, { useToc = false, onProgress } = {}) {
  const log = onProgress ?? (() => {});
  const targetId = await proxyNew(url);
  await new Promise((r) => setTimeout(r, 4500));

  const allBlocks = [];
  const imgMap = new Map();

  async function pass(label) {
    await proxyEval(targetId, SCROLL_JS).catch(() => {});
    await new Promise((r) => setTimeout(r, 400));
    mergeBlocks(allBlocks, await proxyEval(targetId, EXTRACT_BLOCKS_JS));
    for (const im of await proxyEval(targetId, CAPTURE_IMAGES_JS)) {
      if (im.data) imgMap.set(im.src, im.data);
    }
    log(`${label}: ${allBlocks.length} blocks, ${imgMap.size} imgs`);
  }

  await pass("initial");

  if (useToc) {
    const toc = await getToc(targetId);
    for (const title of toc) {
      await clickTocItem(targetId, title);
      await new Promise((r) => setTimeout(r, 700));
      await pass(title.slice(0, 24));
    }
  } else {
    await pass("scroll");
  }

  await proxyClose(targetId);
  return { blocks: allBlocks, imgMap };
}

export function saveFeishuImages(imgMap, blocks, outDir) {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const imgSrcToFile = new Map();
  let imgIndex = 0;
  for (const b of blocks) {
    const src = b.md.match(/\[\[IMG:([^\]]+)\]\]/)?.[1];
    if (!src || imgSrcToFile.has(src)) continue;
    imgIndex += 1;
    const file = `${String(imgIndex).padStart(2, "0")}.jpg`;
    imgSrcToFile.set(src, file);
    const data = imgMap.get(src);
    if (data) {
      fs.writeFileSync(path.join(outDir, file), Buffer.from(data.split(",")[1], "base64"));
    }
  }

  return imgSrcToFile;
}

/** 飞书 blocks → Life 文章 ordered flow（保持文档顺序） */
export function blocksToLifeFlow(blocks, publicBase, imgSrcToFile) {
  const flow = [];
  let pendingImages = [];

  function flushImages() {
    if (!pendingImages.length) return;
    const sources = pendingImages.map((src) => {
      const file = imgSrcToFile.get(src);
      return file ? `${publicBase}/${file}` : null;
    }).filter(Boolean);
    pendingImages = [];
    if (sources.length === 1) {
      flow.push({ type: "figure", src: sources[0], variant: "wide" });
    } else if (sources.length > 1) {
      flow.push({ type: "masonry", sources });
    }
  }

  for (const block of blocks) {
    let { t, md } = block;
    md = normalizeFeishuText(md);

    if (md.includes("[[IMG:")) {
      const src = md.match(/\[\[IMG:([^\]]+)\]\]/)?.[1];
      if (src) pendingImages.push(src);
      continue;
    }

    flushImages();

    if (t.startsWith("heading")) {
      const level = t === "heading1" ? "##" : "###";
      flow.push({ type: "paragraph", text: `${level} ${md}` });
      continue;
    }
    if (t === "bullet") {
      md.split("\n").forEach((line) => {
        const l = line.replace(/^•\s*/, "").trim();
        if (l) flow.push({ type: "paragraph", text: `- ${l}` });
      });
      continue;
    }
    if (t === "quote") {
      md.split("\n").forEach((line) => flow.push({ type: "paragraph", text: `> ${line}` }));
      continue;
    }

    md.split(/\n\n+/).forEach((para) => {
      if (para.trim()) flow.push({ type: "paragraph", text: para.trim() });
    });
  }

  flushImages();
  return flow;
}

/** 飞书 blocks → Writing MDX 正文 */
export function blocksToWritingMdx(blocks, slug, imgSrcToFile) {
  const lines = [];

  for (const block of blocks) {
    let { t, md } = block;
    md = normalizeFeishuText(md);

    if (md.includes("[[IMG:")) {
      const src = md.match(/\[\[IMG:([^\]]+)\]\]/)?.[1];
      const file = src ? imgSrcToFile.get(src) : null;
      if (file) lines.push("", `![${slug}-${file}](/writing/${slug}/${file})`, "");
      continue;
    }

    if (t === "heading1") {
      lines.push("", `## ${md}`, "");
      continue;
    }
    if (t === "heading2" || t === "heading3") {
      lines.push("", `### ${md}`, "");
      continue;
    }
    if (t === "bullet") {
      md.split("\n").forEach((line) => {
        const l = line.replace(/^•\s*/, "").trim();
        if (l) lines.push(`- ${l}`);
      });
      lines.push("");
      continue;
    }
    if (t === "quote") {
      md.split("\n").forEach((line) => lines.push(`> ${line}`));
      lines.push("");
      continue;
    }

    md.split(/\n\n+/).forEach((para) => {
      if (para.trim()) lines.push(para.trim(), "");
    });
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function flowToParagraphs(flow) {
  return flow.filter((b) => b.type === "paragraph").map((b) => b.text);
}

export function flowToImagePaths(flow) {
  const paths = [];
  for (const b of flow) {
    if (b.type === "figure") paths.push(b.src);
    if (b.type === "masonry") paths.push(...b.sources);
  }
  return paths;
}
