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
    <section className="project-related-section editorial-content mt-10">
      <h2 className="project-related-section-title">做过的一些好玩的：</h2>
      <ul className="project-related-list">
        {beerMattersHighlights.flatMap((item) => {
          const { kind, name } = splitActivityTitle(item.title);
          return item.links.map((link) => (
            <li key={`${item.title}-${link.url}`}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-related-card tap-target"
              >
                <span className="project-related-kind">{kind}</span>
                <span className="project-related-title">
                  {name} · {link.label}
                </span>
                <span className="project-related-arrow" aria-hidden>
                  →
                </span>
              </a>
            </li>
          ));
        })}
      </ul>
    </section>
  );
}
