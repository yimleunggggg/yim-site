import type { LText } from "./demo-data";

export type FrameImageCaption = {
  date: string;
  place: LText;
};

/** FRAMES 页面 UI 文案（客户端安全，无 fs） */
export const framesUi = {
  pageTitle: { zh: "摄影与旅行", en: "Frames & Travel" } as LText,
  photoCount: { zh: "张", en: "photos" } as LText,
  backLink: { zh: "← FRAMES", en: "← FRAMES" } as LText,
  ongoingLabel: { zh: "更新中", en: "Live" } as LText,
  prevAlbum: { zh: "上一组", en: "Previous" } as LText,
  nextAlbum: { zh: "下一组", en: "Next" } as LText,
};

/** FRAMES 板块顶部引语（刘子超《午夜降临前抵达》） */
export const framesIntro: LText = {
  zh: "真正的旅行绝不仅是见证美妙的奇观，同样应该见证沉闷与苦难。仅仅是了解到「世界上还有人在这样生活」，就足以令内心辽阔起来。",
  en: "Real travel is not only about witnessing the wonders, but also the dullness and the hardship. Simply knowing that “there are people who live like this” is enough to widen the heart inside.",
};

export const framesIntroAttribution: LText = {
  zh: "刘子超，《午夜降临前抵达》",
  en: "Liu Zichao, Arriving Before Midnight",
};
