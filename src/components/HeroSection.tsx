import { useEffect, useState } from "react";
import rollo1 from "@/assets/rollo1.png";
const HeroSection = () => {
  const [animationPhase, setAnimationPhase] = useState<"entering" | "blinking" | "complete">("entering");
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    // Robot entrance animation timing (faster: 1.8s)
    const blinkTimer = setTimeout(() => {
      setAnimationPhase("blinking");
    }, 1800);
    const completeTimer = setTimeout(() => {
      setAnimationPhase("complete");
    }, 2800);
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 2300);
    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(completeTimer);
      clearTimeout(contentTimer);
    };
  }, []);
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const {
      clientX,
      clientY
    } = e;
    const {
      innerWidth,
      innerHeight
    } = window;

    // Calculate mouse position relative to center (-1 to 1)
    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);
    setMousePosition({
      x,
      y
    });
  };

  // Robot 3D rotation style
  const robot3DStyle = {
    transform: animationPhase === "complete" ? `perspective(1200px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 8}deg)` : undefined,
    transition: "transform 0.2s ease-out",
    transformStyle: "preserve-3d" as const
  };
  return <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20" onMouseMove={handleMouseMove}>
      {/* Background - pure dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(240,10%,3%)] via-background to-[hsl(240,10%,6%)]" />
      
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-[100px]" />

      {/* Robot with entrance animation and 3D mouse tracking */}
      <div className="relative z-10 flex flex-col items-center">
        <div className={`relative ${animationPhase === "entering" ? "animate-robot-entrance" : "animate-robot-sway"}`} style={robot3DStyle}>
          {/* Robot image */}
          <img src={rollo1} alt="ROLLO Robot" className="w-auto h-[400px] md:h-[500px] object-contain drop-shadow-2xl" />
          
          {/* Diamond-shaped breathing lights - positioned on robot's chest */}
          <div className="absolute top-[42%] left-1/2 -translate-x-1/2 z-10">
            <div className="relative w-12 h-6">
              {/* Top light */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45
                  ${animationPhase === "entering" ? "bg-blue-400/20 opacity-20" : ""}
                  ${animationPhase === "blinking" ? "bg-red-500 animate-lights-breathe-red" : ""}
                  ${animationPhase === "complete" ? "bg-blue-400 animate-lights-breathe" : ""}
                `} style={{
              animationDelay: "0s"
            }} />
              {/* Left light */}
              <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 rotate-45
                  ${animationPhase === "entering" ? "bg-blue-400/20 opacity-20" : ""}
                  ${animationPhase === "blinking" ? "bg-red-500 animate-lights-breathe-red" : ""}
                  ${animationPhase === "complete" ? "bg-blue-400 animate-lights-breathe" : ""}
                `} style={{
              animationDelay: "0.15s"
            }} />
              {/* Right light */}
              <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 rotate-45
                  ${animationPhase === "entering" ? "bg-blue-400/20 opacity-20" : ""}
                  ${animationPhase === "blinking" ? "bg-red-500 animate-lights-breathe-red" : ""}
                  ${animationPhase === "complete" ? "bg-blue-400 animate-lights-breathe" : ""}
                `} style={{
              animationDelay: "0.3s"
            }} />
              {/* Bottom light */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45
                  ${animationPhase === "entering" ? "bg-blue-400/20 opacity-20" : ""}
                  ${animationPhase === "blinking" ? "bg-red-500 animate-lights-breathe-red" : ""}
                  ${animationPhase === "complete" ? "bg-blue-400 animate-lights-breathe" : ""}
                `} style={{
              animationDelay: "0.45s"
            }} />
            </div>
          </div>
        </div>

        {/* Content that fades in after robot arrives */}
        <div className={`mt-8 text-center max-w-4xl px-6 transition-all duration-1000
            ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            <span className="text-primary">ROLLO:</span> The World's First Commercial{" "}
            <span className="text-slate-200">Autonomous One-Wheeled Robot</span>
          </h1>
          
          {/* Three roles */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
            {["Security Guard", "Courier", "Multi-talent"].map((role, index) => {})}
          </div>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Making security services <span className="text-[hsl(30,100%,50%)] font-semibold">10x cheaper</span>, smarter, and more energy-efficient
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-1000
          ${showContent ? "opacity-100" : "opacity-0"}
        `}>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>;
};
export default HeroSection;