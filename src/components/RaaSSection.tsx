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
    <section className="py-32 relative bg-[#F4F6F8]">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-4 text-[#111]">
          Why RaaS
        </h2>
        <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">
          Transform your security operations without capital investment
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {raasFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="surface-card-light p-8 group opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 120}ms`, animationFillMode: "forwards" }}
            >
              <div className="w-12 h-12 mb-6 rounded-lg bg-[#F4F6F8] flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-[#111]" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-[#111]">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RaaSSection;
