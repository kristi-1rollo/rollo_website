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
      {/* Soft radial lift — subtle spotlight behind content */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 800px 500px at 50% 0%, rgba(255,255,255,0.03), transparent 70%)",
        }}
      />

      <div className="container-premium relative">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 text-center mb-4 font-medium">
          Robot-as-a-Service
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-center mb-4 text-white">
          Why RaaS
        </h2>
        <p className="text-slate-400 text-center mb-20 max-w-2xl mx-auto">
          Transform your security operations without capital investment
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {raasFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="relative overflow-hidden rounded-lg bg-white/[0.04] border border-white/[0.06] p-8 text-center opacity-0 animate-fade-in-up transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"
              style={{ animationDelay: `${index * 120}ms`, animationFillMode: "forwards" }}
            >
              <feature.icon className="w-6 h-6 text-slate-400 mb-5 mx-auto" strokeWidth={1.5} />
              <h3 className="text-lg font-medium mb-3 text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RaaSSection;
