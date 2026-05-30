import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <PageHero
        eyebrow="Login"
        title="Access the partner portal or request a new account"
        description="Approved partners can sign in to manage access and requests. New organizations can request sign-up using the same page."
      />

      <section className="py-16">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <article className="surface-card p-6 sm:p-8">
            <h2 className="font-display text-3xl text-ink">Login</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              Use your partner credentials to access the portal.
            </p>
            <form className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-stone-700">
                  Email
                </span>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                  placeholder="name@school.edu"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-stone-700">
                  Password
                </span>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                  placeholder="Enter password"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-cardinal px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7d0000]"
              >
                Sign In
              </button>
            </form>
          </article>

          <article className="surface-card p-6 sm:p-8">
            <h2 className="font-display text-3xl text-ink">Request Sign-Up</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              Not yet a partner? Request access to start the onboarding process.
            </p>
            <form className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-stone-700">
                  Organization
                </span>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                  placeholder="School, district, or partner name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-stone-700">
                  Contact Email
                </span>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                  placeholder="contact@organization.org"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-stone-700">
                  Request Details
                </span>
                <textarea
                  rows={4}
                  className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-cardinal focus:ring-2 focus:ring-cardinal/10"
                  placeholder="Tell us how you plan to use SCALE resources."
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-cardinal px-6 py-3 text-sm font-semibold text-cardinal transition hover:bg-cardinal hover:text-white"
              >
                Request Access
              </button>
            </form>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
