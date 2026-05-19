import { Navigation, Eye, Plug, Cloud, Shield, Snowflake, Disc3, PiggyBank, TrendingUp, Users, Scale, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SpecsBlueprint } from "@/components/SpecsBlueprint";
import { LiveScanner } from "@/components/LiveScanner";
import FadeInView from "@/components/FadeInView";
import { ScrollControlledVideo } from "@/components/ScrollControlledVideo";
import { Section, SectionTag } from "@/components/ui/section";

const problems = [
  {
    icon: TrendingUp,
    title: "Escalating Security Labor Costs",
    text: "Security labor costs keep rising while efficiency stays flat.",
  },
  {
    icon: Users,
    title: "Human Performance Bottlenecks",
    text: "Human-level perception and edge intelligence can't scale with demand.",
  },
  {
    icon: Scale,
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
  return (
    <div className="pb-28 md:pb-56">
      {/* A) Hero / Intro */}
      <section className="section-glow-top relative w-full h-[100vh] flex items-center overflow-hidden">
        <img
          src="/robot/F6/1rollo_auto_sec.webp"
          alt="Rollo autonomous security robot on patrol"
          className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* Mobile: stronger gradient for better text contrast */}
        <div className="absolute inset-y-0 left-0 md:hidden w-full bg-[linear-gradient(90deg,rgba(2,6,13,0.95)_0%,rgba(2,6,13,0.88)_28%,rgba(2,6,13,0.62)_58%,rgba(2,6,13,0.28)_88%)]" />
        {/* Desktop gradients - blur effect on left for text */}
        <div className="absolute inset-y-0 left-0 hidden md:block w-[55%] bg-[linear-gradient(90deg,rgba(2,6,13,0.92)_0%,rgba(2,6,13,0.78)_34%,rgba(2,6,13,0.26)_74%,rgba(2,6,13,0.06)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] bg-[radial-gradient(circle_at_24%_42%,rgba(2,6,14,0.84)_0%,rgba(3,8,18,0.72)_28%,rgba(4,10,24,0.34)_54%,rgba(0,0,0,0)_82%)]" />
        <div className="absolute -top-24 left-[12%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(38,93,214,0.22)_0%,rgba(0,0,0,0)_72%)] blur-3xl" />

        <div className="relative z-10 max-w-6xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto w-full px-6 py-24 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 md:space-y-6 text-center md:mx-0 md:items-start md:text-left">
            <SectionTag>Product</SectionTag>

            <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white max-w-2xl mb-6 md:mb-0">
              Autonomous Security, Built for the Real World
            </h1>

            <div className="flex items-center gap-3 sm:gap-4 max-w-md w-full">
              <span className="h-px flex-1 bg-white/25" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary whitespace-nowrap">
                1ROLLO
              </span>
              <span className="h-px flex-1 bg-white/25" />
            </div>

            <p className="max-w-xl text-sm sm:text-base md:text-lg text-slate-300">
              Continuous patrol, intelligent awareness, and lower operating cost in one autonomous ground platform.
            </p>
          </div>
        </div>
      </section>

      {/* B) Technical Specifications */}
      <Section className="section-glow-top pt-20 md:pt-36 pb-20 md:pb-44">
        <FadeInView>
          <SpecsBlueprint />
        </FadeInView>
      </Section>

      {/* E) Expandable Platform */}
      <Section className="section-glow-top pt-20 md:pt-36 pb-20 md:pb-44">
        <FadeInView>
          <div>
            <div className="px-6 md:px-0 mb-16 md:mb-20">
              <SectionTag>Platform</SectionTag>
              <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3 mb-5 md:mb-6">
                Expandable Platform
              </h2>

              <p className="text-base md:text-lg text-slate-300 max-w-3xl">
                Compatible with mission-specific systems and payload integrations.
              </p>
            </div>

            <LiveScanner />
          </div>
        </FadeInView>
      </Section>

      {/* C) Built for Real-World Environments */}
      <Section className="section-glow-top pt-20 md:pt-36 pb-28 md:pb-44">
        <div>
          <div className="px-6 md:px-0 mb-16 md:mb-20">
            <SectionTag>Capabilities</SectionTag>
            <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3 mb-5 md:mb-6">
              Built for Real-World Environments
            </h2>

            <p className="text-base md:text-lg text-slate-300 max-w-3xl">
              1ROLLO is engineered for demanding outdoor conditions and large operational areas.
              The robot patrols autonomously, navigates obstacles, collects operational data, and
              analyzes its surroundings in real time.
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="blue-card-glow rounded-2xl p-6 md:p-8 min-h-[140px] md:min-h-[220px]">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#B4FF33]/10 p-2 text-[#B4FF33] mt-1">
                  <Disc3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Patent Pending Innovations
                  </h3>
                  <p className="text-sm text-slate-300">
                    Proprietary hardware and software method enables stable autonomous motion on a single wheel
                  </p>
                </div>
              </div>
            </div>

              <div className="blue-card-glow rounded-2xl p-6 md:p-8 min-h-[140px] md:min-h-[220px]">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#B4FF33]/10 p-2 text-[#B4FF33] mt-1">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Intelligent Situational Awareness
                  </h3>
                  <p className="text-sm text-slate-300">
                    Powered by advanced artificial intelligence, the robot continuously monitors its surroundings, detects anomalies, and sends real-time alerts when unusual events occur.
                  </p>
                </div>
              </div>
            </div>

              <div className="blue-card-glow rounded-2xl p-6 md:p-8 min-h-[140px] md:min-h-[220px]">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#B4FF33]/10 p-2 text-[#B4FF33] mt-1">
                  <Cloud className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Fleet Management
                  </h3>
                  <p className="text-sm text-slate-300">
                    Centralized cloud platform for managing multiple robots, defining patrol routes, and monitoring performance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* D) Availability */}
      <Section className="mt-20 md:mt-[120px] mb-20 md:mb-44">
        <FadeInView>
          <div
            className="relative rounded-[20px] md:rounded-[24px] px-6 py-12 md:px-20 md:py-20 border border-white/[0.06]"
            style={{
              background: 'rgba(8, 12, 20, 0.65)',
              boxShadow: '0 0 80px rgba(153, 255, 0, 0.08)'
            }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <SectionTag>Availability</SectionTag>

              <h2
                className="title-halo font-bold text-white mt-4 md:mt-6 uppercase tracking-tight"
                style={{
                  fontSize: 'clamp(42px, 8vw, 96px)',
                  lineHeight: '1.1'
                }}
              >
                Available{" "}
                <span className="text-[#B4FF33] inline-block" style={{
                  textShadow: "0 0 60px rgba(180, 255, 51, 0.6), 0 0 120px rgba(180, 255, 51, 0.3)"
                }}>
                  2027
                </span>
              </h2>
            </div>
          </div>
        </FadeInView>
      </Section>
    </div>
  );
};

export default Product;
