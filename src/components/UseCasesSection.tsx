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
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Endless <span className="text-primary">Applications</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          ROLLO adapts to any environment where security, surveillance, or delivery is needed
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.label}
              className="glass-card p-4 text-center group hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-default"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <useCase.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-xs md:text-sm text-foreground">{useCase.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
