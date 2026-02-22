import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Battery,
  Calendar,
  CircleHelp,
  Compass,
  Cpu,
  Eye,
  Gauge,
  KeyRound,
  Plug,
  Ruler,
  Snowflake,
  TrendingUp,
  Weight,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import rollo1 from "@/assets/rollo1.png";
import rollo2 from "@/assets/rollo2.png";
import RegistrationModal from "@/components/RegistrationModal";
import RadialOrbitalTimeline, { type TimelineItem } from "@/components/RadialOrbitalTimeline";

type SectionId =
  | "hero"
  | "core"
  | "performance"
  | "intelligence"
  | "math"
  | "knowledge"
  | "access";

type LayerSection = {
  id: SectionId;
  label: string;
  title: string;
  subtitle: string;
};

const sections: LayerSection[] = [
  {
    id: "hero",
    label: "Hero",
    title: "One-Wheel Autonomous Patrol Robot",
    subtitle: "Single-frame cinematic intro with controlled text reveal.",
  },
  {
    id: "core",
    label: "Tech",
    title: "The Core",
    subtitle: "Exploded architecture and structured technical specs.",
  },
  {
    id: "performance",
    label: "Field",
    title: "Performance",
    subtitle: "Horizontal story for snow, mud and night field tests (2026).",
  },
  {
    id: "intelligence",
    label: "AI",
    title: "Intelligence",
    subtitle: "Object detection cards and event confidence states.",
  },
  {
    id: "math",
    label: "ROI",
    title: "The Math",
    subtitle: "Clean calculator layer for cost reduction and payback.",
  },
  {
    id: "knowledge",
    label: "FAQ",
    title: "Knowledge",
    subtitle: "Bento grid for AI-optimized questions and answers.",
  },
  {
    id: "access",
    label: "Access",
    title: "Deployment Access",
    subtitle: "Waitlist and pilot onboarding for early deployment.",
  },
];

const navItems: { label: string; target: SectionId; icon: LucideIcon }[] = [
  { label: "Hero", target: "hero", icon: Gauge },
  { label: "Tech", target: "core", icon: Cpu },
  { label: "Field", target: "performance", icon: Compass },
  { label: "AI", target: "intelligence", icon: Eye },
  { label: "ROI", target: "math", icon: TrendingUp },
  { label: "FAQ", target: "knowledge", icon: CircleHelp },
  { label: "Access", target: "access", icon: KeyRound },
];

const specs: TimelineItem[] = [
  { id: 1, title: "Dimensions", content: "60 x 60 x 140 cm", Icon: Ruler, status: "completed" },
  { id: 2, title: "Weight", content: "35 kg", Icon: Weight, status: "completed" },
  { id: 3, title: "Speed", content: "Up to 10 km/h", Icon: Zap, status: "completed" },
  { id: 4, title: "Battery", content: "Up to 8 hours", Icon: Battery, status: "completed" },
  { id: 5, title: "Sensors", content: "Motion & object detection", Icon: Eye, status: "completed" },
  { id: 6, title: "Charging", content: "Automatic recharging", Icon: Plug, status: "completed" },
  { id: 7, title: "Availability", content: "Pilot projects from 2025", Icon: Calendar, status: "pending" },
];

const intelligenceCards = [
  "360-degree AI vision and thermal/night support",
  "Intrusion alerts with cloud control center",
  "Autonomous patrol with manual override capability",
];

const useCases = [
  "Airports",
  "Hospitals",
  "Industrial plants",
  "Data centers",
  "Construction sites",
  "Campuses",
  "Smart communities",
  "Oil and gas facilities",
];

const faqData = [
  "Does Rollo work in snow and freezing temperatures?",
  "How is Rollo more cost-effective than human guards?",
  "How long does the battery last on a single charge?",
  "Can Rollo detect intruders in total darkness?",
  "Which industries get the highest value from Rollo?",
  "How is the robot controlled and monitored?",
];

const slide = {
  enter: { opacity: 0, x: 26, scale: 0.985 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -26, scale: 0.985 },
};

const AamirLayerPreview = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [guards, setGuards] = useState(1);
  const [hours, setHours] = useState(24);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const htmlOriginal = document.documentElement.style.overflow;
    const bodyOriginal = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = htmlOriginal;
      document.body.style.overflow = bodyOriginal;
    };
  }, []);

  const activeIndex = useMemo(
    () => sections.findIndex((section) => section.id === activeSection),
    [activeSection],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (activeIndex + delta + sections.length) % sections.length;
      setActiveSection(sections[nextIndex].id);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const activeContext = useMemo(() => {
    return sections.find((section) => section.id === activeSection) ?? sections[0];
  }, [activeSection]);

  const guardHourlyRate = 15;
  const robotMonthlyCost = 2500;
  const monthlyGuardCost = guards * hours * 30 * guardHourlyRate;
  const monthlySavings = monthlyGuardCost - robotMonthlyCost;
  const annualSavings = monthlySavings * 12;
  const savingsPercentage = monthlyGuardCost > 0 ? (monthlySavings / monthlyGuardCost) * 100 : 0;

  const renderLayer = () => {
    if (activeContext.id === "hero") {
      return (
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <p className="mono-spec text-primary/90">Layer 01 / Hero</p>
            <h1 className="text-4xl leading-[0.95] text-white sm:text-6xl md:text-7xl">
              One-Wheel Autonomous Patrol Robot
            </h1>
            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              Autonomous security robotics with AI vision and reliable outdoor patrol at up to
              10x lower operating cost than traditional guard shifts.
            </p>
            <div className="grid max-w-lg grid-cols-2 gap-3 text-sm text-white/80">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">24/7 Operation</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">Auto Recharging</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">AI Threat Detection</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">Nordic Tested</div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={rollo1}
              alt="Rollo autonomous patrol robot in cinematic hero frame"
              className="max-h-[58vh] w-auto object-contain brightness-[1.08]"
            />
          </div>
        </div>
      );
    }

    if (activeContext.id === "core") {
      return (
        <div className="space-y-6">
          <div className="space-y-5">
            <p className="mono-spec text-primary/90">Layer 02 / The Core</p>
            <h2 className="text-4xl text-white sm:text-5xl">Technical Specifications</h2>
            <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
              Orbital layout remains active in preview mode so specification discovery still feels
              premium while navigation stays menu-only.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 sm:p-5">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_20%,rgba(180,255,51,0.14),transparent_60%)]" />
            <div className="relative">
              <RadialOrbitalTimeline timelineData={specs} centerImage={rollo2} />
            </div>
          </div>
        </div>
      );
    }

    if (activeContext.id === "performance") {
      return (
        <div className="space-y-7">
          <div>
            <p className="mono-spec text-primary/90">Layer 03 / Performance</p>
            <h2 className="text-4xl text-white sm:text-5xl">Field Test Data 2026</h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
              Rollo is validated across snow, mud and low-visibility patrol scenarios with stable
              mobility and continuous mission uptime.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Snowflake className="mb-4 h-5 w-5 text-primary" />
              <p className="text-lg font-semibold text-white">Snow</p>
              <p className="text-sm text-slate-400">Stable traction in winter paths and freezing wind.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Compass className="mb-4 h-5 w-5 text-primary" />
              <p className="text-lg font-semibold text-white">Mud</p>
              <p className="text-sm text-slate-400">One-wheel balance optimized for uneven ground.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Eye className="mb-4 h-5 w-5 text-primary" />
              <p className="text-lg font-semibold text-white">Night</p>
              <p className="text-sm text-slate-400">AI vision stack keeps patrol visibility in darkness.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {useCases.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.12em] text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (activeContext.id === "intelligence") {
      return (
        <div className="space-y-7">
          <div>
            <p className="mono-spec text-primary/90">Layer 04 / Intelligence</p>
            <h2 className="text-4xl text-white sm:text-5xl">AI-Powered Security Capabilities</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {intelligenceCards.map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 inline-flex rounded-full bg-primary/20 p-2 text-primary">
                  {index === 0 && <Eye className="h-4 w-4" />}
                  {index === 1 && <TrendingUp className="h-4 w-4" />}
                  {index === 2 && <Battery className="h-4 w-4" />}
                </div>
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeContext.id === "math") {
      return (
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div>
              <p className="mono-spec text-primary/90">Layer 05 / The Math</p>
              <h2 className="text-4xl text-white sm:text-5xl">Save 60% on Security Costs</h2>
            </div>
            <div className="space-y-7 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.15em] text-white/70">
                  Guards replaced: {guards}
                </p>
                <Slider value={[guards]} onValueChange={(val) => setGuards(val[0])} min={1} max={5} step={1} />
              </div>
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.15em] text-white/70">
                  Patrol hours/day: {hours}
                </p>
                <Slider value={[hours]} onValueChange={(val) => setHours(val[0])} min={8} max={24} step={4} />
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/60">
                <Wallet className="h-4 w-4 text-primary" /> Guard Cost / Month
              </p>
              <p className="text-3xl font-bold text-white">EUR {monthlyGuardCost.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.15em] text-white/60">Robot Cost / Month</p>
              <p className="text-3xl font-bold text-white">EUR {robotMonthlyCost.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-primary/40 bg-primary/10 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.15em] text-primary">Annual Savings</p>
              <p className="text-3xl font-bold text-primary">EUR {annualSavings.toLocaleString()}</p>
              <p className="mt-2 text-sm text-white/80">{savingsPercentage.toFixed(0)}% efficiency increase</p>
            </div>
          </div>
        </div>
      );
    }

    if (activeContext.id === "knowledge") {
      return (
        <div className="grid gap-6">
          <div>
            <p className="mono-spec text-primary/90">Layer 06 / Knowledge</p>
            <h2 className="text-4xl text-white sm:text-5xl">Bento FAQ</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {faqData.map((item) => (
              <article key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium leading-relaxed text-slate-200">{item}</p>
              </article>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-6">
        <div>
          <p className="mono-spec text-primary/90">Layer 07 / Access</p>
          <h2 className="text-4xl text-white sm:text-5xl">Deployment Access</h2>
        </div>
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 sm:p-6">
          <p className="text-xl font-semibold text-white">Ready to transform your security operations?</p>
          <p className="mt-2 text-sm text-slate-300">
            Join the waitlist for early access and continue to production rollout after approval.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 rounded-full bg-primary px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black"
          >
            Get Rollo Access
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-screen overflow-hidden text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(180,255,51,0.12),transparent_28%),radial-gradient(circle_at_80%_60%,rgba(72,138,255,0.13),transparent_36%)]" />

      <div className="fixed right-5 top-5 z-40 rounded-full border border-primary/40 bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.16em] text-primary backdrop-blur-xl">
        Preview: {activeContext.label}
      </div>

      <nav className="fixed bottom-5 left-1/2 z-40 w-[min(96vw,860px)] -translate-x-1/2">
        <div className="grid grid-cols-7 items-center gap-2 rounded-full border border-white/20 bg-black/45 p-2 backdrop-blur-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.target;

            return (
              <button
                key={item.target}
                onClick={() => setActiveSection(item.target)}
                className={`flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  isActive
                    ? "bg-primary text-black"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="container-premium flex h-screen items-center pb-24 pt-16">
        <AnimatePresence mode="wait">
          <motion.section
            key={activeContext.id}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="w-full"
          >
            {renderLayer()}
          </motion.section>
        </AnimatePresence>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Rollo Aamir Layer Preview",
            description:
              `Preview layer: ${activeContext.title}. Non-scroll navigation architecture for Rollo.`,
          }),
        }}
      />

      <RegistrationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default AamirLayerPreview;
