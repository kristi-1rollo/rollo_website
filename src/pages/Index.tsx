import { useState } from "react";
import { Link } from "react-router-dom";
import {
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
  TrendingDown,
  Clock,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import ScrollFadeIn from "@/components/ScrollFadeIn";

/* ── data ─────────────────────────────────────────────── */

const problems = [
  {
    icon: TrendingDown,
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
    title: "Cost–Reliability Imbalance",
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
  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
    {children}
  </p>
);

/* ── page ─────────────────────────────────────────────── */

const Index = () => {
  const [sectors, setSectors] = useState(3);
  const [hours, setHours] = useState(16);

  const guardHourlyRate = 15;
  const robotMonthlyCost = 2500;
  const monthlyGuardCost = sectors * hours * 30 * guardHourlyRate;
  const monthlySavings = monthlyGuardCost - robotMonthlyCost * sectors;
  const annualSavings = monthlySavings * 12;
  const savingsPercentage =
    monthlyGuardCost > 0 ? (monthlySavings / monthlyGuardCost) * 100 : 0;
  const roiMonths =
    monthlySavings > 0
      ? Math.ceil((robotMonthlyCost * sectors * 3) / monthlySavings)
      : 0;

  return (
    <div className="pb-16">
      {/* ═══ HERO ═══ */}
      <section className="relative w-full min-h-[100svh] flex items-center overflow-hidden">
        <img
          src="/hero/rollo_street.png"
          alt="Rollo autonomous patrol robot on street"
          className="absolute inset-0 w-full h-full object-cover object-[75%_center]"
        />
        <div className="absolute inset-0 bg-black/45" />

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
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary whitespace-nowrap">
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
              className="min-h-11 inline-flex items-center rounded-xl bg-primary px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-white hover:text-black transition-all duration-300"
            >
              Product
            </Link>
            <Link
              to="/contact"
              className="min-h-11 inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/90 hover:bg-primary hover:text-black hover:border-primary backdrop-blur-sm transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM / SOLUTION ═══ */}
      <Section className="py-24 md:py-40">
        <ScrollFadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
            {/* Problem */}
            <div>
              <SectionTag>Problem</SectionTag>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 lg:min-h-[120px]">
                Human Patrol Is Expensive, Inefficient — and Now Replaceable
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4">
                {problems.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <ScrollFadeIn key={p.title} delay={i * 100}>
                      <div className="flex min-h-[132px] items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                        <div className="shrink-0 rounded-full bg-destructive/10 p-2.5 text-red-400">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white">{p.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {p.text}
                          </p>
                        </div>
                      </div>
                    </ScrollFadeIn>
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
                {solutions.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <ScrollFadeIn key={s.title} delay={i * 100}>
                      <div className="flex min-h-[132px] items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                        <div className="shrink-0 rounded-full bg-primary/10 p-2.5 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white">{s.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {s.text}
                          </p>
                        </div>
                      </div>
                    </ScrollFadeIn>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </Section>

      {/* ═══ PRODUCT TEASER ═══ */}
      <Section className="py-24 md:py-40">
        <ScrollFadeIn>
          <SectionTag>Product</SectionTag>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Protected by Deep Hardware–Software Integration
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mb-8">
            A defensible platform where hardware and software are inseparable.
          </p>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: "/patent/Pilt1.png", ...productTiles[0] },
            { img: "/patent/Pilt2.png", ...productTiles[1] },
            { img: "/patent/Pilt3.png", ...productTiles[2] },
          ].map((t, i) => (
            <ScrollFadeIn key={t.title} delay={i * 120}>
              <div className="h-full flex flex-col rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                <div className="w-full aspect-square mb-5 flex items-center justify-center overflow-hidden rounded-xl">
                  <img
                    src={t.img}
                    alt={t.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {t.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {t.text}
                </p>
                <Link
                  to="/product"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-white transition-colors duration-300"
                >
                  See full spec <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </Section>

      {/* ═══ USE CASES ═══ */}
      <Section className="py-24 md:py-40">
        <ScrollFadeIn>
          <SectionTag>Use Cases</SectionTag>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Where to Deploy ROLLO
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mb-8">
            High-value outdoor and perimeter-security environments where
            autonomy delivers the biggest efficiency gains.
          </p>
        </ScrollFadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <ScrollFadeIn key={uc.label} delay={i * 60}>
                <div className="flex flex-col items-center text-center py-6 group cursor-default">
                  <div className="rounded-full bg-primary/10 p-3 text-primary mb-4 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(180,255,51,0.2)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-white text-sm">
                    {uc.label}
                  </p>
                </div>
              </ScrollFadeIn>
            );
          })}
        </div>

        <ScrollFadeIn delay={400}>
          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="min-h-11 inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/90 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
            >
              Talk to Us
            </Link>
          </div>
        </ScrollFadeIn>
      </Section>

      {/* ═══ MARKET ═══ */}
      <Section className="py-24 md:py-40 relative">
        <div className="absolute inset-0 geo-grid opacity-40 pointer-events-none" />

        <ScrollFadeIn>
          <SectionTag>Market Opportunity</SectionTag>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-16 md:mb-20 max-w-3xl">
            Global Reach, Untouched Potential.
          </h2>
        </ScrollFadeIn>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16">
          {[
            {
              num: "28.5M",
              desc: "Frontline security workers globally.",
              sub: "A critical mass where automation begins.",
            },
            {
              num: "$500B",
              desc: "Security equipment market by 2030.",
              sub: "We don't create markets, we optimize them.",
            },
            {
              num: "80%+",
              desc: "Cost savings for customers.",
              sub: "Efficiency that transforms the business model.",
            },
          ].map((stat, i) => (
            <ScrollFadeIn key={stat.num} delay={i * 150}>
              <div className="text-left">
                <p className="text-5xl md:text-7xl font-extrabold text-primary neon-glow leading-none">
                  {stat.num}
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  {stat.desc}
                </p>
                <p className="text-sm text-muted-foreground/60 italic mt-1">
                  {stat.sub}
                </p>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </Section>

      {/* ═══ ROI CALCULATOR ═══ */}
      <Section className="py-24 md:py-40">
        <ScrollFadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 md:gap-12">
            {/* Left — title + sliders */}
            <div className="space-y-8">
              <div className="space-y-3">
                <SectionTag>Business Intelligence</SectionTag>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                  The Math of Autonomy.
                </h2>
                <p className="text-muted-foreground text-sm max-w-md">
                  We don't sell costs, we sell returns. Use the sliders to
                  estimate your savings.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/70">
                      Patrol Hours per Day
                    </p>
                    <span className="text-sm font-bold text-primary">{hours}</span>
                  </div>
                  <Slider
                    value={[hours]}
                    onValueChange={(val) => setHours(val[0])}
                    min={1}
                    max={24}
                    step={1}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/70">
                      Replaced Guard Sectors
                    </p>
                    <span className="text-sm font-bold text-primary">{sectors}</span>
                  </div>
                  <Slider
                    value={[sectors]}
                    onValueChange={(val) => setSectors(val[0])}
                    min={1}
                    max={20}
                    step={1}
                  />
                </div>
              </div>
            </div>

            {/* Right — glassmorphism result panel */}
            <div className="flex items-stretch">
              <div className="w-full glass rounded-2xl p-8 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.15em] text-primary mb-3">
                  Estimated Annual Savings
                </p>
                <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary neon-glow leading-none">
                  €{annualSavings > 0 ? annualSavings.toLocaleString() : "—"}
                </p>

                <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      ROI Period
                    </p>
                    <p className="text-xl font-bold text-white mt-1">
                      {roiMonths > 0 ? `${roiMonths} Months` : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      Efficiency
                    </p>
                    <p className="text-xl font-bold text-white mt-1">
                      {savingsPercentage > 0
                        ? `${savingsPercentage.toFixed(0)}%`
                        : "—"}
                    </p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="mt-8 min-h-11 inline-flex items-center justify-center rounded-xl border border-primary/30 bg-transparent px-6 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary hover:bg-primary hover:text-black transition-all duration-300"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </Section>
    </div>
  );
};

export default Index;
