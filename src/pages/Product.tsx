import { Battery, Eye, Plug, Ruler, Snowflake, Weight, Zap } from "lucide-react";

const specs = [
  { icon: Ruler, label: "Dimensions", value: "60 x 60 x 140 cm" },
  { icon: Weight, label: "Weight", value: "35 kg" },
  { icon: Zap, label: "Speed", value: "Up to 10 km/h" },
  { icon: Battery, label: "Battery", value: "Up to 8 hours" },
  { icon: Eye, label: "Sensors", value: "Motion & object detection" },
  { icon: Plug, label: "Charging", value: "Automatic recharging" },
  { icon: Snowflake, label: "Temperature", value: "-20°C to +45°C" },
];

const features = [
  {
    title: "Gyroscopic Stabilization",
    description:
      "One-wheel self-balancing design with real-time gyroscopic control for reliable operation on uneven terrain.",
  },
  {
    title: "AI Vision Stack",
    description:
      "360-degree AI-powered vision with thermal and low-light support for reliable threat detection in any conditions.",
  },
  {
    title: "Autonomous Patrol",
    description:
      "Fully autonomous route planning with automatic return-to-charge and resume behavior for continuous 24/7 operation.",
  },
];

const Product = () => {
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
              Autonomous Security Robot
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              One-Wheel Autonomous Patrol Robot
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-xl">
              Redefining outdoor security with gyroscopically stabilized robotics,
              AI vision, and reliable patrol at up to 10x lower operating cost.
            </p>
            <button
              onClick={openAccessModal}
              className="min-h-11 rounded-xl bg-[#B4FF33] px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition"
            >
              Get Rollo Access
            </button>
          </div>

          <div className="flex-1 min-w-0 flex justify-center">
            <img
              src="/hero/rollo1.png"
              alt="Rollo autonomous patrol robot"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="space-y-4 mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            Technology
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Built for Harsh Conditions
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl">
            Engineered for Nordic weather and demanding outdoor environments,
            Rollo delivers autonomous patrol capability where traditional solutions fail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="h-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3">{f.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="space-y-4 mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B4FF33]">
            Specifications
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Technical Details
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {specs.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="rounded-full bg-[#B4FF33]/10 p-2.5 text-[#B4FF33]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-1">
                    {s.label}
                  </p>
                  <p className="text-base font-semibold text-white">{s.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="rounded-2xl border border-[#B4FF33]/30 bg-[#B4FF33]/10 p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Security?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-6">
            Join the waitlist for early access to autonomous patrol deployment.
          </p>
          <button
            onClick={openAccessModal}
            className="min-h-11 rounded-xl bg-[#B4FF33] px-6 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#B4FF33]/90 transition"
          >
            Get Rollo Access
          </button>
        </div>
      </section>
    </div>
  );
};

export default Product;
