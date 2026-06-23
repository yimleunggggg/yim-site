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
  const [activeSrc, setActiveSrc] = useState(priority ? src : undefined);

  useEffect(() => {
    if (priority) return;
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setActiveSrc(src);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          io.disconnect();
        }
      },
      { rootMargin: "480px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [priority, src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={activeSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
      className={className}
      draggable={draggable}
      onContextMenu={onContextMenu}
    />
  );
}
