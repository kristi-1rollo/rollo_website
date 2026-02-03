import { useEffect, useState } from "react";
import rollo1 from "@/assets/rollo1.png";

const HeroSection = () => {
  const [animationPhase, setAnimationPhase] = useState<"entering" | "blinking" | "complete">("entering");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Robot entrance animation timing
    const blinkTimer = setTimeout(() => {
      setAnimationPhase("blinking");
    }, 2500);

    const completeTimer = setTimeout(() => {
      setAnimationPhase("complete");
    }, 3500);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(completeTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Ambient glow behind robot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      {/* Robot with entrance animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div 
          className={`relative ${animationPhase === "entering" ? "animate-robot-entrance" : "animate-robot-sway"}`}
        >
          {/* 4 Robot lights */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full
                  ${animationPhase === "entering" ? "bg-foreground/30 opacity-30" : ""}
                  ${animationPhase === "blinking" ? "bg-red-500 animate-lights-flash-red" : ""}
                  ${animationPhase === "complete" ? "bg-foreground animate-lights-flash" : ""}
                `}
              />
            ))}
          </div>
          
          {/* Robot image */}
          <img
            src={rollo1}
            alt="ROLLO Robot"
            className="w-auto h-[400px] md:h-[500px] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Content that fades in after robot arrives */}
        <div 
          className={`mt-8 text-center max-w-4xl px-6 transition-all duration-1000
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-primary">ROLLO:</span> The World's First Commercial{" "}
            <span className="text-foreground">Autonomous One-Wheeled Robot</span>
          </h1>
          
          {/* Three roles */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
            {["Security Guard", "Courier", "Multi-talent"].map((role, index) => (
              <div
                key={role}
                className={`glass-card px-6 py-3 transition-all duration-500
                  ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <span className="text-lg font-medium">{role}</span>
              </div>
            ))}
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Making security services <span className="text-[hsl(30,100%,50%)] font-semibold">10x cheaper</span>, smarter, and more energy-efficient
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-1000
          ${showContent ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
