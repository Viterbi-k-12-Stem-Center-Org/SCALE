const featuredItems = [
  {
    title: "Robotics Launch Sequence",
    description:
      "A guided introduction to robotics systems thinking with classroom facilitation notes and setup guidance.",
    tag: "Grade 6 • Robotics"
  },
  {
    title: "Portable Sensor Kit Lending Guide",
    description:
      "Review checkout expectations, technical specifications, and lesson integration ideas for sensor-based labs.",
    tag: "Equipment • Physics"
  },
  {
    title: "Engineering Design Reflection Prompts",
    description:
      "Research-informed prompts that help students connect design iteration with communication and teamwork.",
    tag: "Article • Pedagogy"
  },
  {
    title: "Bridge Building Challenge",
    description:
      "A project-based lesson with printable materials, facilitation timing, and NGSS-aligned learning outcomes.",
    tag: "Grade 3 • Engineering"
  },
  {
    title: "Computer Vision Starter Set",
    description:
      "Recommended hardware, setup notes, and support documents for introductory computer vision experiences.",
    tag: "Resource • AI"
  },
  {
    title: "After-School STEM Implementation Toolkit",
    description:
      "A practical collection of planning templates for extending classroom learning into community programs.",
    tag: "Partner Resource"
  }
];

export function FeaturedContent() {
  return (
    <section className="py-20">
      <div className="section-shell space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cardinal">
              Featured Content
            </p>
            <h2 className="section-heading">
              Current highlights for educators and partners
            </h2>
          </div>
          <p className="section-copy lg:max-w-2xl">
            Spotlighted materials surface timely lessons, equipment guides, and
            supporting scholarship to help partners move from planning to
            implementation with confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredItems.map((item) => (
            <article
              key={item.title}
              className="surface-card flex h-full flex-col gap-5 p-6 hover:-translate-y-1 hover:border-cardinal/25"
            >
              <span className="w-fit rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
                {item.tag}
              </span>
              <div className="space-y-3">
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <p className="text-sm leading-7 text-stone-600">
                  {item.description}
                </p>
              </div>
              <a
                href="#"
                className="mt-auto inline-flex w-fit items-center rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-cardinal hover:text-cardinal"
              >
                View
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
