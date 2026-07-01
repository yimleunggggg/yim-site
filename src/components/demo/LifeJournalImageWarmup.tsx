"use client";

import { useEffect } from "react";

/** 进入文章页后后台预热全部配图，读正文时浏览器已在拉取 */
export function LifeJournalImageWarmup({ images }: { images: string[] }) {
  useEffect(() => {
    if (!images.length) return;

    const links: HTMLLinkElement[] = [];
    for (const href of images) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    }

    return () => {
      for (const link of links) link.remove();
    };
  }, [images]);

  return null;
}
