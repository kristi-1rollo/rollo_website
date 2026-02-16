import { DollarSign, Compass, Clock, Eye } from "lucide-react";

const features = [
  { icon: DollarSign, title: "10x Cost Reduction", description: "€2/h vs €20/h for traditional security" },
  { icon: Compass, title: "Ultimate Maneuverability", description: "One-wheeled precision in tight spaces" },
  { icon: Clock, title: "24/7 Operation", description: "Autonomous patrol with auto-recharging" },
  { icon: Eye, title: "AI-Powered Vision", description: "360° intelligent threat detection" },
];

const FeaturesSection = () => {
  return (
    <section className="section section-dark-alt border-y border-white/5">
      <div className="container-premium">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-10 md:mb-14 text-white">
          Why Choose ROLLO
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="opacity-0 animate-fade-in-up rounded-xl border border-white/12 bg-white/[0.06] p-6 sm:p-7 hover:bg-white/[0.09] hover:border-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 120}ms`, animationFillMode: "forwards" }}
            >
              <div className="w-11 h-11 mb-5 rounded-lg bg-white/[0.08] flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-white/85" />
              </div>

              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                {feature.title}
              </h3>

              <p className="text-sm text-white/65 leading-relaxed">
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
