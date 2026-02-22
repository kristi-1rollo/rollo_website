import { lazy, Suspense } from "react";
import AamirLayerPreview from "@/components/AamirLayerPreview";

const Header = lazy(() => import("@/components/Header"));
const HeroSection = lazy(() => import("@/components/HeroSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const RaaSSection = lazy(() => import("@/components/RaaSSection"));
const SpecificationsSection = lazy(() => import("@/components/SpecificationsSection"));
const UseCasesSection = lazy(() => import("@/components/UseCasesSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ROICalculator = lazy(() => import("@/components/ROICalculator"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const isLegacyByQuery =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("preview") === "legacy";

  if (!isLegacyByQuery) {
    return <AamirLayerPreview />;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
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
    </Suspense>
  );
};

export default Index;
