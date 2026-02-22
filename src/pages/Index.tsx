import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RaaSSection from "@/components/RaaSSection";
import SpecificationsSection from "@/components/SpecificationsSection";
import UseCasesSection from "@/components/UseCasesSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import ROICalculator from "@/components/ROICalculator";
import Footer from "@/components/Footer";
import AamirLayerPreview from "@/components/AamirLayerPreview";

const Index = () => {
  const isLegacyByQuery =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("preview") === "legacy";

  if (!isLegacyByQuery) {
    return <AamirLayerPreview />;
  }

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RaaSSection />
        <SpecificationsSection />
        <ROICalculator />
        <UseCasesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
