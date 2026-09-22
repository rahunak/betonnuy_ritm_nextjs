import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AdvantageSection from "@/components/AdvantageSection";
import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

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
