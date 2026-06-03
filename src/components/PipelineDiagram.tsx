"use client";

import { useState } from "react";

const DEFAULT_STEPS = [
  { id: "script", label: "剧本/分镜", detail: "用 GPT/Gemini 写故事和分镜描述" },
  { id: "image", label: "静态图资产", detail: "Midjourney / Nano Banana 生成分镜静态图" },
  { id: "video", label: "动效生成", detail: "Runway / 可灵 / Luma 图生视频" },
  { id: "audio", label: "声音设计", detail: "Suno 音乐 + ElevenLabs 旁白" },
  { id: "edit", label: "后期合成", detail: "剪映剪辑、调色、字幕" },
];

type Props = {
  steps?: { id: string; label: string; detail: string }[];
};

export function PipelineDiagram({ steps = DEFAULT_STEPS }: Props) {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <div className="my-8 max-w-3xl">
      <div className="flex flex-wrap gap-2">
        {steps.map((step, i) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-sm border px-3 py-2 font-mono text-xs transition-all duration-300 ${
              i === active
                ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                : "border-[var(--color-border)] hover:border-[var(--color-forest)]"
            }`}
          >
            {String(i + 1).padStart(2, "0")} {step.label}
          </button>
        ))}
      </div>
      <div className="mt-4 min-h-[4rem] rounded-sm border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-opacity duration-300">
        <p className="font-serif text-lg font-semibold">{current.label}</p>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{current.detail}</p>
      </div>
    </div>
  );
}
