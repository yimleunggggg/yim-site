#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();

/** 从 demo 数据里扫出所有 /life /marquee /media /work /writing 静态路径 */
function collectAssetPaths() {
  const dirs = ["src/lib/demo"];
  const re = /["'](\/(?:life|marquee|media|work|writing)[^"']+\.(?:jpg|jpeg|png|webp))["']/gi;
  const found = new Set();
  for (const dir of dirs) {
    const abs = path.join(root, dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of fs.readdirSync(abs)) {
      if (!/\.(ts|tsx)$/.test(file)) continue;
      const text = fs.readFileSync(path.join(abs, file), "utf8");
      let m;
      while ((m = re.exec(text)) !== null) found.add(m[1]);
    }
  }
  return [...found];
}

const required = [
  "/marquee/01.jpg",
  "/media/frames/semporna-bajau/cover.jpg",
  "/life/moments/japan-camp/01.jpg",
  "/writing/turning-31/01.png",
];

const referenced = collectAssetPaths();
const all = [...new Set([...required, ...referenced])];

const missing = all.filter((p) => !fs.existsSync(path.join(root, "public", p.replace(/^\//, ""))));
if (missing.length) {
  console.error("\n❌ 缺少静态图片（代码引用但 public 无文件）：");
  missing.forEach((p) => console.error("  -", p));
  process.exit(1);
}

try {
  const untracked = execSync(
    "git ls-files --others --exclude-standard public/marquee public/media public/life public/writing 2>/dev/null | wc -l",
    { encoding: "utf8" },
  ).trim();
  if (Number(untracked) > 0) {
    console.warn("\n⚠️  public 静态图未提交 Git → 线上会裂图。");
    console.warn("   git add public/… && git commit && git push\n");
  }
} catch {
  /* not a git repo */
}

console.log(`✓ 静态图片 OK（${all.length} 条路径）`);
