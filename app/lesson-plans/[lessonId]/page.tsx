import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { AUTH_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import {
  LESSON_PLANS_CSV_URL,
  getLessonPlanById,
  parseCsv,
  rowsToLessonPlans
} from "@/data/lessonPlans";

type LessonPlanDetailPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

async function loadLessonPlan(lessonId: string) {
  const response = await fetch(LESSON_PLANS_CSV_URL, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to load lesson plans: ${response.status}`);
  }

  const csvText = await response.text();
  const lessons = rowsToLessonPlans(parseCsv(csvText));
  return getLessonPlanById(lessons, lessonId);
}

export default async function LessonPlanDetailPage({
  params
}: LessonPlanDetailPageProps) {
  const { lessonId } = await params;
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const session = await verifySessionToken(sessionToken, process.env.SESSION_SECRET ?? "");

  if (!session || session.active === false) {
    redirect(`/login?next=/lesson-plans/${encodeURIComponent(lessonId)}`);
  }

  let lesson = null;

  try {
    lesson = await loadLessonPlan(lessonId);
  } catch {
    lesson = null;
  }

  if (!lesson) {
    return (
      <main className="min-h-screen bg-white text-ink">
        <PageHero
          eyebrow="Lesson Plans"
          title="Lesson plan not found"
          description="The selected lesson plan could not be loaded."
        />

        <section className="py-16">
          <div className="section-shell">
            <div className="surface-card p-8 text-center">
              <p className="text-lg font-semibold text-ink">
                We could not find that lesson plan.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  href="/lesson-plans"
                  className="inline-flex items-center justify-center rounded-full border border-cardinal px-6 py-3 text-sm font-semibold text-cardinal transition hover:bg-cardinal hover:text-white"
                >
                  Back to Lesson Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const documentUrl = `/api/lesson-plans/${encodeURIComponent(lesson.id)}/document`;

  return (
    <main className="min-h-screen bg-white text-ink">
      <PageHero
        eyebrow="Lesson Plans"
        title={lesson.title || "Lesson Plan"}
        description={lesson.description || "Secure lesson plan access through SCALE."}
      />

      <section className="py-16">
        <div className="section-shell space-y-6">
          <div className="surface-card flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cardinal">
                Lesson Plan Viewer
              </p>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                {lesson.title || "Lesson Plan"}
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`${documentUrl}?download=1`}
                className="inline-flex items-center justify-center rounded-full bg-cardinal px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7d0000]"
              >
                Download
              </a>
              <Link
                href="/lesson-plans"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-cardinal hover:text-cardinal"
              >
                Back to Library
              </Link>
            </div>
          </div>

          <div className="surface-card overflow-hidden p-3 sm:p-4">
            <iframe
              src={documentUrl}
              title={lesson.title || "Lesson plan document"}
              className="h-[85vh] w-full rounded-2xl border border-stone-200 bg-white"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
