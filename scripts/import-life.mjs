#!/usr/bin/env node
/**
 * 从 生活体验/ 导入 journal & sport 图片到 public/life/
 * 用法: node scripts/import-life.mjs
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "生活体验");
const JOURNAL_OUT = path.join(ROOT, "public/life/journal");
const SPORT_OUT = path.join(ROOT, "public/life/sport");
const MAX_W = 1400;
const THUMB_W = 480;
const MAX_IMAGES = 8;

const JOURNAL_FOLDERS = {
  "2025.1 pa pae meditation retreat": "pa-pae",
  "2025.12 wonderfruit十周年": "wonderfruit",
  "2024.9.22 写在30岁这一天": "keep-growing",
  "2023.7 冲浪店义工-1个月": "surf-volunteer",
  "2023.8 马来西亚亚庇考了OW潜水证 ": "sabah-ow",
  "2023.8 马来西亚亚庇考了OW潜水证": "sabah-ow",
  "2025.8 甘肃酒花田之旅，中国酒花共创计划": "gansu-hops",
  "2026.5 日本屋久岛徒步及露营行程": "yakushima",
};

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

function importJournalFolder(folderName, slug) {
  const srcDir = path.join(SRC, folderName);
  const files = listImages(srcDir);
  if (!files.length) {
    console.warn(`  skip journal ${slug}: no images in ${folderName}`);
    return;
  }
  const outDir = path.join(JOURNAL_OUT, slug);
  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true });
  ensureDir(outDir);

  const picked = files.slice(0, MAX_IMAGES);
  toJpeg(picked[0], path.join(outDir, "cover.jpg"), THUMB_W);
  toJpeg(picked[0], path.join(outDir, "01.jpg"), MAX_W);
  picked.slice(1).forEach((f, i) => {
    toJpeg(f, path.join(outDir, `${String(i + 2).padStart(2, "0")}.jpg`), MAX_W);
  });
  console.log(`  journal/${slug}: ${picked.length} images`);
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
for (const [folder, slug] of Object.entries(JOURNAL_FOLDERS)) {
  importJournalFolder(folder, slug);
}

// turning-31 长图
const t31src = path.join(ROOT, "public/writing/turning-31/01.png");
if (fs.existsSync(t31src)) {
  const outDir = path.join(JOURNAL_OUT, "turning-31");
  ensureDir(outDir);
  toJpeg(t31src, path.join(outDir, "cover.jpg"), THUMB_W);
  toJpeg(t31src, path.join(outDir, "01.jpg"), MAX_W);
  console.log("  journal/turning-31: from writing image");
}

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
