#!/usr/bin/env node
const DOCS = [
  { id: "00-methodology", url: "https://my.feishu.cn/wiki/MZ1mwAuMTiRMEPkpj5KcgUrDnWb" },
  { id: "01-w1-language-image", url: "https://my.feishu.cn/wiki/V7Pnw6tmwiwO8pkzpk5c3J5Hnye" },
  { id: "02-prompt-and-video", url: "https://my.feishu.cn/wiki/BK92wmLtaiOSa1kpnIPcsKPqnte" },
  { id: "03-music-voice-practice", url: "https://my.feishu.cn/wiki/ZVFVwelmPiFXmMkKSTpcwP1NnSd" },
  { id: "04-workflow-advanced", url: "https://my.feishu.cn/wiki/H4XFwAaEJimweJkJLrQcwcGangm" },
  { id: "05-non-expert-aigc", url: "https://my.feishu.cn/wiki/H0QDwYBBni0B9DkUtC5cFvf5nlh" },
];

const PROXY = "http://localhost:3456";

function sanitize(text) {
  return text
    .replace(/Wolfbox/gi, "某消费电子品牌")
    .replace(/wolfbox/gi, "某品牌")
    .replace(/user \d+user \d+/gi, "")
    .replace(/品牌-AI作业收集/g, "学员作业 FAQ")
    .replace(/【Shadowsocks】[^\n]*/g, "")
    .replace(/【sms- activate】[^\n]*/g, "")
    .replace(/【Pockyt】[^\n]*/g, "")
    .replace(/\n{4,}/g, "\n\n\n");
}

async function extractFull(targetId) {
  const js = `(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    for (let i = 0; i < 40; i++) {
      window.scrollTo(0, document.body.scrollHeight);
      await sleep(250);
    }
    window.scrollTo(0, 0);
    await sleep(400);
    return document.body.innerText;
  })()`;
  const res = await fetch(`${PROXY}/eval?target=${targetId}`, {
    method: "POST",
    body: js,
  });
  const data = await res.json();
  return data.value ?? data.result ?? "";
}

function cleanFeishuNoise(text) {
  const lines = text.split("\n");
  const skip = new Set([
    "飞书云文档",
    "分享",
    "编辑",
    "登录/注册",
    "目录",
    "与我分享",
    "帮助中心",
    "效率指南",
    "搜索",
    "添加封面",
    "添加图标",
    "展示文档信息",
    "A",
  ]);
  const out = [];
  let skipNav = true;
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      if (out.length && out[out.length - 1] !== "") out.push("");
      continue;
    }
    if (skip.has(t)) continue;
    if (/^最近修改:/.test(t)) continue;
    if (/^绊绊绊/.test(t)) continue;
    if (t === "AI Learning" && skipNav) continue;
    if (t === "企业公开" && skipNav) continue;
    if (t === "培训" && skipNav) continue;
    // Start content after main title duplicate
    if (t.includes("常用工具") || t.includes("工具使用") || t.includes("上次内容")) skipNav = false;
    if (skipNav && (t.startsWith("🤡") || t.startsWith("🌍") || t === "音乐" || t === "视频")) continue;
    out.push(t);
  }
  return out.join("\n").trim();
}

async function main() {
  const fs = await import("fs/promises");
  const path = await import("path");
  const outDir = path.join(process.cwd(), "content/_raw");

  for (const doc of DOCS) {
    let body = "";
    try {
      const newRes = await fetch(`${PROXY}/new`, {
        method: "POST",
        body: doc.url,
      });
      const { targetId } = await newRes.json();
      if (!targetId) throw new Error("no targetId");
      await new Promise((r) => setTimeout(r, 5000));
      const raw = await extractFull(targetId);
      body = sanitize(cleanFeishuNoise(raw));
      await fetch(`${PROXY}/close?target=${targetId}`);
    } catch (e) {
      console.warn(doc.id, e.message);
    }
    await fs.writeFile(path.join(outDir, `${doc.id}.md`), body, "utf8");
    console.log(`${doc.id}: ${body.length} chars`);
  }
}

main();
