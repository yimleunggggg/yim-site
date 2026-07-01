/**
 * 飞书 Wiki 抓取核心（依赖 web-access CDP Proxy :3456）
 */
import fs from "fs";
import path from "path";

export const FEISHU_PROXY = process.env.FEISHU_PROXY ?? "http://localhost:3456";

const SKIP_IMG_RE = /v3_0011o_2a552573|avatar|72x72|favicon|emoji/i;

export async function proxyNew(url) {
  const res = await fetch(`${FEISHU_PROXY}/new`, { method: "POST", body: url });
  const data = await res.json();
  if (!data.targetId) throw new Error(`open failed: ${url}`);
  return data.targetId;
}

export async function proxyEval(targetId, js) {
  const res = await fetch(`${FEISHU_PROXY}/eval?target=${targetId}`, { method: "POST", body: js });
  const text = await res.text();
  if (!text.trim()) return null;
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("proxy eval returned invalid JSON");
  }
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

  function imgToken(img) {
    const src = img?.currentSrc || img?.src;
    if (!src || SKIP_IMG(src)) return "";
    const w = img.naturalWidth || img.width || 0;
    if (w > 0 && w < 48) return "";
    return "[[IMG:" + src + "]]";
  }

  function SKIP_IMG(src) {
    return /v3_0011o_2a552573|avatar|72x72|favicon|emoji/i.test(src);
  }

  function pushImage(blocks, img) {
    const md = imgToken(img);
    if (md) blocks.push({ t: "image", md });
  }

  function walkGrid(el, blocks) {
    const cols = el.querySelectorAll("[data-block-type='grid_column']");
    if (cols.length) {
      for (const col of cols) {
        for (const child of col.querySelectorAll("[data-block-type]")) {
          const ct = child.getAttribute("data-block-type");
          if (ct === "image") pushImage(blocks, child.querySelector("img"));
        }
      }
      return;
    }
    for (const img of el.querySelectorAll("img")) pushImage(blocks, img);
  }

  const blocks = [];
  for (const el of root.querySelectorAll("[data-block-type]")) {
    const t = el.getAttribute("data-block-type");
    if (t === "grid_column") continue;
    if (t === "grid") {
      walkGrid(el, blocks);
      continue;
    }
    let md = "";
    if (t === "image") {
      md = imgToken(el.querySelector("img"));
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
  const SKIP = /v3_0011o_2a552573|avatar|72x72|favicon|emoji/i;
  const out = [];
  const seen = new Set();
  for (const img of document.querySelectorAll("img")) {
    const src = img.currentSrc || img.src;
    if (!src || seen.has(src) || SKIP.test(src)) continue;
    const w = img.naturalWidth || img.width || 0;
    const h = img.naturalHeight || img.height || 0;
    if (w > 0 && w < 48) continue;
    seen.add(src);
    try {
      const c = document.createElement("canvas");
      c.width = w || img.clientWidth || 800;
      c.height = h || img.clientHeight || 600;
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      out.push({ src, data: c.toDataURL("image/jpeg", 0.92) });
    } catch (e) {
      out.push({ src, err: e.message });
    }
  }
  return JSON.stringify(out);
})()`;

const SCROLL_JS = `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  const steps = 28;
  for (let i = 0; i <= steps; i++) {
    const y = Math.round((max * i) / steps);
    window.scrollTo(0, y);
    await sleep(180);
  }
  window.scrollTo(0, 0);
  await sleep(120);
  for (let i = 0; i <= steps; i++) {
    const y = Math.round((max * i) / steps);
    window.scrollTo(0, y);
    await sleep(120);
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

function collectImageSrcs(blocks) {
  const srcs = [];
  for (const b of blocks) {
    const m = b.md?.match(/\[\[IMG:([^\]]+)\]\]/);
    if (m) srcs.push(m[1]);
  }
  return srcs;
}

async function fetchMissingImages(targetId, imgMap, srcs) {
  for (const src of srcs) {
    if (imgMap.has(src)) continue;
    const js = `(async () => {
      try {
        const r = await fetch(${JSON.stringify(src)}, { credentials: "include" });
        if (!r.ok) return JSON.stringify({ err: "http " + r.status });
        const blob = await r.blob();
        return await new Promise((resolve, reject) => {
          const fr = new FileReader();
          fr.onload = () => resolve(JSON.stringify({ src: ${JSON.stringify(src)}, data: fr.result }));
          fr.onerror = () => reject(fr.error);
          fr.readAsDataURL(blob);
        });
      } catch (e) {
        return JSON.stringify({ err: e.message });
      }
    })()`;
    try {
      const raw = await proxyEval(targetId, js);
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (parsed?.data?.startsWith("data:")) imgMap.set(src, parsed.data);
    } catch {
      /* skip */
    }
  }
}

async function getToc(targetId) {
  const js = `(() => JSON.stringify([...document.querySelectorAll(".catalogue__item-title")].map((el) => el.textContent.trim()).filter(Boolean)))()`;
  const raw = await proxyEval(targetId, js);
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return [];
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
  await new Promise((r) => setTimeout(r, 5000));

  const allBlocks = [];
  const imgMap = new Map();

  async function pass(label) {
    try {
      await proxyEval(targetId, SCROLL_JS);
    } catch {
      /* scroll best-effort */
    }
    await new Promise((r) => setTimeout(r, 500));
    const extracted = await proxyEval(targetId, EXTRACT_BLOCKS_JS);
    if (Array.isArray(extracted)) mergeBlocks(allBlocks, extracted);
    const captured = await proxyEval(targetId, CAPTURE_IMAGES_JS);
    if (Array.isArray(captured)) {
      for (const im of captured) {
        if (im.data) imgMap.set(im.src, im.data);
      }
    }
    log(`${label}: ${allBlocks.length} blocks, ${imgMap.size} imgs`);
  }

  await pass("initial");

  if (useToc) {
    const toc = (await getToc(targetId)) ?? [];
    for (const title of toc) {
      try {
        await clickTocItem(targetId, title);
        await new Promise((r) => setTimeout(r, 1200));
        await pass(title.slice(0, 24));
      } catch (e) {
        log(`skip toc「${title.slice(0, 20)}」: ${e.message}`);
      }
    }
    await pass("final-scroll");
  } else {
    await pass("scroll-2");
    await pass("scroll-3");
  }

  const needed = collectImageSrcs(allBlocks);
  await fetchMissingImages(targetId, imgMap, needed);
  log(`needed ${needed.length} refs, captured ${imgMap.size}`);

  await proxyClose(targetId);
  return { blocks: allBlocks, imgMap, neededImageCount: needed.length };
}

export function saveFeishuImages(imgMap, blocks, outDir) {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const imgSrcToFile = new Map();
  const missing = [];
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
    } else {
      missing.push(src);
    }
  }

  return { imgSrcToFile, missing };
}

const MAX_GALLERY = 3;

function flushPendingImages(flow, pending, publicBase, imgSrcToFile) {
  if (!pending.length) return;
  const sources = pending
    .map((src) => {
      const file = imgSrcToFile.get(src);
      return file ? `${publicBase}/${file}` : null;
    })
    .filter(Boolean);
  pending.length = 0;
  if (!sources.length) return;

  if (sources.length === 1) {
    flow.push({ type: "figure", src: sources[0], variant: "wide" });
    return;
  }

  for (let i = 0; i < sources.length; i += MAX_GALLERY) {
    const chunk = sources.slice(i, i + MAX_GALLERY);
    if (chunk.length === 1) {
      flow.push({ type: "figure", src: chunk[0], variant: "wide" });
    } else {
      flow.push({ type: "masonry", sources: chunk });
    }
  }
}

/** 飞书 blocks → Life 文章 ordered flow（保持文档顺序） */
export function blocksToLifeFlow(blocks, publicBase, imgSrcToFile) {
  const flow = [];
  const pendingImages = [];

  for (const block of blocks) {
    let { t, md } = block;
    md = normalizeFeishuText(md);

    if (md.includes("[[IMG:")) {
      const src = md.match(/\[\[IMG:([^\]]+)\]\]/)?.[1];
      if (src) pendingImages.push(src);
      continue;
    }

    flushPendingImages(flow, pendingImages, publicBase, imgSrcToFile);

    if (t.startsWith("heading")) {
      const level =
        t === "heading1" ? "##" : t === "heading2" ? "###" : "####";
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

  flushPendingImages(flow, pendingImages, publicBase, imgSrcToFile);
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
