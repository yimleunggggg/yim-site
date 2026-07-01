import { beerMattersHighlights } from "@/lib/demo/demo-beer-matters";

function splitActivityTitle(title: string): { series: string; name: string } {
  const parts = title.split(" · ");
  if (parts.length >= 2) {
    return { series: parts[0], name: parts.slice(1).join(" · ") };
  }
  return { series: "活动", name: title };
}

export function BeerMattersActivities() {
  return (
    <section className="project-related-section mt-10">
      <h2 className="project-related-section-title">做过的一些好玩的：</h2>
      <ul className="project-related-list">
        {beerMattersHighlights.map((item) => {
          const { series, name } = splitActivityTitle(item.title);
          return (
            <li key={item.title}>
              <div className="project-related-card project-related-card--stacked">
                <span className="project-related-title">{name}</span>
                <span className="project-related-note">{series}</span>
                <div className="project-related-actions">
                  {item.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-related-action tap-target"
                    >
                      <span className="project-related-action-label">
                        <span className="project-related-kind">微信公众号</span>
                        <span>{link.label}</span>
                      </span>
                      <span className="project-related-arrow" aria-hidden>
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
