const filters = ["Grade Level", "Subject", "Resource Type"];

export function SearchBar() {
  return (
    <section className="py-8">
      <div className="section-shell">
        <div className="surface-card border-cardinal/10 bg-parchment/60 p-6 sm:p-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.8fr)_repeat(3,minmax(0,0.8fr))]">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                Search
              </span>
              <input
                type="search"
                placeholder="Search lesson plans, equipment, articles..."
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
              />
            </label>

            {filters.map((filter) => (
              <label key={filter} className="flex flex-col gap-2">
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                  {filter}
                </span>
                <select className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/10">
                  <option>{filter}</option>
                  <option>Elementary</option>
                  <option>Middle School</option>
                  <option>High School</option>
                </select>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
