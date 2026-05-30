export type EquipmentInventoryItem = {
  title: string;
  description: string;
  tag: string;
  status: string;
  href?: string;
};

export type EquipmentInventoryGridProps = {
  items: EquipmentInventoryItem[];
};

export const defaultEquipmentInventoryItems: EquipmentInventoryItem[] = [
  {
    title: "Sensor Kit Pro",
    description:
      "Portable sensors for data collection, measurement, and classroom lab activities.",
    tag: "Sensors",
    status: "Available"
  },
  {
    title: "Intro Robotics Set",
    description:
      "A classroom-ready robotics package with structured setup guidance and support notes.",
    tag: "Robotics",
    status: "Limited"
  },
  {
    title: "Precision Measurement Pack",
    description:
      "Core tools for experiments, engineering investigations, and demonstration labs.",
    tag: "Measurement",
    status: "Available"
  },
  {
    title: "Maker Prototyping Bin",
    description:
      "General prototyping materials for design challenges, iteration, and testing.",
    tag: "Maker",
    status: "Request review"
  }
];

export function EquipmentInventoryGrid({ items }: EquipmentInventoryGridProps) {
  return (
    <section className="py-10">
      <div className="section-shell space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cardinal">
            Equipment listings
          </p>
          <h2 className="section-heading">Featured inventory categories</h2>
          <p className="section-copy">
            A curated view of the equipment catalog, organized for browsing and
            lending coordination.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.title} className="surface-card p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="w-fit rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
                  {item.tag}
                </span>
                <span className="rounded-full border border-stone-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                  {item.status}
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {item.description}
              </p>

              <a
                href={item.href ?? "#"}
                className="mt-6 inline-flex items-center rounded-full bg-cardinal px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7d0000]"
              >
                Explore
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
