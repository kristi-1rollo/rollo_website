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
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why Choose <span className="text-primary">ROLLO</span>?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-8 text-center group hover:border-[hsl(30,100%,50%)]/50 transition-all duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[hsl(30,100%,50%)]/20 flex items-center justify-center group-hover:bg-[hsl(30,100%,50%)]/30 transition-colors">
                <feature.icon className="w-8 h-8 text-[hsl(30,100%,50%)]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
