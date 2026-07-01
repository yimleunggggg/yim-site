#!/usr/bin/env python3
"""拆分日记里的竖拼长图 → 多张单图，并更新 manifest / flow。"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

from PIL import Image
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
JOURNAL = ROOT / "public/life/journal"
MANIFEST = ROOT / "src/lib/demo/life-journal-images.json"
FLOW = ROOT / "src/lib/demo/life-journal-flow.json"


def gap_segments(im: Image.Image, min_gap: int = 3, threshold: int = 235) -> list[tuple[int, int]]:
    arr = np.asarray(im.convert("RGB"))
    h = arr.shape[0]
    row_mean = arr.reshape(h, -1, 3).mean(axis=1).mean(axis=1)
    row_std = arr.reshape(h, -1, 3).std(axis=1).mean(axis=1)
    gaps: list[tuple[int, int]] = []
    in_gap = False
    start = 0
    for y in range(h):
        is_gap = row_mean[y] > threshold and row_std[y] < 20
        if is_gap and not in_gap:
            start = y
            in_gap = True
        elif not is_gap and in_gap:
            if y - start >= min_gap:
                gaps.append((start, y))
            in_gap = False
    cuts = [0] + [g[1] for g in gaps] + [h]
    return [(cuts[i], cuts[i + 1]) for i in range(len(cuts) - 1) if cuts[i + 1] - cuts[i] > 40]


def equal_thirds(h: int) -> list[tuple[int, int]]:
    step = h // 3
    return [(0, step), (step, step * 2), (step * 2, h)]


def strip_squares(w: int, h: int) -> list[tuple[int, int]]:
    return [(i * w, min((i + 1) * w, h)) for i in range(h // w)]


def split_file(src: Path, mode: str) -> list[Image.Image]:
    im = Image.open(src)
    w, h = im.size
    if mode == "thirds":
        boxes = equal_thirds(h)
    elif mode == "gaps":
        boxes = gap_segments(im)
        if len(boxes) <= 1:
            return [im]
    elif mode == "strip":
        boxes = strip_squares(w, h)
    else:
        return [im]
    return [im.crop((0, y0, w, y1)) for y0, y1 in boxes if y1 - y0 > 30]


def rebuild_slug(slug: str, plan: dict[str, str]) -> list[str]:
    """plan: filename -> split mode (thirds|gaps|strip|keep)"""
    src_dir = JOURNAL / slug
    tmp = JOURNAL / f"{slug}.__split"
    if tmp.exists():
        shutil.rmtree(tmp)
    tmp.mkdir(parents=True)

    ordered: list[str] = []
    idx = 1
    for name in sorted(src_dir.glob("*.jpg"), key=lambda p: p.name):
        if name.name == "cover.jpg":
            continue
        mode = plan.get(name.name, "keep")
        parts = split_file(name, mode)
        for part in parts:
            out = tmp / f"{idx:02d}.jpg"
            part.save(out, "JPEG", quality=88, optimize=True)
            ordered.append(f"/life/journal/{slug}/{out.name}")
            idx += 1

    shutil.rmtree(src_dir)
    tmp.rename(src_dir)

    cover_src = src_dir / "01.jpg"
    cover_dst = src_dir / "cover.jpg"
    if cover_src.exists():
        shutil.copy(cover_src, cover_dst)

    return ordered


def replace_masonry_with_figures(flow: list, slug: str, images: list[str]) -> list:
    """masonry 块按顺序替换为单张 figure。"""
    img_iter = iter(images)
    out = []
    for block in flow:
        if block.get("type") == "masonry":
            for _ in block.get("sources", []):
                try:
                    src = next(img_iter)
                    out.append({"type": "figure", "src": src, "variant": "wide"})
                except StopIteration:
                    pass
        elif block.get("type") == "figure":
            try:
                src = next(img_iter)
                out.append({**block, "src": src})
            except StopIteration:
                out.append(block)
        else:
            out.append(block)
    return out


def main():
  # west-sichuan: 02-05 各拆 3 张
    ws_images = rebuild_slug(
        "west-sichuan-2025",
        {"01.jpg": "keep", "02.jpg": "thirds", "03.jpg": "thirds", "04.jpg": "thirds", "05.jpg": "thirds", "06.jpg": "thirds"},
    )
    print(f"west-sichuan-2025: {len(ws_images)} images")

    kg_images = rebuild_slug(
        "keep-growing",
        {
            "01.jpg": "keep",
            "02.jpg": "gaps",
            "03.jpg": "strip",
            "04.jpg": "strip",
            "05.jpg": "strip",
            "06.jpg": "strip",
            "07.jpg": "strip",
            "08.jpg": "keep",
        },
    )
    print(f"keep-growing: {len(kg_images)} images")

    # aboro: 删 03（outopia 跑步图）
    aboro_dir = JOURNAL / "aboro-boxing"
    if (aboro_dir / "03.jpg").exists():
        (aboro_dir / "03.jpg").unlink()
        files = sorted([f for f in aboro_dir.glob("*.jpg") if f.name != "cover.jpg"], key=lambda p: p.name)
        tmp = aboro_dir / ".__renum"
        tmp.mkdir(exist_ok=True)
        for i, f in enumerate(files, 1):
            shutil.move(str(f), str(tmp / f"{i:02d}.jpg"))
        for f in aboro_dir.glob("*.jpg"):
            if f.name != "cover.jpg":
                f.unlink()
        for f in sorted(tmp.glob("*.jpg")):
            shutil.move(str(f), str(aboro_dir / f.name))
        tmp.rmdir()
        shutil.copy(aboro_dir / "01.jpg", aboro_dir / "cover.jpg")
        aboro_images = [f"/life/journal/aboro-boxing/{f.name}" for f in sorted(aboro_dir.glob("*.jpg")) if f.name != "cover.jpg"]
        print(f"aboro-boxing: removed 03, now {len(aboro_images)} images")
    else:
        aboro_images = None

    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    manifest["west-sichuan-2025"] = {
        "cover": "/life/journal/west-sichuan-2025/cover.jpg",
        "images": ws_images,
    }
    manifest["keep-growing"] = {
        "cover": "/life/journal/keep-growing/cover.jpg",
        "images": kg_images,
    }
    if aboro_images:
        manifest["aboro-boxing"] = {
            "cover": "/life/journal/aboro-boxing/cover.jpg",
            "images": aboro_images,
        }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")

    flow = json.loads(FLOW.read_text()) if FLOW.exists() else {}
    if "west-sichuan-2025" in flow:
        # 重映射：01 保持，02-05 masonry 各 2 源 → 各 6 张 thirds
        fig_idx = 0
        new_flow = []
        for block in flow["west-sichuan-2025"]:
            if block.get("type") == "masonry":
                for _ in block["sources"]:
                    for _ in range(3):
                        if fig_idx < len(ws_images):
                            new_flow.append(
                                {"type": "figure", "src": ws_images[fig_idx], "variant": "wide"}
                            )
                            fig_idx += 1
            elif block.get("type") == "figure":
                new_flow.append({**block, "src": ws_images[fig_idx]})
                fig_idx += 1
            else:
                new_flow.append(block)
        flow["west-sichuan-2025"] = new_flow

    FLOW.write_text(json.dumps(flow, indent=2) + "\n")
    print("Updated manifest and west-sichuan flow")


if __name__ == "__main__":
    main()
