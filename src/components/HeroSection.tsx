import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import rollo1 from "@/assets/rollo1.png";
import { DottedSurface } from "@/components/ui/dotted-surface";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  /* -- Scroll-driven dolly zoom ---------
     The section is 250vh tall. A sticky viewport locks the visual
     in place while the user scrolls. scrollYProgress 0->1 maps to
     the robot travelling from "far away" (small) to full-screen. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Robot: small -> full viewport height
  const robotScale = useTransform(scrollYProgress, [0, 0.65], [0.3, 1]);
  // Slight upward drift as it approaches
  const robotY = useTransform(scrollYProgress, [0, 0.65], [60, 0]);
  // Brighten as it comes closer
  const robotOpacity = useTransform(scrollYProgress, [0, 0.25], [0.5, 1]);
  // Text fades in once robot is close
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.45, 0.7], [40, 0]);

  /* -- 3D mouse tracking -- */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    setRotateY(x * 8);
    setRotateX(-y * 6);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: "250vh" }}>
      {/* Sticky viewport — stays in view during scroll */}
      <div className="sticky top-0 h-screen overflow-x-clip">
        {/* 3D dotted wave surface */}
        <DottedSurface className="opacity-40" />

        {/* Content layer */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative z-10 flex h-full flex-col items-center justify-center"
        >
          {/* Robot with scroll-driven zoom + 3D mouse tracking */}
          <motion.div
            style={{
              scale: robotScale,
              y: robotY,
              opacity: robotOpacity,
            }}
          >
            <div style={{ perspective: "1200px" }}>
              <motion.div
                className="relative"
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: "transform 0.15s ease-out",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {/* Robot image — sized to fill viewport on desktop at scale 1 */}
                <img
                  src={rollo1}
                  alt="ROLLO Robot"
                  className="h-[45vh] sm:h-[50vh] md:h-[60vh] object-contain brightness-[1.08] contrast-[1.04] drop-shadow-[0_70px_140px_rgba(0,0,0,0.65)]"
                />

                {/* Headlight glow */}
                <div
                  className="absolute inset-0 animate-headlight-breathe"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse 35% 20% at 50% 32%, rgba(140,180,255,0.35), transparent 70%)",
                    mixBlendMode: "color-dodge",
                    pointerEvents: "none",
                  }}
                />

                {/* Soft light spill below headlights */}
                <div
                  className="absolute inset-0 animate-headlight-breathe"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse 50% 35% at 50% 45%, rgba(140,180,255,0.08), transparent 65%)",
                    mixBlendMode: "screen",
                    pointerEvents: "none",
                    animationDelay: "1s",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text — fades in when robot reaches full size */}
          <motion.div
            className="mt-2 text-center max-w-2xl px-4"
            style={{ opacity: textOpacity, y: textY }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white">
              ROLLO
            </h1>

            <p className="mt-3 text-base sm:text-lg md:text-xl text-slate-300">
              Autonomous security robotics.
            </p>

            <p className="mt-5 text-sm sm:text-base text-slate-400 leading-relaxed">
              Intelligent robotic security at{" "}
              <span className="text-[#B4FF33] font-semibold">1/10th the cost</span>.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <a
                href="#applications"
                className="h-11 px-5 inline-flex items-center justify-center rounded-[4px] bg-[#B4FF33] text-black font-bold tracking-tight transition active:scale-[0.98]"
              >
                See Applications
              </a>

              <a
                href="#specs"
                className="h-11 px-5 inline-flex items-center justify-center rounded-[4px] border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:text-white transition active:scale-[0.98]"
              >
                View Specs
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
