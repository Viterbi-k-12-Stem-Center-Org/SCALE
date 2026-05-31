import { CardGrid } from "@/components/CardGrid";
import { FeaturedContent } from "@/components/FeaturedContent";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PartnerAccess } from "@/components/PartnerAccess";
/* import { SearchBar } from "@/components/SearchBar";*/

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Hero />
      <CardGrid />
      <FeaturedContent />
      <PartnerAccess />
      <Footer />
    </main>
  );
}
