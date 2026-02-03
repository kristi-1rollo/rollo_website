import { useEffect, useState } from "react";
import rollo1 from "@/assets/rollo1.png";

const HeroSection = () => {
  const [animationPhase, setAnimationPhase] = useState<"entering" | "blinking" | "complete">("entering");
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const blinkTimer = setTimeout(() => setAnimationPhase("blinking"), 1800);
    const completeTimer = setTimeout(() => setAnimationPhase("complete"), 2800);
    const contentTimer = setTimeout(() => setShowContent(true), 2300);

    return () => {
      clearTimeout(blinkTimer);
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
        ? `perspective(1200px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 8}deg)`
        : undefined,
    transition: "transform 0.2s ease-out",
    transformStyle: "preserve-3d" as const,
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Taust */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#0f0f0f]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center">
        <div
          className={`relative ${animationPhase === "entering" ? "animate-robot-entrance" : "animate-robot-sway"}`}
          style={robot3DStyle}
        >
          {/* Alumine põhipilt */}
          <img
            src={rollo1}
            alt="ROLLO Robot"
            className="w-auto h-[400px] md:h-[500px] object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          />

          {/* PEALMINE KIHT (TULED) */}
          {/* Kasutame sama pilti, aga maskime ainult tuled välja */}
          <div
            className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500
              ${animationPhase === "blinking" ? "animate-pulse opacity-100" : ""}
              ${animationPhase === "complete" ? "animate-lights-breathe opacity-90" : "opacity-0"}
            `}
            style={{
              backgroundImage: `url(${rollo1})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              mixBlendMode: "screen", // See teeb tuled säravaks
              filter: "brightness(1.5) contrast(1.2)",
              // MASK: See on kõige olulisem osa. See tekitab "augu", millest paistavad läbi ainult tuled.
              // Kohanda 'circle at 50% 45%' väärtusi, et nihutada valgust täpselt roboti tulede peale.
              WebkitMaskImage: "radial-gradient(circle at 50% 43%, white 8%, transparent 15%)",
              maskImage: "radial-gradient(circle at 50% 43%, white 8%, transparent 15%)",
            }}
          />
        </div>

        {/* Tekstiline sisu */}
        <div
          className={`mt-12 text-center max-w-4xl px-6 transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
            <span className="text-primary">ROLLO</span>
            <span className="text-slate-300 font-light block mt-2 text-2xl md:text-3xl tracking-normal italic">
              The Future of Autonomous Security
            </span>
          </h1>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["Security Guard", "Courier", "Multi-talent"].map((role, index) => (
              <div
                key={role}
                className="glass-card px-5 py-2 border border-white/5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-slate-300"
              >
                {role}
              </div>
            ))}
          </div>

          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Revolutionizing security with intelligence.
            <span className="text-primary block font-semibold mt-2">10x cheaper. 100% autonomous.</span>
          </p>
        </div>
      </div>

      {/* Kerimise indikaator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${showContent ? "opacity-60" : "opacity-0"}`}
      >
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1.5">
          <div className="w-1 h-1.5 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
