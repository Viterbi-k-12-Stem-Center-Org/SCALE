import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

const values = [
  {
    title: "Academic rigor",
    description:
      "Lessons and materials are curated with instructional alignment and classroom usability in mind."
  },
  {
    title: "Partner support",
    description:
      "Schools and community organizations get practical guidance for implementation, lending, and follow-through."
  },
  {
    title: "Access and clarity",
    description:
      "The portal is designed to make STEM assets easier to discover, understand, and bring into practice."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <PageHero
        eyebrow="About SCALE"
        title="SCALE: A centralized STEM resource hub for educators and partners"
        description="SCALE supports the USC Viterbi K-12 STEM Center mission by organizing lessons, equipment, and related resources into a clean, university-style portal that is easy to browse and built for practical classroom use."
      />

      <section className="py-16">
        <div className="section-shell grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <article key={item.title} className="surface-card p-6">
              <h2 className="font-display text-2xl text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
