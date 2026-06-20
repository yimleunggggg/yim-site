#!/bin/bash
# 就地优化 public/demo 已有图片 → 三档体积（无需源文件夹）
# thumb 480px · display 1200px · full 2000px（仅详情灯箱用 -full）
set -e
ROOT="/Users/yimleung/Projects/yim-site"
FR="$ROOT/public/demo/frames"
MQ="$ROOT/public/demo/marquee"

opt() { sips -s format jpeg -Z "$2" "$1" --out "$3" >/dev/null 2>&1; }

echo "=== FRAMES gallery → display 1200px + full 2000px ==="
for d in "$FR"/*/; do
  [ -d "$d" ] || continue
  for f in "$d"/[0-9][0-9].jpg; do
    [ -f "$f" ] || continue
    base=$(basename "$f" .jpg)
    opt "$f" 2000 "$d/${base}-full.jpg"
    opt "$f" 1200 "$f"
  done
  if [ -f "$d/cover.jpg" ]; then
    opt "$d/cover.jpg" 2000 "$d/cover-full.jpg"
    opt "$d/cover.jpg" 1600 "$d/cover.jpg"
    opt "$d/cover.jpg" 480 "$d/cover-thumb.jpg"
  fi
done

echo "=== MARQUEE → 720px ==="
for f in "$MQ"/*.jpg; do
  [ -f "$f" ] || continue
  opt "$f" 720 "$f"
done

echo "=== 体积 ==="
du -sh "$FR" "$MQ"
find "$FR" "$MQ" -name "*.jpg" | xargs stat -f%z 2>/dev/null | awk '{s+=$1;n++} END {printf "%d files, %.1f MB\n", n, s/1024/1024}'
