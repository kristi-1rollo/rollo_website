import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrbitalNodeProps {
  id: number;
  title: string;
  content: string;
  Icon: LucideIcon;
  status: "completed" | "pending";
  angle: number;
  radius: number;
  isActive: boolean;
  onClick: () => void;
  isMobile: boolean;
  isVisible: boolean;
  appearDelay: number;
}

const OrbitalNode = ({
  title,
  content,
  Icon,
  status,
  angle,
  radius,
  isActive,
  onClick,
  isMobile,
  isVisible,
  appearDelay,
}: OrbitalNodeProps) => {
  const angleRad = (angle - 90) * (Math.PI / 180);
  const x = 50 + radius * Math.cos(angleRad);
  const y = 50 + radius * Math.sin(angleRad);

  const isCompleted = status === "completed";

  return (
    <div
      className={cn(
        "absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer",
        "transition-all duration-300 ease-out",
        isActive && "scale-110",
        isVisible ? "animate-node-appear" : "opacity-0"
      )}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${appearDelay}ms`,
      }}
      onClick={onClick}
    >
      <div
        className={cn(
          "glass-card flex items-center gap-3 px-4 py-3",
          "hover:scale-105 transition-transform duration-200",
          isCompleted
            ? "border-primary/50 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
            : "border-orange-500/50 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20",
          isActive && isCompleted && "border-primary shadow-lg shadow-primary/30",
          isActive && !isCompleted && "border-orange-500 shadow-lg shadow-orange-500/30",
          isMobile ? "p-3" : "min-w-[160px]"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full",
            isCompleted
              ? "bg-primary/20 text-primary"
              : "bg-orange-500/20 text-orange-500"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        {!isMobile && (
          <div className="flex flex-col">
            <span
              className={cn(
                "font-semibold text-sm",
                isCompleted ? "text-primary" : "text-orange-500"
              )}
            >
              {title}
            </span>
            <span className="text-foreground/80 text-xs">{content}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrbitalNode;
