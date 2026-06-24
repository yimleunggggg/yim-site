import {
  beerHkTravelArticles,
  beerHkTravelEvent,
} from "@/lib/demo/demo-beer-hk-travel";
import { WechatReprint } from "./WechatReprint";

export function BeerTravelHongKong() {
  const recruit = beerHkTravelArticles.find((a) => a.kind === "recruit");
  const recap = beerHkTravelArticles.find((a) => a.kind === "recap");

  return (
    <section className="beer-travel-section">
      <p className="demo-section-eyebrow">{beerHkTravelEvent.eyebrow}</p>
      <h2 className="demo-section-title mt-2">{beerHkTravelEvent.title.zh}</h2>
      <p className="demo-section-subtitle mt-2">{beerHkTravelEvent.subtitle.zh}</p>

      <figure className="mdx-figure mdx-figure--shot mt-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beerHkTravelEvent.boothImage}
          alt={beerHkTravelEvent.boothCaption.zh}
          className="mdx-image mdx-image--shot"
          loading="lazy"
          decoding="async"
        />
        <figcaption className="mdx-caption">{beerHkTravelEvent.boothCaption.zh}</figcaption>
      </figure>

      {recruit ? <WechatReprint article={recruit} /> : null}
      {recap ? <WechatReprint article={recap} /> : null}
    </section>
  );
}
