import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";

const articles = [
  {
    title: "Building Capacity for Teaching Engineering in K-12 Education",
    description: "A brief overview of advancing engineering education in K–12 STEM learning.",
    tag: "Book",
    link: "https://www.nationalacademies.org/projects/NAE-NAE-15-01/publication/25612"
  },
  {
    title: "Early AI Literacy in Culturally Responsive STEM Outreach for Black Youth",
    description: "Insights into equitable STEM outreach, AI education, and youth engagement.",
    tag: "Journal Article",
    link: "https://arxiv.org/pdf/2605.12355"
  },
  {
    title: "A USC Blueprint for Expanding the College Pipeline",
    description: "A look at educational equity, access, and college pathway development.",
    tag: "Magazine Article",
    link: "https://socialjustice.usc.edu/wp-content/uploads/2020/08/USC-Blueprint-for-Expanding-the-College-Pipeline-Report.pdf"
  }
];

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Link href="https://www.mendeley.com/search/"><PageHero
        eyebrow="Articles"
        title="Mendeley"
        description="As part of K–12 STEM’s commitment to supporting research and scholarly writing, this page links to Mendeley, a free citation and reference management tool that helps users organize research, manage citations, and access their work anywhere online."
      /></Link>

      <section className="py-16">
        <div className="section-shell grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="surface-card p-6">
              <span className="w-fit rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
                {article.tag}
              </span>
              <h2 className="mt-4 font-display text-2xl text-ink">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {article.description}
              </p>
              <Link href={article.link}
                  target="_blank"
                  className="mt-6 inline-flex items-center rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-cardinal hover:text-cardinal"
                >
                View
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
