"use client";

import Link from "next/link";
import Image from "next/image";
import { homeLifePhotos } from "@/lib/home-life-photos";

type Props = {
  zh: boolean;
};

function PhotoTile({
  src,
  label,
  priority,
}: {
  src: string;
  label: string;
  priority?: boolean;
}) {
  return (
    <figure className="life-marquee-item group relative h-[8.5rem] w-[6.25rem] shrink-0 grow-0 overflow-hidden rounded-sm sm:h-[11rem] sm:w-[8.25rem] md:h-[13rem] md:w-[9.75rem] lg:h-[15rem] lg:w-[11.25rem]">
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 120px, 180px"
        priority={priority}
        draggable={false}
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 pb-1.5 pt-6 text-[10px] text-white sm:px-2.5 sm:pb-2 sm:pt-8 sm:text-xs">
        {label}
      </figcaption>
    </figure>
  );
}

export function LifePhotoMarquee({ zh }: Props) {
  const items = homeLifePhotos.map((p) => ({
    src: p.src,
    label: zh ? p.label.zh : p.label.en,
  }));
  const loop = [...items, ...items];

  return (
    <section aria-label={zh ? "生活照片" : "Life photos"} className="life-marquee-section">
      <div className="site-shell mb-3 flex items-baseline justify-between gap-3 sm:mb-4">
        <p className="text-xs text-[var(--color-ink-muted)] sm:text-sm">
          {zh ? "冲浪、潜水、越野、精酿——生活里的真实片段" : "Surf, trails, beer — real life, not stock photos"}
        </p>
        <Link href="/life#moments" className="shrink-0 text-xs text-[var(--color-forest)] hover:underline">
          {zh ? "全部 →" : "All →"}
        </Link>
      </div>

      <div className="life-marquee-mask">
        <div className="life-marquee-track" aria-hidden={false}>
          {loop.map((item, i) => (
            <PhotoTile key={`${item.src}-${i}`} src={item.src} label={item.label} priority={i < 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
