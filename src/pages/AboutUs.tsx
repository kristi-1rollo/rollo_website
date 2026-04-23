import { Link } from "react-router-dom";
import { PublicContentRail, Section, SectionIntro } from "@/components/ui/section";

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
  return (
    <div className="pb-16">
      {/* A) Hero */}
      <section className="section-glow-top relative w-full min-h-[70vh] overflow-hidden pt-24">
        <picture>
          <img
            src="/robot/F6/1rollo_close.png"
            alt="Rollo autonomous security robot"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] bg-[radial-gradient(circle_at_24%_42%,rgba(2,6,14,0.85)_0%,rgba(3,8,18,0.72)_28%,rgba(4,10,24,0.4)_54%,rgba(0,0,0,0)_82%)]" />
        <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.1)_22%,rgba(0,0,0,0)_52%)]" />

        <PublicContentRail className="relative z-10 py-16 md:py-24">
          <SectionIntro centered className="flex flex-col items-center space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
              About Us
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
              Redefining Autonomous Security
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white md:text-lg">
              At Rollo Robotics, we're redefining what autonomous security robots
              mean in the physical world. Our mission is simple yet
              transformative: to bring human-level perception, communication, and
              mobility to environments where traditional human patrols are costly,
              inefficient, or unsafe.
            </p>
          </SectionIntro>
        </PublicContentRail>
      </section>

      {/* B) About Overview — 3 Pillars */}
      <Section className="section-glow-top relative py-16 md:py-24">
        <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Mission */}
          <div className="blue-card-glow rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
              Mission
            </h3>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                To create a future where intelligent machines seamlessly extend
                human capabilities fully autonomously, 24/7, anywhere on Earth.
              </p>
              <p>
                Our founding team has decades of experience building globally
                recognized robotics, logistics, and AI systems, launching
                category-defining innovations and setting new industry standards.
              </p>
              <p>
                We are committed to proving that machines can bring presence,
                performance, and precision to the physical world.
              </p>
            </div>
          </div>

          {/* Technology */}
          <div className="blue-card-glow rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
              Technology
            </h3>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                Built on deep engineering innovation, Rollo Robotics combines
                proprietary gyroscope-based stabilization, edge intelligence, and
                hardware–software integration to create the world's first truly
                autonomous monowheel robot.
              </p>
              <p>
                Compact, agile, and self-stabilizing, 1Rollo navigates
                real-world conditions by seeing, hearing, speaking, and moving
                with a level of awareness once reserved for humans.
              </p>
            </div>
          </div>

          {/* Scale */}
          <div className="blue-card-glow rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
              Scale
            </h3>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                With rising labor costs and surging demand for continuous
                security and monitoring, we believe cost-efficient form factor is
                the key to scalability.
              </p>
              <p>
                1Rollo replaces inefficiency with intelligence by delivering
                massive operational savings across industries.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* C) Team */}
      <Section className="section-glow-top relative py-16 md:py-24">
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
            src="/robot/team/1rollo_team_3.png"
            alt="Rollo robotics team"
            className="w-full h-auto object-cover rounded-xl"
            loading="lazy"
          />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="absolute inset-0 geo-grid opacity-20 pointer-events-none" />
          {team.map((t) => (
            <div
              key={t.name}
              className="relative blue-card-glow h-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6"
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
      <Section className="section-glow-top py-16 md:py-20">
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
  );
};

export default AboutUs;
