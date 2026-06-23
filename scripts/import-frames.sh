#!/bin/bash
# 把「摄影及旅行」「首页走马灯」素材规范化到 public 下：
# - 统一转 jpeg、限制最大边 2000px（控体积）
# - HEIC 自动转码
# - 每个主题：cover.jpg + 01.jpg 02.jpg ...（按文件名排序）
set -e

ROOT="/Users/yimleung/Projects/yim-site"
SRC="$ROOT/摄影及旅行"
DEST="$ROOT/public/media/frames"
MARQ_SRC="$ROOT/首页走马灯"
MARQ_DEST="$ROOT/public/marquee"

conv() { sips -s format jpeg -Z 2000 "$1" --out "$2" >/dev/null 2>&1; }
conv_display() { sips -s format jpeg -Z 1200 "$1" --out "$2" >/dev/null 2>&1; }
conv_thumb() { sips -s format jpeg -Z 480 "$1" --out "$2" >/dev/null 2>&1; }
conv_marquee() { sips -s format jpeg -Z 720 "$1" --out "$2" >/dev/null 2>&1; }

is_img() {
  case "$1" in
    *.jpg|*.JPG|*.jpeg|*.JPEG|*.png|*.PNG|*.heic|*.HEIC|*.HEIF|*.heif|*.webp|*.WEBP) return 0;;
    *) return 1;;
  esac
}

process_theme() {
  local base="$1" slug="$2" cover="$3"
  local sd="$SRC/$base" dd="$DEST/$slug"
  rm -rf "$dd"; mkdir -p "$dd"
  if [ -n "$cover" ] && [ -f "$sd/$cover" ]; then
    conv "$sd/$cover" "$dd/cover-full.jpg"
    conv_display "$sd/$cover" "$dd/cover.jpg"
  fi
  local i=1
  for f in "$sd"/*; do
    [ -f "$f" ] || continue
    local b; b=$(basename "$f")
    case "$b" in 封面.*) continue;; esac
    is_img "$b" || continue
    full="$dd/$(printf '%02d' "$i")-full.jpg"
    out="$dd/$(printf '%02d' "$i").jpg"
    conv "$f" "$full"
    conv_display "$f" "$out"
    i=$((i+1))
  done
  if [ ! -f "$dd/cover.jpg" ] && [ -f "$dd/01.jpg" ]; then
    cp "$dd/01.jpg" "$dd/cover.jpg"
    [ -f "$dd/01-full.jpg" ] && cp "$dd/01-full.jpg" "$dd/cover-full.jpg"
  fi
  if [ -f "$dd/cover.jpg" ]; then
    conv_thumb "$dd/cover.jpg" "$dd/cover-thumb.jpg"
  fi
  echo "frame  $slug : $((i-1)) photos"
}

mkdir -p "$DEST"
for sd in "$SRC"/*/; do
  base=$(basename "$sd")
  case "$base" in
    "仙本那 海上巴瑶")            process_theme "$base" semporna-bajau     "封面.jpg";;
    "其他的车窗")                 echo "skip   $base (merged → window-views)";;
    "川西 road trip - 人")        process_theme "$base" sichuan-people     "封面.jpg";;
    "川西 road trip - 车窗视角")  echo "skip   $base (merged → window-views)";;
    "川西road trip-风景")         process_theme "$base" sichuan-landscape  "封面.jpg";;
    日常记录*)                    process_theme "$base" daily              "";;
    "永远喜欢日落（日常更新）")    node "$ROOT/scripts/import-sunset-theme.mjs" "$SRC/$base" "$DEST/sunsets";;
    "潮州")                       process_theme "$base" chaozhou           "封面.heic";;
    "韩国 江陵")                   process_theme "$base" gangneung          "封面.jpg";;
    "斯里兰卡")                   process_theme "$base" sri-lanka           "";;
    *) echo "skip   $base";;
  esac
done

node "$ROOT/scripts/import-window-views.mjs" "$SRC" "$DEST"
rm -rf "$DEST/sichuan-windows" "$DEST/other-windows"

rm -rf "$MARQ_DEST"; mkdir -p "$MARQ_DEST"
i=1
for f in "$MARQ_SRC"/*; do
  [ -f "$f" ] || continue
  b=$(basename "$f")
  is_img "$b" || continue
  conv_marquee "$f" "$MARQ_DEST/$(printf '%02d' "$i").jpg"
  i=$((i+1))
done
echo "marquee: $((i-1)) photos"
node "$ROOT/scripts/generate-frame-thumbs.mjs"
