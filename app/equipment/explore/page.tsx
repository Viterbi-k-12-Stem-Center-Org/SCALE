import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  EquipmentInventoryGrid,
  defaultEquipmentInventoryItems
} from "@/components/EquipmentInventoryGrid";

export default function EquipmentExplorePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <PageHero
        eyebrow="Equipment Explore"
        title="Explore the STEM equipment catalog"
        description="Browse the inventory used to support classrooms, clubs, and partner programs. This page keeps the same USC Viterbi visual language while focusing on equipment discovery and lending support."
        primaryCta={{ label: "Request Access", href: "/login" }}
        secondaryCta={{ label: "Back to Equipment", href: "/equipment" }}
      />
      
      <EquipmentInventoryGrid items={defaultEquipmentInventoryItems} />
      <Footer />
    </main>
  );
}
