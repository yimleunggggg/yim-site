"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { demoMarqueePhotos } from "@/lib/demo/demo-data";

const LOOP = [...demoMarqueePhotos, ...demoMarqueePhotos];

export function DemoMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoScrolling = useRef(false);

  const pauseAuto = useCallback(() => {
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 4500);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || paused) return;

    let raf = 0;
    const tick = () => {
      if (!scrollerRef.current || paused) return;
      const node = scrollerRef.current;
      const half = node.scrollWidth / 2;
      if (half > 0) {
        autoScrolling.current = true;
        node.scrollLeft += 0.6;
        if (node.scrollLeft >= half - 1) node.scrollLeft = 0;
        autoScrolling.current = false;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <section
      aria-label="Life photos"
      className="site-shell life-marquee-section life-marquee-section--contained"
    >
      <div
        ref={scrollerRef}
        className="life-marquee-scroll scroll-tabs"
        onTouchStart={pauseAuto}
        onWheel={pauseAuto}
        onScroll={() => {
          if (!autoScrolling.current) pauseAuto();
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") pauseAuto();
        }}
      >
        <div className="life-marquee-track life-marquee-track--manual">
          {LOOP.map((p, i) => (
            <figure key={`${p.src}-${i}`} className="life-marquee-item shrink-0 snap-start">
              <Image
                src={p.src}
                alt=""
                width={p.width}
                height={p.height}
                sizes="(max-width: 640px) 160px, 220px"
                className="life-marquee-img"
                priority={i < 4}
                draggable={false}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
