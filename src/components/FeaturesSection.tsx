import { DollarSign, Compass, Clock, Eye } from "lucide-react";

const features = [
  { icon: DollarSign, title: "10x Cost Reduction", description: "€2/h vs €20/h for traditional security" },
  { icon: Compass, title: "Ultimate Maneuverability", description: "One-wheeled precision in tight spaces" },
  { icon: Clock, title: "24/7 Operation", description: "Autonomous patrol with auto-recharging" },
  { icon: Eye, title: "AI-Powered Vision", description: "360° intelligent threat detection" },
];

const FeaturesSection = () => {
  return (
    <section id="why" className="section scroll-mt-28 relative">
      <div className="container-premium">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 text-center mb-4 font-medium">
          Why Choose ROLLO
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-center mb-16 md:mb-24 text-white">
          Built Different
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="opacity-0 animate-fade-in-up text-center lg:text-left"
              style={{ animationDelay: `${index * 120}ms`, animationFillMode: "forwards" }}
            >
              <feature.icon className="w-5 h-5 text-slate-500 mb-5 mx-auto lg:mx-0" strokeWidth={1.5} />

              <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">
                {feature.title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
