import { Navigation, Eye, Plug, Cloud, Shield, Snowflake, Disc3, PiggyBank, TrendingUp, Users, Scale } from "lucide-react";
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
    <div className="pb-16">
      {/* A) Hero / Intro */}
      <section className="section-glow-top relative w-full min-h-[100svh] flex items-center overflow-hidden">
        <picture>
          <img
            src="/robot/F6/1rollo_auto_sec.png"
            alt="Rollo autonomous security robot on patrol"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: '65% center' }}
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-black/40" />
        {/* Mobile: stronger gradient for better text contrast */}
        <div className="absolute inset-y-0 left-0 md:hidden w-full bg-[linear-gradient(90deg,rgba(2,6,13,0.95)_0%,rgba(2,6,13,0.88)_28%,rgba(2,6,13,0.62)_58%,rgba(2,6,13,0.28)_88%)]" />
        {/* Desktop gradients - blur effect on left for text */}
        <div className="absolute inset-y-0 left-0 hidden md:block w-[55%] bg-[linear-gradient(90deg,rgba(2,6,13,0.92)_0%,rgba(2,6,13,0.78)_34%,rgba(2,6,13,0.26)_74%,rgba(2,6,13,0.06)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] bg-[radial-gradient(circle_at_24%_42%,rgba(2,6,14,0.84)_0%,rgba(3,8,18,0.72)_28%,rgba(4,10,24,0.34)_54%,rgba(0,0,0,0)_82%)]" />
        <div className="absolute -top-24 left-[12%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(38,93,214,0.22)_0%,rgba(0,0,0,0)_72%)] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full space-y-6 py-24">
          <SectionTag>Product</SectionTag>

          <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white max-w-2xl">
            Autonomous Security, Built for the Real World
          </h1>

          <div className="flex items-center gap-3 sm:gap-4 max-w-md">
            <span className="h-px flex-1 bg-white/25" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary whitespace-nowrap">
              ROLLO F6
            </span>
            <span className="h-px flex-1 bg-white/25" />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl">
            Continuous patrol, intelligent awareness, and lower operating cost in one autonomous ground platform.
          </p>
        </div>
      </section>

      {/* B) Problem */}
      <Section className="section-glow-top py-14 md:py-20">
        <FadeInView>
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-10 items-start">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-red-500">
                Problem
              </p>
              <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-lg">
                Why conventional patrol no longer scales
              </h2>
              <p className="text-base md:text-lg text-slate-300 max-w-md">
                Rising labor cost, inconsistent coverage, and limited real-time awareness make traditional patrol harder to justify.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {problems.map((p, i) => {
                const Icon = p.icon;
                return (
                  <FadeInView key={p.title} delay={i * 90}>
                    <div className="blue-card-glow flex items-start gap-4 rounded-2xl p-5">
                      <div className="shrink-0 rounded-full bg-red-500/10 p-2.5 text-red-500">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white">{p.title}</p>
                        <p className="text-sm text-white/60 mt-1 max-w-[52ch]">{p.text}</p>
                      </div>
                    </div>
                  </FadeInView>
                );
              })}
            </div>
          </div>
        </FadeInView>
      </Section>

      {/* C) Solution */}
      <section className="section-glow-top relative w-full overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_24%_18%,rgba(20,58,148,0.16),transparent_52%),linear-gradient(180deg,rgba(5,14,32,0.34),rgba(0,0,0,0.1))]" />
        <div className="text-left">
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[58%_42%] min-h-[560px]">
          <div className="relative z-10 flex flex-col justify-center lg:pr-8">
            <FadeInView>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
                Solution
              </p>
              <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 max-w-2xl">
                A fundamentally better way to build patrol robots
              </h2>
              <p className="text-base md:text-lg text-slate-300 max-w-2xl mb-8">
                ROLLO replaces labor-heavy patrol routines with a ground platform built for persistence, resilience, and lower operating overhead.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                {solutions.map((s, i) => {
                  const Icon = s.icon;
                  const featured = i < 2;
                  return (
                    <FadeInView key={s.title} delay={i * 100}>
                      <div className={`blue-card-glow rounded-2xl p-5 ${featured ? "min-h-[164px]" : "min-h-[132px]"}`}>
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 rounded-full bg-primary/10 p-2.5 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-white">{s.title}</p>
                            <p className="text-sm text-white/60 mt-1">{s.text}</p>
                          </div>
                        </div>
                      </div>
                    </FadeInView>
                  );
                })}
              </div>
            </FadeInView>
          </div>

          {/* Scroll-controlled video - Mobile */}
          <div className="relative lg:hidden flex items-center justify-center py-8 mt-8">
            <ScrollControlledVideo src="/robot/vid/1rollo_hall_9-16.mp4" />
          </div>

          {/* Scroll-controlled video - Desktop */}
          <div className="relative hidden lg:flex items-center justify-center py-8">
            <ScrollControlledVideo src="/robot/vid/1rollo_hall_9-16.mp4" />
          </div>
          </div>
        </div>
      </section>

      {/* D) Built for Real-World Environments */}
      <Section className="section-glow-top py-12 md:py-20">
        <div className="space-y-6">
          <SectionTag>Capabilities</SectionTag>
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Built for Real-World Environments
          </h2>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl">
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
      </Section>

      {/* E) Intelligent Situational Awareness */}
      <Section className="section-glow-top py-12 md:py-20">
        <FadeInView>
          <div className="space-y-6">
            <SectionTag>Awareness</SectionTag>
            <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Intelligent Situational Awareness
            </h2>

            <p className="text-base md:text-lg text-slate-300 max-w-3xl">
              Powered by advanced artificial intelligence, the robot continuously monitors its environment and detects:
            </p>

            <LiveScanner />

            <p className="text-base md:text-lg text-slate-300 max-w-3xl">
              All events are available through a real-time remote monitoring interface, enabling
              faster and more accurate response by security teams.
            </p>
          </div>
        </FadeInView>
      </Section>

      {/* F) More Than a Robot: A Security Platform */}
      <Section className="section-glow-top py-12 md:py-20">
        <div className="space-y-6">
          <SectionTag>Platform</SectionTag>
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            More Than a Robot: A Security Platform
          </h2>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl">
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

          <p className="text-base md:text-lg text-slate-300 max-w-3xl mt-6">
            The platform integrates seamlessly into existing security environments — from private
            enterprises to national infrastructure operators.
          </p>
        </div>
      </Section>

      {/* G) Technical Specifications */}
      <Section className="section-glow-top py-12 md:py-20">
        <FadeInView>
          <SpecsBlueprint />
        </FadeInView>
      </Section>
    </div>
  );
};

export default Product;
