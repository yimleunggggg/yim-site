#!/usr/bin/env node
/**
 * 川西篇：飞书 6 张竖拼长图 → 拆单图 + 更新 flow / manifest
 * 用法：npm run rebuild:west-sichuan  （需 CDP :3456 + 飞书登录）
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import {
  fetchFeishuDoc,
  flowToParagraphs,
} from "./lib/feishu-import-core.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SLUG = "west-sichuan-2025";
const URL = "https://my.feishu.cn/wiki/OpJmwMUSXil9pSkBPXFcTeZrnJc";
const IMG_DIR = path.join(ROOT, "public/life/journal", SLUG);
const PUBLIC_BASE = `/life/journal/${SLUG}`;
const LIFE_BODIES = path.join(ROOT, "src/lib/demo/life-journal-bodies.json");
const LIFE_FLOW = path.join(ROOT, "src/lib/demo/life-journal-flow.json");
const LIFE_IMAGES = path.join(ROOT, "src/lib/demo/life-journal-images.json");

function readJson(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function orderedImageSrcs(blocks) {
  const seen = new Set();
  const out = [];
  for (const b of blocks) {
    const src = b.md?.match(/\[\[IMG:([^\]]+)\]\]/)?.[1];
    if (!src || seen.has(src)) continue;
    seen.add(src);
    out.push(src);
  }
  return out;
}

function splitRawCollages() {
  const py = spawnSync(
    "python3",
    ["-c", `
from pathlib import Path
from PIL import Image

root = Path(${JSON.stringify(IMG_DIR)})
raw = sorted(root.glob("raw-*.jpg"), key=lambda p: p.name)
if not raw:
    raise SystemExit("no raw-*.jpg")

def thirds(im):
    w, h = im.size
    step = h // 3
    return [im.crop((0, y0, w, y1)) for y0, y1 in [(0, step), (step, step * 2), (step * 2, h)] if y1 - y0 > 30]

out = []
idx = 1
for i, src in enumerate(raw, 1):
    im = Image.open(src)
    parts = [im] if i == 1 else thirds(im)
    for part in parts:
        dest = root / f"{idx:02d}.jpg"
        part.save(dest, "JPEG", quality=88, optimize=True)
        out.append(f"/life/journal/${SLUG}/" + dest.name)
        idx += 1

cover = root / "cover.jpg"
if (root / "01.jpg").exists():
    import shutil
    shutil.copy(root / "01.jpg", cover)
print("\\n".join(out))
`],
    { encoding: "utf8" },
  );
  if (py.status !== 0) {
    console.error(py.stderr || py.stdout);
    throw new Error("collage split failed");
  }
  return py.stdout.trim().split("\n").filter(Boolean);
}

function imagesToBlocks(paths) {
  const blocks = [];
  for (let i = 0; i < paths.length; i += 3) {
    const chunk = paths.slice(i, i + 3);
    if (chunk.length === 1) {
      blocks.push({ type: "figure", src: chunk[0], variant: "wide" });
    } else {
      blocks.push({ type: "masonry", sources: chunk });
    }
  }
  return blocks;
}

/** 保留旧 flow 正文，按章节插入拆好的图（飞书 TOC 抓取会丢段落） */
function mergeWestSichuanTextWithImages(oldFlow, allImages) {
  const sections = {
    intro: [allImages[0]],
    s62: allImages.slice(1, 4),
    s63: allImages.slice(4, 10),
    s65: allImages.slice(10, 16),
  };

  const out = [];
  let section = "intro";
  for (const block of oldFlow) {
    if (block.type !== "paragraph") continue;
    const t = block.text;
    if (t.startsWith("## 2025.6.2")) {
      if (section === "intro") out.push(...imagesToBlocks(sections.intro));
      section = "s62";
    } else if (t.startsWith("## 2025.6.3")) {
      out.push(...imagesToBlocks(sections.s62));
      section = "s63";
    } else if (t.startsWith("## 2025.6.5")) {
      out.push(...imagesToBlocks(sections.s63));
      section = "s65";
    }
    out.push(block);
  }
  out.push(...imagesToBlocks(sections.s65));
  return out;
}

async function main() {
  console.log(`→ rebuild ${SLUG}`);
  const data = await fetchFeishuDoc(URL, {
    useToc: true,
    onProgress: (m) => console.log(`  · ${m}`),
  });

  const { blocks, imgMap } = data;
  fs.rmSync(IMG_DIR, { recursive: true, force: true });
  fs.mkdirSync(IMG_DIR, { recursive: true });

  const imgSrcToFile = new Map();
  let rawIdx = 0;
  for (const src of orderedImageSrcs(blocks)) {
    rawIdx += 1;
    const file = `raw-${String(rawIdx).padStart(2, "0")}.jpg`;
    imgSrcToFile.set(src, file);
    const b64 = imgMap.get(src);
    if (b64) {
      fs.writeFileSync(path.join(IMG_DIR, file), Buffer.from(b64.split(",")[1], "base64"));
    } else {
      console.warn(`  ⚠ missing image ${src.slice(-40)}`);
    }
  }

  const allImages = splitRawCollages();
  for (const f of fs.readdirSync(IMG_DIR)) {
    if (f.startsWith("raw-")) fs.unlinkSync(path.join(IMG_DIR, f));
  }
  console.log(`  ✓ split → ${allImages.length} images`);

  const oldFlow = readJson(LIFE_FLOW, {})[SLUG];
  const flow = oldFlow?.length
    ? mergeWestSichuanTextWithImages(oldFlow, allImages)
    : [];
  const paragraphs = flowToParagraphs(flow);

  const bodies = readJson(LIFE_BODIES, {});
  bodies[SLUG] = paragraphs;
  writeJson(LIFE_BODIES, bodies);

  const flows = readJson(LIFE_FLOW, {});
  flows[SLUG] = flow;
  writeJson(LIFE_FLOW, flows);

  const images = readJson(LIFE_IMAGES, {});
  images[SLUG] = { cover: `${PUBLIC_BASE}/cover.jpg`, images: allImages };
  writeJson(LIFE_IMAGES, images);

  console.log(`  ✓ flow: ${paragraphs.length} paragraphs, ${allImages.length} images`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
