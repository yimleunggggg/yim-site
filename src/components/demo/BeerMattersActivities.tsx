import { beerMattersHighlights } from "@/lib/demo/demo-beer-matters";

function splitActivityTitle(title: string): { kind: string; name: string } {
  const parts = title.split(" · ");
  if (parts.length >= 2) {
    return { kind: parts[0], name: parts.slice(1).join(" · ") };
  }
  return { kind: "活动", name: title };
}

export function BeerMattersActivities() {
  return (
    <section className="beer-matters-activities editorial-content prose-playbook demo-article mt-10 max-w-none">
      <h2>做过的一些好玩的：</h2>
      <ul className="project-related-list beer-matters-activity-list">
        {beerMattersHighlights.map((item) => {
          const { kind, name } = splitActivityTitle(item.title);
          return (
            <li key={item.title} className="project-related-card project-related-card--stacked">
              <span className="project-related-kind">{kind}</span>
              <span className="project-related-title">{name}</span>
              <div className="project-related-actions">
                {item.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-related-action tap-target"
                  >
                    <span>{link.label}</span>
                    <span className="project-related-arrow" aria-hidden>
                      →
                    </span>
                  </a>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
