"use client";

import type { LayoutBlock } from "@/lib/demo/life-article-layout";
import { preprocessLifeBlocks } from "@/lib/demo/life-article-layout";
import { LazyImage } from "./LazyImage";

export function LifeArticleBody({ blocks }: { blocks: LayoutBlock[] }) {
  const editorial = preprocessLifeBlocks(blocks);
  if (!editorial.length) return null;

  let galleryIdx = 0;

  return (
    <div className="life-article-flow prose-playbook demo-article editorial-content mt-8 max-w-none">
      {editorial.map((block, idx) => {
        if (block.type === "section") {
          return (
            <header key={idx} className="life-section-head">
              <h2 className="life-section-title">{block.title}</h2>
              {block.subtitle ? (
                <p className="life-section-deck">{block.subtitle}</p>
              ) : null}
            </header>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={idx} className="life-section-list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "blockquote") {
          return <blockquote key={idx}>{block.text}</blockquote>;
        }

        if (block.type === "paragraph") {
          const text = block.text;
          const isNumbered = /^\d+[.)]\s/.test(text);
          if (isNumbered) {
            return (
              <p key={idx} className="life-article-list-item">
                {text}
              </p>
            );
          }
          return (
            <p key={idx} className={block.lede ? "life-lede" : undefined}>
              {text}
            </p>
          );
        }

        if (block.type === "figure") {
          const priority = galleryIdx === 0;
          galleryIdx += 1;
          return (
            <figure
              key={idx}
              className={
                block.variant === "full"
                  ? "life-figure life-figure--full"
                  : "life-figure life-figure--wide"
              }
            >
              <LazyImage
                src={block.src}
                alt=""
                priority={priority}
                className="life-figure-img"
              />
            </figure>
          );
        }

        const count = block.sources.length;
        const groupIdx = galleryIdx;
        galleryIdx += 1;
        return (
          <figure
            key={idx}
            className={`life-gallery life-gallery--${Math.min(count, 3)}`}
            aria-label=""
          >
            {block.sources.map((src, j) => (
              <div key={src} className="life-gallery-item">
                <LazyImage
                  src={src}
                  alt=""
                  priority={groupIdx < 2}
                  className="life-gallery-img"
                />
              </div>
            ))}
          </figure>
        );
      })}
    </div>
  );
}
