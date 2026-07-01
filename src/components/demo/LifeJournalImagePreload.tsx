"use client";

import { useEffect } from "react";

/** 正文在前、图在文末的篇目：进入页面即预取首批图，避免滚到底才排队加载 */
export function LifeJournalImagePreload({ images }: { images: string[] }) {
  useEffect(() => {
    const hrefs = images.slice(0, 6);
    const links = hrefs.map((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });
    return () => {
      for (const link of links) link.remove();
    };
  }, [images]);

  return null;
}
