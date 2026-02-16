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
          "flex items-center gap-3 px-4 py-3 rounded-lg border bg-white shadow-sm",
          "border-black/[0.08] hover:shadow-md hover:-translate-y-[1px] transition-all duration-200",
          isActive && "border-[#111]/20 shadow-md",
          isMobile ? "p-3" : "min-w-[160px]"
        )}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F4F6F8] text-[#374151]">
          <Icon className="w-5 h-5" />
        </div>
        {!isMobile && (
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#111]">
              {title}
            </span>
            <span className="text-slate-500 text-xs">{content}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrbitalNode;
