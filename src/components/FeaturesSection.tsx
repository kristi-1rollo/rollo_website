import { DollarSign, Compass, Clock, Eye } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "10x Cost Reduction",
    description: "€2/h vs €20/h for traditional security",
  },
  {
    icon: Compass,
    title: "Ultimate Maneuverability",
    description: "One-wheeled precision in tight spaces",
  },
  {
    icon: Clock,
    title: "24/7 Operation",
    description: "Autonomous patrol with auto-recharging",
  },
  {
    icon: Eye,
    title: "AI-Powered Vision",
    description: "360° intelligent threat detection",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16">
          Why Choose ROLLO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="surface-card p-8 group hover:border-foreground/20 transition-colors duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 120}ms`, animationFillMode: "forwards" }}
            >
              <div className="w-12 h-12 mb-6 rounded-lg bg-muted flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
