export type BlogTopic = "ai" | "tools" | "ops" | "travel" | "craft" | "essay";

export const BLOG_TOPIC_LABELS: Record<BlogTopic, { zh: string; en: string }> = {
  ai: { zh: "AI", en: "AI" },
  tools: { zh: "工具教程", en: "Tools" },
  ops: { zh: "运营", en: "Ops" },
  travel: { zh: "旅行", en: "Travel" },
  craft: { zh: "精酿", en: "Craft" },
  essay: { zh: "随笔", en: "Essay" },
};
