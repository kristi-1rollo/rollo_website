import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Brain,
  Scale,
  Disc3,
  PiggyBank,
  Shield,
  Plane,
  Hospital,
  Factory,
  HardHat,
  Server,
  GraduationCap,
  Home,
  Droplets,
  ChevronRight,
  Users,
  DollarSign,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

/* ── data ─────────────────────────────────────────────── */

const problems = [
  {
    icon: DollarSign,
    title: "Escalating Security Labor Costs",
    text: "Security labor costs keep rising while efficiency stays flat.",
  },
  {
    icon: Brain,
    title: "Human Performance Bottlenecks",
    text: "Human-level perception and edge intelligence can't scale with demand.",
  },
  {
    icon: Scale,
    title: "Cost\u2013Reliability Imbalance",
    text: "Autonomous robots now deliver higher reliability at a fraction of the cost.",
  },
];

const solutions = [
  {
    icon: Disc3,
    title: "Gyroscopic Innovation",
    text: "First-in-the-world gyroscope-based stabilization enabling a truly autonomous one-wheeled robot (patent pending).",
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

const productTiles = [
  {
    title: "Single-Wheel Autonomy",
    text: "Proprietary hardware and software method enables stable autonomous motion on a single wheel.",
  },
  {
    title: "Protected by Deep HW/SW Integration",
    text: "Exclusive hardware integration creates a defensible competitive moat.",
  },
  {
    title: "Patent Pending Innovations",
    text: "Core stabilization and control IP filed, covering the fundamental one-wheel approach.",
  },
];

const useCases = [
  { icon: Plane, label: "Airports" },
  { icon: Hospital, label: "Hospitals" },
  { icon: Factory, label: "Industrial Plants" },
  { icon: Server, label: "Data Centers" },
  { icon: HardHat, label: "Construction Sites" },
  { icon: GraduationCap, label: "Campuses" },
  { icon: Home, label: "Smart Communities" },
  { icon: Droplets, label: "Oil & Gas Facilities" },
];

/* ── helpers ──────────────────────────────────────────── */

const Section = ({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`max-w-6xl mx-auto px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33] mb-2">
    {children}
  </p>
);

/* ── page ─────────────────────────────────────────────── */

const Index = () => {
  const [guards, setGuards] = useState(1);
  const [hours, setHours] = useState(24);

  const guardHourlyRate = 15;
  const robotMonthlyCost = 2500;
  const monthlyGuardCost = guards * hours * 30 * guardHourlyRate;
  const monthlySavings = monthlyGuardCost - robotMonthlyCost;
  const annualSavings = monthlySavings * 12;
  const savingsPercentage = monthlyGuardCost > 0 ? (monthlySavings / monthlyGuardCost) * 100 : 0;

  return (
    <div className="pb-16">
      {/* ═══ HERO ═══ */}
      <section className="relative w-full min-h-[100svh] flex items-center overflow-hidden">
        {/* Background image — centered */}
        <img
          src="/hero/rollo_street.png"
          alt="Rollo autonomous patrol robot on street"
          className="absolute inset-0 w-full h-full object-cover object-[75%_center]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content — left-aligned */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full space-y-6 py-24 text-left">
          <img
            src="/logos/rollo_logo_white.png"
            alt="1ROLLO"
            className="h-6 sm:h-8 md:h-10 w-auto"
          />

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white max-w-2xl">
            Brings human-level presence to the physical world
          </h1>

          <div className="flex items-center gap-3 sm:gap-4 max-w-sm">
            <span className="h-px flex-1 bg-white/25" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#B4FF33] whitespace-nowrap">
              Without Humans
            </span>
            <span className="h-px flex-1 bg-white/25" />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-300">
            Autonomous robots that see, hear, speak, and move.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/product"
              className="min-h-11 inline-flex items-center rounded-xl bg-[#B4FF33] px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition"
            >
              Product
            </Link>
            <Link
              to="/contact"
              className="min-h-11 inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/90 hover:bg-white/10 backdrop-blur-sm transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM / SOLUTION ═══ */}
      <Section className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          {/* Problem */}
          <div>
            <SectionTag>Problem</SectionTag>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 lg:min-h-[120px]">
              Human Patrol Is Expensive, Inefficient — and Now Replaceable
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4">
              {problems.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="flex min-h-[132px] items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="shrink-0 rounded-full bg-red-500/10 p-2.5 text-red-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white">{p.title}</p>
                      <p className="text-sm text-slate-400 mt-1">{p.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Solution */}
          <div>
            <SectionTag>Solution</SectionTag>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 lg:min-h-[120px]">
              A Fundamentally Better Way to Build Patrol Robots
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4">
              {solutions.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="flex min-h-[132px] items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="shrink-0 rounded-full bg-[#B4FF33]/10 p-2.5 text-[#B4FF33]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white">{s.title}</p>
                      <p className="text-sm text-slate-400 mt-1">{s.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ PRODUCT TEASER ═══ */}
      <Section className="py-12 md:py-20">
        <SectionTag>Product</SectionTag>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          Protected by Deep Hardware–Software Integration
        </h2>
        <p className="text-base text-slate-300 max-w-2xl mb-8">
          A defensible platform where hardware and software are inseparable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: "/patent/Pilt1.png", ...productTiles[0] },
            { img: "/patent/Pilt2.png", ...productTiles[1] },
            { img: "/patent/Pilt3.png", ...productTiles[2] },
          ].map((t) => (
            <div
              key={t.title}
              className="h-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="w-full aspect-square mb-5 flex items-center justify-center overflow-hidden rounded-xl bg-black">
                <img src={t.img} alt={t.title} className="w-full h-full object-contain p-4" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{t.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed flex-1">{t.text}</p>
              <Link
                to="/product"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#B4FF33] hover:text-[#B4FF33]/80 transition"
              >
                See full spec <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ USE CASES ═══ */}
      <Section className="py-12 md:py-20">
        <SectionTag>Use Cases</SectionTag>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          Where to Deploy ROLLO
        </h2>
        <p className="text-base text-slate-300 max-w-2xl mb-8">
          High-value outdoor and perimeter-security environments where autonomy
          delivers the biggest efficiency gains.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.label}
                className="h-full flex flex-col items-start rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="rounded-full bg-[#B4FF33]/10 p-2.5 text-[#B4FF33] mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-white">{uc.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/contact"
            className="min-h-11 inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/90 hover:bg-white/10 transition"
          >
            Talk to Us
          </Link>
        </div>
      </Section>

      {/* ═══ MARKET / COMPARISON ═══ */}
      <Section className="py-12 md:py-20">
        <SectionTag>Market</SectionTag>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
          A Massive Market Ready for Automation
        </h2>

        {/* Big numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-3xl sm:text-4xl font-bold text-[#B4FF33]">28.5M</p>
            <p className="text-sm text-slate-300 mt-2">
              Frontline security workers globally — one of the largest human-labor markets
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-3xl sm:text-4xl font-bold text-[#B4FF33]">$500B</p>
            <p className="text-sm text-slate-300 mt-2">
              Projected physical security equipment &amp; services market by 2026
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-3xl sm:text-4xl font-bold text-[#B4FF33]">80%+</p>
            <p className="text-sm text-slate-300 mt-2">
              Customer labor cost reduction enabled by 1ROLLO's service-based model
            </p>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#B4FF33]/30 bg-[#B4FF33]/10 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingDown className="h-6 w-6 text-[#B4FF33]" />
              <p className="text-xs uppercase tracking-[0.15em] text-[#B4FF33] font-medium">
                3 Robots
              </p>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white">
              $72,000–$108,000
            </p>
            <p className="text-sm text-slate-300 mt-2">Annual cost</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-slate-400" />
              <p className="text-xs uppercase tracking-[0.15em] text-slate-400 font-medium">
                9 Guards
              </p>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white">
              $450,000–$630,000
            </p>
            <p className="text-sm text-slate-300 mt-2">Annual cost</p>
          </div>
        </div>
      </Section>

      {/* ═══ ROI CALCULATOR ═══ */}
      <Section className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-12">
          {/* Left — title + sliders */}
          <div className="space-y-8">
            <div className="space-y-3">
              <SectionTag>Business Intelligence</SectionTag>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Save 60% on Security Costs
              </h2>
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

          {/* Right — result cards */}
          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/60">
                <Wallet className="h-4 w-4 text-[#B4FF33]" /> Guard Cost / Month
              </p>
              <p className="text-3xl font-bold text-white">EUR {monthlyGuardCost.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.15em] text-white/60">Robot Cost / Month</p>
              <p className="text-3xl font-bold text-white">EUR {robotMonthlyCost.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-[#B4FF33]/40 bg-[#B4FF33]/10 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.15em] text-[#B4FF33]">Annual Savings</p>
              <p className="text-3xl font-bold text-[#B4FF33]">EUR {annualSavings.toLocaleString()}</p>
              <p className="mt-2 text-sm text-white/80">{savingsPercentage.toFixed(0)}% efficiency increase</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Index;
