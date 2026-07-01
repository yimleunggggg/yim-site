import { beerMattersHighlights } from "@/lib/demo/demo-beer-matters";

export function BeerMattersActivities() {
  return (
    <section className="beer-matters-activities editorial-content prose-playbook demo-article mt-10 max-w-none">
      <h2>做过的一些好玩的：</h2>
      <ul className="beer-matters-activity-list">
        {beerMattersHighlights.map((item) => (
          <li key={item.title} className="beer-matters-activity-item">
            <p className="beer-matters-activity-title">{item.title}</p>
            <div className="beer-matters-activity-links">
              {item.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="beer-matters-activity-link tap-target"
                >
                  <span>{link.label}</span>
                  <span className="beer-matters-activity-arrow" aria-hidden>
                    →
                  </span>
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
