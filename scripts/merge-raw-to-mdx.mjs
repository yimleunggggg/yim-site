#!/usr/bin/env node
/**
 * Merge content/_raw/*.md into content/ai-playbook/*.mdx (preserve frontmatter).
 * Converts plain text lines to markdown heuristically.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT = process.cwd();
const RAW = path.join(ROOT, "content/_raw");
const MDX = path.join(ROOT, "content/ai-playbook");

function textToMarkdown(text) {
  const lines = text.split("\n");
  const out = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      out.push("");
      continue;
    }
    // Numbered sections like "1.常用工具"
    if (/^\d+\./.test(t) && t.length < 80) {
      out.push(`\n## ${t}\n`);
      continue;
    }
    if (/^\d+\.\d+/.test(t) && t.length < 100) {
      out.push(`\n### ${t}\n`);
      continue;
    }
    // Bullet-like
    if (t.startsWith("•") || t.startsWith("◦")) {
      out.push("- " + t.replace(/^[•◦]\s*/, ""));
      continue;
    }
    if (t.startsWith("- ")) {
      out.push(t);
      continue;
    }
    // Short title lines (subsections from feishu TOC style)
    if (
      t.length < 60 &&
      !t.endsWith("。") &&
      !t.endsWith("！") &&
      !t.endsWith("?") &&
      !t.endsWith("？") &&
      /^[\u4e00-\u9fa5A-Za-z0-9：:（）()·\-\s🎉🐶💡👉📝🎨🌍🥖]+$/.test(t) &&
      !t.includes("http")
    ) {
      const prev = out[out.length - 1];
      if (prev && prev.startsWith("##")) {
        out.push(`\n### ${t}\n`);
        continue;
      }
      if (!prev || prev.startsWith("#") || prev === "") {
        out.push(`\n### ${t}\n`);
        continue;
      }
    }
    out.push(t);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function boostPrompts(md) {
  // Wrap obvious prompt lines in PromptBlock
  return md.replace(
    /^(角色 \(Role\).+|景别 \+.+|Text ".+" only.+|Subject fixed.+|Static subject,.+)$/gm,
    (m) => `<PromptBlock>\n${m}\n</PromptBlock>`
  );
}

const files = fs.readdirSync(RAW).filter((f) => f.endsWith(".md") && f !== "README.md");

for (const file of files) {
  const id = file.replace(/\.md$/, "");
  const mdxPath = path.join(MDX, `${id}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    console.warn("skip", id);
    continue;
  }
  const raw = fs.readFileSync(path.join(RAW, file), "utf8");
  if (raw.length < 500) {
    console.warn("raw too short", id, raw.length);
    continue;
  }
  const existing = fs.readFileSync(mdxPath, "utf8");
  const { data } = matter(existing);
  const body = boostPrompts(textToMarkdown(raw));
  const minutes = Math.max(20, Math.ceil(body.length / 1200));
  data.readingMinutes = minutes;
  const front = matter.stringify("\n" + body + "\n", data);
  fs.writeFileSync(mdxPath, front, "utf8");
  console.log(`merged ${id}: ${body.length} chars, ~${minutes} min`);
}
