import beerImages from "@/lib/demo/beer-matters-images.json";
import { buildImagesAtEndLayout } from "@/lib/demo/life-article-layout";
import { LifeArticleBody } from "./LifeArticleBody";

export function BeerMattersGallery() {
  const blocks = buildImagesAtEndLayout([], beerImages.images);
  if (!blocks.length) return null;
  return <LifeArticleBody blocks={blocks} />;
}
