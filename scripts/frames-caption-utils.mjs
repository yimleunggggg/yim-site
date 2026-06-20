/** 从「摄影及旅行/永远喜欢日落」类文件名解析日期与地点 */
export function parsePhotoCaption(filename) {
  const base = filename.replace(/\.[^.]+$/i, "").trim();
  const m = base.match(/^(\d{4}\.\d{1,2}\.\d{1,2})\s*(.*)$/);
  if (!m) return { date: "", place: { zh: base, en: base } };
  let place = m[2].trim().replace(/\s*\d{1,3}$/, "").trim() || m[2].trim();
  return { date: m[1], place: { zh: place, en: place } };
}

export function captionSortKey(filename) {
  const { date } = parsePhotoCaption(filename);
  const parts = date.split(".").map((p) => parseInt(p, 10) || 0);
  if (parts.length < 3) return 0;
  const [y, mo, d] = parts;
  return y * 10000 + mo * 100 + d;
}

export function sortImageFiles(files) {
  return [...files].sort((a, b) => captionSortKey(a) - captionSortKey(b) || a.localeCompare(b, "zh"));
}
