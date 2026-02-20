import { useState, useEffect, useRef } from "react";
import { LucideIcon, X } from "lucide-react";
import OrbitalNode from "./OrbitalNode";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  content: string;
  Icon: LucideIcon;
  status: "completed" | "pending";
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  centerImage: string;
  onItemClick?: (item: TimelineItem) => void;
}

const RadialOrbitalTimeline = ({
  timelineData,
  centerImage,
  onItemClick,
}: RadialOrbitalTimelineProps) => {
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const radius = isMobile ? 38 : 40;
  const orbitRadius = isMobile ? 34 : 36;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isVisible]);

  const getNodeAngle = (index: number) => {
    const baseAngle = (360 / timelineData.length) * index;
    return baseAngle + rotation;
  };

  const activeNode = timelineData.find((item) => item.id === activeNodeId);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative max-w-4xl mx-auto aspect-square md:aspect-[4/3]">

        {/* Center robot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className={cn(
              "relative transition-all duration-1000",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            )}
            style={{ perspective: "1000px" }}
          >
            <img
              src={centerImage}
              alt="ROLLO Robot"
              className={cn(
                "w-32 md:w-48 h-auto relative z-10 transition-all duration-700",
                activeNode ? "blur-xl scale-90 opacity-30" : "blur-0 scale-100 opacity-100"
              )}
              style={{ transform: "rotateY(-5deg) rotateX(5deg)" }}
            />
          </div>
        </div>

        {/* Modal overlay */}
        {activeNode && (
          <>
            <div
              className="absolute inset-[-100%] z-[90] cursor-default bg-black/5 backdrop-blur-[1px]"
              onClick={() => setActiveNodeId(null)}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[90%] max-w-md animate-in zoom-in-95 fade-in duration-300 pointer-events-auto">
              <div
                className="relative p-8 md:p-10 border bg-[#050505]/95 border-white/[0.08] backdrop-blur-2xl shadow-2xl text-center overflow-hidden rounded-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#B4FF33]/5 blur-[80px] rounded-full" />

                <button
                  onClick={() => setActiveNodeId(null)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-[#B4FF33] transition-colors z-20"
                >
                  <X size={24} />
                </button>

                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="p-4 rounded-xl bg-[#B4FF33]/5 border border-[#B4FF33]/10 text-[#B4FF33]">
                    <activeNode.Icon size={40} />
                  </div>

                  <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B4FF33] mb-2">
                      System Specification
                    </h3>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                      {activeNode.title}
                    </h2>

                    <div className="inline-block px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg mb-6">
                      <span className="text-xl font-bold text-white tracking-tight">
                        {activeNode.content}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed max-w-[280px] mx-auto">
                      Optimized for industrial performance. This {activeNode.title.toLowerCase()} module
                      ensures seamless operation in high-demand environments.
                    </p>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B4FF33]/15 to-transparent my-2" />

                  <p className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
                    Module Status: {activeNode.status === 'completed' ? 'Verified' : 'In Beta'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SVG connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
          {timelineData.map((item, index) => {
            const angle = getNodeAngle(index);
            const angleRad = (angle - 90) * (Math.PI / 180);
            const endX = 50 + orbitRadius * Math.cos(angleRad);
            const endY = 50 + orbitRadius * Math.sin(angleRad);
            return (
              <line
                key={item.id}
                x1="50%"
                y1="50%"
                x2={`${endX}%`}
                y2={`${endY}%`}
                stroke={activeNode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)"}
                strokeWidth={activeNode ? "0.5" : "1"}
                className={cn(
                  "transition-all duration-700",
                  isVisible ? "opacity-100" : "opacity-0"
                )}
              />
            );
          })}
        </svg>

        {/* Orbital nodes */}
        {timelineData.map((item, index) => (
          <OrbitalNode
            key={item.id}
            id={item.id}
            title={item.title}
            content=""
            Icon={item.Icon}
            status={item.status}
            angle={getNodeAngle(index)}
            radius={radius}
            isActive={activeNodeId === item.id}
            onClick={() => {
              setActiveNodeId(activeNodeId === item.id ? null : item.id);
              onItemClick?.(item);
            }}
            isMobile={isMobile}
            isVisible={isVisible}
            appearDelay={index * 150}
          />
        ))}
      </div>
    </div>
  );
};

export default RadialOrbitalTimeline;
