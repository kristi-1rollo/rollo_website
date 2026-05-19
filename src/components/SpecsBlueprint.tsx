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

interface Spec {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
}

interface SpecCategory {
  category: string;
  specs: Spec[];
}

const leftCategory: SpecCategory = {
  category: "DIMENSIONS & PERFORMANCE",
  specs: [
    { label: "WHEEL DIAMETER", value: "60 cm / 24 in", icon: Zap },
    { label: "HEIGHT", value: "110 cm / 43 in", icon: Zap },
    { label: "WEIGHT", value: "45 kg / 100 lb", icon: Zap },
    { label: "MAX SPEED", value: "10 km/h / 6 mph", icon: Zap },
    { label: "BATTERY LIFE", value: "Up to 8 hours", icon: Battery },
    { label: "OPERATING TEMPERATURE", value: "−20°C to +55°C", subValue: "−4°F to +131°F", icon: Zap },
  ],
};

const rightCategory: SpecCategory = {
  category: "AUTONOMY & CONNECTIVITY",
  specs: [
    { label: "PROTECTION", value: "IP65", icon: Shield },
    { label: "CHARGING", value: "Autonomous wireless charging", icon: Battery },
    { label: "VISION", value: "360° vision system", icon: Eye },
    { label: "POSITIONING", value: "RTK/GNSS positioning", icon: Navigation },
    { label: "CONNECTIVITY", value: "4G / 5G • Wi-Fi • Bluetooth", icon: Zap },
    { label: "AUDIO", value: "Integrated microphone & speaker", icon: Zap },
  ],
};

const allSpecs = [...leftCategory.specs, ...rightCategory.specs];

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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex items-center gap-3 ${side === "right" ? "flex-row-reverse text-right" : ""}`}
    >
      {/* Text block */}
      <div className="shrink-0">
        <p className="mono-spec text-[#B4FF33] text-base">{spec.label}</p>
        <p className="text-[22px] font-bold text-white leading-tight">{spec.value}</p>
        {spec.subValue && (
          <p className="text-lg text-white/60 leading-tight">{spec.subValue}</p>
        )}
      </div>

      {/* Leader line */}
      <div
        className={`flex items-center h-[1px] w-16 md:w-20 ${side === "right" ? "flex-row-reverse" : ""}`}
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
    <div className="glass border-[#B4FF33]/20 p-6 flex flex-col items-center justify-center gap-3 text-center min-h-[240px] h-full">
      <div className="rounded-full bg-[#B4FF33]/10 p-3 text-[#B4FF33]">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mono-spec text-[#B4FF33] text-xs">{spec.label}</p>
      <p className="text-xl font-bold text-white leading-tight">{spec.value}</p>
      {spec.subValue && (
        <p className="text-sm text-white/60">{spec.subValue}</p>
      )}
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
      <div className="hidden md:block relative min-h-[950px]">
        {/* Pulsing glow behind robot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B4FF33]/15 blur-[80px] animate-pulse color-dodge-glow" />

        {/* Additional blue ambient glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/8 blur-[100px]" />

        {/* Robot image */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src="/robot/F6/f6_tech_spec.webp"
            alt="1ROLLO technical specifications"
            className="max-w-[400px] w-full h-auto opacity-95"
            style={{ mixBlendMode: "lighten" }}
            loading="lazy"
          />
        </div>

        {/* Left specs */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-12 w-[calc(50%-220px)] pr-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mono-spec text-[#B4FF33] text-xs mb-2"
          >
            {leftCategory.category}
          </motion.p>
          {leftCategory.specs.map((spec, i) => (
            <SpecLabel key={spec.label} spec={spec} side="left" index={i} />
          ))}
        </div>

        {/* Right specs */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-12 w-[calc(50%-220px)] pl-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mono-spec text-[#B4FF33] text-xs mb-2 text-right"
          >
            {rightCategory.category}
          </motion.p>
          {rightCategory.specs.map((spec, i) => (
            <SpecLabel
              key={spec.label}
              spec={spec}
              side="right"
              index={i + 6}
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
            {allSpecs.map((spec) => (
              <CarouselItem key={spec.label} className="pl-3 basis-[280px] min-w-[280px]">
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
      <p className="mono-spec text-white/40 text-center tracking-[0.3em] text-xs">
        24/7 AUTONOMOUS • SELF-CHARGING • CONNECTED • ALL-TERRAIN
      </p>
    </div>
  );
}
