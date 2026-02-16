import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RaaSSection from "@/components/RaaSSection";
import SpecificationsSection from "@/components/SpecificationsSection";
import UseCasesSection from "@/components/UseCasesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-foreground">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RaaSSection />
        <SpecificationsSection />
        <UseCasesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
