import type { ImgHTMLAttributes } from "react";
import {
  Callout,
  PullQuote,
  PromptBlock,
  ToolCard,
  BeforeAfter,
  SupplementBlock,
  PipelineDiagram,
} from "@/components";

function MdxImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { alt, src, ...rest } = props;
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...rest}
        src={src}
        alt={alt ?? ""}
        className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card)]"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      {alt ? (
        <figcaption className="mt-2 text-center text-sm text-[var(--color-ink-muted)]">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

export const mdxComponents = {
  Callout,
  PullQuote,
  PromptBlock,
  ToolCard,
  BeforeAfter,
  SupplementBlock,
  PipelineDiagram,
  img: MdxImage,
};
