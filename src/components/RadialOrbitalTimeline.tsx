import { useState, useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";
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
}

const RadialOrbitalTimeline = ({
  timelineData,
  centerImage,
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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Slow orbital rotation
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
      {/* Orbital container */}
      <div className="relative max-w-4xl mx-auto aspect-square md:aspect-[4/3]">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-primary/5 blur-3xl" />

        {/* Center robot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className={cn(
              "relative transition-all duration-1000",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            )}
            style={{ perspective: "1000px" }}
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-75" />
            <img
              src={centerImage}
              alt="ROLLO Robot"
              className="w-32 md:w-48 h-auto relative z-10 drop-shadow-2xl"
              style={{ transform: "rotateY(-5deg) rotateX(5deg)" }}
            />
          </div>
        </div>

        {/* SVG for connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <defs>
            <linearGradient
              id="orbitalLineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(0, 0%, 100%)" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="orbitalLineGradientPending"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(0, 0%, 100%)" stopOpacity="0.3" />
            </linearGradient>
          </defs>

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
                stroke={
                  item.status === "completed"
                    ? "url(#orbitalLineGradient)"
                    : "url(#orbitalLineGradientPending)"
                }
                strokeWidth="1"
                className={cn(
                  "transition-opacity duration-500",
                  isVisible ? "opacity-60" : "opacity-0"
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
            content={item.content}
            Icon={item.Icon}
            status={item.status}
            angle={getNodeAngle(index)}
            radius={radius}
            isActive={activeNodeId === item.id}
            onClick={() =>
              setActiveNodeId(activeNodeId === item.id ? null : item.id)
            }
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Active node details card (especially useful on mobile) */}
      {activeNode && (
        <div className="mt-8 flex justify-center animate-fade-in-up">
          <div
            className={cn(
              "glass-card px-6 py-4 max-w-md text-center",
              activeNode.status === "completed"
                ? "border-primary/50"
                : "border-orange-500/50"
            )}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <activeNode.Icon
                className={cn(
                  "w-6 h-6",
                  activeNode.status === "completed"
                    ? "text-primary"
                    : "text-orange-500"
                )}
              />
              <h3
                className={cn(
                  "font-semibold text-lg",
                  activeNode.status === "completed"
                    ? "text-primary"
                    : "text-orange-500"
                )}
              >
                {activeNode.title}
              </h3>
            </div>
            <p className="text-foreground/80">{activeNode.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RadialOrbitalTimeline;
