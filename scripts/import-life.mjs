#!/usr/bin/env node
/**
 * 从 生活体验/ 导入 journal & sport 图片到 public/life/
 * 用法: node scripts/import-life.mjs
 *
 * manifest 会与已有 life-journal-images.json 合并，并保留飞书条目的 public 目录扫描结果。
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

import { JOURNAL_FOLDERS, FEISHU_JOURNAL_SLUGS, JOURNAL_IMAGE_DISABLED } from "./life-journal-folders.mjs";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "生活体验");
const JOURNAL_OUT = path.join(ROOT, "public/life/journal");
const SPORT_OUT = path.join(ROOT, "public/life/sport");
const MAX_W = 1400;
const THUMB_W = 480;
const MANIFEST_OUT = path.join(ROOT, "src/lib/demo/life-journal-images.json");

const IMG_RE = /\.(jpe?g|png|webp|heic|heif)$/i;

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function toJpeg(src, dest, maxW) {
  ensureDir(path.dirname(dest));
  execSync(`sips -Z ${maxW} -s format jpeg "${src}" --out "${dest}"`, {
    stdio: "pipe",
  });
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMG_RE.test(f))
    .map((f) => path.join(dir, f))
    .sort((a, b) => {
      const score = (p) => {
        const n = path.basename(p).toLowerCase();
        if (n.includes("封面") || n.includes("cover") || n.includes("第一张")) return 0;
        if (n.startsWith("111")) return 1;
        return 2;
      };
      return score(a) - score(b) || a.localeCompare(b);
    });
}

function manifestFromPublicDir(slug) {
  const outDir = path.join(JOURNAL_OUT, slug);
  if (!fs.existsSync(outDir)) return null;
  const numbered = fs
    .readdirSync(outDir)
    .filter((f) => /^\d+\.jpg$/i.test(f))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  if (!numbered.length) return null;
  const images = numbered.map((f) => `/life/journal/${slug}/${f}`);
  const coverPath = path.join(outDir, "cover.jpg");
  const cover = fs.existsSync(coverPath)
    ? `/life/journal/${slug}/cover.jpg`
    : images[0];
  return { cover, images };
}

function importJournalFolder(folderName, slug, manifest) {
  const srcDir = path.join(SRC, folderName);
  const files = listImages(srcDir);
  if (!files.length) {
    console.warn(`  skip journal ${slug}: no images in ${folderName}`);
    return;
  }
  const outDir = path.join(JOURNAL_OUT, slug);
  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true });
  ensureDir(outDir);

  files.forEach((f, i) => {
    const name = i === 0 ? "01.jpg" : `${String(i + 1).padStart(2, "0")}.jpg`;
    toJpeg(f, path.join(outDir, name), MAX_W);
  });
  toJpeg(files[0], path.join(outDir, "cover.jpg"), THUMB_W);

  const images = files.map((_, i) =>
    `/life/journal/${slug}/${String(i + 1).padStart(2, "0")}.jpg`,
  );
  manifest[slug] = {
    cover: `/life/journal/${slug}/cover.jpg`,
    images,
  };
  console.log(`  journal/${slug}: ${files.length} images`);
}

function importSportFile(filePath) {
  const base = path.basename(filePath);
  const slug = base
    .replace(/\.(heic|heif|jpe?g|png|webp)$/i, "")
    .replace(/^#+/, "")
    .replace(/[，,。.]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 64);
  const outDir = path.join(SPORT_OUT, slug);
  ensureDir(outDir);
  toJpeg(filePath, path.join(outDir, "cover.jpg"), THUMB_W);
  toJpeg(filePath, path.join(outDir, "display.jpg"), MAX_W);
  return slug;
}

console.log("Importing life journal images…");
ensureDir(JOURNAL_OUT);

const manifest = fs.existsSync(MANIFEST_OUT)
  ? JSON.parse(fs.readFileSync(MANIFEST_OUT, "utf8"))
  : {};

for (const [folder, slug] of Object.entries(JOURNAL_FOLDERS)) {
  if (JOURNAL_IMAGE_DISABLED.includes(slug)) {
    console.log(`  journal/${slug}: skip (images disabled)`);
    continue;
  }
  importJournalFolder(folder, slug, manifest);
}

for (const slug of FEISHU_JOURNAL_SLUGS) {
  const fromDisk = manifestFromPublicDir(slug);
  if (fromDisk) {
    manifest[slug] = fromDisk;
    console.log(`  journal/${slug}: ${fromDisk.images.length} images (from public)`);
  }
}

// 移除已删条目的 manifest
for (const removed of ["chiang-mai-2024", "hk-brewery-hike", "gansu-hops"]) {
  delete manifest[removed];
}
for (const slug of JOURNAL_IMAGE_DISABLED) {
  manifest[slug] = { cover: "", images: [] };
}

fs.writeFileSync(MANIFEST_OUT, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`Wrote ${MANIFEST_OUT}`);

console.log("Importing sport covers…");
ensureDir(SPORT_OUT);
const sportDir = path.join(SRC, "运动图片");
if (fs.existsSync(sportDir)) {
  for (const f of fs.readdirSync(sportDir)) {
    if (!IMG_RE.test(f)) continue;
    const slug = importSportFile(path.join(sportDir, f));
    console.log(`  sport/${slug}`);
  }
}

console.log("Done.");
