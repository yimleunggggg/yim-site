"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

function markLoaded(img: HTMLImageElement | null): boolean {
  return Boolean(img && img.complete && img.naturalWidth > 0);
}

/**
 * 始终输出 src，靠浏览器原生 lazy + priority 控制加载顺序。
 * 缓存命中时需读 complete，否则 onLoad 已错过会一直 opacity:0。
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
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ratio = width && height ? `${width} / ${height}` : undefined;

  useLayoutEffect(() => {
    if (markLoaded(imgRef.current)) setLoaded(true);
  }, [src]);

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
    const img = imgRef.current;
    if (markLoaded(img)) {
      setLoaded(true);
      return;
    }
    if (!img) return;
    const onLoad = () => setLoaded(true);
    img.addEventListener("load", onLoad);
    return () => img.removeEventListener("load", onLoad);
  }, [src]);

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={failed ? undefined : src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      draggable={draggable}
      onContextMenu={onContextMenu}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`lazy-img__el lazy-img__el--${fit} ${loaded ? "is-loaded" : ""} ${failed ? "is-failed" : ""} ${className}`.trim()}
    />
  );

  if (!ratio) {
    return <span className="lazy-img-host">{img}</span>;
  }

  return (
    <span className="lazy-img-slot" style={{ aspectRatio: ratio }}>
      {img}
    </span>
  );
}
