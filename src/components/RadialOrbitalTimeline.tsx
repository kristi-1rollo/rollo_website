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
              className="w-32 md:w-48 h-auto relative z-10"
              style={{ transform: "rotateY(-5deg) rotateX(5deg)" }}
            />
          </div>
        </div>

        {/* SVG connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 5 }}
        >
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
                stroke="#1E2530"
                strokeWidth="1"
                className={cn(
                  "transition-opacity duration-500",
                  isVisible ? "opacity-80" : "opacity-0"
                )}
              />
            );
          })}
        </svg>

        {/* Orbital nodes */}
        {timelineData.map((item, index) => {
          const staggerDelay = index * 150;

          return (
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
              isVisible={isVisible}
              appearDelay={staggerDelay}
            />
          );
        })}
      </div>

      {/* Active node details */}
      {activeNode && (
        <div className="mt-8 flex justify-center animate-fade-in-up">
          <div className="surface-card px-6 py-4 max-w-md text-center border-foreground/20">
            <div className="flex items-center justify-center gap-3 mb-2">
              <activeNode.Icon className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-medium text-lg text-foreground">
                {activeNode.title}
              </h3>
            </div>
            <p className="text-muted-foreground">{activeNode.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RadialOrbitalTimeline;
