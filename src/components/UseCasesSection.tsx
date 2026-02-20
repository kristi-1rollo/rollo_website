import {
  Shield, Plane, Heart, Building2, HardHat, Factory,
  Zap, Droplets, GraduationCap, Home, Wifi, Database,
  Siren, Users
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
    <section id="applications" className="section section-dark section-divider scroll-mt-28">
      <div className="container-premium">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-4 text-white/[0.92]">
          Applications
        </h2>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
          ROLLO adapts to any environment where security, surveillance, or delivery is needed
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {useCases.map((useCase) => (
            <div
              key={useCase.label}
              className="surface-card p-4 text-center group hover:border-white/[0.15] transition-colors duration-300 cursor-default"
            >
              <useCase.icon className="w-6 h-6 mx-auto mb-3 text-white/50" />
              <p className="text-xs md:text-sm text-white/[0.85]">{useCase.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
