#!/usr/bin/env node
/**
 * 从 生活体验/<folder>/文字.rtf（或 文字）提取正文 → life-journal-bodies.json
 * 用法: node scripts/import-life-text.mjs
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { JOURNAL_FOLDERS } from "./life-journal-folders.mjs";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "生活体验");
const OUT = path.join(ROOT, "src/lib/demo/life-journal-bodies.json");

function findTextFile(folderPath) {
  const candidates = ["文字.rtf", "文字.txt", "文字"];
  for (const name of candidates) {
    const p = path.join(folderPath, name);
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

function rtfToPlain(rtfPath) {
  return execSync(`textutil -convert txt -stdout "${rtfPath}"`, {
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
  }).trim();
}

function readTextFile(filePath) {
  if (filePath.endsWith(".rtf")) return rtfToPlain(filePath);
  return fs.readFileSync(filePath, "utf8").trim();
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
    .filter((p) => p.length > 0 && !/^(时间|标题|关键词)\s*[：:]/u.test(p));
}

let bodies = {};
if (fs.existsSync(OUT)) {
  bodies = JSON.parse(fs.readFileSync(OUT, "utf8"));
}

for (const [folder, id] of Object.entries(JOURNAL_FOLDERS)) {
  const dir = path.join(SRC, folder);
  const textFile = findTextFile(dir);
  if (!textFile) {
    console.warn(`  skip ${id}: no 文字.rtf / 文字 in ${folder}`);
    continue;
  }
  const plain = stripMeta(readTextFile(textFile));
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
