import type { LessonPlan } from "@/data/lessonPlansCsv";

type LessonPlanCardProps = {
  lesson: LessonPlan;
};

export function LessonPlanCard({ lesson }: LessonPlanCardProps) {
  return (
    <article className="surface-card group flex h-full flex-col justify-between p-6 hover:-translate-y-1 hover:border-cardinal/25">
      <div className="space-y-4">
        <span className="w-fit rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
          {lesson.gradeLevel}
        </span>

        <div className="space-y-3">
          <h3 className="font-display text-2xl text-ink">{lesson.title}</h3>
          <p className="text-sm leading-7 text-stone-600">{lesson.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
          <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">
            {lesson.subject}
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">
            {lesson.duration}
          </span>
        </div>
      </div>

      <a
        href={lesson.fileUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-cardinal hover:text-cardinal"
      >
        View
      </a>
    </article>
  );
}
