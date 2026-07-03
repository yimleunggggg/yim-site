export type ProjectShot = {
  src: string;
  alt: string;
  /** 占位宽高，减少加载前布局跳动（默认手机截图比例） */
  width?: number;
  height?: number;
};

function shotsFromFolder(base: string, count: number, label = "截图"): ProjectShot[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { src: `${base}/${n}.png`, alt: `${label} ${i + 1}`, width: 390, height: 844 };
  });
}

export const yakushimaBusScreenshots: ProjectShot[] = [
  { src: "/work/projects/yakushima-bus/01.png", alt: "产品概览 · 三语首页", width: 390, height: 844 },
  { src: "/work/projects/yakushima-bus/02.png", alt: "移动端 · 公交时刻表", width: 390, height: 844 },
  { src: "/work/projects/yakushima-bus/04.png", alt: "区间查询 · 下一班高亮", width: 390, height: 844 },
  { src: "/work/projects/yakushima-bus/05.png", alt: "票价预估 · 乘车券", width: 390, height: 844 },
  { src: "/work/projects/yakushima-bus/06.png", alt: "船运时刻 · 上岛衔接", width: 390, height: 844 },
  { src: "/work/projects/yakushima-bus/07.png", alt: "运休公告", width: 390, height: 844 },
  { src: "/work/projects/yakushima-bus/08.png", alt: "便利设施地图 · 分类 POI", width: 390, height: 844 },
  { src: "/work/projects/yakushima-bus/09.png", alt: "站点详情 · Google 导航", width: 390, height: 844 },
  { src: "/work/projects/yakushima-bus/10.png", alt: "登山路线 · YAMAP 链接", width: 390, height: 844 },
];

export const projectScreenshotCatalog = {
  "yakushima-bus": yakushimaBusScreenshots,
  packlog: shotsFromFolder("/work/projects/packlog", 10),
  offtrack: shotsFromFolder("/work/projects/offtrack", 11),
} as const;

export type ProjectScreenshotSlug = keyof typeof projectScreenshotCatalog;

/** 详情页 slug → 截图 catalog key */
const PAGE_SLUG_TO_CATALOG: Record<string, ProjectScreenshotSlug> = {
  "yakushima-bus-now": "yakushima-bus",
  packlog: "packlog",
  offtrack: "offtrack",
};

export function getProjectScreenshotsForPage(slug: string): ProjectShot[] | null {
  const key = PAGE_SLUG_TO_CATALOG[slug];
  if (!key) return null;
  return projectScreenshotCatalog[key];
}

export type ProjectAboutThumb =
  | { kind: "image"; src: string; alt: string; width?: number; height?: number; vector?: boolean }
  | { kind: "gradient"; gradient: string };

const ABOUT_THUMB_GRADIENTS: Record<string, string> = {};

const ABOUT_COVER_IMAGES: Record<string, { src: string; width: number; height: number; vector?: boolean }> = {
  "yakushima-bus-now": {
    src: "/work/projects/yakushima-bus/cover-about.png",
    width: 1024,
    height: 682,
  },
  packlog: {
    src: "/work/projects/packlog/cover-about.png",
    width: 1024,
    height: 682,
  },
  offtrack: {
    src: "/work/projects/offtrack/cover-about.png",
    width: 1024,
    height: 682,
  },
  "self-discovery": {
    src: "/work/projects/self-discovery/cover-about.svg",
    width: 1024,
    height: 682,
    vector: true,
  },
};

/** About 项目卡片顶栏缩略图（专用头图 / 渐变占位） */
export function getProjectAboutThumb(slug: string, title = ""): ProjectAboutThumb {
  const cover = ABOUT_COVER_IMAGES[slug];
  if (cover) {
    return {
      kind: "image",
      src: cover.src,
      alt: title,
      width: cover.width,
      height: cover.height,
      vector: cover.vector,
    };
  }
  if (slug === "beer-matters") {
    return {
      kind: "image",
      src: "/work/beer-matters/gallery/01.jpg",
      alt: title || "Beer Matters",
      width: 800,
      height: 500,
    };
  }
  const gradient = ABOUT_THUMB_GRADIENTS[slug];
  if (gradient) return { kind: "gradient", gradient };
  return {
    kind: "gradient",
    gradient: "linear-gradient(145deg, var(--color-forest) 0%, #5a7a6a 55%, var(--color-callout) 100%)",
  };
}
