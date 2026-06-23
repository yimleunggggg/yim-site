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
    <figure className="mdx-figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...rest}
        src={src}
        alt={alt ?? ""}
        className="mdx-image"
        loading="lazy"
        decoding="async"
      />
      {alt ? (
        <figcaption className="mdx-caption">
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
