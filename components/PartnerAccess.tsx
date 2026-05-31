export function PartnerAccess() {
  return (
    <section id="partner-access" className="py-10">
      <div className="section-shell">
        <div className="surface-card overflow-hidden border-cardinal/10">
          <div className="grid gap-6 bg-gradient-to-r from-cardinal to-[#6e0000] p-8 text-white lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:p-10">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/75">
                Partner Access Portal
              </p>
              <h2 className="font-display text-3xl sm:text-4xl">
                Secure entry for lending, requests, and collaboration
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                Partner institutions can log in to manage resource requests, access implementation materials, and coordinate directly with the
                USC Viterbi K-12 STEM Center team.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href="/login"
                className="inline-flex min-w-44 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-cardinal transition hover:-translate-y-0.5"
              >
                Login
              </a>
              <a
                href="/login"
                className="inline-flex min-w-44 items-center justify-center rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request Access
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
