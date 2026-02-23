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
  const openAccessModal = () => {
    window.dispatchEvent(new CustomEvent("rollo:open-access"));
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 min-w-0 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
              About Us
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Vision + Team
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-xl">
              To redefine the boundaries of autonomous security through intelligent,
              gyroscopically stabilized robotics. We do it not because it's easy,
              we do it because it's hard.
            </p>
          </div>

          <div className="flex-1 min-w-0 flex justify-center">
            <img
              src="/team/team_transparent.png"
              alt="Rollo robotics team"
              className="w-full max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Team Expertise */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="space-y-4 mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            The Team
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            90%+ Shared Robotics Experience
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl">
            Over 90% of the team members have 3 to 15 years of prior experience working
            together in robotics development and have achieved remarkable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.map((t) => (
            <div
              key={t.name}
              className="h-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3">{t.name}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="space-y-4 mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            Backed By
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Strategic Support
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <img
              src="/logos/Rahastanud_EL_kaksiklogod_ENG_hor_white.png"
              alt="EIS logo"
              className="h-10 w-auto object-contain mb-4 sm:h-12"
            />
            <p className="text-sm leading-relaxed text-slate-300">
              Supported by the Estonian Business and Innovation Agency (EIS),
              accelerating our mission to redefine autonomous robotics through
              deep-tech innovation.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <img
              src="/logos/edia-eas.png"
              alt="Estonian Defence and Aerospace Industry Association logo"
              className="h-10 w-auto object-contain mb-4 sm:h-12"
            />
            <p className="text-sm leading-relaxed text-slate-300">
              Backed by the Estonian Defence and Aerospace Industry Association to
              drive real-world adoption of autonomous security robotics.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
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
              <button
                onClick={openAccessModal}
                className="min-h-11 rounded-xl bg-[#B4FF33] px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition"
              >
                Get Rollo Access
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
