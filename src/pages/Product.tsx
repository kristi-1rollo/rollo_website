import { Link } from "react-router-dom";
import { Navigation, Eye, Plug, Cloud, Shield, XCircle, Snowflake, Disc3, PiggyBank } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useContactForm, DEPLOYMENT_AREA_OPTIONS } from "@/hooks/useContactForm";
import { SpecsBlueprint } from "@/components/SpecsBlueprint";
import { LiveScanner } from "@/components/LiveScanner";
import FadeInView from "@/components/FadeInView";
import rolloRenderP006 from "@/assets/robot/rollo-render-p006.png";
import rolloFrontP010 from "@/assets/robot/rollo-front-p010.png";

const problems = [
  {
    icon: XCircle,
    title: "Escalating Security Labor Costs",
    text: "Security labor costs keep rising while efficiency stays flat.",
  },
  {
    icon: XCircle,
    title: "Human Performance Bottlenecks",
    text: "Human-level perception and edge intelligence can't scale with demand.",
  },
  {
    icon: XCircle,
    title: "Cost-Reliability Imbalance",
    text: "Autonomous robots now deliver higher reliability at a fraction of the cost.",
  },
];

const solutions = [
  {
    icon: Snowflake,
    title: "Extreme-Environment Advantage",
    text: "Engineered for Estonia's harsh climate: rain, snow, ice, and sub-zero temperatures, proving reliability where others fail.",
  },
  {
    icon: Disc3,
    title: "Gyroscopic Innovation",
    text: "First-in-the-world gyroscope-based stabilization enabling a truly autonomous one-wheeled robot.",
  },
  {
    icon: PiggyBank,
    title: "Cost-Efficient Robots",
    text: "Fewer hardware components make ROLLO lighter, simpler, and cheaper than wheeled robots or humanoids.",
  },
  {
    icon: Shield,
    title: "Ground Advantages",
    text: "Ground-based autonomy delivers far longer operating time and weather independence compared to drones.",
  },
];

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
      <section className="section-glow-top relative w-full min-h-[80svh] md:min-h-0 flex items-center overflow-hidden">
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
              <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
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
            <div className="relative hidden md:flex flex-1 min-w-0 justify-center">
              <div className="hero-robot-glow left-[18%] bottom-[8%]" />
              <img
                src="/hero/rollo-1.png"
                alt="ROLLO F6 autonomous patrol robot"
                className="relative z-10 w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* B) Problem */}
      <section className="section-glow-top relative w-full overflow-hidden py-16 md:py-24">
        <img
          src="/graph/pilt-1.jpg"
          alt="Security guard"
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070c]/76 via-[#05070c]/42 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/22" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <FadeInView>
            <p className="text-xs uppercase tracking-[0.2em] text-red-500 mb-2">
              Problem
            </p>
            <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 max-w-2xl">
              Why Conventional Patrol No Longer Scales
            </h2>
            <div className="grid grid-cols-1 gap-4 max-w-2xl">
              {problems.map((p, i) => {
                const Icon = p.icon;
                return (
                  <FadeInView key={p.title} delay={i * 100}>
                    <div className="blue-card-glow flex min-h-[100px] items-start gap-4 rounded-2xl p-5 backdrop-blur-sm">
                      <div className="shrink-0 rounded-full bg-red-500/10 p-2.5 text-red-500">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white">{p.title}</p>
                        <p className="text-sm text-white/60 mt-1">{p.text}</p>
                      </div>
                    </div>
                  </FadeInView>
                );
              })}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* C) Solution */}
      <section className="section-glow-top relative w-full overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_24%_18%,rgba(20,58,148,0.12),transparent_52%),linear-gradient(180deg,rgba(1,8,20,0.18),rgba(0,0,0,0.08))]" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[560px]">
          <div className="relative z-10 flex flex-col justify-center lg:pr-8">
            <FadeInView>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
                Solution
              </p>
              <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 max-w-2xl">
                A Fundamentally Better Way to Build Patrol Robots
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {solutions.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <FadeInView key={s.title} delay={i * 100}>
                      <div className="blue-card-glow flex min-h-[132px] items-start gap-4 rounded-2xl p-5">
                        <div className="shrink-0 rounded-full bg-primary/10 p-2.5 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white">{s.title}</p>
                          <p className="text-sm text-white/60 mt-1">{s.text}</p>
                        </div>
                      </div>
                    </FadeInView>
                  );
                })}
              </div>
            </FadeInView>
          </div>

          <div className="relative hidden lg:flex items-end justify-center py-8">
            <div className="hero-robot-glow left-[18%] bottom-[18%]" />
            <div className="hero-robot-glow right-[10%] bottom-[24%] scale-[0.82] opacity-70" />
            <img
              src={rolloRenderP006}
              alt="ROLLO rear view"
              className="h-[480px] object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.06)] -mr-12 mb-6 relative z-0"
            />
            <img
              src={rolloFrontP010}
              alt="ROLLO front view"
              className="h-[640px] object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.06)] relative z-10"
            />
          </div>
        </div>
      </section>

      {/* D) Built for Real-World Environments */}
      <section className="section-glow-top max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center md:text-left">
        <div className="space-y-6">
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Built for Real-World Environments
          </h2>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto md:mx-0">
            ROLLO F6 is engineered for demanding outdoor conditions and large operational areas.
            The robot patrols autonomously, navigates obstacles, collects operational data, and
            analyzes its surroundings in real time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="blue-card-glow rounded-2xl p-6">
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

            <div className="blue-card-glow rounded-2xl p-6">
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

            <div className="blue-card-glow rounded-2xl p-6">
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

      {/* E) Intelligent Situational Awareness */}
      <section className="section-glow-top max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center md:text-left">
        <FadeInView>
          <div className="space-y-6">
            <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white">
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

      {/* F) More Than a Robot: A Security Platform */}
      <section className="section-glow-top max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center md:text-left">
        <div className="space-y-6">
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            More Than a Robot: A Security Platform
          </h2>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto md:mx-0">
            ROLLO F6 is part of a scalable autonomous security ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="blue-card-glow rounded-2xl p-6">
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

            <div className="blue-card-glow rounded-2xl p-6">
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

            <div className="blue-card-glow rounded-2xl p-6">
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

      {/* G) Technical Specifications */}
      <section className="section-glow-top max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <FadeInView>
          <SpecsBlueprint />
        </FadeInView>
      </section>


      {/* H) Priority Reservation */}
      <section className="section-glow-top max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="surface-panel rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Priority Reservation
            </h2>
            <p className="text-base md:text-lg text-slate-300 mb-6">
              Secure your free priority reservation for ROLLO F6
            </p>
          </div>

          <div className="blue-card-glow rounded-xl p-6 mb-8">
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
                  className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
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
                  className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
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
                  className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
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
                  className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
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
                className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
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
                className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none"
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
                className="form-field-deep w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none resize-none"
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
