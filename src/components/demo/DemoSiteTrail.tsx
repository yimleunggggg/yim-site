import Link from "next/link";

export type DemoTrailItem = {
  label: string;
  href?: string;
};

/** 站点内 breadcrumb：Home / Section / Current */
export function DemoSiteTrail({ items }: { items: DemoTrailItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="demo-site-trail">
      <ol className="demo-site-trail-list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="demo-site-trail-item">
              {i > 0 ? (
                <span className="demo-site-trail-sep" aria-hidden>
                  /
                </span>
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="demo-site-trail-link">
                  {item.label}
                </Link>
              ) : (
                <span className="demo-site-trail-current" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
