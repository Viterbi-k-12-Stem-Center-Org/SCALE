import Link from "next/link";

import type { LessonPlan } from "@/data/lessonPlans";

type LessonPlanCardProps = {
  lesson: LessonPlan;
};

export function LessonPlanCard({ lesson }: LessonPlanCardProps) {
  const keywords = lesson.keywords;

  return (
    <article className="surface-card group flex h-full min-h-[20rem] flex-col justify-between p-6 sm:min-h-[22rem]">
      <div className="space-y-4">
        <span className="w-fit rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
          {lesson.gradeLevel || "Lesson Plan"}
        </span>

        <div className="space-y-3">
          <h2 className="font-display text-2xl text-ink">{lesson.title}</h2>
          <p
            className="text-sm leading-7 text-stone-600"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden"
            }}
          >
            {lesson.description || "Description coming soon."}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
          <span className="inline-flex w-fit rounded-full bg-stone-100 px-3 py-1 text-stone-700">
            {lesson.subject || "Subject TBD"}
          </span>
          <span className="inline-flex w-fit rounded-full bg-stone-100 px-3 py-1 text-stone-700">
            {lesson.duration || "Duration TBD"}
          </span>
        </div>

        {keywords.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {keywords.slice(0, 4).map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-parchment px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-stone-600"
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {lesson.fileUrl ? (
        <Link
          href={lesson.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-cardinal hover:text-cardinal"
        >
          View
        </Link>
      ) : (
        <span className="mt-8 inline-flex items-center justify-center rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-400">
          View
        </span>
      )}
    </article>
  );
}
