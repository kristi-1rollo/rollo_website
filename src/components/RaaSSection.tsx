import { DollarSign, Wrench, Zap } from "lucide-react";

const raasFeatures = [
  {
    icon: DollarSign,
    title: "No Capital Investment",
    description: "Pay monthly, not millions upfront. Scale your security operations without breaking the bank.",
  },
  {
    icon: Wrench,
    title: "Maintenance Included",
    description: "We handle all repairs, updates, and maintenance. You focus on your core business.",
  },
  {
    icon: Zap,
    title: "Software Updates",
    description: "Always get the latest features and security patches. Stay ahead of the curve.",
  },
];

const RaaSSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why <span className="text-primary">RaaS</span>?
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Transform your security operations without capital investment
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {raasFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-8 text-center group hover:border-[hsl(30,100%,50%)]/50 hover:-translate-y-2 transition-all duration-300 opacity-0 animate-fade-in-up"
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

export default RaaSSection;
