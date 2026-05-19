import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  Building2,
  Factory,
  HardHat,
  Database,
  Anchor,
  Home,
  Droplets,
  ChevronRight,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import FadeInView from "@/components/FadeInView";
import LazySection from "@/components/LazySection";
import OptimizedImage from "@/components/OptimizedImage";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PublicContentRail, Section, SectionIntro, SectionTag } from "@/components/ui/section";

const orbitalCompositeImage = "/robot/F6/1rollo_orbital_2.webp";

/* ── data ─────────────────────────────────────────────── */

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
  {
    id: "01",
    title: "Airports",
    icon: Plane,
    image: "/robot/rollo-airport.webp",
    objectPosition: "0% center",
    imageScale: 1.15,
    description: "Persistent perimeter patrol for wide outdoor zones.",
    tech: "LIDAR RANGE: 250M / NO-FLY ZONE SYNC",
  },
  {
    id: "02",
    title: "Hospitals",
    icon: Building2,
    image: "/robot/rollo-futu.jpg",
    description: "Quiet autonomous monitoring for sensitive public environments.",
    tech: "ACOUSTIC SENSITIVITY: HIGH / SILENCE PROTOCOL",
  },
  {
    id: "03",
    title: "Industrial Plants",
    icon: Factory,
    image: "/robot/rollo-milit.webp",
    description: "Continuous patrol across high-risk industrial sites.",
    tech: "THERMAL SCAN: ACTIVE / HAZMAT V4.2",
  },
  {
    id: "04",
    title: "Ports & Marine",
    icon: Anchor,
    image: "/robot/rollo-marine.webp",
    description: "Continuous perimeter surveillance in high-traffic maritime zones.",
    tech: "MARITIME-GRADE IP67 / SALT-AIR HARDENED",
  },
  {
    id: "05",
    title: "Construction",
    icon: HardHat,
    image: "/robot/rollo-tunnel.webp",
    description: "Adaptive patrol for dynamic sites with changing layouts.",
    tech: "DYNAMIC 3D MAPPING: ACTIVE / OBSTACLE AVOIDANCE",
  },
  {
    id: "06",
    title: "Data Centers",
    icon: Database,
    image: "/robot/rollo-datacenter.webp",
    description: "Reliable autonomous presence for high-value facilities.",
    tech: "ENCRYPTED UPLINK / TEMP SYNC: 18C",
  },
  {
    id: "07",
    title: "Communities",
    icon: Home,
    image: "/robot/rollo-city.webp",
    description: "Autonomous neighborhood patrols with lower operating overhead.",
    tech: "PRIVACY MASKING: ON / AI PATROL",
  },
  {
    id: "08",
    title: "Oil & Gas",
    icon: Droplets,
    image: "/robot/rollo-des.webp",
    description: "Remote monitoring for harsh operating zones.",
    tech: "EX-PROOF RATING: ZONE 0 / GAS LEAK DETECT",
  },
];

/* ── page ─────────────────────────────────────────────── */

const Index = () => {
  const [sectors, setSectors] = useState(3);
  const [hours, setHours] = useState(16);
  const [isOrbitOpen, setIsOrbitOpen] = useState(false);

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
            src="/hero/1rollo_home_hero.png"
            alt="Rollo autonomous patrol robot at airport terminal"
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] bg-[radial-gradient(circle_at_24%_42%,rgba(2,6,14,0.8)_0%,rgba(3,8,18,0.68)_28%,rgba(4,10,24,0.34)_54%,rgba(0,0,0,0)_82%)]" />
          <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.08)_22%,rgba(0,0,0,0)_52%)]" />
          <div className="absolute -top-24 left-[12%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(38,93,214,0.22)_0%,rgba(0,0,0,0)_72%)] blur-3xl" />

        <PublicContentRail className="relative z-10 py-24">
          <SectionIntro centered className="flex flex-col items-center space-y-5 md:mx-0 md:items-start md:text-left">
            <img
              src="/logos/rollo-logo-white.png"
              alt="1ROLLO"
              className="h-6 sm:h-8 md:h-10 w-auto"
            />

            <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white max-w-2xl">
              Brings human-level presence to the physical world
            </h1>

            <div className="flex items-center gap-3 sm:gap-4 max-w-sm w-full">
              <span className="h-px flex-1 bg-white/25" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary whitespace-nowrap">
                Without Humans
              </span>
              <span className="h-px flex-1 bg-white/25" />
            </div>

            <p className="max-w-2xl text-sm text-foreground/80 sm:text-base md:text-lg">
              Autonomous robots that see, hear, speak, and move.
            </p>
          </SectionIntro>
        </PublicContentRail>
      </section>

      {/* ═══ PROBLEMS ═══ */}
      <section className="section-glow-top relative w-full min-h-[100svh] flex items-center overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/security-guard.jpg"
          alt="Security guard on patrol"
          className="absolute inset-0 w-full h-full object-cover object-[50%_25%] sm:object-[50%_30%] md:object-[50%_35%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/42" />
        {/* Mobile: gradient from bottom for text readability */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,13,0.95)_0%,rgba(2,6,13,0.85)_25%,rgba(2,6,13,0.65)_50%,rgba(2,6,13,0.35)_75%,rgba(2,6,13,0.15)_100%)] md:hidden" />
        {/* Desktop: gradient from left matching site style */}
        <div className="absolute inset-0 hidden md:block bg-[linear-gradient(90deg,rgba(2,6,13,0.92)_0%,rgba(2,6,13,0.78)_28%,rgba(2,6,13,0.52)_52%,rgba(2,6,13,0.24)_76%,rgba(2,6,13,0.08)_100%)]" />
        <div className="absolute -top-24 left-[12%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(214,38,38,0.12)_0%,rgba(0,0,0,0)_72%)] blur-3xl" />

        <PublicContentRail className="relative z-10 py-24">
          <FadeInView>
            <div className="space-y-8 md:space-y-10 px-3 md:px-0">
              {/* Header */}
              <div className="max-w-3xl">
                <SectionTag className="mb-4">
                  <span className="text-red-500">Problems</span>
                </SectionTag>
                <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  Human Patrol is Expensive, Inefficient and Now Replaceable
                </h2>
              </div>

              {/* Problem Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl">
                {/* Problem 1 */}
                <FadeInView delay={100}>
                  <div className="blue-card-glow backdrop-blur-sm bg-black/40 rounded-lg p-5 md:p-6 border border-white/5 flex flex-col h-full min-h-[180px]">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="shrink-0 rounded-full bg-red-500/15 p-2 text-red-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      Escalating Security Labor Costs
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed flex-1">
                      Security labor costs keep rising while efficiency stays flat.
                    </p>
                  </div>
                </FadeInView>

                {/* Problem 2 */}
                <FadeInView delay={200}>
                  <div className="blue-card-glow backdrop-blur-sm bg-black/40 rounded-lg p-5 md:p-6 border border-white/5 flex flex-col h-full min-h-[180px]">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="shrink-0 rounded-full bg-red-500/15 p-2 text-red-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      Human Performance Bottlenecks
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed flex-1">
                      Human-level perception and edge intelligence.
                    </p>
                  </div>
                </FadeInView>

                {/* Problem 3 */}
                <FadeInView delay={300}>
                  <div className="blue-card-glow backdrop-blur-sm bg-black/40 rounded-lg p-5 md:p-6 border border-white/5 flex flex-col h-full min-h-[180px]">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="shrink-0 rounded-full bg-red-500/15 p-2 text-red-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      Cost–Reliability Imbalance
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed flex-1">
                      Autonomous robots now deliver higher reliability at a fraction of the cost.
                    </p>
                  </div>
                </FadeInView>
              </div>
            </div>
          </FadeInView>
        </PublicContentRail>
      </section>

      {/* ═══ SOLUTION ═══ */}
      <section className="section-glow-top relative w-full min-h-[100svh] flex items-center overflow-hidden py-16 md:py-20">
        {/* Background Image - Robots (right side) with breathing room */}
        <div className="absolute inset-x-0 top-[8%] bottom-[8%] flex items-center justify-end">
          <img
            src="/images/1rollo_solution_graph.png"
            alt="1Rollo autonomous security robots"
            className="h-full w-auto object-contain object-right"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-black/42" />
        {/* Mobile: gradient from bottom */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,13,0.95)_0%,rgba(2,6,13,0.85)_25%,rgba(2,6,13,0.65)_50%,rgba(2,6,13,0.35)_75%,rgba(2,6,13,0.15)_100%)] md:hidden" />
        {/* Desktop: strong gradient from left to keep text area clear */}
        <div className="absolute inset-0 hidden md:block bg-[linear-gradient(90deg,rgba(2,6,13,0.98)_0%,rgba(2,6,13,0.96)_20%,rgba(2,6,13,0.92)_35%,rgba(2,6,13,0.78)_48%,rgba(2,6,13,0.42)_62%,rgba(2,6,13,0.12)_78%,rgba(2,6,13,0)_100%)]" />
        <div className="absolute top-24 left-[12%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(180,255,51,0.12)_0%,rgba(0,0,0,0)_72%)] blur-3xl" />

        <PublicContentRail className="relative z-10 py-32 md:py-40">
          <div className="space-y-8 md:space-y-10 px-3 md:px-0 md:max-w-[58%]">
              {/* Header */}
              <FadeInView>
                <div className="max-w-3xl">
                  <SectionTag className="mb-4">
                    <span className="text-primary">Solution</span>
                  </SectionTag>
                  <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    A Fundamentally Better Way to Build Patrol Robots
                  </h2>
                </div>
              </FadeInView>

              {/* Solution Cards - Asymmetric Grid on Desktop */}
              <div className="space-y-4 md:space-y-5">
                {/* Row 1: Card 1 (wider) + Card 2 (square) */}
                <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4 md:gap-5">
                  {/* Card 1: Extreme-environment advantage (WIDER) */}
                  <FadeInView delay={100}>
                    <div className="blue-card-glow backdrop-blur-sm bg-black/30 rounded-lg p-5 md:p-6 border border-white/5 flex flex-col h-full min-h-[200px]">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="shrink-0 rounded-full bg-primary/15 p-2 text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      Extreme-Environment Advantage
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed flex-1">
                      Most autonomous robots are validated in controlled, sunny conditions. 1Rollo is trained in Estonia's harsh winters, solving traction, battery performance, and sensor reliability in snow and sub-zero temperatures.
                    </p>
                  </div>
                </FadeInView>

                  {/* Card 2: Gyroscopic Innovation (SQUARE) */}
                  <FadeInView delay={200}>
                    <div className="blue-card-glow backdrop-blur-sm bg-black/30 rounded-lg p-5 md:p-6 border border-white/5 flex flex-col h-full min-h-[200px]">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="shrink-0 rounded-full bg-primary/15 p-2 text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      Gyroscopic Innovation
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed flex-1">
                      First-in-the-world gyroscope-based stabilization enabling a truly autonomous one-wheeled robot (patent pending)
                    </p>
                  </div>
                </FadeInView>
                </div>

                {/* Row 2: Card 3 (square) + Card 4 (wider) */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-4 md:gap-5">
                  {/* Card 3: Cost-efficient robots (SQUARE) */}
                  <FadeInView delay={300}>
                    <div className="blue-card-glow backdrop-blur-sm bg-black/30 rounded-lg p-5 md:p-6 border border-white/5 flex flex-col h-full min-h-[200px]">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="shrink-0 rounded-full bg-primary/15 p-2 text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <circle cx="12" cy="12" r="10" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      Cost-Efficient Robots
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed flex-1">
                      Fewer hardware components make 1Rollo lighter, simpler, and cheaper than other robots or humanoids
                    </p>
                  </div>
                </FadeInView>

                  {/* Card 4: Ground advantages (WIDER) */}
                  <FadeInView delay={400}>
                    <div className="blue-card-glow backdrop-blur-sm bg-black/30 rounded-lg p-5 md:p-6 border border-white/5 flex flex-col h-full min-h-[200px]">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="shrink-0 rounded-full bg-primary/15 p-2 text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      Ground Advantages
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed flex-1">
                      Ground-based autonomy delivers far longer operating time and weather independence compared to drones
                    </p>
                  </div>
                </FadeInView>
                </div>
              </div>
            </div>
        </PublicContentRail>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      {/* HIDDEN: Rollo Can Observe, Drive, Decide, Report, and Intervene section
      <section className="section-glow-top relative w-full overflow-hidden py-12 md:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_14%,rgba(22,74,173,0.14),transparent_44%),linear-gradient(180deg,rgba(4,10,24,0.1),rgba(0,0,0,0.05))]" />
        <PublicContentRail className="relative z-10">
          <FadeInView>
            <div className="text-left px-3 md:px-0">
              <SectionTag>Solution</SectionTag>
              <h2 className="title-halo mb-8 max-w-4xl text-2xl font-bold uppercase text-white sm:text-3xl md:mb-12 md:text-4xl">
                Rollo Can Observe, Drive, Decide, Report, and Intervene Without a Human on Site.
              </h2>
            </div>
          </FadeInView>

          <Dialog open={isOrbitOpen} onOpenChange={setIsOrbitOpen}>
            <div className="mt-8 md:mt-10">
              <div className="relative mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl">
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="block w-full cursor-zoom-in md:cursor-default"
                    aria-label="Open orbit image in full screen"
                  >
                    <img
                      src={orbitalCompositeImage}
                      alt="1ROLLO orbit capabilities overview"
                      className="w-full object-contain"
                      loading="lazy"
                    />
                  </button>
                </DialogTrigger>
              </div>
            </div>

            <DialogContent className="border-none bg-transparent p-0 shadow-none max-w-[96vw] w-[96vw] sm:max-w-[90vw]">
              <img
                src={orbitalCompositeImage}
                alt="1ROLLO orbit capabilities overview enlarged"
                className="w-full max-h-[88vh] object-contain"
              />
            </DialogContent>
          </Dialog>
        </PublicContentRail>
      </section>
      */}

      {/* ═══ PRODUCT TEASER ═══ */}
      {/* HIDDEN: Product section
      <Section className="section-glow-top py-12 md:py-40">
        <FadeInView>
          <div className="px-3 md:px-0">
            <SectionTag>Product</SectionTag>
            <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Protected by Deep Hardware–Software Integration
            </h2>
            <p className="text-base text-white/60 max-w-2xl mb-8">
              A defensible platform where hardware and software are inseparable.
            </p>
          </div>
        </FadeInView>

        <LazySection minHeight={520} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: "/patent/pilt-1.png", ...productTiles[0] },
            { img: "/patent/pilt-2.png", ...productTiles[1] },
            { img: "/patent/pilt-3.png", ...productTiles[2] },
          ].map((t, i) => (
            <FadeInView key={t.title} delay={i * 120}>
              <div className="blue-card-glow h-full flex flex-col rounded-[4px] p-3 md:p-6">
                <div className="mb-5 flex w-full aspect-[4/3] items-center justify-center overflow-hidden rounded-[4px]">
                  <img
                    src={t.img}
                    alt={t.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain p-2"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {t.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed flex-1">
                  {t.text}
                </p>
              </div>
            </FadeInView>
          ))}
        </LazySection>
      </Section>
      */}

      {/* ═══ USE CASES ═══ */}
      <Section className="section-glow-top py-20 md:py-28">
        <div className="space-y-8">
          <FadeInView>
            <div className="px-3 md:px-0">
              <SectionIntro className="space-y-2 md:max-w-2xl">
                <SectionTag>Use Cases</SectionTag>
                <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Where to Deploy ROLLO
                </h2>
                <p className="text-sm md:text-base text-white/60 max-w-2xl">
                  High-value outdoor and perimeter-security environments where
                  autonomy delivers the biggest efficiency gains.
                </p>
              </SectionIntro>
            </div>
          </FadeInView>

          <LazySection minHeight={800} className="bento-use-cases grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <FadeInView key={uc.id} delay={i * 80}>
                <div className="blue-card-glow use-case-card group relative flex min-h-[190px] cursor-default flex-col justify-between overflow-hidden rounded-[4px] p-4 md:min-h-[205px] md:p-5 h-full">
                  <OptimizedImage
                    src={uc.image}
                    alt=""
                    width={800}
                    height={600}
                    localVariants={[640, 960]}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{
                      objectPosition: uc.objectPosition ?? "center",
                      transform: uc.imageScale ? `scale(${uc.imageScale})` : undefined,
                    }}
                    className="absolute inset-0 h-full w-full object-cover opacity-40 pointer-events-none transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.15)_0%,rgba(3,8,18,0.45)_60%,rgba(3,8,18,0.7)_100%)] pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">{uc.id}</span>
                      <div className="rounded-full bg-primary/10 p-1.5 md:p-2 text-primary group-hover:text-primary group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      </div>
                    </div>
                    <h3 className="text-[15px] md:text-base font-bold text-white mb-1">{uc.title}</h3>
                    <p className="text-xs md:text-[13px] text-white/62 leading-relaxed max-w-[24ch]">{uc.description}</p>
                  </div>

                  <div className="relative z-10">
                    <p className="telemetry-pulse text-[9px] md:text-[10px] font-mono uppercase tracking-[0.16em] text-primary/58">{uc.tech}</p>
                  </div>
                </div>
              </FadeInView>
            );
          })}
          </LazySection>
        </div>
      </Section>

      <section className="section-glow-top relative overflow-hidden bg-background min-h-screen flex items-center py-16 md:py-24">
        {/* Subtle background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(22,74,173,0.08),transparent_50%)]" />
        <div className="absolute inset-0 geo-grid opacity-5 pointer-events-none" />

        {/* Container */}
        <div className="relative z-10 max-w-6xl lg:max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
          <div className="max-w-full">
            {/* Text Content */}
            <div className="space-y-20 md:space-y-24">
              {/* Header */}
              <FadeInView>
                <div className="px-3 md:px-0 text-center md:text-left">
                  <SectionTag>Comparison</SectionTag>
                  <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 mt-4">
                    A Massive Market Ready for Automation
                  </h2>
                </div>
              </FadeInView>

              {/* Comparison: 3 Robots vs 9 Guards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-full">
                {/* 3 Robots */}
                <FadeInView delay={100}>
                  <div className="relative h-full rounded-lg overflow-hidden bg-gradient-to-br from-blue-950/30 via-black/40 to-black/30 backdrop-blur-sm border border-primary/25 shadow-lg shadow-primary/5">
                    {/* Subtle blue glow overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(22,74,173,0.1),transparent_70%)]" />

                    <div className="relative z-10 h-full flex flex-col md:flex-row md:items-center gap-6 md:gap-8 p-8 md:p-10">
                      {/* Left: Text content */}
                      <div className="flex-1 space-y-6 min-w-0">
                        {/* Badge */}
                        <div className="inline-block px-4 py-2 rounded-md bg-primary text-black font-bold text-sm">
                          3 Robots
                        </div>

                        {/* Costs */}
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-wider text-white/50">Annual cost</p>
                          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                            $72,000 -<br />$108,000
                          </p>
                        </div>
                      </div>

                      {/* Right: Robot Image */}
                      <div className="flex justify-center md:justify-end flex-shrink-0">
                        <img
                          src="/images/1rollo_market_3robots.png"
                          alt="3 Rollo robots"
                          className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px] object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </FadeInView>

                {/* 9 Guards */}
                <FadeInView delay={200}>
                  <div className="relative h-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-900/35 via-black/40 to-black/30 backdrop-blur-sm border border-white/25 shadow-lg">
                    {/* Subtle glow overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(100,116,139,0.1),transparent_70%)]" />

                    <div className="relative z-10 h-full flex flex-col md:flex-row md:items-center gap-6 md:gap-8 p-8 md:p-10">
                      {/* Left: Text content */}
                      <div className="flex-1 space-y-6 min-w-0">
                        {/* Badge */}
                        <div className="inline-block px-4 py-2 rounded-md bg-white/10 text-white font-bold text-sm border border-white/20">
                          9 Guards
                        </div>

                        {/* Costs */}
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-wider text-white/50">Annual cost</p>
                          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            $450,000 -<br />$630,000
                          </p>
                        </div>
                      </div>

                      {/* Right: Guard Image */}
                      <div className="flex justify-center md:justify-end flex-shrink-0">
                        <img
                          src="/images/1rollo_security_guard.png"
                          alt="Security guard"
                          className="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px] object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </FadeInView>
              </div>

              {/* Market Statistics */}
              <FadeInView delay={300}>
                <div className="relative">
                  {/* Subtle separator */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-8 max-w-full px-3 md:px-0 pt-12 md:pt-14">
                    {/* Stat 1 - Left aligned */}
                    <div className="space-y-2 md:flex-shrink-0">
                      <div className="h-0.5 w-8 bg-primary/40" />
                      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-none">
                        28.5M
                      </p>
                      <p className="text-sm font-semibold text-white/70">
                        Frontline security workers
                      </p>
                    </div>

                    {/* Stat 2 - Center */}
                    <div className="space-y-2 md:flex-shrink-0 md:text-center">
                      <div className="h-0.5 w-8 bg-primary/40 md:mx-auto" />
                      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-none">
                        $500B
                      </p>
                      <p className="text-sm font-semibold text-white/70">
                        Physical security market by 2026
                      </p>
                    </div>

                    {/* Stat 3 - Right aligned */}
                    <div className="space-y-2 md:flex-shrink-0 md:text-right">
                      <div className="h-0.5 w-8 bg-primary/40 md:ml-auto" />
                      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-none">
                        80%+
                      </p>
                      <p className="text-sm font-semibold text-white/70">
                        Labor cost reduction
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
