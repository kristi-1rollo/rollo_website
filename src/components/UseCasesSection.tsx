import {
  Shield, Plane, Heart, Building2, HardHat, Factory,
  Zap, Droplets, GraduationCap, Home, Wifi, Database,
  Siren
} from "lucide-react";

const useCases = [
  { icon: Shield, label: "Public Safety" },
  { icon: Plane, label: "Airport Security" },
  { icon: Heart, label: "Hospitals" },
  { icon: Building2, label: "Hotels" },
  { icon: HardHat, label: "Mining & Construction" },
  { icon: Factory, label: "Industrial Plants" },
  { icon: Zap, label: "Critical Infrastructure" },
  { icon: Droplets, label: "Oil & Gas Facilities" },
  { icon: GraduationCap, label: "Campuses" },
  { icon: Home, label: "Gated Communities" },
  { icon: Wifi, label: "Smart Homes" },
  { icon: Droplets, label: "Water Stations" },
  { icon: Database, label: "Data Centers" },
  { icon: Siren, label: "Police & Military" },
];

const UseCasesSection = () => {
  return (
    <section id="applications" className="section scroll-mt-28 relative">
      <div className="container-premium">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 text-center mb-4 font-medium">
          Versatile Deployment
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-center mb-4 text-white">
          Applications
        </h2>
        <p className="text-slate-500 text-center max-w-2xl mx-auto mb-20">
          ROLLO adapts to any environment where security, surveillance, or delivery is needed
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-6 md:gap-x-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.label}
              className="text-center group cursor-default"
            >
              <useCase.icon className="w-5 h-5 mx-auto mb-3 text-slate-600 group-hover:text-slate-400 transition-colors duration-300" strokeWidth={1.5} />
              <p className="text-xs md:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{useCase.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
