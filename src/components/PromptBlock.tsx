"use client";

import { useState, isValidElement } from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return "";
}

export function PromptBlock({ children, title }: Props) {
  const [copied, setCopied] = useState(false);
  const text = extractText(children);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // 非 HTTPS 或权限被拒时不抛错，避免 dev overlay 显示 [object Event]
    }
  }

  return (
    <div className="relative my-6 overflow-hidden rounded-sm bg-[#2a2826]">
      {title && (
        <div className="border-b border-[#3a3835] px-4 py-2 font-mono text-xs text-[#8a877f]">
          {title}
        </div>
      )}
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 font-mono text-xs text-[#a8a59f] hover:text-white"
      >
        {copied ? "已复制 ✓" : "复制"}
      </button>
      <pre className="overflow-x-auto p-4 pt-10 font-mono text-sm leading-relaxed text-[#e8e4dc] whitespace-pre-wrap">
        {text.trim()}
      </pre>
    </div>
  );
}
