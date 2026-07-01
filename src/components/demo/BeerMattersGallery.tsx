"use client";

import beerImages from "@/lib/demo/beer-matters-images.json";
import { LazyImage } from "./LazyImage";

export function BeerMattersGallery() {
  const images = beerImages.images;
  if (!images.length) return null;

  const [hero, ...rest] = images;

  return (
    <figure className="beer-matters-gallery" aria-label="啤酒事务局活动与内容">
      <div className="beer-matters-gallery-hero">
        <LazyImage src={hero} alt="" priority fit="cover" className="beer-matters-gallery-img beer-matters-gallery-img--hero" />
      </div>
      {rest.length > 0 ? (
        <div className="beer-matters-gallery-grid">
          {rest.map((src, index) => (
            <div key={src} className="beer-matters-gallery-cell">
              <LazyImage
                src={src}
                alt=""
                priority={index < 3}
                fit="cover"
                className="beer-matters-gallery-img beer-matters-gallery-img--tile"
              />
            </div>
          ))}
        </div>
      ) : null}
    </figure>
  );
}
