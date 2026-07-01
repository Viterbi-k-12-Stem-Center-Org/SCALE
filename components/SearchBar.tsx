"use client";

type SearchBarProps = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearchSubmit: () => void;
  onReset: () => void;
  filters: {
    gradeLevel: string;
    subject: string;
    duration: string;
  };
  onFilterChange: (key: "gradeLevel" | "subject" | "duration", value: string) => void;
  options: {
    gradeLevels: string[];
    subjects: string[];
    durations: string[];
  };
};

export function SearchBar({
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
  onReset,
  filters,
  onFilterChange,
  options
}: SearchBarProps) {
  return (
    <section className="py-8">
      <div className="section-shell">
        <div className="surface-card border-cardinal/10 bg-parchment/60 p-6 sm:p-8">
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              onSearchSubmit();
            }}
          >
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-end">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Search
                </span>
                <input
                  type="search"
                  placeholder="Search lesson plans..."
                  value={searchQuery}
                  onChange={(event) => onSearchQueryChange(event.target.value)}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                />
              </label>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cardinal px-6 text-sm font-semibold text-white transition hover:bg-[#7d0000]"
              >
                Search
              </button>

              <button
                type="button"
                onClick={onReset}
                className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-sm font-semibold text-stone-700 transition hover:border-cardinal hover:text-cardinal"
              >
                Clear / Reset
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Grade Level",
                  key: "gradeLevel" as const,
                  options: options.gradeLevels,
                  allLabel: "All Grade Levels"
                },
                {
                  label: "Subject",
                  key: "subject" as const,
                  options: options.subjects,
                  allLabel: "All Subjects"
                },
                {
                  label: "Duration",
                  key: "duration" as const,
                  options: options.durations,
                  allLabel: "All Durations"
                }
              ].map((filter) => (
                <label key={filter.label} className="flex flex-col gap-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                    {filter.label}
                  </span>
                  <select
                    value={filters[filter.key]}
                    onChange={(event) => onFilterChange(filter.key, event.target.value)}
                    className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                  >
                    <option value="">{filter.allLabel}</option>
                    {filter.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
