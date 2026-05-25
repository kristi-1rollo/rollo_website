import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { useEffect, useRef } from "react";
import { Section, SectionTag } from "@/components/ui/section";

const team = [
  {
    name: "Mechanical Engineering",
    description: "Structural design, gyroscopic systems, and production-ready hardware for harsh outdoor conditions.",
  },
  {
    name: "Software Development",
    description: "Real-time control systems, cloud integration, and autonomous patrol software.",
  },
  {
    name: "Electronics",
    description: "Sensor integration, power management, and embedded systems for reliable 24/7 operation.",
  },
  {
    name: "Artificial Intelligence",
    description: "Vision stack, threat detection, and autonomous decision-making in complex environments.",
  },
  {
    name: "Product Design",
    description: "Human-centered design for security operators, from dashboard UX to physical form factor.",
  },
  {
    name: "Sales & Production",
    description: "Production launch planning, distribution network, and customer deployment support.",
  },
];

const AboutUs = () => {
  const heroRef = useRef<HTMLElement>(null);

  // Dynamic hero overlay opacity based on scroll position
  useEffect(() => {
    let rafId: number;

    const updateHeroOpacity = () => {
      if (!heroRef.current) return;

      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Calculate opacity: 0 at top, 1 when scrolled past hero
      const fadeStart = heroHeight * 0.3;
      const fadeEnd = heroHeight * 0.8;
      const opacity = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));

      heroRef.current.style.setProperty('--hero-overlay-opacity', opacity.toString());
    };

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateHeroOpacity);
    };

    updateHeroOpacity();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      <SEO
        title="About 1ROLLO — A Decade of Shared Robotics Experience"
        description="Meet the team behind 1ROLLO: mechanical, electronics, software, and AI experts building the world's first autonomous one-wheeled security robot."
        path="/about"
      />
      {/* A) Hero - Fixed on desktop, scrolls over on mobile */}
      <header
        ref={heroRef}
        className="section-glow-top relative flex min-h-[100svh] items-center overflow-hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-full z-0"
        style={{ '--hero-overlay-opacity': '0' } as React.CSSProperties}
      >
        <picture>
          <img
            src="/robot/F6/1rollo_close.webp"
            alt="1Rollo autonomous security robot"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] bg-[radial-gradient(circle_at_24%_42%,rgba(2,6,14,0.85)_0%,rgba(3,8,18,0.72)_28%,rgba(4,10,24,0.4)_54%,rgba(0,0,0,0)_82%)]" />
        <div className="absolute inset-y-0 left-0 md:hidden w-full bg-[linear-gradient(90deg,rgba(2,6,13,0.85)_0%,rgba(2,6,13,0.6)_35%,rgba(2,6,13,0.2)_70%,rgba(2,6,13,0)_100%)]" />

        {/* Dynamic overlay - fades in on scroll */}
        <div
          className="absolute inset-0 bg-background transition-opacity duration-200"
          style={{ opacity: 'var(--hero-overlay-opacity)' }}
        />

        <div className="relative z-10 max-w-6xl lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto w-full px-4 py-20 sm:px-6 md:py-32 lg:px-8 lg:py-40 xl:px-10 2xl:px-12">
          <div className="mx-auto flex max-w-5xl flex-col items-center space-y-6 text-center md:mx-0 md:items-start md:text-left">
            <SectionTag>About Us</SectionTag>
            <h1 className="title-halo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white max-w-4xl">
              Redefining Autonomous Security
            </h1>
            <p className="max-w-3xl text-sm sm:text-base md:text-lg text-slate-300">
              At Rollo Robotics, we're redefining what autonomous security robots
              mean in the physical world. Our mission is simple yet
              transformative: to bring human-level perception, communication, and
              mobility to environments where traditional human patrols are costly,
              inefficient, or unsafe.
            </p>
          </div>
        </div>
      </header>

      {/* Main content - scrolls over fixed hero on desktop */}
      <main className="relative z-10 pt-0 md:pt-[100vh]">
        <div className="bg-background pb-16">

      {/* B) Team */}
      <Section className="section-glow-top relative py-16 md:py-24 lg:py-32">
        <div className="space-y-4 mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            The Team
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Decade of Shared Robotics Experience
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl">
            Over 90% of the team members have 3 to 15 years of prior experience
            working together in robotics development and have achieved remarkable
            results.
          </p>
        </div>

        <div className="mb-12">
          <img
            src="/robot/team/1rollo_team_3.webp"
            alt="1Rollo robotics team"
            className="w-full h-auto object-cover rounded-xl"
            loading="lazy"
          />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />
          {team.map((t) => (
            <div
              key={t.name}
              className="-mx-5 md:mx-0 relative blue-card-glow h-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {t.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* D) Join Us - Mini Career CTA */}
      <Section className="section-glow-top py-16 md:py-24 lg:py-32">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            Join Us
          </p>
          <h2 className="title-halo text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Join the Future of Autonomous Robotics
          </h2>
          <p className="text-base md:text-lg text-slate-300">
            We're building the next generation of security robots. Join our team and help shape the future.
          </p>
          <Link
            to="/career"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-12 rounded-xl bg-[#B4FF33] px-8 py-3 text-base font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition"
          >
            View Open Positions
          </Link>
        </div>
      </Section>
        </div>
      </main>
    </>
  );
};

export default AboutUs;
