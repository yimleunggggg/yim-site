import { beerMattersHighlights } from "@/lib/demo/demo-beer-matters";

export function BeerMattersActivities() {
  return (
    <section className="beer-matters-activities editorial-content prose-playbook demo-article mt-10 max-w-none">
      <h2>做过的一些好玩的：</h2>
      <ul className="beer-matters-activity-list">
        {beerMattersHighlights.map((item) => (
          <li key={item.title}>
            <p className="beer-matters-activity-title">{item.title}</p>
            <ul className="beer-matters-activity-links">
              {item.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="beer-matters-activity-link tap-target"
                  >
                    {link.label} →
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
