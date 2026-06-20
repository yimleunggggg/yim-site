#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const required = [
  "public/marquee/01.jpg",
  "public/media/frames/semporna-bajau/cover.jpg",
  "public/life/moments/japan-camp/01.jpg",
];

const missing = required.filter((p) => !fs.existsSync(path.join(root, p)));
if (missing.length) {
  console.error("\n❌ 缺少静态图片：");
  missing.forEach((p) => console.error("  -", p));
  process.exit(1);
}

try {
    const untracked = execSync(
    "git ls-files --others --exclude-standard public/marquee public/media public/life 2>/dev/null | wc -l",
    { encoding: "utf8" },
  ).trim();
  if (Number(untracked) > 0) {
    console.warn("\n⚠️  public/marquee、public/media、public/life 未提交 Git → GitHub 自动部署会缺图。");
    console.warn("   本机 CLI 部署：npm run deploy:prod");
    console.warn("   或：git add public/marquee public/media public/life && git commit && git push\n");
  }
} catch {
  /* not a git repo */
}

console.log("✓ 静态图片 OK");
