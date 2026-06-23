import type { LayoutBlock } from "@/lib/demo/life-article-layout";

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.src}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </figure>
          );
        }
        return (
          <figure key={idx} className="life-figure-grid" aria-label="">
            {block.sources.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" loading="lazy" decoding="async" />
            ))}
          </figure>
        );
      })}
    </div>
  );
}
