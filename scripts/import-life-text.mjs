#!/usr/bin/env node
/**
 * 从 生活体验/<folder>/文字.rtf 提取正文 → src/lib/demo/life-journal-bodies.json
 * 用法: node scripts/import-life-text.mjs
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "生活体验");
const OUT = path.join(ROOT, "src/lib/demo/life-journal-bodies.json");

/** 文件夹名 → journal id */
const FOLDER_TO_ID = {
  "2023.7 冲浪店义工-1个月": "surf-volunteer",
  "2024.9.22 写在30岁这一天": "keep-growing",
  "2025.1 pa pae meditation retreat": "pa-pae",
  "2025.12 wonderfruit十周年": "wonderfruit",
  "2026.5 日本屋久岛徒步及露营行程": "yakushima",
};

function rtfToPlain(rtfPath) {
  return execSync(`textutil -convert txt -stdout "${rtfPath}"`, {
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
  }).trim();
}

/** 去掉 RTF 顶部的 时间/标题/关键词 元信息 */
function stripMeta(raw) {
  const lines = raw.split(/\r?\n/);
  const content = [];
  let inMeta = true;

  for (const line of lines) {
    const t = line.trim();
    if (inMeta) {
      if (!t) continue;
      if (/^(时间|标题|关键词)\s*[：:]/u.test(t)) {
        const rest = t
          .replace(/^时间\s*[：:][^\s]*\s*/u, "")
          .replace(/^标题\s*[：:][^关键词]*?(?=关键词\s*[：:]|$)/u, "")
          .replace(/^关键词\s*[：:].*$/u, "")
          .trim();
        if (rest && !/^(时间|标题|关键词)\s*[：:]/u.test(rest)) {
          inMeta = false;
          content.push(rest);
        }
        continue;
      }
      inMeta = false;
    }
    content.push(line);
  }
  return content.join("\n").trim();
}

function toParagraphs(text) {
  const byBlank = text
    .split(/\n\s*\n+/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 0);

  if (byBlank.length >= 2) return byBlank;

  return text
    .split(/\r?\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 0);
}

const bodies = {};

for (const [folder, id] of Object.entries(FOLDER_TO_ID)) {
  const rtf = path.join(SRC, folder, "文字.rtf");
  if (!fs.existsSync(rtf)) {
    console.warn(`  skip ${id}: no 文字.rtf in ${folder}`);
    continue;
  }
  const plain = stripMeta(rtfToPlain(rtf));
  const paragraphs = toParagraphs(plain);
  if (!paragraphs.length) {
    console.warn(`  skip ${id}: empty after parse`);
    continue;
  }
  bodies[id] = paragraphs;
  console.log(`  ${id}: ${paragraphs.length} paragraphs`);
}

fs.writeFileSync(OUT, JSON.stringify(bodies, null, 2) + "\n", "utf8");
console.log(`Wrote ${OUT}`);
