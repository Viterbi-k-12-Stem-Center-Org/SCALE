import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SearchBar } from "@/components/SearchBar";
const lessons = [
  {
    title: "Bridge Building Challenge",
    description:
      "Hands-on engineering lesson with printable directions and setup notes.",
    tag: "Grade 3"
  },
  {
    title: "Intro to Robotics",
    description:
      "Student-friendly sequence for robotics fundamentals and teamwork.",
    tag: "Grade 6"
  },
  {
    title: "Energy Systems Lab",
    description:
      "A classroom lab focused on energy transfer, measurement, and reflection.",
    tag: "Physics"
  },
  {
    title: "Data Visualization Mini-Unit",
    description:
      "Lesson sequence for gathering, visualizing, and interpreting STEM data.",
    tag: "Middle School"
  }
];

export default function LessonPlansPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <PageHero
        eyebrow="Lesson Plans"
        title="Classroom-ready plans aligned for easy implementation"
        description="Browse the lesson plan collection for structured, teacher-friendly materials that support active STEM learning across grade levels."
      />
      <SearchBar />
      <section className="py-16">
        <div className="section-shell">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {lessons.map((lesson) => (
              <article key={lesson.title} className="surface-card p-6">
                <span className="w-fit rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
                  {lesson.tag}
                </span>
                <h2 className="mt-4 font-display text-2xl text-ink">
                  {lesson.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {lesson.description}
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
