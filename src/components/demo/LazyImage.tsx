"use client";

import { useCallback, useState } from "react";

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
 * 原生 img + lazy；缓存命中或同步解码时用 ref 回调立即标记 loaded，
 * 避免 useEffect 重置 state 导致 opacity 一直为 0。
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

  const setImgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node) return;

      const onLoad = () => {
        setLoaded(true);
        setFailed(false);
      };
      const onError = () => setFailed(true);

      if (markLoaded(node)) {
        setLoaded(true);
        setFailed(false);
        return;
      }

      setLoaded(false);
      setFailed(false);
      node.addEventListener("load", onLoad);
      node.addEventListener("error", onError);

      return () => {
        node.removeEventListener("load", onLoad);
        node.removeEventListener("error", onError);
      };
    },
    [src],
  );

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={setImgRef}
      src={failed ? undefined : src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      draggable={draggable}
      onContextMenu={onContextMenu}
      onLoad={() => {
        setLoaded(true);
        setFailed(false);
      }}
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
