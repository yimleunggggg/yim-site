#!/usr/bin/env node
/**
 * 从飞书 Wiki 导出写作 MDX（含图片下载到 public/writing/）
 * 前置：Chrome remote debugging + node cdp-proxy.mjs (localhost:3456)
 */
import fs from "fs/promises";
import path from "path";

const PROXY = "http://localhost:3456";

const DOCS = [
  {
    slug: "turning-31",
    url: "https://my.feishu.cn/wiki/Q0KBwWI5wiocEBkX8abcLP2XnMd",
    title: "写在 31 岁这一天",
    date: "2025-09-22",
    tags: ["随笔"],
  },
  {
    slug: "keep-growing",
    url: "https://my.feishu.cn/wiki/IWbUwP50liNJRJkFR86ci61GnKg",
    title: "继续生长",
    date: "2024-09-22",
    tags: ["随笔"],
  },
  {
    slug: "july-sea-salt",
    url: "https://my.feishu.cn/wiki/YznJwdUxPiZkcrkhMVecUBxfnPb",
    title: "七月的记忆是海水味",
    date: "2023-08-01",
    tags: ["随笔", "旅行"],
  },
];

async function extractDoc(targetId) {
  const js = `(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    for (let i = 0; i < 50; i++) {
      window.scrollTo(0, document.body.scrollHeight);
      await sleep(200);
    }
    window.scrollTo(0, 0);
    await sleep(500);

    const root =
      document.querySelector(".wiki-content") ||
      document.querySelector(".docx-page-block") ||
      document.querySelector('[data-testid="docx-page-container"]') ||
      document.querySelector(".bear-web-x-container") ||
      document.body;

    const blocks = [];
    const imgs = [];

    const walk = (el) => {
      if (!el || el.nodeType !== 1) return;
      const tag = el.tagName?.toLowerCase();
      if (tag === "script" || tag === "style" || tag === "svg") return;

      if (tag === "img") {
        const src = el.src || el.getAttribute("data-src") || "";
        if (src && !src.startsWith("data:") && !/avatar|icon|logo|emoji/i.test(src)) {
          imgs.push(src);
          blocks.push({ type: "img", src });
        }
        return;
      }

      const role = el.getAttribute?.("role");
      const cls = el.className?.toString?.() || "";
      const text = (el.innerText || "").trim();

      if (el.children.length === 0 || tag === "p" || tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4") {
        if (!text || text.length < 2) return;
        if (/^(飞书云文档|分享|编辑|登录|目录|搜索|添加封面|最近修改)/.test(text)) return;
        if (text === "与我分享" || text === "帮助中心") return;

        let type = "p";
        if (tag === "h1" || tag === "h2" || /heading|title/i.test(cls)) type = "h2";
        else if (tag === "h3" || tag === "h4") type = "h3";
        else if (el.querySelector?.("strong, b") && el.querySelector("strong, b")?.innerText === text) type = "strong";

        const last = blocks[blocks.length - 1];
        if (last && last.type === type && last.text === text) return;
        blocks.push({ type, text });
        return;
      }

      for (const child of el.children) walk(child);
    };

    walk(root);
    return JSON.stringify({ blocks, title: document.title, imgs: [...new Set(imgs)] });
  })()`;

  const res = await fetch(`${PROXY}/eval?target=${targetId}`, {
    method: "POST",
    body: js,
  });
  const data = await res.json();
  const raw = data.value ?? data.result ?? "{}";
  return JSON.parse(raw);
}

function blocksToMdx(blocks) {
  const lines = [];
  for (const b of blocks) {
    if (b.type === "img") {
      lines.push(`![image](${b.src})`);
      lines.push("");
      continue;
    }
    const t = b.text.replace(/\r/g, "").trim();
    if (!t) continue;
    if (b.type === "h2") {
      lines.push(`## ${t}`);
      lines.push("");
    } else if (b.type === "h3") {
      lines.push(`### ${t}`);
      lines.push("");
    } else if (b.type === "strong") {
      lines.push(`**${t}**`);
      lines.push("");
    } else {
      lines.push(t);
      lines.push("");
    }
  }
  return lines.join("\n").trim();
}

function estimateMinutes(body) {
  const chars = body.replace(/!\[.*?\]\(.*?\)/g, "").length;
  return Math.max(3, Math.ceil(chars / 400));
}

async function downloadImages(slug, blocks, imgDir) {
  const out = [];
  let i = 0;
  for (const b of blocks) {
    if (b.type !== "img") {
      out.push(b);
      continue;
    }
    i += 1;
    const ext = b.src.includes(".png") ? "png" : "jpg";
    const name = `${String(i).padStart(2, "0")}.${ext}`;
    const localPath = path.join(imgDir, name);
    const publicPath = `/writing/${slug}/${name}`;
    try {
      const res = await fetch(b.src);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        await fs.writeFile(localPath, buf);
        out.push({ type: "img", src: publicPath });
        console.log(`  img ${name} (${buf.length} bytes)`);
      } else {
        out.push(b);
      }
    } catch {
      out.push(b);
    }
  }
  return out;
}

async function main() {
  const root = process.cwd();
  for (const doc of DOCS) {
    console.log(`\n→ ${doc.slug}`);
    let body = "";
    try {
      const newRes = await fetch(`${PROXY}/new`, { method: "POST", body: doc.url });
      const { targetId } = await newRes.json();
      if (!targetId) throw new Error("no targetId — 请用已登录飞书的 Chrome 打开");
      await new Promise((r) => setTimeout(r, 6000));
      const parsed = await extractDoc(targetId);
      await fetch(`${PROXY}/close?target=${targetId}`);

      const imgDir = path.join(root, "public/writing", doc.slug);
      await fs.mkdir(imgDir, { recursive: true });
      const blocks = await downloadImages(doc.slug, parsed.blocks || [], imgDir);
      body = blocksToMdx(blocks);

      if (!body || body.length < 50) {
        console.warn("  内容过短，可能未登录飞书或页面未加载");
      }
    } catch (e) {
      console.warn("  失败:", e.message);
    }

    const summary = body.split("\n").find((l) => l && !l.startsWith("#") && !l.startsWith("!"))?.slice(0, 120) || "";
    const mdx = `---
title: ${doc.title}
date: "${doc.date}"
tags: ${JSON.stringify(doc.tags)}
summary: ${summary.replace(/\n/g, " ")}
readingMinutes: ${estimateMinutes(body)}
---

${body}
`;
    const outFile = path.join(root, "content/demo/writing", `${doc.slug}.mdx`);
    await fs.writeFile(outFile, mdx, "utf8");
    console.log(`  wrote ${outFile} (${body.length} chars)`);
  }
}

main();
