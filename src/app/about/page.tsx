"use client";

import { SiteHeader, SiteFooter, useLocale } from "@/components";
import { profileConfig } from "@/lib/profile-config";

const workHistory = [
  {
    period: "2023.09 – 至今",
    role: { zh: "合伙人", en: "Co-founder" },
    org: { zh: "精酿啤酒自媒体（远程）", en: "Craft Beer Media (Remote)" },
    highlights: {
      zh: [
        "策划精酿主题线下活动 10–20 人，地点覆盖安徽碧山村、芜湖音乐节、香港酒厂+离岛徒步、嘉兴酒厂",
        "电商运营，与全国 50+ 酒厂合作，管理有赞、淘宝、小红书等平台",
        "播客录制、视频拍摄、小红书内容，形成「内容—社群—电商」闭环",
      ],
      en: [
        "Organized 10–20 person craft beer events across multiple cities",
        "E-commerce ops with 50+ breweries on Youzan, Taobao, Xiaohongshu",
        "Podcast, video, content → community → commerce loop",
      ],
    },
  },
  {
    period: "2021.08 – 2023.07",
    role: { zh: "全域会员运营负责人", en: "Omni-channel Membership Lead" },
    org: { zh: "卡士乳业（深圳）", en: "Classy Kiss Dairy (Shenzhen)" },
    highlights: {
      zh: [
        "管理 7 人团队，负责会员增长 + 系统搭建 + 企微赋能",
        "从 0 搭建会员中心小程序，全域会员体系 & CDP 标签",
        "综合全年会员增长 48w，用户周留存同比提升 15pp",
      ],
      en: [
        "Led 7-person team for membership growth, CRM system, and WeCom enablement",
        "Built membership mini-program from scratch, omni-channel loyalty & CDP tagging",
        "48w annual member growth, weekly retention +15pp YoY",
      ],
    },
  },
  {
    period: "2021.02 – 2021.08",
    role: { zh: "商家运营", en: "Merchant Operations" },
    org: { zh: "京东（北京）", en: "JD.com (Beijing)" },
    highlights: {
      zh: [
        "负责自驾 / 户外露营类目销售，商家管理 170+",
        "头腰部商家 GMV 占比 +11%",
      ],
      en: [
        "Managed 170+ merchants in outdoor & camping category",
        "Top-tier merchant GMV share +11%",
      ],
    },
  },
  {
    period: "2020.06 – 2020.12",
    role: { zh: "用户运营", en: "User Operations" },
    org: { zh: "支付宝 / 蚂蚁集团（杭州）", en: "Alipay / Ant Group (Hangzhou)" },
    highlights: {
      zh: [
        "基于「记账本」产品的拉新/促活/留存",
        "用户分层 + A/B test 优化投放 ROI",
      ],
      en: [
        "Growth, activation, retention for bookkeeping mini-app",
        "User segmentation + A/B test for ad ROI optimization",
      ],
    },
  },
  {
    period: "2018.04 – 2020.02",
    role: { zh: "运营经理", en: "Operations Manager" },
    org: { zh: "简爱酸奶（广州/上海）", en: "Simplove Yogurt (Guangzhou / Shanghai)" },
    highlights: {
      zh: [
        "从 0-1 搭建私域运营，在职 KPI 完成度 165%，全年销量 4500 万",
        "老用户转化由 30% 升至 66%，月复购率由 16% 提升至 33%",
      ],
      en: [
        "Built private-domain ops from scratch, KPI completion 165%, annual GMV ¥45M",
        "Returning user conversion 30%→66%, monthly repurchase 16%→33%",
      ],
    },
  },
];

const sports = [
  { zh: "冲浪", en: "Surfing", loc: { zh: "惠州", en: "Huizhou" } },
  { zh: "斯巴达", en: "Spartan", loc: { zh: "深圳站", en: "Shenzhen" } },
  { zh: "潜水", en: "Diving", loc: { zh: "仙本那", en: "Semporna" } },
  { zh: "浆板", en: "SUP", loc: { zh: "亚庇", en: "Kota Kinabalu" } },
  { zh: "半马", en: "Half Marathon", loc: { zh: "清迈", en: "Chiang Mai" } },
  { zh: "拳击", en: "Boxing", loc: { zh: "深圳", en: "Shenzhen" } },
  { zh: "越野跑", en: "Trail Running", loc: { zh: "深圳", en: "Shenzhen" } },
  { zh: "力量训练", en: "Strength", loc: { zh: "持续 2 年+", en: "2+ years" } },
  { zh: "徒步", en: "Hiking", loc: { zh: "香港", en: "Hong Kong" } },
  { zh: "露营", en: "Camping", loc: { zh: "各地", en: "Various" } },
];

const journeyHighlights = [
  {
    year: "14 岁",
    zh: "第一次独自出游",
    en: "First solo trip at 14",
  },
  {
    year: "2015",
    zh: "斯里兰卡国际义工，14 万人中选 30 人",
    en: "Sri Lanka international volunteering, selected from 140k applicants",
  },
  {
    year: "2019",
    zh: "清迈跑完半马后觉得舒服，直接租房住下来",
    en: "Ran a half marathon in Chiang Mai, liked it so much I rented a place",
  },
  {
    year: "2019",
    zh: "泰国 Pa Pae 禅修一周",
    en: "One-week meditation retreat in Pa Pae, Thailand",
  },
  {
    year: "2022",
    zh: "上海疫情社区团长，60+ 次团购为邻居采购生活物资",
    en: "Community group-buy organizer during Shanghai lockdown, 60+ rounds",
  },
  {
    year: "至今",
    zh: "已走过国内 70+ 城市，南丫岛成了第二个家",
    en: "70+ cities in China, Lamma Island became a second home",
  },
];

export default function AboutPage() {
  const { locale, t } = useLocale();
  const zh = locale === "zh";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12">
        {/* ── Hero ── */}
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-mono-index text-[var(--color-terracotta)]">ABOUT</p>
            <h1 className="mt-3 font-serif text-4xl font-bold md:text-5xl">
              {t.about.title}
            </h1>
            <p className="mt-4 font-serif text-xl italic text-[var(--color-ink-muted)]">
              {t.about.motto}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--color-forest)]">
              {t.about.tags.split(" ").map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-[var(--color-forest)]/20 px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <aside className="space-y-4 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-sm text-[var(--color-ink-muted)]">
            <p>
              <strong className="text-[var(--color-ink)]">
                {zh ? "教育" : "Education"}
              </strong>
              <br />
              {zh ? "华南师范大学（211）· 传播学本科" : "South China Normal Univ. (211) · BA Communication"}
            </p>
            <p>
              <strong className="text-[var(--color-ink)]">
                {zh ? "证书" : "Certifications"}
              </strong>
              <br />
              Meta Social Media Marketing · BJCP Beer Judge · {zh ? "高级摄影师" : "Advanced Photographer"} · OW {zh ? "潜水" : "Diving"} · ISA {zh ? "二星冲浪" : "2-Star Surfing"}
            </p>
            <p>
              <strong className="text-[var(--color-ink)]">
                {zh ? "语言" : "Languages"}
              </strong>
              <br />
              {zh ? "中文（母语）· 英文（CET-6 / IELTS 5.5）" : "Chinese (native) · English (CET-6 / IELTS 5.5)"}
            </p>
          </aside>
        </section>

        {/* ── Work History ── */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold">
            {zh ? "工作经历" : "Work Experience"}
          </h2>
          <div className="mt-6 space-y-8">
            {workHistory.map((job) => (
              <div
                key={job.period}
                className="group grid gap-4 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-l-4 hover:border-l-[var(--color-forest)] md:grid-cols-[180px_1fr]"
              >
                <div>
                  <p className="font-mono text-xs text-[var(--color-terracotta)]">
                    {job.period}
                  </p>
                  <p className="mt-1 font-semibold">{job.role[locale]}</p>
                  <p className="text-sm text-[var(--color-ink-muted)]">
                    {job.org[locale]}
                  </p>
                </div>
                <ul className="space-y-1 text-sm text-[var(--color-ink-muted)]">
                  {job.highlights[locale].map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-forest)]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Journey ── */}
        <section id="journey" className="mt-16">
          <h2 className="font-serif text-2xl font-semibold">
            {zh ? "旅途与成长" : "Journey & Growth"}
          </h2>
          <div className="mt-6 border-l-2 border-[var(--color-forest)] pl-6">
            {journeyHighlights.map((j) => (
              <div key={j.year} className="mb-6 last:mb-0">
                <span className="font-mono text-xs text-[var(--color-terracotta)]">
                  {j.year}
                </span>
                <p className="mt-1 text-[var(--color-ink-muted)]">{zh ? j.zh : j.en}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sports ── */}
        <section id="sports" className="mt-16">
          <h2 className="font-serif text-2xl font-semibold">
            {zh ? "运动与身体" : "Sports & Body"}
          </h2>
          <p className="mt-2 text-[var(--color-ink-muted)]">
            {zh
              ? "身体是长期项目。不是为了比赛名次，而是为了知道自己还能做什么。"
              : "The body is a long-term project. Not for rankings, but to discover what I'm still capable of."}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {sports.map((sp) => (
              <div
                key={sp.en}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-center transition-colors hover:border-[var(--color-forest)]"
              >
                <p className="font-serif font-semibold">{zh ? sp.zh : sp.en}</p>
                <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                  {zh ? sp.loc.zh : sp.loc.en}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Craft Beer ── */}
        <section id="craft" className="mt-16">
          <h2 className="font-serif text-2xl font-semibold">
            {zh ? "精酿与社群" : "Craft Beer & Community"}
          </h2>
          <p className="mt-2 text-[var(--color-ink-muted)]">
            {zh
              ? "用兴趣连接人。线下活动、播客、内容、电商——不是在做生意，是在做一件让大家开心的事。"
              : "Connecting people through shared passion. Events, podcasts, content, commerce — not a business, but something that brings people together."}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              {
                title: { zh: "线下活动", en: "Offline Events" },
                desc: {
                  zh: "香港酒厂+南丫岛徒步 · 芜湖音乐节 · 碧山村 · 新疆酒花农场 · 嘉兴酒厂",
                  en: "HK brewery + Lamma hike · Wuhu music fest · Bishan village · Xinjiang hop farm",
                },
              },
              {
                title: { zh: "内容制作", en: "Content" },
                desc: {
                  zh: "播客节目 · 探厂视频 · 酒款评测 · 小红书运营",
                  en: "Podcast · Brewery tour videos · Beer reviews · Xiaohongshu content",
                },
              },
              {
                title: { zh: "电商运营", en: "E-Commerce" },
                desc: {
                  zh: "全国 50+ 酒厂合作 · 有赞/淘宝/小红书多平台管理",
                  en: "50+ breweries · Multi-platform management on Youzan, Taobao, Xiaohongshu",
                },
              },
            ].map((item) => (
              <div
                key={item.title.en}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-5"
              >
                <p className="font-semibold">{zh ? item.title.zh : item.title.en}</p>
                <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                  {zh ? item.desc.zh : item.desc.en}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact CTA ── */}
        <section className="mt-20 rounded-md border border-[var(--color-forest)]/20 bg-[var(--color-callout)] p-8 text-center">
          <p className="font-mono-index text-[var(--color-forest)]">
            {zh ? "联系方式" : "CONTACT"}
          </p>
          <p className="mt-3 font-serif text-xl">
            {zh
              ? "如果你觉得有趣，欢迎找我聊聊"
              : "If this sounds interesting, let's talk"}
          </p>
          <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
            {profileConfig.contact.email}
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
