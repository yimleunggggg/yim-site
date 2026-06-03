import Link from "next/link";
import { SiteHeader, SiteFooter, GitHubSourceLink } from "@/components";
import { TimeBadge } from "@/components/TimeBadge";

const modules = [
  {
    week: "预备",
    title: "方法论 · 任务导向选工具",
    why: "先建立选型框架，避免四周都在「哪个工具更强」里打转",
    link: "/ai-playbook/00-methodology",
  },
  {
    week: "W1",
    title: "语言与图像",
    why: "非技术同事需要先理解 AI「接龙」本质，再进入生图 — 降低神秘感和恐惧",
    link: "/ai-playbook/01-w1-language-image",
  },
  {
    week: "W2",
    title: "提示词与视频",
    why: "从静到动的第一次跃迁；视频 Prompt 比生图多时间维度",
    link: "/ai-playbook/02-prompt-and-video",
  },
  {
    week: "W3",
    title: "音乐、语音与实战 FAQ",
    why: "多模态补全 + 用真实作业踩坑做答疑，巩固 W1–W2",
    link: "/ai-playbook/03-music-voice-practice",
  },
  {
    week: "W4",
    title: "工作流进阶",
    why: "整合图/视/音 pipeline；引入新模型与工作流产品",
    link: "/ai-playbook/04-workflow-advanced",
  },
  {
    week: "延伸",
    title: "非专业视角 · 个人实践",
    why: "补充探索笔记与用户信任话题，展示持续实验而非一次培训",
    link: "/ai-playbook/05-non-expert-aigc",
  },
];

export const metadata = {
  title: "课程设计 · AI Playbook",
  description: "4 周 AIGC 内部培训的课程架构、带练设计与方法论。",
};

export default function FacilitatorPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
          <div>
            <p className="font-mono-index text-[var(--color-forest)]">
              FACILITATOR · CASE STUDY
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold">
              这套 AI 培训是怎么设计的
            </h1>
            <TimeBadge variant="supplement" date="2025-05" />

            <section className="mt-10 space-y-6 text-lg leading-relaxed">
              <div>
                <h2 className="font-serif text-2xl font-semibold">背景与目标</h2>
                <p className="mt-3 text-[var(--color-ink-muted)]">
                  学员是非技术背景的同事，需要在日常工作中使用 AIGC（海报、短视频、文案、信息整合）。
                  成功标准不是「成为 Prompt 工程师」，而是：遇到任务知道选什么工具、怎么问、怎么组合，并避开常见踩坑。
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-semibold">方法论先行</h2>
                <p className="mt-3 text-[var(--color-ink-muted)]">
                  「任务导向 → 工具匹配 → 精准提问 → 组合协作 → 产出」贯穿四周。
                  每周作业都先写「我要完成什么、输出形式是什么」，再选工具 — 而不是反过来。
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-semibold">带练设计</h2>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-[var(--color-ink-muted)]">
                  <li>海报类：品牌 Campaign 练习（公开版已脱敏为 generic 案例）</li>
                  <li>视频类：15s+ 短视频，要求旁白/音乐/音效</li>
                  <li>FAQ 从真实作业提炼：清晰度越改越糊、多余文案、产品被重绘、主体乱飞</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-semibold">时间语境</h2>
                <p className="mt-3 text-[var(--color-ink-muted)]">
                  AI 工具迭代极快。讲义保留 2025-01 至 2025-03 课堂原文，并用 TimeBadge 标注 —
                  展示的是「在特定时间点如何评估工具」，而非过时的工具排行榜。
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl font-semibold">成果物</h2>
                <ul className="mt-3 space-y-2 text-[var(--color-ink-muted)]">
                  <li>
                    <Link href="/ai-playbook" className="text-[var(--color-forest)] underline">
                      公开讲义网站
                    </Link>
                  </li>
                  <li>
                    <GitHubSourceLink label="GitHub 完整版（源码与素材）" />
                  </li>
                  <li>
                    <Link href="/ai-playbook/manifesto" className="text-[var(--color-forest)] underline">
                      方法论 Manifesto
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/ai-playbook"
                className="rounded-sm border border-[var(--color-forest)] bg-[var(--color-forest)] px-5 py-2.5 font-mono text-sm text-white"
              >
                阅读讲义 →
              </Link>
              <GitHubSourceLink />
            </div>
          </div>

          <aside className="mt-12 lg:mt-0">
            <p className="font-mono-index text-[var(--color-forest)]">课程架构</p>
            <ol className="mt-4 space-y-4 border-l border-[var(--color-border)] pl-4">
              {modules.map((m) => (
                <li key={m.week}>
                  <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                    {m.week}
                  </span>
                  <Link
                    href={m.link}
                    className="mt-0.5 block font-serif font-semibold hover:text-[var(--color-forest)]"
                  >
                    {m.title}
                  </Link>
                  <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{m.why}</p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
