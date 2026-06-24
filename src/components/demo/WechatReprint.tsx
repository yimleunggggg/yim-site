import type { WechatArticle } from "@/lib/demo/demo-beer-hk-travel";

const KIND_LABEL: Record<WechatArticle["kind"], string> = {
  recruit: "招募",
  recap: "回顾",
};

export function WechatReprint({ article }: { article: WechatArticle }) {
  return (
    <article className="wechat-reprint">
      <header className="wechat-reprint-head">
        <p className="wechat-reprint-kind">{KIND_LABEL[article.kind]}</p>
        <h3 className="wechat-reprint-title">{article.title}</h3>
        {article.publishedAt ? (
          <p className="wechat-reprint-date">{article.publishedAt}</p>
        ) : null}
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="wechat-reprint-source tap-target"
        >
          阅读原文（微信公众号）→
        </a>
      </header>

      {article.images.length > 0 ? (
        <figure className="life-masonry wechat-reprint-gallery" aria-label="文章配图">
          {article.images.map((src, i) => (
            <div key={`${src}-${i}`} className="life-masonry-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="life-masonry-img mdx-image--shot"
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </figure>
      ) : null}

      <div className="wechat-reprint-body">
        {article.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <footer className="wechat-reprint-foot">
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="wechat-reprint-source wechat-reprint-source--foot"
        >
          {article.sourceUrl}
        </a>
      </footer>
    </article>
  );
}
