#!/usr/bin/env node
/** 日落合辑：按文件名日期排序 → 01.jpg + captions.json */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { parsePhotoCaption, sortImageFiles } from "./frames-caption-utils.mjs";

const IMG = /\.(jpe?g|png|heic|heif)$/i;

function conv(src, dest, max) {
  execSync(`sips -s format jpeg -Z ${max} "${src}" --out "${dest}"`, { stdio: "ignore" });
}

const srcDir = process.argv[2];
const destDir = process.argv[3];
if (!srcDir || !destDir) {
  console.error("usage: import-sunset-theme.mjs <src> <dest>");
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
const files = sortImageFiles(
  fs.readdirSync(srcDir).filter((f) => IMG.test(f) && !/^封面\./i.test(f)),
);

const captions = [];
files.forEach((name, i) => {
  const n = i + 1;
  const stem = String(n).padStart(2, "0");
  const src = path.join(srcDir, name);
  conv(src, path.join(destDir, `${stem}-full.jpg`), 2000);
  conv(src, path.join(destDir, `${stem}.jpg`), 1200);
  captions.push(parsePhotoCaption(name));
});

if (files.length > 0) {
  fs.copyFileSync(path.join(destDir, "01.jpg"), path.join(destDir, "cover.jpg"));
  if (fs.existsSync(path.join(destDir, "01-full.jpg"))) {
    fs.copyFileSync(path.join(destDir, "01-full.jpg"), path.join(destDir, "cover-full.jpg"));
  }
  conv(path.join(destDir, "cover.jpg"), path.join(destDir, "cover-thumb.jpg"), 480);
}

fs.writeFileSync(path.join(destDir, "captions.json"), JSON.stringify(captions, null, 2));
console.log(`sunsets: ${files.length} photos + captions.json`);
