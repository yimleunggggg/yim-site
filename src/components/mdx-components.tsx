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
import { BeerMattersActivities } from "@/components/demo/BeerMattersActivities";
import { BeerMattersGallery } from "@/components/demo/BeerMattersGallery";
import { ProjectScreenshots } from "@/components/demo/ProjectScreenshots";

function MdxImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { alt, src, ...rest } = props;
  const isShot =
    typeof src === "string" &&
    (src.includes("/work/projects/") || src.includes("/work/beer-matters/"));
  return (
    <figure className={`mdx-figure${isShot ? " mdx-figure--shot" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...rest}
        src={src}
        alt={alt ?? ""}
        className={`mdx-image${isShot ? " mdx-image--shot" : ""}`}
        loading="lazy"
        decoding="async"
      />
      {alt ? <figcaption className="mdx-caption">{alt}</figcaption> : null}
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
  BeerMattersActivities,
  BeerMattersGallery,
  ProjectScreenshots,
  img: MdxImage,
};
