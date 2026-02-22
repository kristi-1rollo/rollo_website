import { useEffect, useMemo, useRef, useState, type TouchEvent, type WheelEvent } from "react";
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
  Menu,
  Plug,
  Ruler,
  Snowflake,
  TrendingUp,
  Users,
  Weight,
  Wallet,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import rollo1 from "@/assets/rollo1.png";
import rollo2 from "@/assets/rollo2.png";
import RegistrationModal from "@/components/RegistrationModal";
import RadialOrbitalTimeline, { type TimelineItem } from "@/components/RadialOrbitalTimeline";
import CustomCursor from "@/components/CustomCursor";

type SectionId =
  | "hero"
  | "core"
  | "performance"
  | "math"
  | "knowledge"
  | "about"
  | "access";
type FieldScenarioId = "snow" | "mud" | "night";
type PerformancePanel = "field" | "ai";

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
    label: "Field + AI",
    title: "Performance",
    subtitle: "Field and intelligence cards in one animated section.",
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
    id: "about",
    label: "About",
    title: "Team",
    subtitle: "Built by an experienced robotics team.",
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
  { label: "Field+AI", target: "performance", icon: Compass },
  { label: "ROI", target: "math", icon: TrendingUp },
  { label: "FAQ", target: "knowledge", icon: CircleHelp },
  { label: "About", target: "about", icon: Users },
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

const fieldScenarios: {
  id: FieldScenarioId;
  title: string;
  description: string;
  badge: string;
  icon: LucideIcon;
}[] = [
  {
    id: "snow",
    title: "Snow Patrol",
    description: "Stable traction in winter paths and freezing wind.",
    badge: "Sub-zero operation",
    icon: Snowflake,
  },
  {
    id: "mud",
    title: "Mud Patrol",
    description: "One-wheel balance optimized for uneven and wet terrain.",
    badge: "High-torque mobility",
    icon: Compass,
  },
  {
    id: "night",
    title: "Night Patrol",
    description: "AI vision stack keeps patrol visibility in full darkness.",
    badge: "Thermal + low-light AI",
    icon: Eye,
  },
];
const snowVideoPrimary = "/robot/Lumes_1.mp4";

const faqData = [
  {
    question: "Does Rollo work in snow and freezing temperatures?",
    answer:
      "Yes. Rollo is tested for Nordic conditions and operates from -20 C to +45 C with stable one-wheel control.",
  },
  {
    question: "How is Rollo more cost-effective than human guards?",
    answer:
      "One robot can replace one to two guard shifts per day, with savings typically reaching up to 60 percent annually.",
  },
  {
    question: "How long does the battery last on a single charge?",
    answer:
      "Up to 8 hours of continuous patrol, with automatic return-to-charge and resume behavior.",
  },
  {
    question: "Can Rollo detect intruders in total darkness?",
    answer:
      "Yes. The AI vision stack includes low-light and thermal support for reliable detection in dark environments.",
  },
  {
    question: "Which industries get the highest value from Rollo?",
    answer:
      "Large outdoor and high-risk sites such as logistics, industrial zones, campuses, and construction areas.",
  },
  {
    question: "How is the robot controlled and monitored?",
    answer:
      "Rollo patrols autonomously while teams monitor live feeds in the cloud and can take manual control when needed.",
  },
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [openFieldScenario, setOpenFieldScenario] = useState<FieldScenarioId | null>(null);
  const [performancePanel, setPerformancePanel] = useState<PerformancePanel>("field");
  const [isTeamImageOpen, setIsTeamImageOpen] = useState(false);
  const [hoveredNavLabel, setHoveredNavLabel] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

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
  const setSectionByDelta = (delta: number) => {
    const nextIndex = (activeIndex + delta + sections.length) % sections.length;
    setActiveSection(sections[nextIndex].id);
  };

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
            <h1 className="text-4xl leading-[0.95] text-white sm:text-6xl lg:text-8xl">
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
            <h2 className="text-3xl text-white sm:text-5xl lg:text-6xl">Technical Specifications</h2>
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
      const selectedScenario =
        fieldScenarios.find((scenario) => scenario.id === openFieldScenario) ?? null;
      const onPanelWheel = (event: WheelEvent<HTMLDivElement>) => {
        if (Math.abs(event.deltaY) < 8) return;
        if (event.deltaY > 0) {
          setPerformancePanel("ai");
          setOpenFieldScenario(null);
        } else {
          setPerformancePanel("field");
        }
      };

      return (
        <div className="space-y-7">
          <div>
            <h2 className="text-3xl text-white sm:text-5xl lg:text-6xl">Field Test Data 2026</h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
              Rollo is validated across snow, mud and low-visibility patrol scenarios with stable
              mobility and continuous mission uptime.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPerformancePanel("field")}
              className={`min-h-11 rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] ${
                performancePanel === "field"
                  ? "bg-primary text-black"
                  : "border border-white/15 bg-white/5 text-white/80"
              }`}
            >
              Field
            </button>
            <button
              type="button"
              onClick={() => {
                setPerformancePanel("ai");
                setOpenFieldScenario(null);
              }}
              className={`min-h-11 rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] ${
                performancePanel === "ai"
                  ? "bg-primary text-black"
                  : "border border-white/15 bg-white/5 text-white/80"
              }`}
            >
              AI
            </button>
          </div>

          <div onWheel={onPanelWheel} className="min-h-[280px]">
            <AnimatePresence mode="wait">
              {performancePanel === "field" ? (
                <motion.div
                  key="field-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="space-y-5"
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    {fieldScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        type="button"
                        onClick={() => setOpenFieldScenario(scenario.id)}
                        className="min-h-11 rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-primary/50 hover:bg-white/10"
                      >
                        <scenario.icon className="mb-4 h-5 w-5 text-primary" />
                        <p className="text-lg font-semibold text-white">{scenario.title.replace(" Patrol", "")}</p>
                        <p className="text-sm text-slate-400">{scenario.description}</p>
                      </button>
                    ))}
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
                </motion.div>
              ) : (
                <motion.div
                  key="ai-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="grid gap-4 md:grid-cols-3"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {selectedScenario ? (
            <>
              <div
                className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-md"
                onClick={() => setOpenFieldScenario(null)}
              />
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                onClick={() => setOpenFieldScenario(null)}
              >
                <motion.article
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#050505] p-4 sm:p-7"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFieldScenario(null)}
                    className="absolute right-4 top-4 z-20 text-slate-300 transition hover:text-white"
                    aria-label="Close field scenario"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
                    <div className="space-y-4">
                      <div className="mb-1 sm:mb-2">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-primary">
                          Field Scenario
                        </p>
                        <h3 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                          {selectedScenario.title}
                        </h3>
                      </div>

                      <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-black/60">
                        <div className="relative h-[44vh] min-h-[300px] max-h-[460px] w-full">
                        {selectedScenario.id === "snow" ? (
                          <>
                            <video
                              className="absolute inset-0 h-full w-full object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              src={snowVideoPrimary}
                            />
                          </>
                        ) : (
                          <>
                            <motion.img
                              src={rollo1}
                              alt={`Rollo robot animation for ${selectedScenario.title.toLowerCase()}`}
                              className="mx-auto h-[44vh] max-h-[460px] w-auto object-contain"
                              animate={
                                selectedScenario.id === "mud"
                                  ? { x: [0, 2, -2, 0], y: [0, 1, 0, -1, 0] }
                                  : { y: [0, -3, 0] }
                              }
                              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {selectedScenario.id === "mud" ? (
                              <div className="pointer-events-none absolute inset-0">
                                <div className="absolute bottom-0 h-24 w-full bg-[linear-gradient(to_top,rgba(70,40,20,0.62),rgba(70,40,20,0.04))]" />
                                <motion.div
                                  className="absolute bottom-8 left-1/4 h-2 w-16 rounded-full bg-[#7c4b26]/70 blur-[1px]"
                                  animate={{ x: [-8, 8, -8], opacity: [0.3, 0.6, 0.3] }}
                                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                  className="absolute bottom-12 right-1/4 h-2 w-20 rounded-full bg-[#6f3d1f]/70 blur-[1px]"
                                  animate={{ x: [8, -8, 8], opacity: [0.25, 0.55, 0.25] }}
                                  transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut" }}
                                />
                              </div>
                            ) : null}

                            {selectedScenario.id === "night" ? (
                              <div className="pointer-events-none absolute inset-0">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(90,140,255,0.18),rgba(0,0,0,0.84)_72%)]" />
                                <motion.div
                                  className="absolute left-1/2 top-[36%] h-24 w-24 -translate-x-1/2 rounded-full bg-[#7da8ff]/30 blur-2xl"
                                  animate={{ opacity: [0.2, 0.52, 0.2], scale: [0.9, 1.08, 0.9] }}
                                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                                />
                              </div>
                            ) : null}
                          </>
                        )}
                        </div>
                      </div>
                    </div>

                    <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-primary/90">
                        {selectedScenario.badge}
                      </p>
                      <p className="mt-3 text-sm text-slate-300">{selectedScenario.description}</p>
                      <div className="mt-5 space-y-2 text-xs uppercase tracking-[0.14em] text-white/75">
                        <p className="rounded-lg border border-white/10 bg-black/35 px-3 py-2">
                          2026 field validation
                        </p>
                        <p className="rounded-lg border border-white/10 bg-black/35 px-3 py-2">
                          robot-as-a-service ready
                        </p>
                        <p className="rounded-lg border border-white/10 bg-black/35 px-3 py-2">
                          autonomous mission continuity
                        </p>
                      </div>
                    </aside>
                  </div>
                </motion.article>
              </div>
            </>
          ) : null}
        </div>
      );
    }

    if (activeContext.id === "math") {
      return (
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl text-white sm:text-5xl lg:text-6xl">Save 60% on Security Costs</h2>
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
            <h2 className="text-3xl text-white sm:text-5xl lg:text-6xl">Frequently Asked Questions</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {faqData.map((item, index) => (
              <button
                key={item.question}
                type="button"
                onClick={() => setOpenFaqIndex(index)}
                className="min-h-11 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
              >
                <p className="text-sm font-medium leading-relaxed text-slate-200">{item.question}</p>
              </button>
            ))}
          </div>

          {openFaqIndex !== null ? (
            <>
              <div
                className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
                onClick={() => setOpenFaqIndex(null)}
              />
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                onClick={() => setOpenFaqIndex(null)}
              >
                <article
                  className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#050505]/95 p-6 shadow-2xl sm:p-8"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(null)}
                    className="absolute right-4 top-4 text-slate-400 transition hover:text-white"
                    aria-label="Close FAQ answer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-primary">
                    Frequently Asked Questions
                  </p>
                  <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    {faqData[openFaqIndex].question}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {faqData[openFaqIndex].answer}
                  </p>
                </article>
              </div>
            </>
          ) : null}
        </div>
      );
    }

    if (activeContext.id === "about") {
      return (
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="max-w-xl space-y-5">
            <h2 className="text-3xl text-white sm:text-5xl lg:text-6xl">About The Team</h2>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Over 90% of the team members have 3 to 15 years of prior experience working together
              in the field of robotics development and have achieved remarkable results.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-primary">Team Expertise</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Mechanical Engineering; Software Development; Electronics; AI; Product Design;
                Production Launch and Sales Network Development
              </p>
            </div>
            <blockquote className="border-l-2 border-primary pl-4 text-sm italic text-white/90 sm:text-base">
              We do it not because it's easy, we do it because it's hard.
            </blockquote>
          </div>

          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsTeamImageOpen(true)}
              className="group relative block"
              aria-label="Open team image"
            >
              <img
                src="/team/team_transparent.png"
                alt="Rollo robotics team"
                className="w-full max-w-[900px] object-contain transition duration-300 group-hover:scale-[1.02]"
              />
            </button>
          </div>

          {isTeamImageOpen ? (
            <>
              <div
                className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm"
                onClick={() => setIsTeamImageOpen(false)}
              />
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
                onClick={() => setIsTeamImageOpen(false)}
              >
                <div
                  className="relative max-h-[90vh] w-full max-w-6xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setIsTeamImageOpen(false)}
                    className="absolute right-2 top-2 z-20 rounded-full border border-white/20 bg-black/60 p-2 text-slate-200 transition hover:text-white"
                    aria-label="Close team image"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <img
                    src="/team/team_transparent.png"
                    alt="Rollo robotics team enlarged"
                    className="mx-auto max-h-[90vh] w-auto object-contain"
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      );
    }

    return (
      <div className="grid gap-6">
        <div>
          <h2 className="text-3xl text-white sm:text-5xl lg:text-6xl">Deployment Access</h2>
        </div>
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 sm:p-6">
          <p className="text-xl font-semibold text-white">Ready to transform your security operations?</p>
          <p className="mt-2 text-sm text-slate-300">
            Join the waitlist for early access and continue to production rollout after approval.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 min-h-11 rounded-full bg-primary px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black"
          >
            Get Rollo Access
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-screen overflow-hidden text-white">
      <CustomCursor />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(180,255,51,0.12),transparent_28%),radial-gradient(circle_at_80%_60%,rgba(72,138,255,0.13),transparent_36%)]" />

      <div className="fixed left-1/2 top-5 z-40 -translate-x-1/2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-primary backdrop-blur-xl md:hidden">
        {activeContext.label}
      </div>

      <button
        type="button"
        onClick={() => setIsMobileNavOpen(true)}
        className="fixed right-4 top-4 z-40 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isMobileNavOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl md:hidden"
          >
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(false)}
              className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.target;
                return (
                  <button
                    key={`mobile-${item.target}`}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.target);
                      setIsMobileNavOpen(false);
                    }}
                    className={`inline-flex min-h-11 w-full max-w-xs items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm uppercase tracking-[0.16em] ${
                      isActive
                        ? "border-primary/60 bg-primary/15 text-primary"
                        : "border-white/20 bg-white/[0.03] text-white/85"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <nav className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
        <div className="mx-auto hidden items-center gap-2.5 rounded-full border border-white/20 bg-black/45 p-1.5 backdrop-blur-xl md:inline-flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.target;
            const isHovered = hoveredNavLabel === item.label;

            return (
              <div
                key={item.target}
                onMouseEnter={() => setHoveredNavLabel(item.label)}
                onMouseLeave={() => setHoveredNavLabel(null)}
                className="relative flex items-center justify-center"
              >
                {isHovered ? (
                  <span className="pointer-events-none absolute -top-5 text-[10px] uppercase tracking-[0.18em] text-primary">
                    {item.label}
                  </span>
                ) : null}
                <button
                  onClick={() => setActiveSection(item.target)}
                  className={`flex items-center justify-center rounded-full px-2.5 py-2 transition ${
                    isActive
                      ? "border border-primary/45 bg-primary/10 text-primary"
                      : "border border-white/15 bg-white/[0.04] text-white/75 hover:border-white/30 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              </div>
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
            onTouchStart={(event: TouchEvent<HTMLElement>) => {
              if (openFaqIndex !== null || openFieldScenario !== null || isTeamImageOpen || isMobileNavOpen) return;
              touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event: TouchEvent<HTMLElement>) => {
              if (openFaqIndex !== null || openFieldScenario !== null || isTeamImageOpen || isMobileNavOpen) return;
              const startX = touchStartXRef.current;
              const endX = event.changedTouches[0]?.clientX ?? null;
              touchStartXRef.current = null;
              if (startX === null || endX === null) return;
              const distance = endX - startX;
              if (Math.abs(distance) < 56) return;
              if (distance < 0) {
                setSectionByDelta(1);
              } else {
                setSectionByDelta(-1);
              }
            }}
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
