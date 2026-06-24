import type { LayoutBlock } from "@/lib/demo/life-article-layout";
import { LazyImage } from "./LazyImage";

export function LifeArticleBody({ blocks }: { blocks: LayoutBlock[] }) {
  if (!blocks.length) return null;

  return (
    <div className="life-article-flow prose-playbook demo-article mt-8 max-w-none">
      {blocks.map((block, idx) => {
        if (block.type === "paragraph") {
          const isNumbered = /^\d+[.)]\s/.test(block.text);
          if (isNumbered) {
            return (
              <p key={idx} className="life-article-list-item">
                {block.text}
              </p>
            );
          }
          return <p key={idx}>{block.text}</p>;
        }
        if (block.type === "figure") {
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
                priority={idx < 2}
                className="h-auto w-full"
              />
            </figure>
          );
        }
        return (
          <figure key={idx} className="life-masonry" aria-label="">
            {block.sources.map((src, j) => (
              <div key={src} className="life-masonry-item">
                <LazyImage
                  src={src}
                  alt=""
                  priority={idx < 2 && j < 2}
                  className="life-masonry-img"
                />
              </div>
            ))}
          </figure>
        );
      })}
    </div>
  );
}
