"use client";

import { useState } from "react";
import Link from "next/link";
import type { Chapter } from "@/lib/content";
import { TimeBadge } from "./TimeBadge";

type Node = {
  id: string;
  label: string;
  date: string;
  chapters: Chapter[];
};

type Props = {
  nodes: Node[];
};

export function ExplorationTimeline({ nodes }: Props) {
  const [openId, setOpenId] = useState<string | null>(nodes[0]?.id ?? null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <div className="relative ml-4 border-l border-[var(--color-border)] pl-8">
      {nodes.map((node) => {
        const isOpen = openId === node.id;
        const isHover = hoverId === node.id;
        const preview = node.chapters[0];

        return (
          <div key={node.id} className="relative mb-8">
            <span
              className={`absolute -left-[2.125rem] top-1 h-3 w-3 rounded-full border-2 border-[var(--color-paper)] transition-colors ${
                isOpen || isHover
                  ? "bg-[var(--color-forest)]"
                  : "bg-[var(--color-border)]"
              }`}
            />
            <button
              type="button"
              className="w-full text-left"
              onClick={() => setOpenId(isOpen ? null : node.id)}
              onMouseEnter={() => setHoverId(node.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              <span className="font-mono-index text-[var(--color-forest)]">
                {node.date}
              </span>
              <h3 className="font-serif text-xl font-semibold">{node.label}</h3>
              {isHover && preview && !isOpen && (
                <div className="mt-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-sm shadow-sm transition-all duration-200">
                  <p className="text-[var(--color-ink-muted)]">{preview.summary}</p>
                  <div className="mt-2 flex gap-2">
                    <TimeBadge variant="original" date={preview.originalDate} mini />
                    <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                      ~{preview.readingMinutes} 分钟
                    </span>
                  </div>
                </div>
              )}
            </button>
            {isOpen && (
              <ul className="mt-3 space-y-2 border-l border-[var(--color-border)] pl-4 transition-all duration-300">
                {node.chapters.map((ch) => (
                  <li key={ch.slug}>
                    <Link
                      href={`/ai-playbook/${ch.slug}`}
                      className="text-[var(--color-forest)] hover:underline"
                    >
                      {ch.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
