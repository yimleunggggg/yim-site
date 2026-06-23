#!/usr/bin/env node
/** 为 public/media/frames/<slug>/NN.jpg 生成 NN-thumb.jpg（720px，列表/瀑布流用） */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = path.join(process.cwd(), "public/media/frames");
const THUMB_W = 720;

function conv(src, dest) {
  execSync(`sips -Z ${THUMB_W} -s format jpeg "${src}" --out "${dest}"`, {
    stdio: "pipe",
  });
}

let total = 0;
for (const slug of fs.readdirSync(ROOT)) {
  const dir = path.join(ROOT, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const name of fs.readdirSync(dir)) {
    if (!/^\d+\.jpg$/.test(name)) continue;
    const src = path.join(dir, name);
    const dest = path.join(dir, name.replace(".jpg", "-thumb.jpg"));
    conv(src, dest);
    total++;
  }
}
console.log(`frame thumbs: ${total} files @ ${THUMB_W}px`);
