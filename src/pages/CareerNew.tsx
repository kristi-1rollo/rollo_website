import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { usePublishedCareerPosts, type CareerPost } from "@/hooks/useCareerPosts";
import {
  ArrowRight,
  Target,
  CheckCircle2,
  XCircle,
  Wrench,
  Radar,
  TimerReset,
  ImagePlus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionTag } from "@/components/ui/section";
import DOMPurify from "dompurify";
import type { Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const principles = [
  {
    title: "Build in the real world",
    description:
      "We work close to hardware, field tests and messy environments where the product actually has to perform.",
    icon: Wrench,
  },
  {
    title: "Move before it's comfortable",
    description:
      "A lot of our work starts with incomplete information. We prototype, test and learn instead of waiting for certainty.",
    icon: TimerReset,
  },
  {
    title: "Own the outcome",
    description:
      "You are not here to hand work to someone else. You help define the problem and push it through to reality.",
    icon: Target,
  },
  {
    title: "Stay close to the mission",
    description:
      "Everything connects back to autonomous patrol in complex environments. The work is technical, but the purpose stays visible.",
    icon: Radar,
  },
];

const hiringSteps = [
  "Intro call to understand your background and motivation.",
  "Practical conversation about how you think, build and solve problems.",
  "On-site discussion with the team so both sides can judge the fit honestly.",
];

const culturePanels = [
  {
    eyebrow: "01 Field Proximity",
    title: "Close to the product",
    text: "The work stays connected to real robots, real tests and real constraints. You see quickly whether something actually works outside a slide deck.",
    image: "/robot/F6/1rollo_auto_sec.webp",
  },
  {
    eyebrow: "02 High Ownership",
    title: "Responsibility is not abstract",
    text: "People here do not hand work across five layers. You help define the direction, make the thing and carry it until it behaves properly.",
    image: "/robot/F6/1rollo_close.webp",
  },
  {
    eyebrow: "03 Fast Iteration",
    title: "Speed comes from learning",
    text: "We move fast by testing, debugging and improving in the open. Momentum matters more than performative polish.",
    image: "/robot/team/team_learning.jpg",
  },
  {
    eyebrow: "04 Shared Mission",
    title: "The mission stays visible",
    text: "You are not a tiny cog in an invisible system. The line from your work to the product and its impact is short and obvious.",
    image: "/robot/team/1rollo_team_3.webp",
  },
];

const teamProfiles = [
  { name: "Arno Kütt", image: "/robot/team/profile/arno_kutt.png" },
  { name: "Sander Sebastian Agur", image: "/robot/team/profile/sander_sebastjan_agur.png" },
  { name: "Kristi Vahter", image: "/robot/team/profile/kristi_vahter.png" },
  { name: "Laido Valdvee", image: "/robot/team/profile/laido_valdvee.png" },
  { name: "Lauri Hirvesaar", image: "/robot/team/profile/lauri_hirvesaar.png" },
  { name: "Lauri Laanmets", image: "/robot/team/profile/lauri_laanmets.png" },
  { name: "Lauri Vaher", image: "/robot/team/profile/lauri_vaher.png" },
  { name: "Raivo Sulla", image: "/robot/team/profile/raivo_sulla.png" },
  { name: "Rein Saetalu", image: "/robot/team/profile/rein_saetalu.png" },
  { name: "Remi Lossov", image: "/robot/team/profile/remi_lossov.png" },
  { name: "Taavi Varjund", image: "/robot/team/profile/taavi_varjund.png" },
];

const CareerNew = () => {
  const { data: careerPosts } = usePublishedCareerPosts();
  const [selectedPost, setSelectedPost] = useState<CareerPost | null>(null);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeCulturePanel, setActiveCulturePanel] = useState(0);
  const cultureCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const cards = cultureCardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!mostVisible) return;

        const index = Number((mostVisible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) {
          setActiveCulturePanel(index);
        }
      },
      {
        threshold: [0.35, 0.6, 0.85],
        rootMargin: "-20% 0px -30% 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("join@1rollo.com");
      setEmailCopied(true);
      toast({ title: "Email copied to clipboard!" });
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const handleApply = (post: CareerPost) => {
    setSelectedPost(post);
  };

  const handleOpenTeamMember = (index: number) => {
    setSelectedTeamIndex(index);
  };

  const handleCloseTeamMember = () => {
    setSelectedTeamIndex(null);
  };

  const handleTeamNavigate = (direction: 1 | -1) => {
    if (selectedTeamIndex === null) return;

    setSelectedTeamIndex((selectedTeamIndex + direction + teamProfiles.length) % teamProfiles.length);
  };

  const selectedTeamMember = selectedTeamIndex !== null ? teamProfiles[selectedTeamIndex] : null;

  return (
    <>
      <header className="section-glow-top relative min-h-[100svh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #000b18 0%, #000000 100%), radial-gradient(ellipse 1400px 950px at 12% 2%, rgba(64, 124, 255, 0.18), transparent 62%), radial-gradient(ellipse 1100px 900px at 82% 24%, rgba(14, 65, 170, 0.14), transparent 60%), radial-gradient(ellipse 1400px 1000px at 50% 100%, rgba(6, 32, 96, 0.12), transparent 68%)",
          }}
        />
        <img
          src="/team/team-hero.webp"
          alt="Rollo team and robotics workspace"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-62"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.8)_0%,rgba(2,6,17,0.7)_26%,rgba(2,6,17,0.42)_54%,rgba(2,6,17,0.18)_78%,rgba(2,6,17,0.38)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,17,0.06)_0%,rgba(2,6,17,0.16)_48%,rgba(2,6,17,0.66)_100%)]" />
        <div className="absolute left-[12%] top-[14%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(54,118,255,0.22)_0%,rgba(54,118,255,0.08)_36%,rgba(0,0,0,0)_72%)] blur-3xl" />

        <div className="relative z-10 flex min-h-[100svh] items-center">
          <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="lg:col-span-6"
                >
                  <SectionTag>Careers</SectionTag>

                  <h1 className="title-halo mb-4 text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
                    Build the future of autonomous security
                  </h1>

                  <p className="mb-6 max-w-xl text-base text-white/80 sm:text-lg md:mb-8 md:text-xl">
                    We&apos;re building robots that replace human patrol operating 24/7 in real-world environments where humans can&apos;t.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <a
                      href="#open-roles"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
                    >
                      View open roles
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#how-we-work"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
                    >
                      See how we build
                    </a>
                  </div>
                </motion.div>

                <div className="hidden lg:block lg:col-span-6" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="section-glow-top relative w-full py-12 sm:py-16 md:py-20 lg:py-32">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 1200px 600px at 50% 0%, rgba(30, 84, 196, 0.08), transparent 70%), linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="mx-auto max-w-3xl text-center"
            >
              <SectionTag>The Problem</SectionTag>

              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
                Security hasn&apos;t evolved the way the world has
              </h2>

              <p className="mb-6 text-base text-white/70 sm:text-lg md:mb-8">
                It&apos;s still human-based, expensive and limited.
              </p>

              <div className="mx-auto max-w-2xl space-y-3 text-center text-sm text-white/60 sm:space-y-4 sm:text-base">
                <p>24/7 coverage is difficult.</p>
                <p>Dangerous or remote environments are often left unmonitored.</p>
              </div>

              <p className="mt-6 text-base font-semibold text-white sm:mt-8 sm:text-lg">
                We believe this needs to change.
              </p>
            </motion.div>
          </div>
        </section>

        <section
          className="section-glow-top relative w-full border-t border-white/10 py-12 sm:py-16 md:py-20 lg:py-32"
          style={{
            background:
              "radial-gradient(ellipse 1200px 800px at 50% 50%, rgba(6, 32, 96, 0.06), transparent 70%), linear-gradient(180deg, rgba(0, 11, 24, 0.8) 0%, rgba(0, 0, 0, 1) 100%)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12"
            >
              <div className="lg:col-span-5">
                <SectionTag>Our Solution</SectionTag>

                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
                  What we&apos;re building
                </h2>

                <div className="max-w-2xl space-y-4 text-left text-sm sm:space-y-6 sm:text-base">
                  <p className="text-base text-white/80 sm:text-lg">
                    Rollo is developing autonomous ground robots designed for real-world patrol and monitoring.
                  </p>

                  <p className="text-white/70">
                    Our robots move, see, hear and react without constant human control.
                  </p>

                  <p className="text-white/70">
                    Built for both indoor and outdoor environments, they are designed to operate continuously, efficiently and reliably.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    "Autonomous patrol, not remote-controlled demos",
                    "Built for long-duration work in changing environments",
                    "Designed to reduce reliance on on-site human presence",
                  ].map((item) => (
                    <div key={item} className="border-l border-primary/40 pl-4 text-sm text-white/70">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative aspect-video overflow-hidden rounded-[4px] border border-white/10 bg-white/5">
                  <LazyVideo
                    className="h-full w-full object-cover"
                    src="https://igdxbtuaajrhvuqtwhmm.supabase.co/storage/v1/object/public/videos/rollo_test_drive.mp4"
                    type="video/mp4"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,17,0.04)_0%,rgba(2,6,17,0.2)_50%,rgba(2,6,17,0.78)_100%)]" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-primary/85">
                      Field Footage
                    </p>
                    <p className="max-w-sm text-sm text-white/85">
                      Real-world test drive footage from the robot development process.
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/35">
                  Product direction shown through real-world deployment readiness
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="section-glow-top relative w-full border-t border-white/10 py-12 sm:py-16 md:py-20 lg:py-32"
          style={{
            background:
              "radial-gradient(ellipse 1000px 600px at 30% 50%, rgba(14, 65, 170, 0.05), transparent 70%), linear-gradient(180deg, rgba(0, 11, 24, 0.6) 0%, rgba(0, 0, 0, 1) 100%)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <SectionTag>Culture</SectionTag>

                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
                  How we work
                </h2>

                <p className="mb-6 max-w-xl text-base text-white/80 sm:text-lg md:mb-8 md:text-xl">
                  We&apos;re a small team building real hardware.
                </p>

                <div className="mb-8 max-w-xl space-y-3 text-sm text-white/70 sm:space-y-4 sm:text-base">
                  <p>No layers. No corporate structure.</p>
                  <p>Fast iteration. High ownership.</p>
                </div>

                <div className="lg:sticky lg:top-24">
                  <motion.div
                    key={culturePanels[activeCulturePanel].title}
                    initial={{ opacity: 0.35, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden rounded-[4px] border border-white/10 bg-white/5"
                  >
                    <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]">
                      <img
                        src={culturePanels[activeCulturePanel].image}
                        alt={culturePanels[activeCulturePanel].title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.06)_0%,rgba(3,8,18,0.26)_45%,rgba(3,8,18,0.84)_100%)]" />
                      <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                        <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-primary/90">
                          {culturePanels[activeCulturePanel].eyebrow}
                        </p>
                        <h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl">
                          {culturePanels[activeCulturePanel].title}
                        </h3>
                        <p className="max-w-md text-sm text-white/78 sm:text-base">
                          {culturePanels[activeCulturePanel].text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                {culturePanels.map((item, index) => (
                  <div
                    key={item.title}
                    ref={(element) => {
                      cultureCardRefs.current[index] = element;
                    }}
                    data-index={index}
                    onMouseEnter={() => setActiveCulturePanel(index)}
                    className={`rounded-[4px] p-5 sm:p-6 transition-all duration-300 ${
                      activeCulturePanel === index
                        ? "blue-card-glow border-primary/30"
                        : "border border-white/10 bg-white/5"
                    }`}
                  >
                    <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-primary/75">
                      {item.eyebrow}
                    </p>
                    <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-white/68 sm:text-base">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-glow-top relative w-full py-12 sm:py-16 md:py-20 lg:py-32">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 1200px 650px at 50% 0%, rgba(30, 84, 196, 0.08), transparent 72%), linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <div className="mb-8 max-w-3xl lg:mb-12">
                <SectionTag>Principles</SectionTag>
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
                  What good work looks like here
                </h2>
                <p className="max-w-2xl text-sm text-white/70 sm:text-base md:text-lg">
                  The role matters, but the working style matters just as much. These are the instincts that tend to fit.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                {principles.map((principle) => {
                  const Icon = principle.icon;
                  return (
                    <motion.div
                      key={principle.title}
                      variants={fadeInUp}
                      className="blue-card-glow rounded-[4px] p-5 sm:p-6 md:p-7"
                    >
                      <div className="mb-5 inline-flex rounded-[4px] border border-primary/20 bg-primary/10 p-3 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                        {principle.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/68 sm:text-base">
                        {principle.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-glow-top relative w-full py-12 sm:py-16 md:py-20 lg:py-32">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 1200px 600px at 50% 0%, rgba(30, 84, 196, 0.08), transparent 70%), linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
                <SectionTag>Who We Need</SectionTag>
                <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  Who we&apos;re looking for
                </h2>
              </div>

              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6 lg:gap-8">
                <motion.div
                  variants={fadeInUp}
                  className="blue-card-glow rounded-[4px] border-2 border-primary/40 p-5 sm:p-6 md:p-8"
                >
                  <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary sm:h-6 sm:w-6" />
                    <h3 className="text-base font-semibold text-white sm:text-lg md:text-xl">
                      You&apos;ll fit in if you:
                    </h3>
                  </div>

                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "enjoy solving problems without clear answers",
                      "like building things from scratch",
                      "are comfortable with uncertainty",
                      "want your work to exist in the real world",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-white/80 sm:gap-3 sm:text-sm">
                        <span className="mt-0.5 flex-shrink-0 text-primary">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="rounded-[4px] border border-white/20 bg-white/5 p-5 sm:p-6 md:p-8"
                >
                  <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
                    <XCircle className="h-5 w-5 flex-shrink-0 text-red-400/80 sm:h-6 sm:w-6" />
                    <h3 className="text-base font-semibold text-white sm:text-lg md:text-xl">
                      You won&apos;t fit in if you:
                    </h3>
                  </div>

                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "need clear structure and constant guidance",
                      "prefer predictable environments",
                      "want slow, incremental work",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-white/60 sm:gap-3 sm:text-sm">
                        <span className="mt-0.5 flex-shrink-0 text-red-400/60">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="section-glow-top relative w-full border-t border-white/10 py-12 sm:py-16 md:py-20 lg:py-32"
          style={{
            background:
              "radial-gradient(ellipse 1100px 700px at 70% 50%, rgba(6, 32, 96, 0.08), transparent 70%), linear-gradient(180deg, rgba(0, 11, 24, 0.7) 0%, rgba(0, 0, 0, 1) 100%)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
                <SectionTag>Team</SectionTag>

                <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
                  We&apos;re engineers, builders and problem-solvers
                </h2>

                <p className="text-sm text-white/70 sm:text-base md:text-lg">
                  Everyone here works hands-on with the product from idea to real-world testing.
                </p>
              </div>

              <div className="team-marquee mx-auto max-w-6xl">
                <div className="team-marquee__edge team-marquee__edge--left" />
                <div className="team-marquee__edge team-marquee__edge--right" />
                <div className="team-marquee__track">
                  {[...teamProfiles, ...teamProfiles].map((member, index) => (
                    <button
                      key={`${member.name}-${index}`}
                      type="button"
                      onClick={() => handleOpenTeamMember(index % teamProfiles.length)}
                      className="team-marquee__item group relative aspect-square overflow-hidden rounded-[4px] border border-white/10 bg-white/5 text-left"
                      aria-label={`Open ${member.name} profile photo`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.02)_0%,rgba(3,8,18,0.08)_42%,rgba(3,8,18,0.42)_100%)]" />
                      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/72">
                        <span>View</span>
                        <ImagePlus className="h-3.5 w-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="section-glow-top relative w-full border-t border-white/10 py-12 sm:py-16 md:py-20 lg:py-32"
          style={{
            background:
              "radial-gradient(ellipse 1000px 500px at 50% 50%, rgba(30, 84, 196, 0.06), transparent 70%), linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="mx-auto max-w-3xl text-center"
            >
              <SectionTag>Location</SectionTag>

              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
                Based in Estonia
              </h2>

              <p className="text-sm text-white/70 sm:text-base md:text-lg">
                Most of the work happens on-site where the robots are built and tested.
              </p>
            </motion.div>
          </div>
        </section>

        <section
          id="open-roles"
          className="section-glow-top relative w-full py-12 sm:py-16 md:py-20 lg:py-32"
        >
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 1300px 800px at 50% 0%, rgba(30, 84, 196, 0.1), transparent 70%), linear-gradient(180deg, rgba(0, 11, 24, 0.9) 0%, rgba(0, 0, 0, 1) 100%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <div className="mb-8 grid grid-cols-1 gap-8 sm:mb-12 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-6">
                  <SectionTag>Open Positions</SectionTag>
                  <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    Open roles
                  </h2>
                  <p className="max-w-xl text-sm text-white/70 sm:text-base md:text-lg">
                    We hire for people who want to work close to the product, close to the constraints and close to the outcome.
                  </p>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-[4px] border border-white/10 bg-white/5 p-5 sm:p-6">
                    <p className="mb-4 text-xs uppercase tracking-[0.18em] text-primary">How We Hire</p>
                    <div className="space-y-4">
                      {hiringSteps.map((step, index) => (
                        <div key={step} className="flex items-start gap-4">
                          <span className="mt-0.5 text-xs font-bold tracking-[0.18em] text-white/35">
                            0{index + 1}
                          </span>
                          <p className="text-sm text-white/72 sm:text-base">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {careerPosts && careerPosts.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
                >
                  {careerPosts.map((post) => (
                    <motion.button
                      key={post.id}
                      variants={fadeInUp}
                      onClick={() => handleApply(post)}
                      className="blue-card-glow group relative flex min-h-[210px] flex-col overflow-hidden rounded-[4px] border border-white/10 p-5 text-left transition hover:border-primary/35 hover:-translate-y-1 sm:p-6"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(128,176,255,0.65),rgba(180,255,51,0.45),transparent)]" />
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                          Open Role
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-white/38">
                          Click to view
                        </span>
                      </div>
                      <h3 className="mb-3 flex-grow text-lg font-semibold text-white transition group-hover:text-primary sm:text-[1.35rem]">
                        {post.title}
                      </h3>

                      <div className="mb-5 flex flex-wrap items-center gap-2 text-[0px] sm:mb-6">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/72">
                          {post.location}
                        </span>
                        <span>·</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/72">
                          {post.type}
                        </span>
                      </div>

                      <div className="mt-auto flex items-center gap-2 text-sm font-medium text-primary">
                        View role
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div variants={fadeInUp} className="mx-auto max-w-2xl text-center">
                  <p className="mb-6 text-sm text-white/70 sm:text-base md:text-lg">
                    We don&apos;t have open positions right now, but we&apos;re always looking for strong builders.
                  </p>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
                  >
                    {emailCopied ? "Copied!" : "Get in touch — join@1rollo.com"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        <section className="section-glow-top relative w-full py-12 sm:py-16 md:py-20 lg:py-32">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 1200px 700px at 50% 50%, rgba(54, 118, 255, 0.1), transparent 65%), radial-gradient(ellipse 900px 500px at 80% 20%, rgba(180, 255, 51, 0.08), transparent 60%), linear-gradient(180deg, rgba(5, 15, 39, 0.3) 0%, rgba(0, 0, 0, 0.9) 100%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <div className="blue-card-glow mx-auto max-w-3xl rounded-[4px] border-2 border-primary/40 p-6 text-center sm:p-8 md:p-12">
                <SectionTag>Don&apos;t See Your Role?</SectionTag>

                <h2 className="mb-6 text-xl font-bold text-white sm:text-2xl md:mb-8 md:text-3xl lg:text-4xl">
                  If you want to work on problems that don&apos;t have clear answers you&apos;ll feel at home here
                </h2>

                <div className="mb-4 flex flex-col justify-center gap-3 sm:mb-6 sm:flex-row sm:gap-4">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
                  >
                    {emailCopied ? "Email Copied!" : "Apply Now"}
                  </button>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
                  >
                    Or just reach out
                  </button>
                </div>

                <p className="text-xs text-white/60 sm:text-sm">join@1rollo.com</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-white/10 bg-background text-white">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  {selectedPost.title}
                </DialogTitle>
                <div className="flex items-center gap-3 pt-1 text-sm text-white/60">
                  <span>{selectedPost.location}</span>
                  <span>·</span>
                  <span>{selectedPost.type}</span>
                </div>
              </DialogHeader>

              {selectedPost.poster_url && (
                <div className="photo-depth-frame my-4 overflow-hidden rounded-[4px] border border-white/10">
                  <img
                    src={selectedPost.poster_url}
                    alt={`${selectedPost.title} poster`}
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </div>
              )}

              <div
                className="prose prose-invert prose-sm mt-4 max-w-none text-white"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(selectedPost.content),
                }}
              />

              <div className="mt-6 border-t border-white/10 pt-4">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex rounded-[4px] bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
                >
                  {emailCopied ? "Copied!" : "Apply — join@1rollo.com"}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={selectedTeamIndex !== null} onOpenChange={(open) => !open && handleCloseTeamMember()}>
        <DialogContent className="max-w-5xl border-white/10 bg-[#020813]/95 p-0 text-white">
          {selectedTeamMember && (
            <div className="overflow-hidden rounded-[4px]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-primary/85">Team</p>
                  <DialogTitle className="mt-2 text-xl font-bold text-white sm:text-2xl">
                    {selectedTeamMember.name}
                  </DialogTitle>
                </div>
                <p className="hidden text-xs uppercase tracking-[0.18em] text-white/38 sm:block">
                  Drag left or right
                </p>
              </div>

              <div className="relative bg-[radial-gradient(ellipse_at_center,rgba(33,94,221,0.12)_0%,rgba(2,8,19,0)_70%)] p-4 sm:p-6">
                <button
                  type="button"
                  onClick={() => handleTeamNavigate(-1)}
                  className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-background/75 text-white/85 transition hover:border-primary/30 hover:text-primary sm:flex"
                  aria-label="Previous team photo"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>

                <button
                  type="button"
                  onClick={() => handleTeamNavigate(1)}
                  className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-background/75 text-white/85 transition hover:border-primary/30 hover:text-primary sm:flex"
                  aria-label="Next team photo"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>

                <motion.div
                  key={selectedTeamMember.image}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    if (info.offset.x <= -80) {
                      handleTeamNavigate(1);
                    } else if (info.offset.x >= 80) {
                      handleTeamNavigate(-1);
                    }
                  }}
                  initial={{ opacity: 0.8, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="mx-auto max-w-3xl cursor-grab active:cursor-grabbing"
                >
                  <div className="overflow-hidden rounded-[4px] border border-white/10 bg-[#09111f] shadow-[0_28px_80px_rgba(1,6,16,0.42)]">
                    <img
                      src={selectedTeamMember.image}
                      alt={selectedTeamMember.name}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CareerNew;
