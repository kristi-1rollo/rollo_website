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
    <section id="raas" className="section scroll-mt-28 relative">
      <div className="container-premium">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 text-center mb-4 font-medium">
          Robot-as-a-Service
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-center mb-4 text-white">
          Why RaaS
        </h2>
        <p className="text-slate-500 text-center mb-20 max-w-2xl mx-auto">
          Transform your security operations without capital investment
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
          {raasFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="opacity-0 animate-fade-in-up text-center"
              style={{ animationDelay: `${index * 120}ms`, animationFillMode: "forwards" }}
            >
              <feature.icon className="w-6 h-6 text-slate-500 mb-5 mx-auto" strokeWidth={1.5} />
              <h3 className="text-lg font-medium mb-3 text-white">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RaaSSection;
