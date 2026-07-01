#!/usr/bin/env node
/**
 * 飞书 Wiki → 站点内容（Writing MDX 或 Life Journal）
 *
 * 前置：web-access CDP Proxy 已启动（默认 http://localhost:3456），浏览器已登录飞书。
 *
 * 用法：
 *   node scripts/import-feishu.mjs --url "https://my.feishu.cn/wiki/..." \
 *     --target life --slug turning-31 --title "写在 31 岁这一天" \
 *     --date 2025-09-22 --tags 随笔 --toc
 *
 *   node scripts/import-feishu.mjs --slug turning-31   # 从 scripts/feishu-imports.json 读取
 *   node scripts/import-feishu.mjs --all                 # 批量导入 manifest 全部
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import {
  fetchFeishuDoc,
  saveFeishuImages,
  blocksToLifeFlow,
  blocksToWritingMdx,
  flowToParagraphs,
  flowToImagePaths,
} from "./lib/feishu-import-core.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = path.join(ROOT, "scripts/feishu-imports.json");
const WRITING_DIR = path.join(ROOT, "content/demo/writing");
const LIFE_IMG_ROOT = path.join(ROOT, "public/life/journal");
const LIFE_BODIES = path.join(ROOT, "src/lib/demo/life-journal-bodies.json");
const LIFE_FLOW = path.join(ROOT, "src/lib/demo/life-journal-flow.json");
const LIFE_IMAGES = path.join(ROOT, "src/lib/demo/life-journal-images.json");

function parseArgs(argv) {
  const args = { target: "writing", tags: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--url") args.url = argv[++i];
    else if (a === "--target") args.target = argv[++i];
    else if (a === "--slug") args.slug = argv[++i];
    else if (a === "--title") args.title = argv[++i];
    else if (a === "--date") args.date = argv[++i];
    else if (a === "--tags") args.tags = argv[++i].split(/[,，]/).map((s) => s.trim()).filter(Boolean);
    else if (a === "--toc") args.useToc = true;
    else if (a === "--all") args.all = true;
    else if (a === "--life") args.life = true;
    else if (a === "--help" || a === "-h") args.help = true;
  }
  return args;
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST)) return [];
  return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
}

function readJson(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function importLife(doc, { blocks, imgMap, neededImageCount }) {
  const imgDir = path.join(LIFE_IMG_ROOT, doc.slug);
  const publicBase = `/life/journal/${doc.slug}`;
  const { imgSrcToFile, missing } = saveFeishuImages(imgMap, blocks, imgDir);
  const flow = blocksToLifeFlow(blocks, publicBase, imgSrcToFile);
  const imagePaths = flowToImagePaths(flow);
  const paragraphs = flowToParagraphs(flow);

  if (missing.length) {
    console.warn(`  ⚠ ${missing.length} images missing for ${doc.slug}`);
  }
  const refs = neededImageCount ?? imagePaths.length;
  if (imagePaths.length < refs) {
    console.warn(`  ⚠ flow has ${imagePaths.length}/${refs} images — check Feishu doc`);
  }

  const bodies = readJson(LIFE_BODIES, {});
  bodies[doc.slug] = paragraphs;
  writeJson(LIFE_BODIES, bodies);

  const flows = readJson(LIFE_FLOW, {});
  flows[doc.slug] = flow;
  writeJson(LIFE_FLOW, flows);

  const images = readJson(LIFE_IMAGES, {});
  images[doc.slug] = {
    cover: imagePaths[0] ?? `${publicBase}/cover.jpg`,
    images: imagePaths,
  };
  if (imagePaths[0] && fs.existsSync(path.join(imgDir, "01.jpg"))) {
    fs.copyFileSync(path.join(imgDir, "01.jpg"), path.join(imgDir, "cover.jpg"));
    images[doc.slug].cover = `${publicBase}/cover.jpg`;
  }
  writeJson(LIFE_IMAGES, images);

  console.log(`  ✓ life/${doc.slug}: ${paragraphs.length} paragraphs, ${imagePaths.length} images, ${flow.length} blocks`);
}

async function importWriting(doc, { blocks, imgMap }) {
  const imgDir = path.join(ROOT, "public/writing", doc.slug);
  const { imgSrcToFile, missing } = saveFeishuImages(imgMap, blocks, imgDir);
  if (missing.length) console.warn(`  ⚠ ${missing.length} images missing for ${doc.slug}`);
  const body = blocksToWritingMdx(blocks, doc.slug, imgSrcToFile);
  const plain = body.replace(/!\[[^\]]*\]\([^)]+\)/g, "").replace(/[#>*\-]/g, "");
  const summary =
    doc.summary ??
    plain.split("\n").find((l) => l.trim().length > 20)?.trim().slice(0, 120) ??
    "";

  const frontmatter = `---
title: ${doc.title}
date: "${doc.date}"
tags: ${JSON.stringify(doc.tags ?? [])}
summary: ${summary}
readingMinutes: ${Math.max(3, Math.ceil(plain.replace(/\s/g, "").length / 400))}
---

`;

  fs.mkdirSync(WRITING_DIR, { recursive: true });
  fs.writeFileSync(path.join(WRITING_DIR, `${doc.slug}.mdx`), frontmatter + body + "\n", "utf8");
  console.log(`  ✓ writing/${doc.slug}.mdx (${body.length} chars, ${imgSrcToFile.size} imgs)`);
}

async function importOne(doc) {
  console.log(`\n→ ${doc.title ?? doc.slug}`);
  console.log(`  ${doc.url}`);
  const data = await fetchFeishuDoc(doc.url, {
    useToc: Boolean(doc.useToc),
    onProgress: (msg) => console.log(`  · ${msg}`),
  });

  if (doc.target === "life") {
    await importLife(doc, data);
  } else {
    await importWriting(doc, data);
  }
}

function printHelp() {
  console.log(`
飞书 Wiki 导入工具

前置：启动 web-access CDP Proxy（:3456），浏览器登录飞书。

示例：
  npm run import:feishu -- --url "https://my.feishu.cn/wiki/..." \\
    --target life --slug turning-31 --title "写在 31 岁这一天" \\
    --date 2025-09-22 --tags 随笔 --toc

  npm run import:feishu -- --slug turning-31
  npm run import:feishu -- --all

target: life | writing
`);
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  let docs = [];

  if (args.all) {
    docs = loadManifest();
  } else if (args.life) {
    docs = loadManifest().filter((d) => d.target === "life");
  } else if (args.slug && !args.url) {
    const hit = loadManifest().find((d) => d.slug === args.slug);
    if (!hit) {
      console.error(`Manifest 中无 slug: ${args.slug}（见 scripts/feishu-imports.json）`);
      process.exit(1);
    }
    docs = [hit];
  } else if (args.url && args.slug) {
    docs = [
      {
        url: args.url,
        slug: args.slug,
        title: args.title ?? args.slug,
        date: args.date ?? new Date().toISOString().slice(0, 10),
        tags: args.tags,
        target: args.target,
        useToc: args.useToc,
      },
    ];
  } else {
    printHelp();
    process.exit(1);
  }

  for (const doc of docs) {
    await importOne(doc);
  }
}

main().catch((e) => {
  console.error(e.message || e);
  console.error("\n提示：确认 CDP Proxy 已启动且浏览器已登录飞书。");
  process.exit(1);
});
