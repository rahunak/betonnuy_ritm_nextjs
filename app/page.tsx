import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AdvantageSection from "@/components/AdvantageSection";
import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ServicesSection />
      <AdvantageSection />
      <PortfolioSection />
      <Footer />
    </main>
  );
}
