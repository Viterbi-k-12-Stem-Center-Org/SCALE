import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

const resources = [
  {
    title: "Partner Guides",
    description: "Operational guidance for schools, clubs, and community programs."
  },
  {
    title: "Implementation Notes",
    description: "Practical notes that support smooth classroom or lab deployment."
  },
  {
    title: "Reference Library",
    description: "Curated academic and pedagogical references for deeper study."
  },
  {
    title: "Printable Materials",
    description: "Handouts, checklists, and templates for planning and facilitation."
  }
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <PageHero
        eyebrow="Resources"
        title="Supporting materials for teachers and partner institutions"
        description="The resources section brings together guides, references, and implementation materials so the portal feels complete and easy to navigate."
      />

      <section className="py-16">
        <div className="section-shell grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {resources.map((resource) => (
            <article key={resource.title} className="surface-card p-6">
              <h2 className="font-display text-2xl text-ink">{resource.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {resource.description}
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-cardinal hover:text-cardinal"
              >
                View
              </a>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
