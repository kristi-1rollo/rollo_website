import { useEffect, useRef, useState } from "react";
import rollo2 from "@/assets/rollo2.png";

const specifications = [
  { label: "Dimensions", value: "60 x 60 x 140 cm", angle: 0 },
  { label: "Weight", value: "35 kg", angle: 51 },
  { label: "Speed", value: "Up to 10 km/h", angle: 103 },
  { label: "Battery", value: "Up to 8 hours", angle: 154 },
  { label: "Sensors", value: "Motion & object detection", angle: 206 },
  { label: "Charging", value: "Automatic recharging", angle: 257 },
  { label: "Availability", value: "Pilot projects from 2025", angle: 309 },
];

const SpecificationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Technical <span className="text-primary">Specifications</span>
        </h2>

        {/* Radial specs layout */}
        <div className="relative max-w-5xl mx-auto aspect-square md:aspect-[4/3]">
          {/* Center robot with perspective */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div 
              className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              style={{ perspective: "1000px" }}
            >
              {/* Robot glow */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-75" />
              <img
                src={rollo2}
                alt="ROLLO Specifications"
                className="w-48 md:w-64 h-auto relative z-10 drop-shadow-2xl"
                style={{ transform: "rotateY(-5deg) rotateX(5deg)" }}
              />
            </div>
          </div>

          {/* SVG for connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            {specifications.map((spec, index) => {
              const centerX = 50;
              const centerY = 50;
              const radius = 38;
              const angleRad = (spec.angle - 90) * (Math.PI / 180);
              const endX = centerX + radius * Math.cos(angleRad);
              const endY = centerY + radius * Math.sin(angleRad);

              return (
                <line
                  key={spec.label}
                  x1={`${centerX}%`}
                  y1={`${centerY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 animate-line-draw" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 150 + 500}ms` }}
                />
              );
            })}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(0, 0%, 100%)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Spec cards positioned radially */}
          {specifications.map((spec, index) => {
            const radius = 42;
            const angleRad = (spec.angle - 90) * (Math.PI / 180);
            const x = 50 + radius * Math.cos(angleRad);
            const y = 50 + radius * Math.sin(angleRad);

            return (
              <div
                key={spec.label}
                className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 
                  glass-card px-4 py-3 min-w-[140px] md:min-w-[180px] text-center
                  hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 
                  transition-all duration-300 cursor-default
                  ${isVisible ? "opacity-100 animate-spec-card-in" : "opacity-0"}
                `}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animationDelay: `${index * 150 + 500}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <p className="text-primary font-semibold text-sm">{spec.label}</p>
                <p className="text-foreground text-xs md:text-sm mt-1">{spec.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecificationsSection;
