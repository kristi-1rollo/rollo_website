import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  Building2,
  Factory,
  HardHat,
  Database,
  GraduationCap,
  Home,
  Droplets,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import FadeInView from "@/components/FadeInView";

/* ── data ─────────────────────────────────────────────── */


const solutionsLeft = [
  {
    img: "/icon/icon-1.png",
    text: "Patrols predefined indoor and outdoor routes autonomously",
  },
  {
    img: "/icon/icon-2.png",
    text: "Detects people, movement, and anomalies in real time",
  },
  {
    img: "/icon/icon-3.png",
    text: "Remembers events and builds a cause of suspicion",
  },
];

const solutionsRight = [
  {
    img: "/icon/icon-7.png",
    text: "Communicates with intruders via voice",
  },
  {
    img: "/icon/icon-6.png",
    text: "Streams live video and alerts to remote operators",
  },
  {
    img: "/icon/icon-5.png",
    text: "Works 24/7 without fatigue, breaks, or shift changes",
  },
];

const solutionBottom = {
  img: "/icon/icon-4.png",
  text: "Works in snow and cold weather",
};

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
  { id: "01", title: "Airports", icon: Plane, tech: "LIDAR RANGE: 250M / NO-FLY ZONE SYNC", ghost: "/hero/rollo-street.png" },
  { id: "02", title: "Hospitals", icon: Building2, tech: "ACOUSTIC SENSITIVITY: HIGH / SILENCE PROTOCOL" },
  { id: "03", title: "Industrial Plants", icon: Factory, tech: "THERMAL SCAN: ACTIVE / HAZMAT V4.2" },
  { id: "04", title: "Data Centers", icon: Database, tech: "ENCRYPTED UPLINK / TEMP SYNC: 18°C", ghost: "/graph/pilt-1.jpg" },
  { id: "05", title: "Construction", icon: HardHat, tech: "DYNAMIC 3D MAPPING: ACTIVE / OBSTACLE AVOIDANCE" },
  { id: "06", title: "Campuses", icon: GraduationCap, tech: "CROWD ANALYTICS: ENABLED / MULTI-ZONE MESH" },
  { id: "07", title: "Communities", icon: Home, tech: "PRIVACY MASKING: ON / AI PATROL" },
  { id: "08", title: "Oil & Gas", icon: Droplets, tech: "EX-PROOF RATING: ZONE 0 / GAS LEAK DETECT" },
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
  <section id={id} className={`max-w-6xl mx-auto px-6 lg:px-8 text-center sm:text-left ${className}`}>
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
      <section className="section-glow-top relative w-full min-h-[100svh] flex items-center overflow-hidden">
        <img
          src="/hero/rollo-street.png"
          alt="Rollo autonomous patrol robot on street"
          className="absolute inset-0 w-full h-full object-cover object-[75%_center]"
        />
        <div className="absolute inset-0 bg-black/42" />
        <div className="absolute -top-24 left-[12%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(38,93,214,0.22)_0%,rgba(0,0,0,0)_72%)] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full space-y-6 py-24">
          <img
            src="/logos/rollo-logo-white.png"
            alt="1ROLLO"
            className="h-6 sm:h-8 md:h-10 w-auto mx-auto sm:mx-0"
          />

          <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
            Brings human-level presence to the physical world
          </h1>

          <div className="flex items-center gap-3 sm:gap-4 max-w-sm mx-auto sm:mx-0">
            <span className="h-px flex-1 bg-white/25" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary whitespace-nowrap">
              Without Humans
            </span>
            <span className="h-px flex-1 bg-white/25" />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 text-center sm:text-left">
            Autonomous robots that see, hear, speak, and move.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 justify-center sm:justify-start">
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

      {/* ═══ CAPABILITIES ═══ */}
      <section className="section-glow-top relative w-full overflow-hidden py-24 md:py-40 px-6 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))] text-center sm:text-left">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_14%,rgba(22,74,173,0.14),transparent_44%),linear-gradient(180deg,rgba(4,10,24,0.1),rgba(0,0,0,0.05))]" />
        <FadeInView>
          <SectionTag>Solution</SectionTag>
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-12 max-w-4xl uppercase">
            Rollo Can Observe, Drive, Decide, Report, and Intervene Without a Human on Site.
          </h2>
        </FadeInView>

        {/* Robot centered with orbit labels */}
        <div className="relative flex justify-center mx-auto" style={{ maxWidth: '900px' }}>
          <img
            src="/robot/rollo-orbit-2.png"
            alt="1ROLLO patrol robot"
            className="w-full object-contain"
            style={{ mixBlendMode: 'lighten' }}
          />

          {/* Left labels — positioned along the outer ring arc */}
          <div className="absolute flex items-center gap-1.5 lg:gap-2" style={{ left: '-2%', top: '15%' }}>
            <img src={solutionsLeft[0].img} alt="" className="h-3.5 w-3.5 lg:h-5 lg:w-5" />
            <p className="text-[9px] lg:text-sm text-white/80 leading-tight max-w-[100px] lg:max-w-[180px]">{solutionsLeft[0].text}</p>
          </div>
          <div className="absolute flex items-center gap-1.5 lg:gap-2" style={{ left: '-6%', top: '42%' }}>
            <img src={solutionsLeft[1].img} alt="" className="h-3.5 w-3.5 lg:h-5 lg:w-5" />
            <p className="text-[9px] lg:text-sm text-white/80 leading-tight max-w-[100px] lg:max-w-[180px]">{solutionsLeft[1].text}</p>
          </div>
          <div className="absolute flex items-center gap-1.5 lg:gap-2" style={{ left: '-2%', top: '68%' }}>
            <img src={solutionsLeft[2].img} alt="" className="h-3.5 w-3.5 lg:h-5 lg:w-5" />
            <p className="text-[9px] lg:text-sm text-white/80 leading-tight max-w-[100px] lg:max-w-[180px]">{solutionsLeft[2].text}</p>
          </div>

          {/* Right labels — positioned along the outer ring arc */}
          <div className="absolute flex items-center gap-1.5 lg:gap-2 text-right" style={{ right: '-2%', top: '15%' }}>
            <p className="text-[9px] lg:text-sm text-white/80 leading-tight max-w-[100px] lg:max-w-[180px]">{solutionsRight[0].text}</p>
            <img src={solutionsRight[0].img} alt="" className="h-3.5 w-3.5 lg:h-5 lg:w-5" />
          </div>
          <div className="absolute flex items-center gap-1.5 lg:gap-2 text-right" style={{ right: '-6%', top: '42%' }}>
            <p className="text-[9px] lg:text-sm text-white/80 leading-tight max-w-[100px] lg:max-w-[180px]">{solutionsRight[1].text}</p>
            <img src={solutionsRight[1].img} alt="" className="h-3.5 w-3.5 lg:h-5 lg:w-5" />
          </div>
          <div className="absolute flex items-center gap-1.5 lg:gap-2 text-right" style={{ right: '-2%', top: '68%' }}>
            <p className="text-[9px] lg:text-sm text-white/80 leading-tight max-w-[100px] lg:max-w-[180px]">{solutionsRight[2].text}</p>
            <img src={solutionsRight[2].img} alt="" className="h-3.5 w-3.5 lg:h-5 lg:w-5" />
          </div>

          {/* Inner annotations — on the small inner ring */}
          <div className="absolute flex items-center gap-1 lg:gap-2" style={{ left: '24%', top: '33%' }}>
            <span className="text-[7px] lg:text-xs text-white/60 text-right leading-tight">two-way audio<br />and sensors</span>
            <img src="/icon/icon-8.png" alt="" className="w-2 h-2 lg:w-3 lg:h-3" />
          </div>
          <div className="absolute flex items-center gap-1 lg:gap-2" style={{ right: '24%', top: '46%' }}>
            <img src="/icon/icon-8.png" alt="" className="w-2 h-2 lg:w-3 lg:h-3" />
            <span className="text-[7px] lg:text-xs text-white/60 leading-tight">360° cameras</span>
          </div>

          {/* Bottom label */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ bottom: '0%' }}>
            <img src={solutionBottom.img} alt="" className="h-3.5 w-3.5 lg:h-5 lg:w-5" />
            <p className="text-[9px] lg:text-sm text-white/80 leading-tight text-center">{solutionBottom.text}</p>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT TEASER ═══ */}
      <Section className="section-glow-top py-12 md:py-40">
        <FadeInView>
          <SectionTag>Product</SectionTag>
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Protected by Deep Hardware–Software Integration
          </h2>
          <p className="text-base text-white/60 max-w-2xl mx-auto sm:mx-0 mb-8">
            A defensible platform where hardware and software are inseparable.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: "/patent/pilt-1.png", ...productTiles[0] },
            { img: "/patent/pilt-2.png", ...productTiles[1] },
            { img: "/patent/pilt-3.png", ...productTiles[2] },
          ].map((t, i) => (
            <FadeInView key={t.title} delay={i * 120}>
              <div className="blue-card-glow h-full flex flex-col rounded-2xl p-6">
                <div className="w-full aspect-[4/3] mb-5 flex items-center justify-center overflow-hidden rounded-xl">
                  <img
                    src={t.img}
                    alt={t.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {t.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed flex-1">
                  {t.text}
                </p>
                <Link
                  to="/product"
                  className="mt-6 inline-flex items-center justify-center sm:justify-start gap-1 text-sm font-medium text-primary hover:text-white transition-colors duration-300"
                >
                  See full spec <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeInView>
          ))}
        </div>
      </Section>

      {/* ═══ USE CASES ═══ */}
      <Section className="section-glow-top py-24 md:py-40">
        <FadeInView>
          <SectionTag>Use Cases</SectionTag>
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Where to Deploy ROLLO
          </h2>
          <p className="text-base text-white/60 max-w-2xl mx-auto sm:mx-0 mb-8">
            High-value outdoor and perimeter-security environments where
            autonomy delivers the biggest efficiency gains.
          </p>
        </FadeInView>

        <div className="bento-use-cases grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.08 }}
                className="blue-card-glow group relative overflow-hidden rounded-2xl backdrop-blur-sm p-6 flex flex-col justify-between cursor-default"
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(78,132,255,0.14) 0%, transparent 72%)",
                    mixBlendMode: "screen",
                  }}
                />

                {/* Ghost image — only for featured tiles */}
                {"ghost" in uc && (
                  <img
                    src={(uc as { ghost: string }).ghost}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none hidden lg:block"
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">{uc.id}</span>
                    <div className="rounded-full bg-primary/10 p-2 text-primary group-hover:text-primary group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{uc.title}</h3>
                </div>
                <p className="telemetry-pulse relative z-10 text-[10px] font-mono uppercase tracking-widest text-primary/60 mt-4">{uc.tech}</p>
              </motion.div>
            );
          })}
        </div>

        <FadeInView delay={400}>
          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="min-h-11 inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/90 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
            >
              Talk to Us
            </Link>
          </div>
        </FadeInView>
      </Section>

      {/* ═══ MARKET ═══ */}
      <Section className="section-glow-top py-24 md:py-40 relative">
        <div className="absolute inset-0 geo-grid opacity-40 pointer-events-none" />

        <FadeInView>
          <SectionTag>Market Opportunity</SectionTag>
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10 md:mb-14 max-w-3xl">
            Global Reach, Untouched Potential.
          </h2>
        </FadeInView>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
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
            <FadeInView key={stat.num} delay={i * 150}>
              <div>
                <p className="text-3xl md:text-5xl font-bold text-primary neon-glow leading-none">
                  {stat.num}
                </p>
                <p className="text-sm text-white/70 mt-3">
                  {stat.desc}
                </p>
                <p className="text-sm text-white/50 italic mt-1">
                  {stat.sub}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </Section>

      {/* ═══ ROI CALCULATOR ═══ */}
      <Section className="py-24 md:py-40">
        <FadeInView>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 md:gap-12">
            {/* Left — title + sliders */}
            <div className="space-y-8">
              <div className="space-y-3">
                <SectionTag>Business Intelligence</SectionTag>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  The Math of Autonomy.
                </h2>
                <p className="text-white/60 text-sm max-w-md">
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
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary neon-glow leading-none">
                  €{annualSavings > 0 ? annualSavings.toLocaleString() : "—"}
                </p>

                <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/50">
                      ROI Period
                    </p>
                    <p className="text-xl font-bold text-white mt-1">
                      {roiMonths > 0 ? `${roiMonths} Months` : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/50">
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
        </FadeInView>
      </Section>
    </div>
  );
};

export default Index;
