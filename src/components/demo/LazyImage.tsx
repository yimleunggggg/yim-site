"use client";

import { useEffect, useState } from "react";

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
  /** object-fit，默认 cover；相册用 contain */
  fit?: "cover" | "contain";
};

/**
 * 预留宽高比 + 占位底色，加载后淡入，避免 masonry 逐张顶高。
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
  fit = "cover",
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ratio = width && height ? `${width} / ${height}` : undefined;

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? undefined : src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      draggable={draggable}
      onContextMenu={onContextMenu}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`lazy-img__el lazy-img__el--${fit} ${loaded ? "is-loaded" : ""} ${className}`.trim()}
    />
  );

  if (!ratio) return img;

  return (
    <span className="lazy-img-slot" style={{ aspectRatio: ratio }}>
      {img}
    </span>
  );
}
