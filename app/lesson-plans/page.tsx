"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { Footer } from "@/components/Footer";
import { LessonPlanCard } from "@/components/LessonPlanCard";
import { PageHero } from "@/components/PageHero";
import {
  LESSON_PLANS_CSV_URL,
  getDurationBucketOptions,
  lessonMatchesDuration,
  normalizeText,
  normalizeGradeLevels,
  normalizeSubjects,
  parseCsv,
  parseDurationToMinutes,
  parseMultiValueField,
  rowsToLessonPlans,
  type LessonPlan
} from "@/data/lessonPlansCsv";

type FilterState = {
  gradeLevel: string;
  subject: string;
  duration: string;
};

const defaultFilters: FilterState = {
  gradeLevel: "",
  subject: "",
  duration: ""
};

function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function sortGradeOptions(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((left, right) => {
    if (left === "K") return -1;
    if (right === "K") return 1;
    return Number(left) - Number(right);
  });
}

function gradeSearchText(value: string) {
  return normalizeGradeLevels(value)
    .map((grade) => normalizeText(grade === "K" ? "grade k" : `grade ${grade}`))
    .join(" ");
}

function durationSearchText(value: string) {
  const normalized = normalizeText(value);
  const duration = parseDurationToMinutes(value);
  const tokens = [normalized];

  if (duration.min !== null) {
    tokens.push(String(duration.min), `${duration.min} minutes`);
  }

  if (duration.max !== null && duration.max !== duration.min) {
    tokens.push(String(duration.max), `${duration.max} minutes`);
  }

  return tokens.join(" ");
}

function createSearchBlob(lesson: LessonPlan) {
  return [
    lesson.title,
    lesson.description,
    gradeSearchText(lesson.gradeLevel),
    normalizeSubjects(lesson.subject).join(" "),
    durationSearchText(lesson.duration),
    parseMultiValueField(lesson.keywords.join(" ")).join(" ")
  ]
    .map((value) => normalizeText(value))
    .join(" ");
}

function scoreLessonForSearch(lesson: LessonPlan, query: string) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return 0;

  const title = normalizeText(lesson.title);
  const searchBlob = createSearchBlob(lesson);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  if (title === normalizedQuery) {
    return 10000;
  }

  let score = 0;

  if (title.startsWith(normalizedQuery)) score += 4000;
  if (title.includes(normalizedQuery)) score += 3000;
  if (searchBlob.includes(normalizedQuery)) score += 1200;

  const titleTokenHits = queryTokens.filter((token) => title.includes(token)).length;
  const blobTokenHits = queryTokens.filter((token) => searchBlob.includes(token)).length;

  score += titleTokenHits * 250;
  score += blobTokenHits * 80;

  return score;
}

function getRandomFeaturedLessons(items: LessonPlan[], count: number) {
  const pool = [...items];
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }

  return pool.slice(0, count);
}

function matchesFilters(lesson: LessonPlan, filters: FilterState) {
  const lessonGrades = normalizeGradeLevels(lesson.gradeLevel);
  const selectedGrades = normalizeGradeLevels(filters.gradeLevel);
  const lessonSubjects = normalizeSubjects(lesson.subject);
  const selectedSubjects = normalizeSubjects(filters.subject);

  const gradeMatches =
    !filters.gradeLevel ||
    (lessonGrades.length > 0 &&
      selectedGrades.length > 0 &&
      lessonGrades.some((grade) => selectedGrades.includes(grade)));

  const subjectMatches =
    !filters.subject ||
    (lessonSubjects.length > 0 &&
      selectedSubjects.length > 0 &&
      lessonSubjects.some((subject) =>
        selectedSubjects.some(
          (selected) => subject === selected || subject.includes(selected) || selected.includes(subject)
        )
      ));

  return (
    gradeMatches &&
    subjectMatches &&
    (!filters.duration || lessonMatchesDuration(lesson.duration, filters.duration))
  );
}

function searchLessons(lessons: LessonPlan[], query: string) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return lessons;
  }

  const exactTitleMatches = lessons.filter(
    (lesson) => normalizeText(lesson.title) === normalizedQuery
  );

  if (exactTitleMatches.length > 0) {
    return exactTitleMatches;
  }

  return lessons
    .map((lesson, index) => ({
      lesson,
      index,
      score: scoreLessonForSearch(lesson, normalizedQuery)
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map((entry) => entry.lesson);
}

export default function LessonPlansPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [featuredLessons, setFeaturedLessons] = useState<LessonPlan[]>([]);
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadLessonPlans() {
      try {
        setLoading(true);
        setLoadError("");

        const response = await fetch(LESSON_PLANS_CSV_URL, {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error(`Failed to load lesson plans: ${response.status}`);
        }

        const csvText = await response.text();
        const parsed = rowsToLessonPlans(parseCsv(csvText));

        if (!isMounted) return;

        setLessonPlans(parsed);
        setFeaturedLessons(getRandomFeaturedLessons(parsed, 4));
      } catch {
        if (!isMounted) return;

        setLessonPlans([]);
        setFeaturedLessons([]);
        setLoadError("Unable to load lesson plans right now.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLessonPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const filterOptions = useMemo(() => {
    return {
      gradeLevels: sortGradeOptions(
        lessonPlans.flatMap((lesson) => normalizeGradeLevels(lesson.gradeLevel))
      ),
      subjects: uniqueSorted(
        lessonPlans.flatMap((lesson) => normalizeSubjects(lesson.subject))
      ),
      durations: getDurationBucketOptions()
    };
  }, [lessonPlans]);

  const activeQuery = normalizeText(submittedQuery);
  const hasActiveFilters = Boolean(filters.gradeLevel || filters.subject || filters.duration);
  const isSearchActive = Boolean(activeQuery) || hasActiveFilters;

  const filteredLessons = useMemo(() => {
    if (!lessonPlans.length) {
      return [];
    }

    if (!isSearchActive) {
      return lessonPlans;
    }

    const matchingByFilter = lessonPlans.filter((lesson) => matchesFilters(lesson, filters));
    return searchLessons(matchingByFilter, activeQuery);
  }, [lessonPlans, isSearchActive, activeQuery, filters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: value
    }));
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedQuery(searchQuery.trim());
  };

  const handleReset = () => {
    setSearchQuery("");
    setSubmittedQuery("");
    setFilters(defaultFilters);
    if (lessonPlans.length) {
      setFeaturedLessons(getRandomFeaturedLessons(lessonPlans, 4));
    }
  };

  return (
    <main className="min-h-screen bg-white text-ink">
      <PageHero
        eyebrow="Lesson Plans"
        title="Classroom-ready plans aligned for easy implementation"
        description="Search lesson plans by title, description, grade level, subject, duration, and keywords."
      />

      <section className="py-8">
        <div className="section-shell">
          <div className="surface-card border-cardinal/10 bg-parchment/60 p-6 sm:p-8">
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex-1">
                  <span className="sr-only">Search lesson plans</span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search lesson plans, grade levels, subjects, keywords..."
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-cardinal px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7d0000]"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-cardinal hover:text-cardinal"
                  >
                    Clear / Reset
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                    Grade Level
                  </span>
                  <select
                    value={filters.gradeLevel}
                    onChange={(event) => updateFilter("gradeLevel", event.target.value)}
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                  >
                    <option value="">All Grade Levels</option>
                    {filterOptions.gradeLevels.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                    Subject
                  </span>
                  <select
                    value={filters.subject}
                    onChange={(event) => updateFilter("subject", event.target.value)}
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                  >
                    <option value="">All Subjects</option>
                    {filterOptions.subjects.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                    Duration
                  </span>
                  <select
                    value={filters.duration}
                    onChange={(event) => updateFilter("duration", event.target.value)}
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                  >
                    <option value="">All Durations</option>
                    {filterOptions.durations.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </form>
          </div>
        </div>
      </section>

      {!isSearchActive && featuredLessons.length > 0 ? (
        <section className="py-10">
          <div className="section-shell space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cardinal">
                Featured Lesson Plans
              </p>
              <h2 className="section-heading">A rotating preview of the lesson library</h2>
              <p className="section-copy">
                These four lesson plans are selected randomly each time the page loads
                so the preview changes naturally as educators revisit the library.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredLessons.map((lesson) => (
                <LessonPlanCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-20 pt-4">
        <div className="section-shell space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cardinal">
                {isSearchActive ? "Search Results" : "All Lesson Plans"}
              </p>
              <h2 className="section-heading">
                {isSearchActive
                  ? "Matching lesson plans"
                  : "Browse the full lesson plan library"}
              </h2>
              <p className="section-copy">
                {isSearchActive
                  ? "Results reflect the active search or selected filters."
                  : "All lesson plans are available below the preview when no search is active."}
              </p>
            </div>
            {isSearchActive ? (
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                Showing {filteredLessons.length} lesson plans
              </p>
            ) : null}
          </div>

          {loading ? (
            <div className="surface-card px-6 py-16 text-center text-stone-600">
              Loading lesson plans...
            </div>
          ) : loadError ? (
            <div className="surface-card border-dashed border-stone-300 bg-white px-6 py-16 text-center">
              <p className="text-lg font-semibold text-ink">{loadError}</p>
            </div>
          ) : filteredLessons.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredLessons.map((lesson) => (
                <LessonPlanCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          ) : (
            <div className="surface-card border-dashed border-stone-300 bg-white px-6 py-16 text-center">
              <p className="text-lg font-semibold text-ink">
                No lesson plans found. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
