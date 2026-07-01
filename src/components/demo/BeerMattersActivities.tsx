import { beerMattersHighlights } from "@/lib/demo/demo-beer-matters";

export function BeerMattersActivities() {
  return (
    <section className="beer-matters-activities mt-10">
      <h2 className="font-serif text-xl font-semibold text-[var(--color-ink)]">
        做过的一些好玩的：
      </h2>
      <ul className="mt-5 space-y-6">
        {beerMattersHighlights.map((item) => (
          <li key={item.title}>
            <p className="font-medium text-[var(--color-ink)]">{item.title}</p>
            <ul className="mt-2 space-y-2">
              {item.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-forest)] underline-offset-2 hover:underline"
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
