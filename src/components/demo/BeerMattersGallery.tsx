import beerImages from "@/lib/demo/beer-matters-images.json";
import { buildEditorialLayout } from "@/lib/demo/life-article-layout";
import { LifeArticleBody } from "./LifeArticleBody";

type Props = {
  /** 从第几张开始（0-based） */
  offset?: number;
  /** 最多展示几张；缺省则到末尾 */
  limit?: number;
};

export function BeerMattersGallery({ offset = 0, limit }: Props) {
  const slice = beerImages.images.slice(offset, limit ? offset + limit : undefined);
  const blocks = buildEditorialLayout([], slice);
  if (!blocks.length) return null;
  return <LifeArticleBody blocks={blocks} />;
}
