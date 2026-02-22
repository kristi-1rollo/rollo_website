import { lazy, Suspense, useEffect, useMemo, useRef, useState, type TouchEvent, type WheelEvent } from "react";
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
  Users,
  Weight,
  Wallet,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TimelineItem } from "@/components/RadialOrbitalTimeline";
import { useIsMobile } from "@/hooks/use-mobile";

const RegistrationModal = lazy(() => import("@/components/RegistrationModal"));
const RadialOrbitalTimeline = lazy(() => import("@/components/RadialOrbitalTimeline"));
const CustomCursor = lazy(() => import("@/components/CustomCursor"));

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
type RobotPart = {
  id: string;
  clipPath: string;
  explodeX: number;
  explodeY: number;
  explodeRotate: number;
};

const sections: LayerSection[] = [
  {
    id: "hero",
    label: "Home",
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
    label: "Team",
    title: "Vision + Team",
    subtitle: "Vision, strategic support, and execution team in one section.",
  },
  {
    id: "access",
    label: "Access",
    title: "Deployment Access",
    subtitle: "Waitlist and pilot onboarding for early deployment.",
  },
];

const navItems: { label: string; target: SectionId; icon: LucideIcon }[] = [
  { label: "Home", target: "hero", icon: Gauge },
  { label: "Tech", target: "core", icon: Cpu },
  { label: "Field+AI", target: "performance", icon: Compass },
  { label: "ROI", target: "math", icon: TrendingUp },
  { label: "FAQ", target: "knowledge", icon: CircleHelp },
  { label: "Team", target: "about", icon: Users },
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
const heroRobotImage = "/hero/rollo1.png";
const coreRobotImage = "/hero/rollo2.png";
const snowVideoPrimary = "/robot/Lumes_1.mp4";
const mudImage = "/robot/rollo_mud.png";
const nightImage = "/robot/rollo_night.png";
const activeSectionStorageKey = "rollo_active_section";

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
const desktopRobotParts: RobotPart[] = [
  { id: "body-top", clipPath: "polygon(9% 4%, 92% 3%, 90% 34%, 8% 32%)", explodeX: 90, explodeY: -82, explodeRotate: 16 },
  { id: "body-mid", clipPath: "polygon(6% 31%, 94% 32%, 92% 64%, 8% 62%)", explodeX: -94, explodeY: -24, explodeRotate: -20 },
  { id: "body-low", clipPath: "polygon(10% 61%, 90% 61%, 86% 87%, 12% 88%)", explodeX: 74, explodeY: 86, explodeRotate: 14 },
  { id: "wheel-left", clipPath: "polygon(0% 57%, 32% 48%, 35% 100%, 0% 100%)", explodeX: -120, explodeY: 104, explodeRotate: -42 },
  { id: "wheel-right", clipPath: "polygon(68% 49%, 100% 56%, 100% 100%, 64% 100%)", explodeX: 122, explodeY: 98, explodeRotate: 40 },
  { id: "sensor-core", clipPath: "polygon(39% 24%, 61% 25%, 59% 48%, 41% 47%)", explodeX: -12, explodeY: -118, explodeRotate: -12 },
];
const mobileRobotParts: RobotPart[] = [
  { id: "mobile-body", clipPath: "polygon(10% 8%, 90% 8%, 86% 77%, 14% 78%)", explodeX: 52, explodeY: -56, explodeRotate: 14 },
  { id: "mobile-wheel", clipPath: "polygon(16% 70%, 84% 70%, 82% 100%, 18% 100%)", explodeX: -68, explodeY: 62, explodeRotate: -20 },
  { id: "mobile-sensor", clipPath: "polygon(40% 18%, 60% 18%, 58% 42%, 42% 42%)", explodeX: 6, explodeY: -80, explodeRotate: 10 },
];
const brandLogoPath = "/logos/rollo_logo_white.png";
const eisLogoPath = "/logos/Rahastanud_EL_kaksiklogod_ENG_hor_white.png";
const defenceIndustryLogoPath = "/logos/edia-eas.png";

const SectionBrand = ({ compact = true }: { compact?: boolean }) => (
  <div className="inline-flex items-center gap-3">
    <img
      src={brandLogoPath}
      alt="Rollo logo"
      className={compact ? "h-5 w-auto opacity-85" : "h-7 w-auto opacity-90"}
    />
    <span className="h-px w-8 bg-white/25" />
  </div>
);

const FieldMediaLoader = () => (
  <div className="flex flex-col items-center gap-3">
    <div className="relative h-11 w-11">
      <span className="absolute inset-0 rounded-full border-2 border-primary/20" />
      <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary" />
      <span className="absolute inset-[9px] animate-pulse rounded-full bg-primary/85 shadow-[0_0_16px_rgba(180,255,51,0.55)]" />
    </div>
    <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Loading media...</p>
  </div>
);

const AamirLayerPreview = () => {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    if (typeof window === "undefined") return "hero";
    const storedSection = window.sessionStorage.getItem(activeSectionStorageKey);
    if (storedSection && sections.some((section) => section.id === storedSection)) {
      return storedSection as SectionId;
    }
    return "hero";
  });
  const [guards, setGuards] = useState(1);
  const [hours, setHours] = useState(24);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [openFieldScenario, setOpenFieldScenario] = useState<FieldScenarioId | null>(null);
  const [fieldMediaReady, setFieldMediaReady] = useState<Record<FieldScenarioId, boolean>>({
    snow: false,
    mud: false,
    night: false,
  });
  const [performancePanel, setPerformancePanel] = useState<PerformancePanel>("field");
  const [isTeamImageOpen, setIsTeamImageOpen] = useState(false);
  const [openPartnerLogo, setOpenPartnerLogo] = useState<{ src: string; alt: string } | null>(null);
  const [isHeroExploding, setIsHeroExploding] = useState(false);
  const [heroIntroKey, setHeroIntroKey] = useState(0);
  const [hoveredNavLabel, setHoveredNavLabel] = useState<string | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const hasPrimedSnowVideoRef = useRef(false);
  const heroExitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const htmlOriginal = document.documentElement.style.overflow;
    const bodyOriginal = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = htmlOriginal;
      document.body.style.overflow = bodyOriginal;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (heroExitTimeoutRef.current !== null) {
        window.clearTimeout(heroExitTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(activeSectionStorageKey, activeSection);
  }, [activeSection]);

  const activeIndex = useMemo(
    () => sections.findIndex((section) => section.id === activeSection),
    [activeSection],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (openFaqIndex !== null || openFieldScenario !== null || isTeamImageOpen || openPartnerLogo) {
        return;
      }
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      setSectionByDelta(delta);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isTeamImageOpen, openFaqIndex, openFieldScenario, openPartnerLogo, activeSection, isHeroExploding, isMobile]);

  const activeContext = useMemo(() => {
    return sections.find((section) => section.id === activeSection) ?? sections[0];
  }, [activeSection]);
  const heroParts = useMemo(() => (isMobile ? mobileRobotParts : desktopRobotParts), [isMobile]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (activeSection !== "performance" || hasPrimedSnowVideoRef.current) return;

    const preloader = document.createElement("video");
    preloader.preload = "auto";
    preloader.muted = true;
    preloader.playsInline = true;
    preloader.src = snowVideoPrimary;
    preloader.load();
    hasPrimedSnowVideoRef.current = true;
  }, [activeSection]);

  useEffect(() => {
    if (typeof window === "undefined" || activeSection !== "performance") return;
    const mudPreload = new Image();
    mudPreload.src = mudImage;
    const nightPreload = new Image();
    nightPreload.src = nightImage;
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "hero") {
      setHeroIntroKey((value) => value + 1);
    }
  }, [activeSection]);

  const goToSection = (nextSection: SectionId) => {
    if (nextSection === activeSection) return;
    if (activeSection === "hero" && nextSection !== "hero") {
      if (isHeroExploding) return;
      setIsHeroExploding(true);
      heroExitTimeoutRef.current = window.setTimeout(() => {
        setActiveSection(nextSection);
        setIsHeroExploding(false);
        heroExitTimeoutRef.current = null;
      }, isMobile ? 820 : 560);
      return;
    }
    setActiveSection(nextSection);
  };

  const setSectionByDelta = (delta: number) => {
    const nextIndex = (activeIndex + delta + sections.length) % sections.length;
    goToSection(sections[nextIndex].id);
  };
  const heroMaxScale = isMobile ? 1.34 : 1.9;
  const heroMaxY = isMobile ? 10 : -4;
  const openFieldScenarioModal = (scenarioId: FieldScenarioId) => {
    setFieldMediaReady((prev) => ({ ...prev, [scenarioId]: false }));
    setOpenFieldScenario(scenarioId);
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
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-8">
          <div className="order-1 space-y-3 lg:col-start-1 lg:row-start-1">
            <SectionBrand compact={false} />
            <h1 className="text-4xl leading-[0.97] text-white sm:text-5xl md:max-w-[16ch] md:text-6xl md:leading-[1.02] lg:max-w-none lg:text-8xl lg:leading-[0.95]">
              One-Wheel Autonomous Patrol Robot
            </h1>
          </div>

          <div className="order-2 mt-6 mb-10 flex justify-center sm:my-0 lg:col-start-2 lg:row-span-2">
            <div className="relative h-[42vh] min-h-[280px] w-full max-w-[520px] sm:h-[60vh] sm:min-h-[420px] sm:max-w-[620px] lg:h-[64vh]">
              <motion.img
                key={`hero-intro-${heroIntroKey}`}
                src={heroRobotImage}
                alt="Rollo autonomous patrol robot in cinematic hero frame"
                className="h-full w-full origin-center object-contain px-2 py-6 sm:p-3 brightness-[1.08]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                initial={{
                  scale: isMobile ? 0.62 : 0.56,
                  y: isMobile ? 46 : 62,
                  opacity: 0,
                  filter: "blur(9px) brightness(0.58)",
                }}
                animate={
                  isHeroExploding
                    ? { scale: 0.96, y: -8, opacity: 0.08, filter: "blur(2px) brightness(1.02)" }
                    : {
                        scale: heroMaxScale,
                        y: heroMaxY,
                        opacity: 1,
                        filter: "blur(0px) brightness(1.08)",
                      }
                }
                transition={
                  isHeroExploding
                    ? { duration: 0.2, ease: "easeOut" }
                    : {
                        duration: isMobile ? 3.4 : 4.4,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              />

              {isHeroExploding ? (
                <div className="pointer-events-none absolute inset-0">
                  {heroParts.map((part, index) => (
                    <motion.div
                      key={part.id}
                      className="absolute inset-0"
                      style={{ clipPath: part.clipPath }}
                      initial={{ opacity: 0.95, x: 0, y: 0, rotate: 0, scale: 1 }}
                      animate={{
                        x: part.explodeX,
                        y: part.explodeY,
                        rotate: part.explodeRotate,
                        opacity: 0.02,
                        scale: 0.97,
                      }}
                      transition={{
                        duration: isMobile ? 0.78 : 0.5,
                        ease: "easeOut",
                        delay: index * (isMobile ? 0.04 : 0.02),
                      }}
                    >
                      <img
                        src={heroRobotImage}
                        alt=""
                        aria-hidden
                        className="h-full w-full object-contain brightness-[1.08]"
                      />
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="order-3 mt-3 space-y-6 sm:mt-0 lg:col-start-1 lg:row-start-2">
            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              Autonomous security robotics with AI vision and reliable outdoor patrol at up to
              10x lower operating cost than traditional guard shifts.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="min-h-11 rounded-xl bg-primary px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => goToSection("access")}
                className="min-h-11 rounded-xl border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/90"
              >
                Join Waitlist
              </button>
            </div>
            <div className="grid max-w-lg grid-cols-2 gap-3 text-sm text-white/80">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">24/7 Operation</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">Auto Recharging</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">AI Threat Detection</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">Nordic Tested</div>
            </div>
          </div>
        </div>
      );
    }

    if (activeContext.id === "core") {
      return (
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionBrand />
            <h2 className="text-3xl text-white sm:text-5xl lg:text-6xl">Technical Specifications</h2>
            <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
              Orbital layout remains active in preview mode so specification discovery still feels
              premium while navigation stays menu-only.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 sm:p-5">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_20%,rgba(180,255,51,0.14),transparent_60%)]" />
            <div className="relative">
              <Suspense fallback={<div className="h-[52vh] min-h-[320px] w-full" />}>
                <RadialOrbitalTimeline timelineData={specs} centerImage={coreRobotImage} />
              </Suspense>
            </div>
          </div>
        </div>
      );
    }

    if (activeContext.id === "performance") {
      const selectedScenario =
        fieldScenarios.find((scenario) => scenario.id === openFieldScenario) ?? null;
      const selectedFieldMediaReady =
        selectedScenario ? fieldMediaReady[selectedScenario.id] : false;
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
          <div className="space-y-3">
            <SectionBrand />
            <h2 className="text-3xl text-white sm:text-5xl lg:text-6xl">Field Test Data 2026</h2>
            <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
              Rollo is validated across snow, mud and low-visibility patrol scenarios with stable
              mobility and continuous mission uptime.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPerformancePanel("field")}
              className={`inline-flex min-h-11 w-24 items-center justify-center rounded-xl px-4 py-2 text-xs uppercase tracking-[0.14em] ${
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
              className={`inline-flex min-h-11 w-24 items-center justify-center rounded-xl px-4 py-2 text-xs uppercase tracking-[0.14em] ${
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
                        onClick={() => openFieldScenarioModal(scenario.id)}
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
                  className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-[#050505] p-4 sm:p-7"
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

                  <div className="space-y-4">
                    <div className="mb-1 sm:mb-2">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Field Scenario</p>
                      <h3 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                        {selectedScenario.title}
                      </h3>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
                      <div className="relative h-[36vh] min-h-[220px] max-h-[420px] w-full sm:h-[44vh] sm:min-h-[300px] sm:max-h-[460px]">
                        {selectedScenario.id === "snow" ? (
                          <video
                            key="snow-media"
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
                              selectedFieldMediaReady ? "opacity-100" : "opacity-0"
                            }`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            src={snowVideoPrimary}
                            onLoadedData={() =>
                              setFieldMediaReady((prev) => ({ ...prev, snow: true }))
                            }
                            onCanPlay={() => setFieldMediaReady((prev) => ({ ...prev, snow: true }))}
                          />
                        ) : null}

                        {selectedScenario.id === "mud" ? (
                          <img
                            key="mud-media"
                            src={mudImage}
                            alt="Rollo mud scenario"
                            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 ${
                              selectedFieldMediaReady ? "opacity-100" : "opacity-0"
                            }`}
                            onLoad={() => setFieldMediaReady((prev) => ({ ...prev, mud: true }))}
                          />
                        ) : null}

                        {selectedScenario.id === "night" ? (
                          <img
                            key="night-media"
                            src={nightImage}
                            alt="Rollo night scenario"
                            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-200 ${
                              selectedFieldMediaReady ? "opacity-100" : "opacity-0"
                            }`}
                            onLoad={() => setFieldMediaReady((prev) => ({ ...prev, night: true }))}
                          />
                        ) : null}

                        {!selectedFieldMediaReady ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-black">
                            <FieldMediaLoader />
                          </div>
                        ) : null}
                      </div>
                    </div>
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
            <div className="space-y-3">
              <SectionBrand />
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
          <div className="space-y-3">
            <SectionBrand />
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
                  className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#050505]/95 p-6 shadow-2xl sm:p-8"
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
        <div className="no-scrollbar max-h-[calc(100dvh-10.5rem)] space-y-8 overflow-y-auto pr-1 sm:max-h-[calc(100dvh-11.5rem)] sm:space-y-10 sm:pr-2">
          <div className="space-y-3">
            <SectionBrand />
            <h2 className="text-3xl text-white sm:text-5xl lg:text-6xl">Vision + Team</h2>
          </div>

          <article className="rounded-2xl border border-white/12 bg-white/5 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-primary">Section 01: Vision</p>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-200 sm:text-base">
              To redefine the boundaries of autonomous security through intelligent, gyroscopically
              stabilized robotics.
            </p>
          </article>

          <article className="rounded-2xl border border-white/12 bg-white/5 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-primary">Section 02: Backed By</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/12 bg-black/30 p-4 sm:p-5">
                <div className="flex min-h-[72px] items-center">
                  <button
                    type="button"
                    onClick={() => setOpenPartnerLogo({ src: eisLogoPath, alt: "EIS logo" })}
                    className="group inline-flex"
                    aria-label="Open EIS logo"
                  >
                    <img
                      src={eisLogoPath}
                      alt="EIS logo"
                      className="h-10 w-auto object-contain transition duration-300 group-hover:scale-[1.02] sm:h-12"
                    />
                  </button>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Supported by the Estonian Business and Innovation Agency (EIS), accelerating our
                  mission to redefine autonomous robotics through deep-tech innovation.
                </p>
              </div>
              <div className="rounded-xl border border-white/12 bg-black/30 p-4 sm:p-5">
                <div className="flex min-h-[72px] items-center">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenPartnerLogo({
                        src: defenceIndustryLogoPath,
                        alt: "Estonian Defence and Aerospace Industry Association logo",
                      })
                    }
                    className="group inline-flex"
                    aria-label="Open defence industry logo"
                  >
                    <img
                      src={defenceIndustryLogoPath}
                      alt="Estonian Defence and Aerospace Industry Association logo"
                      className="h-10 w-auto object-contain transition duration-300 group-hover:scale-[1.02] sm:h-12"
                    />
                  </button>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Backed by the Estonian Defence and Aerospace Industry Association to drive
                  real-world adoption of autonomous security robotics.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-white/12 bg-white/5 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-primary">Section 03: The Team</p>
            <div className="mt-4 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
              <div className="max-w-2xl space-y-4">
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  Over 90% of the team members have 3 to 15 years of prior experience working together
                  in robotics development and have achieved remarkable results.
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
            </div>
          </article>

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
                  className="relative max-h-[88vh] w-full max-w-6xl"
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
                    className="mx-auto max-h-[88vh] w-auto object-contain"
                  />
                </div>
              </div>
            </>
          ) : null}

          {openPartnerLogo ? (
            <>
              <div
                className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm"
                onClick={() => setOpenPartnerLogo(null)}
              />
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
                onClick={() => setOpenPartnerLogo(null)}
              >
                <div
                  className="relative max-h-[88vh] w-full max-w-4xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setOpenPartnerLogo(null)}
                    className="absolute right-2 top-2 z-20 rounded-full border border-white/20 bg-black/60 p-2 text-slate-200 transition hover:text-white"
                    aria-label="Close partner logo"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <img
                    src={openPartnerLogo.src}
                    alt={`${openPartnerLogo.alt} enlarged`}
                    className="mx-auto max-h-[88vh] w-auto object-contain"
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
        <div className="space-y-3">
          <SectionBrand />
          <h2 className="text-3xl text-white sm:text-5xl lg:text-6xl">Deployment Access</h2>
        </div>
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 sm:p-6">
          <p className="text-xl font-semibold text-white">Ready to transform your security operations?</p>
          <p className="mt-2 text-sm text-slate-300">
            Join the waitlist for early access and continue to production rollout after approval.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 min-h-11 rounded-xl bg-primary px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black"
          >
            Get Rollo Access
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden text-white md:h-screen md:overflow-hidden">
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(180,255,51,0.12),transparent_28%),radial-gradient(circle_at_80%_60%,rgba(72,138,255,0.13),transparent_36%)]" />

      <div className="fixed left-1/2 top-[calc(env(safe-area-inset-top)+0.75rem)] z-40 -translate-x-1/2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-primary backdrop-blur-xl md:hidden">
        {activeContext.label}
      </div>

      <nav className="fixed bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] left-1/2 z-40 w-[calc(100vw-24px)] max-w-[560px] -translate-x-1/2 px-1 sm:bottom-5 sm:w-auto sm:max-w-none sm:px-0">
        <div className="mx-auto inline-flex w-full items-center justify-between gap-1.5 overflow-visible rounded-[4px] border border-white/20 bg-black/45 p-1.5 backdrop-blur-xl sm:w-auto sm:gap-2">
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
                  onClick={() => goToSection(item.target)}
                  className={`flex min-h-11 min-w-[46px] shrink-0 flex-col items-center justify-center rounded-[4px] px-2 py-1.5 transition sm:min-w-11 sm:flex-row sm:py-2 sm:px-2.5 ${
                    isActive
                      ? "border border-primary/45 bg-primary/10 text-primary"
                      : "border border-white/15 bg-white/[0.04] text-white/75 hover:border-white/30 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="mt-1 text-[9px] uppercase tracking-[0.08em] sm:hidden">
                    {item.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-center text-[10px] uppercase tracking-[0.14em] text-white/55 md:hidden">
          Swipe or tap menu
        </p>
      </nav>

      <main className="container-premium flex min-h-[100dvh] items-start pb-[calc(env(safe-area-inset-bottom)+8rem)] pt-[calc(env(safe-area-inset-top)+4.5rem)] md:h-screen md:items-center md:pb-24 md:pt-16">
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
              if (
                openFaqIndex !== null ||
                openFieldScenario !== null ||
                isTeamImageOpen ||
                openPartnerLogo
              )
                return;
              touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event: TouchEvent<HTMLElement>) => {
              if (
                openFaqIndex !== null ||
                openFieldScenario !== null ||
                isTeamImageOpen ||
                openPartnerLogo
              )
                return;
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

      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="border-white/10 bg-[#050505]/95 text-white sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight text-white">Contact</DialogTitle>
            <DialogDescription className="text-slate-300">
              Reach out to our team for partnerships, pilots, or deployment planning.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-slate-200">
            <p>Rollo Robotics OÜ (17320003)</p>
            <p>Viljandi maakond, Viljandi linn, Raua tn 16, 71020</p>
            <a
              href="mailto:info@1rollo.com"
              className="inline-flex text-primary underline decoration-primary/60 underline-offset-4 transition hover:text-primary/90"
            >
              info@1rollo.com
            </a>
          </div>
          <button
            type="button"
            onClick={() => setIsContactModalOpen(false)}
            className="mt-2 min-h-11 rounded-xl bg-primary px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black"
          >
            Close
          </button>
        </DialogContent>
      </Dialog>

      <Suspense fallback={null}>
        <RegistrationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </Suspense>
    </div>
  );
};

export default AamirLayerPreview;
