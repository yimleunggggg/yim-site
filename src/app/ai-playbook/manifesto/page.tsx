import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components";
import { PullQuote } from "@/components/PullQuote";

const principles = [
  {
    n: "01",
    title: "任务导向，不是工具导向",
    body: "先问「我要去哪」，再选登山鞋还是拖鞋。确定任务与输出形式后再选工具。",
  },
  {
    n: "02",
    title: "AI 是接龙，不是大脑",
    body: "LLM 在做下一个词预测。Prompt 越具体，越能锁定概率、减少幻觉。",
  },
  {
    n: "03",
    title: "专精 + 通用，组合协作",
    body: "GPT 整合逻辑，Midjourney 出图，Perplexity 搜索 — 各取所长。",
  },
  {
    n: "04",
    title: "多模态分步做",
    body: "静 → 动 → 音。不要一个 Prompt 要求 AI 完成整张海报或整条片子。",
  },
  {
    n: "05",
    title: "工具会过时，逻辑不过时",
    body: "记录「截至何时、为何选它」。选型框架比工具名单更长寿。",
  },
];

export const metadata = {
  title: "AI 方法论 Manifesto · AI Playbook",
  description: "30 秒了解任务导向选工具、Prompt 与多模态工作流的核心原则。",
  openGraph: {
    title: "AI 方法论 Manifesto",
    description: "把 AI 当员工用之前，先像领导一样把任务定清楚。",
  },
};

export default function ManifestoPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16">
        <p className="font-mono-index text-[var(--color-forest)]">
          MANIFESTO · 2025
        </p>

        <PullQuote>
          把 AI 当员工用之前，先像领导一样，把任务定清楚。
        </PullQuote>

        <p className="mt-8 font-mono text-sm text-[var(--color-ink-muted)]">
          任务 → 工具匹配 → 精准提问 → 组合协作 → 产出
        </p>

        <ol className="mt-16 space-y-12">
          {principles.map((p) => (
            <li key={p.n}>
              <span className="font-mono text-sm text-[var(--color-forest)]">
                {p.n}
              </span>
              <h2 className="mt-1 font-serif text-2xl font-semibold">
                {p.title}
              </h2>
              <p className="mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                {p.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-border)] pt-10 sm:flex-row">
          <Link
            href="/ai-playbook"
            className="text-[var(--color-forest)] underline underline-offset-4"
          >
            深入阅读完整讲义 →
          </Link>
          <Link
            href="/ai-playbook/facilitator"
            className="text-[var(--color-forest)] underline underline-offset-4"
          >
            了解课程设计 →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
