"use client";

import { useEffect, useRef, useState } from "react";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  /** 首屏关键图：立即加载 */
  priority?: boolean;
  draggable?: boolean;
  onContextMenu?: (e: React.MouseEvent<HTMLImageElement>) => void;
};

/**
 * 图片加载：始终挂载 src，用浏览器原生 lazy + 可选 priority。
 * （旧版 IntersectionObserver 延迟设 src 会导致高度从 0 顶高、逐张弹出。）
 */
export function LazyImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  draggable,
  onContextMenu,
}: LazyImageProps) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={failed ? undefined : src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      draggable={draggable}
      onContextMenu={onContextMenu}
      onError={() => setFailed(true)}
    />
  );
}
