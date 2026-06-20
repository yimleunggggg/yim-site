#!/usr/bin/env node
/** 合并「川西车窗」+「其他的车窗」→ window-views */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const IMG = /\.(jpe?g|png|heic|heif)$/i;

function conv(src, dest, max) {
  execSync(`sips -s format jpeg -Z ${max} "${src}" --out "${dest}"`, { stdio: "ignore" });
}

const srcRoot = process.argv[2];
const destRoot = process.argv[3];
const slug = "window-views";
const themes = ["川西 road trip - 车窗视角", "其他的车窗"];
const destDir = path.join(destRoot, slug);

if (!srcRoot || !destRoot) process.exit(1);

if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true });
fs.mkdirSync(destDir, { recursive: true });

const sichuanDir = path.join(srcRoot, themes[0]);
const coverSrc = path.join(sichuanDir, "封面.jpg");
if (fs.existsSync(coverSrc)) {
  conv(coverSrc, path.join(destDir, "cover-full.jpg"), 2000);
  conv(coverSrc, path.join(destDir, "cover.jpg"), 1600);
  conv(path.join(destDir, "cover.jpg"), path.join(destDir, "cover-thumb.jpg"), 480);
}

let i = 1;
for (const theme of themes) {
  const sd = path.join(srcRoot, theme);
  if (!fs.existsSync(sd)) continue;
  const files = fs
    .readdirSync(sd)
    .filter((f) => IMG.test(f) && !/^封面\./i.test(f))
    .sort((a, b) => a.localeCompare(b, "zh"));
  for (const name of files) {
    const stem = String(i).padStart(2, "0");
    const src = path.join(sd, name);
    conv(src, path.join(destDir, `${stem}-full.jpg`), 2000);
    conv(src, path.join(destDir, `${stem}.jpg`), 1200);
    i++;
  }
}

if (!fs.existsSync(path.join(destDir, "cover.jpg")) && fs.existsSync(path.join(destDir, "01.jpg"))) {
  fs.copyFileSync(path.join(destDir, "01.jpg"), path.join(destDir, "cover.jpg"));
  if (fs.existsSync(path.join(destDir, "01-full.jpg"))) {
    fs.copyFileSync(path.join(destDir, "01-full.jpg"), path.join(destDir, "cover-full.jpg"));
  }
  conv(path.join(destDir, "cover.jpg"), path.join(destDir, "cover-thumb.jpg"), 480);
}

console.log(`window-views: ${i - 1} photos`);
