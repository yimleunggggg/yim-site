#!/usr/bin/env node
/** Convert WebFetch-style text blobs to markdown */
import fs from "fs";
import path from "path";

function convert(raw) {
  return raw
    .replace(/user \d+user \d+/gi, "")
    .replace(/Wolfbox/gi, "某消费电子品牌")
    .replace(/wolfbox/gi, "某品牌")
    .replace(/品牌-AI作业收集/g, "学员作业 FAQ")
    .replace(/【Shadowsocks】[^\n]*/g, "")
    .replace(/【sms- activate】[^\n]*/g, "")
    .replace(/【Pockyt】[^\n]*/g, "")
    .replace(/Type '\/' for commands\n/g, "")
    .replace(/Share\n/g, "")
    .replace(/Modified [^\n]+\n/g, "")
    .replace(/^# 🤡/gm, "# ")
    .replace(/\u200b/g, "")
    .split("\n")
    .map((line) => {
      const t = line.trim();
      if (!t || t === "•" || t === "◦") return "";
      if (t === "•") return "";
      if (/^\d+\.$/.test(t)) return "";
      if (/^\d+\.\s*$/.test(t)) return "";
      // lone bullet marker lines - merge with next handled by filter
      if (t.startsWith("•")) return "- " + t.slice(1).trim();
      if (t.startsWith("◦")) return "  - " + t.slice(1).trim();
      if (/^\d+\.\s+/.test(t) && t.length < 120 && !t.endsWith("。"))
        return `### ${t.replace(/^\d+\.\s*/, "")}`;
      return line;
    })
    .filter((l, i, arr) => {
      if (l === "" && arr[i + 1] === "") return false;
      return true;
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

const dir = path.join(process.cwd(), "content/_raw");
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".md") || f === "README.md") continue;
  const p = path.join(dir, f);
  const raw = fs.readFileSync(p, "utf8");
  if (raw.length < 100) continue;
  fs.writeFileSync(p, convert(raw), "utf8");
  console.log("converted", f, fs.statSync(p).size);
}
