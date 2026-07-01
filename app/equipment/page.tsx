import Link from "next/link";

import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { EquipmentCarousel } from "@/components/EquipmentCarousel";
import { SectionContainer } from "@/components/SectionContainer";
import {
  roboticsEquipment,
  electronicsEquipment,
  kitsEquipment
} from "@/components/equipmentShowcaseData";


const equipmentItems = [
  {
    title: "Electronics",
    description: "Access laptops, tablets, and 3D printers that support coding, design, modeling, and hands-on prototyping.",
    link: "#electronics"
  },
  {
    title: "Robotics Sets",
    description: "Introductory robotics systems for classroom or club settings.",
    link: "#robotics"
  },
  {
    title: "Kits",
    description: "Reliable tools for experiments, labs, and student investigations.",
    link: "#kits"
  },
];

function CosmicEmbed({
  title,
  src,
  fallbackLabel,
  fallbackHref
}: {
  title: string;
  src: string;
  fallbackLabel: string;
  fallbackHref: string;
}) {
  return (
    <div className="surface-card overflow-hidden border-cardinal/10 bg-white p-0 shadow-soft">
      <div className="border-b border-stone-200 bg-parchment/40 px-5 py-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cardinal">
          {title}
        </p>
      </div>

      <div className="bg-stone-50 p-3 sm:p-4">
        <iframe
          src={src}
          title={title}
          className="h-[720px] w-full rounded-2xl border border-stone-200 bg-white shadow-sm sm:h-[860px] lg:h-[980px]"
          loading="lazy"
        />
      </div>

      <div className="border-t border-stone-200 px-5 py-4 sm:px-6">
        <p className="text-sm leading-7 text-stone-600">
          If the embedded preview does not load, open it directly here:{" "}
          <a
            href={fallbackHref}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-cardinal transition hover:underline"
          >
            {fallbackLabel}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default function EquipmentPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <PageHero
        eyebrow="Equipment"
        title="Browse STEM hardware and lending-ready tools"
        description="Equipment listings are organized for quick review, helping partners understand what is available and how each item supports classroom implementation."
      />

      <section className="py-10">
        <div className="section-shell">
          <div className="surface-card border-cardinal/10 bg-parchment/40 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cardinal">
              COSMIC-System
            </p>
            <h2 className="mt-4 font-display text-3xl text-ink">
              Inventory tracking and lending coordination
            </h2>
            <p className="mt-5 max-w-6xl text-lg leading-8 text-stone-600">
              <a
                href="https://vk12cosmic.myturn.com/library/inventory/browse"
                className="font-semibold text-gold transition hover:text-cardinal"
              >
                COSMIC-System
              </a>{" "}
              is the{" "}
              <a
                href="https://viterbik12.usc.edu/"
                className="font-semibold text-cardinal transition hover:underline"
              >
                USC Viterbi K-12 STEM Center&apos;s
              </a>{" "}
              inventory management platform for STEM kits and equipment. It
              supports inventory tracking, lending operations, and resource
              traceability to help partners manage classroom-ready STEM tools.
              For account access, please contact the K-12 STEM Center Office.
            </p>
            <br></br>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="surface-card p-6">
                <h3 className="font-display text-2xl text-ink">
                  COSMIC/MyTurn Inventory
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  Live browseable inventory and lending catalog for STEM equipment.
                </p>
                <a
                  href="https://vk12cosmic.myturn.com/library/inventory/browse"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center rounded-full bg-cardinal px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7d0000]"
                >
                  Open COSMIC/MyTurn
                </a>
              </article>

              <article className="surface-card p-6">
                <h3 className="font-display text-2xl text-ink">COSMIC Login</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  Login portal for COSMIC-System access and inventory management.
                </p>
                <a
                  href="https://vk12cosmic.org/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center rounded-full bg-cardinal px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7d0000]"
                >
                  Open COSMIC Login
                </a>
              </article>
            </div>

            <div className="mt-6 flex justify-center">
              <a
                href="#cosmic-myturn-inventory-preview"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cardinal/15 bg-white text-cardinal shadow-soft transition hover:-translate-y-0.5 hover:border-cardinal/30 hover:text-cardinal"
                aria-label="Jump to COSMIC/MyTurn Inventory Preview"
              >
                <span className="animate-bounce text-xl leading-none" aria-hidden="true">
                  &#8595;
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="cosmic-myturn-inventory-preview" className="py-5 scroll-mt-28">
        <div className="section-shell space-y-6">
          <div className="flex flex-col gap-6">
            <CosmicEmbed
              title="COSMIC/MyTurn Inventory Preview"
              src="https://vk12cosmic.myturn.com/library/inventory/browse"
              fallbackLabel="COSMIC/MyTurn Inventory"
              fallbackHref="https://vk12cosmic.myturn.com/library/inventory/browse"
            />
            <CosmicEmbed
              title="COSMIC Inventory Preview"
              src="https://vk12cosmic.org/#/inventory"
              fallbackLabel="COSMIC Inventory"
              fallbackHref="https://vk12cosmic.org/#/inventory"
            />
          </div>

          {/* Archived floating arrow indicator for later restoration.
          <div className="flex justify-center pb-2 pt-1">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white text-cardinal shadow-soft">
              <span className="text-2xl leading-none" aria-hidden="true">
                &#8595;
              </span>
            </div>
          </div>
          */}
        </div>
      </section>

      {/* Archived old showcase cards and section links for later restoration.
      <section className="py-5">
        <div className="section-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {equipmentItems.map((item) => (
            <article key={item.title} className="surface-card p-6">
              <h2 className="font-display text-2xl text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {item.description}
              </p>
              <Link
                href={item.link}
                target="_blank"
                className="mt-6 inline-flex items-center rounded-full bg-cardinal px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7d0000]"
              >
                Explore
              </Link>
            </article>
          ))}
        </div>
      </section>

      <SectionContainer
        id="robotics"
        eyebrow="Robotics"
        heading="Robotics equipment showcase"
        description="Compact robotics tools for classroom engineering and prototyping."
      >
        <EquipmentCarousel items={roboticsEquipment} />
      </SectionContainer>

      <SectionContainer
        id="electronics"
        eyebrow="Electronics"
        heading="Devices and digital fabrication tools"
        description="Access laptops, tablets, and 3D printers that support coding, design, modeling, and hands-on prototyping."
      >
        <EquipmentCarousel items={electronicsEquipment} />
      </SectionContainer>

      <SectionContainer
        id="kits"
        eyebrow="Kits"
        heading="Measurement kits for lab precision"
        description="Reliable measurement tools for repeatable classroom lab work."
      >
        <EquipmentCarousel items={kitsEquipment} />
      </SectionContainer>
      */}

      <Footer />
    </main>
  );
}
