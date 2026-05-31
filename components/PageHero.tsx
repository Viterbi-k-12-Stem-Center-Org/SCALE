type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta
}: PageHeroProps) {
  return (
    <section className="border-b border-stone-200 bg-hero-glow">
      <div className="section-shell py-16 lg:py-20">
        <div className="surface-card overflow-hidden p-8 sm:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cardinal">
            {eyebrow}
          </p>
          <div className="mt-4 max-w-4xl space-y-5">
            <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-stone-600 sm:text-lg">
              {description}
            </p>
          </div>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <a
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-cardinal px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7d0000]"
                >
                  {primaryCta.label}
                </a>
              ) : null}
              {secondaryCta ? (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-cardinal hover:text-cardinal"
                >
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
