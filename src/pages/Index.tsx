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
import OptimizedImage from "@/components/OptimizedImage";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PublicContentRail, Section, SectionIntro, SectionTag } from "@/components/ui/section";
import orbitalCompositeImage from "@/assets/robot/1rollo_orbital_2.png";

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
    image: "/hero/rollo-street.webp",
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
    image: "/robot/rollo-milit.png",
    description: "Continuous patrol across high-risk industrial sites.",
    tech: "THERMAL SCAN: ACTIVE / HAZMAT V4.2",
  },
  {
    id: "04",
    title: "Data Centers",
    icon: Database,
    image: "/graph/pilt-1.jpg",
    description: "Reliable autonomous presence for high-value facilities.",
    tech: "ENCRYPTED UPLINK / TEMP SYNC: 18C",
  },
  {
    id: "05",
    title: "Construction",
    icon: HardHat,
    image: "/robot/rollo-tunnel.png",
    description: "Adaptive patrol for dynamic sites with changing layouts.",
    tech: "DYNAMIC 3D MAPPING: ACTIVE / OBSTACLE AVOIDANCE",
  },
  {
    id: "06",
    title: "Campuses",
    icon: GraduationCap,
    image: "/robot/rollo-park.png",
    description: "Scalable coverage across mixed pedestrian environments.",
    tech: "CROWD ANALYTICS: ENABLED / MULTI-ZONE MESH",
  },
  {
    id: "07",
    title: "Communities",
    icon: Home,
    image: "/robot/rollo-city.png",
    description: "Autonomous neighborhood patrols with lower operating overhead.",
    tech: "PRIVACY MASKING: ON / AI PATROL",
  },
  {
    id: "08",
    title: "Oil & Gas",
    icon: Droplets,
    image: "/robot/rollo-des.png",
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
          <OptimizedImage
            src="/robot/F6/1rollo_tll.png"
            alt="Rollo autonomous patrol robot at airport"
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] bg-[radial-gradient(circle_at_24%_42%,rgba(2,6,14,0.8)_0%,rgba(3,8,18,0.68)_28%,rgba(4,10,24,0.34)_54%,rgba(0,0,0,0)_82%)]" />
          <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.08)_22%,rgba(0,0,0,0)_52%)]" />
          <div className="absolute -top-24 left-[12%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(38,93,214,0.22)_0%,rgba(0,0,0,0)_72%)] blur-3xl" />

        <PublicContentRail className="relative z-10 py-24">
          <SectionIntro centered className="flex flex-col items-center space-y-5">
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

      {/* ═══ CAPABILITIES ═══ */}
      <section className="section-glow-top relative w-full overflow-hidden py-12 md:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_14%,rgba(22,74,173,0.14),transparent_44%),linear-gradient(180deg,rgba(4,10,24,0.1),rgba(0,0,0,0.05))]" />
        <PublicContentRail className="relative z-10">
          <FadeInView>
            <div className="text-left">
              <SectionTag>Solution</SectionTag>
              <h2 className="title-halo mb-8 max-w-4xl text-2xl font-bold uppercase text-white sm:text-3xl md:mb-12 md:text-4xl">
                Rollo Can Observe, Drive, Decide, Report, and Intervene Without a Human on Site.
              </h2>
            </div>
          </FadeInView>

          <Dialog open={isOrbitOpen} onOpenChange={setIsOrbitOpen}>
            <div className="mt-8 md:mt-10">
              <div className="relative mx-auto max-w-5xl">
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

      {/* ═══ PRODUCT TEASER ═══ */}
      <Section className="section-glow-top py-12 md:py-40">
        <FadeInView>
          <SectionTag>Product</SectionTag>
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Protected by Deep Hardware–Software Integration
          </h2>
          <p className="text-base text-white/60 max-w-2xl mb-8">
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
              <div className="blue-card-glow h-full flex flex-col rounded-[4px] p-4 md:p-6">
                <div className="mb-5 flex w-full aspect-[4/3] items-center justify-center overflow-hidden rounded-[4px]">
                  <img
                    src={t.img}
                    alt={t.title}
                    className="w-full h-full object-contain p-2"
                    loading="lazy"
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
        </div>
      </Section>

      {/* ═══ USE CASES ═══ */}
      <Section className="section-glow-top py-20 md:py-28">
        <div className="space-y-8">
          <FadeInView>
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
          </FadeInView>

          <div className="bento-use-cases grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.08 }}
                className="blue-card-glow use-case-card group relative flex min-h-[190px] cursor-default flex-col justify-between overflow-hidden rounded-[4px] p-4 backdrop-blur-sm md:min-h-[205px] md:p-5"
              >
                <img
                  src={uc.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.16] pointer-events-none transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-[0.28]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.4)_0%,rgba(3,8,18,0.76)_54%,rgba(3,8,18,0.92)_100%)] pointer-events-none transition-opacity duration-500 group-hover:opacity-85" />

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
              </motion.div>
            );
          })}
          </div>
        </div>
      </Section>

      <section className="section-glow-top relative flex items-center justify-center overflow-hidden border-b border-t border-white/8 bg-background">
        {/* Inner padding wrapper to create space from borders - perfectly symmetric */}
        <div className="absolute inset-0 my-12 mx-4 overflow-hidden sm:mx-6 md:my-16 lg:mx-8 lg:my-20">
          {/* Background image inside padded area */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/robot/F6/1rollo_market_scale.png)',
              backgroundSize: 'cover',
              backgroundPosition: '75% center',
              backgroundRepeat: 'no-repeat'
            }}
          />

          {/* Desktop gradient overlay - left to right fade */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: 'linear-gradient(to right, rgba(2,6,17,1) 0%, rgba(2,6,17,0.95) 20%, rgba(2,6,17,0.8) 40%, rgba(2,6,17,0.3) 70%, rgba(2,6,17,0) 100%)'
            }}
          />

          {/* Mobile gradient overlay - bottom to top fade */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background: 'linear-gradient(to top, rgba(2,6,17,1) 0%, rgba(2,6,17,0.95) 30%, rgba(2,6,17,0.7) 60%, rgba(2,6,17,0.3) 100%)'
            }}
          />

          {/* Background effects */}
          <div className="absolute inset-0 geo-grid opacity-8 pointer-events-none" />
          <div className="absolute left-[18%] top-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(42,102,225,0.12)_0%,rgba(7,20,49,0.04)_42%,rgba(0,0,0,0)_76%)] blur-3xl pointer-events-none" />
        </div>

        {/* Container with max-width matching other sections */}
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
            <div className="max-w-xl lg:max-w-2xl">
            {/* Text Content */}
            <div className="space-y-8">
              <FadeInView>
                <div>
                  <SectionTag>Business Case</SectionTag>
                  <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 mt-4">
                    Market Scale Meets Immediate ROI.
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg text-white/70 max-w-xl">
                    The market is already there. The operating savings are measurable.
                  </p>
                </div>
              </FadeInView>

              <FadeInView delay={120}>
                <div className="pt-6 lg:pt-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-6">
                    Market Opportunity
                  </p>
                  <div className="grid grid-cols-1 gap-5 max-w-2xl sm:grid-cols-2 lg:grid-cols-1">
                    {[
                      { num: "28.5M", desc: "Frontline security workers globally" },
                      { num: "$500B", desc: "Security equipment market by 2030" },
                      { num: "80%+", desc: "Potential customer cost savings" },
                    ].map((stat, i) => (
                      <FadeInView key={stat.num} delay={i * 100 + 200}>
                        <div className="border-l-2 border-white/15 pl-5">
                          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-none">
                            {stat.num}
                          </p>
                          <p className="text-sm md:text-base text-white/70 mt-2.5 max-w-[28ch]">
                            {stat.desc}
                          </p>
                        </div>
                      </FadeInView>
                    ))}
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
