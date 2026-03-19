import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Battery, Eye, Navigation, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import rolloRenderP013 from "@/assets/robot/rollo-render-p013.png";
import rolloRenderP013WebP from "@/assets/robot/rollo-render-p013.webp";

interface Spec {
  label: string;
  value: string;
  icon: LucideIcon;
}

const specs: Spec[] = [
  { label: "MAX SPEED", value: "10 KM/H", icon: Zap },
  { label: "BATTERY", value: "8 HOURS", icon: Battery },
  { label: "WEIGHT", value: "45 KG", icon: Zap },
  { label: "LIDAR", value: "360° SCAN", icon: Eye },
  { label: "SENSORS", value: "AI THERMAL", icon: Navigation },
  { label: "RATING", value: "IP65 / EX", icon: Shield },
];

const leftSpecs = specs.slice(0, 3);
const rightSpecs = specs.slice(3);

/* ── Desktop: single spec label with leader line ── */
function SpecLabel({
  spec,
  side,
  index,
}: {
  spec: Spec;
  side: "left" | "right";
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`flex items-center gap-3 ${side === "right" ? "flex-row-reverse text-right" : ""}`}
    >
      {/* Text block */}
      <div className="shrink-0">
        <p className="mono-spec text-[#B4FF33]">{spec.label}</p>
        <p className="text-2xl font-bold text-white">{spec.value}</p>
      </div>

      {/* Leader line */}
      <div
        className={`flex items-center h-[1px] w-20 md:w-28 ${side === "right" ? "flex-row-reverse" : ""}`}
      >
        <div className="flex-1 h-[1px] bg-white/10" />
        <div className="w-1/3 h-[1px] bg-[#B4FF33] color-dodge-glow" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#B4FF33] shrink-0" />
      </div>
    </motion.div>
  );
}

/* ── Mobile: carousel card ── */
function SpecCard({ spec }: { spec: Spec }) {
  const Icon = spec.icon;
  return (
    <div className="glass border-[#B4FF33]/20 p-6 flex flex-col items-center gap-3 text-center">
      <div className="rounded-full bg-[#B4FF33]/10 p-3 text-[#B4FF33]">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mono-spec text-[#B4FF33]">{spec.label}</p>
      <p className="text-2xl font-bold text-white">{spec.value}</p>
    </div>
  );
}

/* ── Main export ── */
export function SpecsBlueprint() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div className="text-center">
        <p className="mono-spec text-[#B4FF33] mb-3">SYSTEM ARCHITECTURE</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Technical Specifications
        </h2>
      </div>

      {/* ── Desktop blueprint ── */}
      <div className="hidden md:block relative min-h-[600px]">
        {/* Pulsing glow behind robot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#B4FF33]/10 blur-[60px] animate-pulse color-dodge-glow" />

        {/* Robot image */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <picture>
            <source srcSet={rolloRenderP013WebP} type="image/webp" />
            <img
              src={rolloRenderP013}
              alt="ROLLO F6 blueprint"
              className="max-w-[350px] w-full h-auto"
              style={{ mixBlendMode: "screen" }}
              loading="lazy"
            />
          </picture>
        </div>

        {/* Left specs */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-12 w-[calc(50%-200px)]">
          {leftSpecs.map((spec, i) => (
            <SpecLabel key={spec.label} spec={spec} side="left" index={i} />
          ))}
        </div>

        {/* Right specs */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-12 w-[calc(50%-200px)]">
          {rightSpecs.map((spec, i) => (
            <SpecLabel
              key={spec.label}
              spec={spec}
              side="right"
              index={i + 3}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile carousel ── */}
      <div className="md:hidden">
        <Carousel
          opts={{ align: "center", loop: true }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {specs.map((spec) => (
              <CarouselItem key={spec.label} className="pl-3 basis-[75%]">
                <SpecCard spec={spec} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot indicators */}
        {count > 0 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-[#B4FF33]" : "bg-white/20"
                }`}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info row */}
      <p className="mono-spec text-white/40 text-center tracking-[0.3em]">
        24/7 AUTONOMOUS · SELF-CHARGING · 60×60×140 CM
      </p>
    </div>
  );
}
