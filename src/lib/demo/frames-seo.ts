import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import type { Frame, FrameMeta } from "./demo-frames";

export const FRAMES_SITE_NAME = "FRAMES · Yim Leung";

export const FRAMES_INDEX_DESCRIPTION =
  "旅行与纪实摄影：仙本那巴瑶族、川西藏区、潮州古城、斯里兰卡、江陵海岸… 人文、风光与日常街拍。";

export const FRAMES_INDEX_KEYWORDS = [
  "旅行摄影",
  "纪实摄影",
  "人文摄影",
  "风光摄影",
  "仙本那",
  "川西",
  "潮州",
  "斯里兰卡",
  "Yim Leung",
];

function joinTags(frame: Pick<FrameMeta, "tags">, lang: "zh" | "en" = "zh"): string {
  return frame.tags.map((t) => t[lang]).join("、");
}

/** 详情页 description：优先 intro，否则由标题 + 地点 + 标签生成 */
export function buildFrameDescription(frame: Pick<FrameMeta, "title" | "location" | "tags" | "intro">): string {
  const intro = frame.intro.zh.trim();
  if (intro) return intro;

  const tags = joinTags(frame);
  const parts = [frame.title.zh, frame.location.zh];
  if (tags) parts.push(tags);
  parts.push("旅行与纪实摄影作品");
  return parts.filter(Boolean).join(" · ");
}

export function buildFrameKeywords(frame: Pick<FrameMeta, "title" | "location" | "tags">): string[] {
  const fromLocation = frame.location.zh
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);
  const fromTags = frame.tags.map((t) => t.zh);
  return [...new Set([frame.title.zh, ...fromLocation, ...fromTags, "摄影", "旅行摄影", "纪实摄影"])];
}

function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildFramesIndexMetadata(): Metadata {
  const url = absoluteUrl("/frames");
  return {
    title: "FRAMES",
    description: FRAMES_INDEX_DESCRIPTION,
    keywords: FRAMES_INDEX_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      title: FRAMES_SITE_NAME,
      description: FRAMES_INDEX_DESCRIPTION,
      url,
      type: "website",
      locale: "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title: FRAMES_SITE_NAME,
      description: FRAMES_INDEX_DESCRIPTION,
    },
  };
}

export function buildFrameDetailMetadata(frame: Frame): Metadata {
  const description = buildFrameDescription(frame);
  const keywords = buildFrameKeywords(frame);
  const url = absoluteUrl(`/frames/${frame.slug}`);
  const ogImage = frame.cover ? absoluteUrl(frame.cover) : undefined;

  return {
    title: `${frame.title.zh} · FRAMES`,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${frame.title.zh} · FRAMES`,
      description,
      url,
      type: "article",
      locale: "zh_CN",
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: frame.coverWidth,
                height: frame.coverHeight,
                alt: `${frame.title.zh} · ${frame.location.zh}`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${frame.title.zh} · FRAMES`,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function buildFramesIndexJsonLd(frames: Pick<Frame, "slug" | "title" | "location" | "cover">[]) {
  const url = absoluteUrl("/frames");
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: FRAMES_SITE_NAME,
    description: FRAMES_INDEX_DESCRIPTION,
    url,
    inLanguage: "zh-CN",
    author: {
      "@type": "Person",
      name: siteConfig.title,
      url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: frames.map((frame, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/frames/${frame.slug}`),
        name: frame.title.zh,
        description: `${frame.location.zh} · ${frame.title.zh}`,
        ...(frame.cover ? { image: absoluteUrl(frame.cover) } : {}),
      })),
    },
  };
}

export function buildFrameDetailJsonLd(frame: Frame) {
  const url = absoluteUrl(`/frames/${frame.slug}`);
  const description = buildFrameDescription(frame);
  const images = frame.images.slice(0, 12).map((src) => absoluteUrl(src));

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: frame.title.zh,
    description,
    url,
    inLanguage: "zh-CN",
    keywords: buildFrameKeywords(frame).join(", "),
    contentLocation: {
      "@type": "Place",
      name: frame.location.zh,
    },
    author: {
      "@type": "Person",
      name: siteConfig.title,
      url: absoluteUrl("/frames"),
    },
    ...(images.length > 0 ? { image: images } : {}),
    ...(frame.cover
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteUrl(frame.cover),
            width: frame.coverWidth,
            height: frame.coverHeight,
            caption: `${frame.title.zh} · ${frame.location.zh}`,
          },
        }
      : {}),
  };
}
