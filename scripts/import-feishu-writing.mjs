#!/usr/bin/env node
/**
 * 飞书 Wiki → Writing MDX（含图片）
 * 依赖 web-access CDP Proxy: http://localhost:3456
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROXY = "http://localhost:3456";
const OUT_DIR = path.join(ROOT, "content/demo/writing");
const IMG_ROOT = path.join(ROOT, "public/writing");

const DOCS = [
  {
    slug: "july-sea-salt",
    url: "https://my.feishu.cn/wiki/YznJwdUxPiZkcrkhMVecUBxfnPb",
    title: "七月的记忆是海水味",
    date: "2023-08-01",
    tags: ["随笔", "旅行"],
    useToc: false,
  },
  {
    slug: "keep-growing",
    url: "https://my.feishu.cn/wiki/IWbUwP50liNJRJkFR86ci61GnKg",
    title: "继续生长",
    date: "2024-09-22",
    tags: ["随笔"],
    useToc: false,
  },
  {
    slug: "turning-31",
    url: "https://my.feishu.cn/wiki/Q0KBwWI5wiocEBkX8abcLP2XnMd",
    title: "写在 31 岁这一天",
    date: "2025-09-22",
    tags: ["随笔"],
    useToc: true,
  },
  {
    slug: "west-sichuan-2025",
    url: "https://my.feishu.cn/wiki/OpJmwMUSXil9pSkBPXFcTeZrnJc",
    title: "川西 Road Trip",
    date: "2025-06",
    tags: ["旅行", "川西"],
    useToc: true,
  },
];

async function proxyNew(url) {
  const res = await fetch(`${PROXY}/new`, { method: "POST", body: url });
  const data = await res.json();
  if (!data.targetId) throw new Error(`open failed: ${url}`);
  return data.targetId;
}

async function proxyEval(targetId, js) {
  const res = await fetch(`${PROXY}/eval?target=${targetId}`, { method: "POST", body: js });
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

async function proxyClose(targetId) {
  await fetch(`${PROXY}/close?target=${targetId}`);
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

function normalizeText(md) {
  return md
    .replace(/\*\*([^*\n]{1,3})\*\*/g, "$1")
    .replace(/(?<![\u4e00-\u9fff])--(?![\u4e00-\u9fff])/g, "——")
    .replace(/一-(?=祝)/g, "——");
}

function blocksToBody(blocks, slug, imgSrcToFile) {
  const lines = [];

  for (const block of blocks) {
    let { t, md } = block;
    md = normalizeText(md);

    if (md.includes("[[IMG:")) {
      const src = md.match(/\[\[IMG:([^\]]+)\]\]/)?.[1];
      const file = src ? imgSrcToFile.get(src) : null;
      if (file) {
        lines.push("", `![${slug}-${file}](/writing/${slug}/${file})`, "");
      }
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

async function importDoc(doc) {
  console.log(`\n→ ${doc.title}`);
  const targetId = await proxyNew(doc.url);
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
    console.log(`  · ${label}: ${allBlocks.length} blocks, ${imgMap.size} imgs cached`);
  }

  await pass("initial");

  if (doc.useToc) {
    const toc = await getToc(targetId);
    for (const title of toc) {
      await clickTocItem(targetId, title);
      await new Promise((r) => setTimeout(r, 700));
      await pass(title.slice(0, 24));
    }
  } else {
    await pass("scroll");
  }

  const imgDir = path.join(IMG_ROOT, doc.slug);
  fs.rmSync(imgDir, { recursive: true, force: true });
  fs.mkdirSync(imgDir, { recursive: true });

  const imgSrcToFile = new Map();
  let imgIndex = 0;
  for (const b of allBlocks) {
    const src = b.md.match(/\[\[IMG:([^\]]+)\]\]/)?.[1];
    if (!src || imgSrcToFile.has(src)) continue;
    imgIndex += 1;
    const file = `${String(imgIndex).padStart(2, "0")}.jpg`;
    imgSrcToFile.set(src, file);
    const data = imgMap.get(src);
    if (data) {
      fs.writeFileSync(path.join(imgDir, file), Buffer.from(data.split(",")[1], "base64"));
    } else {
      console.warn(`  ⚠ missing image data: ${file}`);
    }
  }

  const body = blocksToBody(allBlocks, doc.slug, imgSrcToFile);
  const plain = body.replace(/!\[[^\]]*\]\([^)]+\)/g, "").replace(/[#>*\-]/g, "");
  const summary = plain.split("\n").find((l) => l.trim().length > 20)?.trim().slice(0, 120) ?? "";

  const frontmatter = `---
title: ${doc.title}
date: "${doc.date}"
tags: ${JSON.stringify(doc.tags)}
summary: ${summary}
readingMinutes: ${Math.max(3, Math.ceil(plain.replace(/\s/g, "").length / 400))}
---

`;

  fs.writeFileSync(path.join(OUT_DIR, `${doc.slug}.mdx`), frontmatter + body + "\n", "utf8");
  console.log(`  ✓ wrote ${doc.slug}.mdx (${body.length} chars, ${imgIndex} imgs)`);

  await proxyClose(targetId);
}

async function main() {
  const only = process.argv[2];
  const list = only ? DOCS.filter((d) => d.slug === only) : DOCS;
  if (only && !list.length) {
    console.error(`Unknown slug: ${only}`);
    process.exit(1);
  }
  for (const doc of list) {
    await importDoc(doc);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
