import { Link } from "react-router-dom";
import { Navigation, Eye, Plug, Cloud, Shield } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useContactForm, DEPLOYMENT_AREA_OPTIONS } from "@/hooks/useContactForm";
import { SpecsBlueprint } from "@/components/SpecsBlueprint";
import { LiveScanner } from "@/components/LiveScanner";
import FadeInView from "@/components/FadeInView";

const Product = () => {
  const {
    formData,
    isSubmitting,
    handleInputChange,
    handleDeploymentAreaToggle,
    handleSubmit,
  } = useContactForm({
    requiredFields: ["company", "country", "numberOfRobots", "deploymentAreas"],
    successMessage: "Thank you for your reservation! We'll be in touch soon.",
  });

  return (
    <div className="pt-24 pb-16">
      {/* A) Hero / Intro */}
      <section className="relative w-full min-h-[80svh] md:min-h-0 flex items-center overflow-hidden">
        {/* Mobile: robot as immersive background */}
        <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
          <img
            src="/hero/rollo-1.png"
            alt=""
            className="h-[70%] max-h-[500px] object-contain opacity-[0.12]"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 w-full">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 min-w-0 space-y-6 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                ROLLO F6: The Future of Autonomous Security
              </h1>
              <p className="text-xl md:text-2xl text-[#B4FF33] font-medium">
                Continuous patrol. Intelligent awareness. Autonomy that empowers people.
              </p>

              <div className="space-y-4 text-base md:text-lg text-slate-300">
                <p>
                  The ROLLO F6 is a next-generation autonomous patrol robot designed to deliver continuous
                  situational awareness and reliable security in environments where traditional solutions are
                  no longer sufficient. Combining autonomous mobility, artificial intelligence, and cloud-based
                  fleet management, ROLLO F6 forms a unified security platform that protects territories around
                  the clock and without compromise.
                </p>

                <p>
                  ROLLO F6 is not designed to replace human personnel entirely. Instead, it enhances human
                  capabilities by handling routine patrol tasks, maintaining continuous presence, and enabling
                  security teams to focus on critical decision-making and response.
                </p>
              </div>

              <div className="flex justify-center md:justify-start">
                <Link
                  to="/contact"
                  className="min-h-11 rounded-xl bg-[#B4FF33] px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition inline-flex items-center"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Desktop: robot image side-by-side */}
            <div className="hidden md:flex flex-1 min-w-0 justify-center">
              <img
                src="/hero/rollo-1.png"
                alt="ROLLO F6 autonomous patrol robot"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* B) Built for Real-World Environments */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center md:text-left">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Built for Real-World Environments
          </h2>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto md:mx-0">
            ROLLO F6 is engineered for demanding outdoor conditions and large operational areas.
            The robot patrols autonomously, navigates obstacles, collects operational data, and
            analyzes its surroundings in real time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#B4FF33]/10 p-2 text-[#B4FF33] mt-1">
                  <Navigation className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Autonomous Navigation
                  </h3>
                  <p className="text-sm text-slate-300">
                    Patrols autonomously and navigates obstacles in complex outdoor environments
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#B4FF33]/10 p-2 text-[#B4FF33] mt-1">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Real-Time Data Collection
                  </h3>
                  <p className="text-sm text-slate-300">
                    Collects and analyzes actionable security data in real time during patrols
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#B4FF33]/10 p-2 text-[#B4FF33] mt-1">
                  <Plug className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Autonomous Docking
                  </h3>
                  <p className="text-sm text-slate-300">
                    Autonomous docking and charging enable continuous operation with minimal human intervention
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C) Intelligent Situational Awareness */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center md:text-left">
        <FadeInView>
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Intelligent Situational Awareness
            </h2>

            <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto md:mx-0">
              Powered by advanced artificial intelligence, the robot continuously monitors its environment and detects:
            </p>

            <LiveScanner />

            <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto md:mx-0">
              All events are available through a real-time remote monitoring interface, enabling
              faster and more accurate response by security teams.
            </p>
          </div>
        </FadeInView>
      </section>

      {/* D) More Than a Robot: A Security Platform */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center md:text-left">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            More Than a Robot: A Security Platform
          </h2>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto md:mx-0">
            ROLLO F6 is part of a scalable autonomous security ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#B4FF33]/10 p-2 text-[#B4FF33] mt-1">
                  <Cloud className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Fleet Management
                  </h3>
                  <p className="text-sm text-slate-300">
                    Centralized cloud platform for managing multiple robots, defining patrol
                    routes, and monitoring performance
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#B4FF33]/10 p-2 text-[#B4FF33] mt-1">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Remote Supervision
                  </h3>
                  <p className="text-sm text-slate-300">
                    Real-time access to robot status, live feeds, and event logs from anywhere
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#B4FF33]/10 p-2 text-[#B4FF33] mt-1">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Open API Integration
                  </h3>
                  <p className="text-sm text-slate-300">
                    Connect ROLLO F6 to existing security management systems, VMS, and third-party tools
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto md:mx-0 mt-6">
            The platform integrates seamlessly into existing security environments — from private
            enterprises to national infrastructure operators.
          </p>
        </div>
      </section>

      {/* E) Technical Specifications */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <FadeInView>
          <SpecsBlueprint />
        </FadeInView>
      </section>


      {/* G) Priority Reservation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="rounded-2xl border border-[#B4FF33]/30 bg-[#B4FF33]/5 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Priority Reservation
            </h2>
            <p className="text-base md:text-lg text-slate-300 mb-6">
              Secure your free priority reservation for ROLLO F6
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">
              What You Get:
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-[#B4FF33] mt-0.5">✓</span>
                <span>Secures priority access when ordering opens</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B4FF33] mt-0.5">✓</span>
                <span>Provides early production allocation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B4FF33] mt-0.5">✓</span>
                <span>Does not create any obligation to purchase or rent</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="res-name" className="block text-sm font-medium text-white mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="res-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="res-email" className="block text-sm font-medium text-white mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="res-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="res-company" className="block text-sm font-medium text-white mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="res-company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="res-country" className="block text-sm font-medium text-white mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  id="res-country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
                  placeholder="Your country"
                />
              </div>
            </div>

            {/* Reservation Details */}
            <div>
              <label htmlFor="res-numberOfRobots" className="block text-sm font-medium text-white mb-2">
                Number of Robots to Reserve *
              </label>
              <input
                type="number"
                id="res-numberOfRobots"
                name="numberOfRobots"
                required
                min="1"
                value={formData.numberOfRobots}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
                placeholder="e.g., 5"
              />
            </div>

            <div>
              <label htmlFor="res-estimatedDemand" className="block text-sm font-medium text-white mb-2">
                Estimated Robot Demand Within the Next 5 Years
              </label>
              <input
                type="text"
                id="res-estimatedDemand"
                name="estimatedDemand"
                value={formData.estimatedDemand}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent"
                placeholder="e.g., 20-50 units"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Intended Area of Deployment *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DEPLOYMENT_AREA_OPTIONS.map((area) => (
                  <div key={area} className="flex items-start gap-2">
                    <Checkbox
                      id={`res-${area}`}
                      checked={formData.deploymentAreas.includes(area)}
                      onCheckedChange={() => handleDeploymentAreaToggle(area)}
                      className="mt-1 border-white/20 data-[state=checked]:bg-[#B4FF33] data-[state=checked]:border-[#B4FF33] data-[state=checked]:text-black"
                    />
                    <label
                      htmlFor={`res-${area}`}
                      className="text-sm text-slate-300 cursor-pointer leading-tight"
                    >
                      {area}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="res-additionalInfo" className="block text-sm font-medium text-white mb-2">
                Additional Information
              </label>
              <textarea
                id="res-additionalInfo"
                name="additionalInfo"
                rows={4}
                value={formData.additionalInfo}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#B4FF33] focus:border-transparent resize-none"
                placeholder="Any additional details about your use case or requirements..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-12 rounded-xl bg-[#B4FF33] px-6 py-3 text-base font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Reservation"}
              </button>
              <p className="text-center text-sm text-slate-400 mt-3">
                No obligation • Free reservation • Cancel anytime
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Product;
