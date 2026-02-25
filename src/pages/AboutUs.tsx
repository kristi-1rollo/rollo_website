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

import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="pt-24 pb-16">
      {/* A) Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            About Us
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
            Redefining Autonomous Security
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-prose">
            At Rollo Robotics, we're redefining what autonomous security robots
            mean in the physical world. Our mission is simple yet
            transformative: to bring human-level perception, communication, and
            mobility to environments where traditional human patrols are costly,
            inefficient, or unsafe.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/contact"
              className="min-h-11 rounded-xl bg-[#B4FF33] px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition inline-flex items-center"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* B) About Overview — 3 Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Mission */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
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
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
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
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
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
      </section>

      {/* C) Team */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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

        <div className="mb-10 flex justify-center">
          <img
            src="/team/team_transparent.png"
            alt="Rollo robotics team"
            className="w-full max-w-2xl h-auto object-contain"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.map((t) => (
            <div
              key={t.name}
              className="h-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
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
      </section>

      {/* D) Contact */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="flex-1 min-w-0 space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
                Contact
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Get in Touch
              </h2>
              <div className="space-y-2 text-sm text-slate-300">
                <p>Rollo Robotics OÜ (17320003)</p>
                <p>Viljandi maakond, Viljandi linn, Raua tn 16, 71020</p>
                <a
                  href="mailto:info@1rollo.com"
                  className="inline-flex text-[#B4FF33] underline decoration-[#B4FF33]/60 underline-offset-4 transition hover:text-[#B4FF33]/90"
                >
                  info@1rollo.com
                </a>
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center items-start">
              <p className="text-base text-slate-300 mb-6">
                Interested in partnerships, pilots, or deployment planning?
              </p>
              <Link
                to="/contact"
                className="min-h-11 rounded-xl bg-[#B4FF33] px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition inline-flex items-center"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
