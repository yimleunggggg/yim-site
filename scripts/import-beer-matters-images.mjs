#!/usr/bin/env node
/**
 * 从 生活体验/精酿 导入图片到 public/work/beer-matters/gallery/
 * 用法: node scripts/import-beer-matters-images.mjs
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "生活体验/精酿");
const OUT = path.join(ROOT, "public/work/beer-matters/gallery");
const MANIFEST = path.join(ROOT, "src/lib/demo/beer-matters-images.json");
const MAX_W = 1400;
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

function sortKey(name) {
  const n = name.toLowerCase();
  if (n.includes("香港")) return "01";
  if (n.includes("嘉兴")) return "02";
  if (n.includes("宁夏")) return "03";
  if (n.includes("碧山")) return "04";
  if (n.includes("啤酒节")) return "05";
  if (n.includes("喝酒")) return "06";
  if (n.includes("播客")) return "07";
  return "08";
}

if (!fs.existsSync(SRC)) {
  console.error("Missing folder:", SRC);
  process.exit(1);
}

const files = fs
  .readdirSync(SRC)
  .filter((f) => IMG_RE.test(f))
  .sort((a, b) => sortKey(a).localeCompare(sortKey(b)) || a.localeCompare(b));

if (!files.length) {
  console.error("No images in", SRC);
  process.exit(1);
}

if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
ensureDir(OUT);

const images = files.map((f, i) => {
  const name = `${String(i + 1).padStart(2, "0")}.jpg`;
  toJpeg(path.join(SRC, f), path.join(OUT, name), MAX_W);
  return `/work/beer-matters/gallery/${name}`;
});

fs.writeFileSync(
  MANIFEST,
  JSON.stringify({ images, captions: files }, null, 2) + "\n",
  "utf8",
);
console.log(`Imported ${images.length} images → ${OUT}`);
