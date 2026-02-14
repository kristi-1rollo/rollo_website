import { useEffect, useState } from "react";
import rollo1 from "@/assets/rollo1.png";


const HeroSection = () => {
  const [animationPhase, setAnimationPhase] = useState<"entering" | "complete">("entering");
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const completeTimer = setTimeout(() => setAnimationPhase("complete"), 1800);
    const contentTimer = setTimeout(() => setShowContent(true), 1200);
    return () => {
      clearTimeout(completeTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);
    setMousePosition({ x, y });
  };

  const robot3DStyle = {
    transform:
      animationPhase === "complete"
        ? `perspective(1200px) rotateX(${mousePosition.y * -4}deg) rotateY(${mousePosition.x * 6}deg)`
        : undefined,
    transition: "transform 0.15s ease-out",
    transformStyle: "preserve-3d" as const,
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Robot */}
        <div
          className={`relative ${animationPhase === "entering" ? "animate-robot-entrance" : ""}`}
          style={robot3DStyle}
        >
          <img
            src={rollo1}
            alt="ROLLO Robot"
            className="w-auto h-[360px] md:h-[480px] object-contain"
          />
        </div>

        {/* Content */}
        <div
          className={`mt-16 text-center max-w-3xl px-8 transition-all duration-700 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            ROLLO
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            The future of autonomous security.
          </p>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Intelligent robotic security at{" "}
            <span className="text-[#99FF00] font-semibold">1/10th the cost</span>.
            Fully autonomous. Always operational.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;