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
    { label: "CHARGING", value: "Autonomous", subValue: "wireless charging", icon: Battery },
    { label: "VISION", value: "360° vision system", icon: Eye },
    { label: "POSITIONING", value: "RTK/GNSS", subValue: "positioning", icon: Navigation },
    { label: "CONNECTIVITY", value: "4G / 5G • Wi-Fi • Bluetooth", icon: Zap },
    { label: "AUDIO", value: "Integrated", subValue: "microphone & speaker", icon: Zap },
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
  // Arc-based anchor positioning - follows robot silhouette
  // Closer at top/bottom, further at middle
  // Normalize index to 0-5 range for both sides
  const normalizedIndex = index % 6;

  const getAnchorOffset = (idx: number) => {
    const offsets = {
      0: 0,      // top - closest
      1: 30,     // slightly further
      2: 85,     // middle - furthest (stronger curvature)
      3: 85,     // middle - furthest (stronger curvature)
      4: 30,     // slightly further
      5: 0,      // bottom - closest
    };
    return offsets[idx as keyof typeof offsets] || 0;
  };

  // Fixed base connector line length
  const baseLineLength = 100;
  const anchorOffset = getAnchorOffset(normalizedIndex);
  const totalLineLength = baseLineLength + anchorOffset;

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-center"
      style={{
        justifyContent: side === "left" ? "flex-end" : "flex-start",
        paddingLeft: side === "right" ? `${anchorOffset}px` : undefined,
        paddingRight: side === "left" ? `${anchorOffset}px` : undefined,
      }}
    >
      {side === "left" ? (
        <>
          {/* Text block - expands outward */}
          <div className="text-right mr-3 max-w-[240px]">
            <p className="mono-spec text-[#B4FF33] text-base">{spec.label}</p>
            <p className="text-[22px] font-bold text-white leading-tight">{spec.value}</p>
            {spec.subValue && (
              <p className="text-lg text-white/60 leading-tight">{spec.subValue}</p>
            )}
          </div>

          {/* Arc-based connector - length varies by position */}
          <div className="relative flex items-center" style={{ width: `${totalLineLength}px` }}>
            {/* Base line */}
            <div className="absolute inset-y-0 left-0 right-0 h-[1px] top-1/2 -translate-y-1/2 bg-white/10" />
            {/* Accent line (last 30%) */}
            <div
              className="absolute right-0 h-[1px] top-1/2 -translate-y-1/2 bg-[#B4FF33] color-dodge-glow"
              style={{ width: "30%" }}
            />
          </div>

          {/* Anchor dot - follows arc */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#B4FF33] shrink-0" />
        </>
      ) : (
        <>
          {/* Anchor dot - follows arc */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#B4FF33] shrink-0" />

          {/* Arc-based connector - length varies by position */}
          <div className="relative flex items-center" style={{ width: `${totalLineLength}px` }}>
            {/* Base line */}
            <div className="absolute inset-y-0 left-0 right-0 h-[1px] top-1/2 -translate-y-1/2 bg-white/10" />
            {/* Accent line (first 30%) */}
            <div
              className="absolute left-0 h-[1px] top-1/2 -translate-y-1/2 bg-[#B4FF33] color-dodge-glow"
              style={{ width: "30%" }}
            />
          </div>

          {/* Text block - expands outward */}
          <div className="text-left ml-3 max-w-[240px]">
            <p className="mono-spec text-[#B4FF33] text-base">{spec.label}</p>
            <p className="text-[22px] font-bold text-white leading-tight">{spec.value}</p>
            {spec.subValue && (
              <p className="text-lg text-white/60 leading-tight">{spec.subValue}</p>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ── Mobile: carousel card ── */
function SpecCard({ spec }: { spec: Spec }) {
  const Icon = spec.icon;
  return (
    <div className="glass border-[#B4FF33]/20 p-8 flex flex-col items-center justify-center gap-3 text-center min-h-[280px] h-full">
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
    <div>
      {/* Section header */}
      <div className="text-center px-6 md:px-0 mb-16 md:mb-24">
        <p className="mono-spec text-[#B4FF33] mb-3">SYSTEM ARCHITECTURE</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Technical Specifications
        </h2>
      </div>

      {/* ── Desktop blueprint ── */}
      <div className="hidden md:block relative min-h-[1000px]">
        {/* Pulsing glow behind robot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B4FF33]/15 blur-[80px] animate-pulse color-dodge-glow" />

        {/* Additional blue ambient glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/8 blur-[100px]" />

        {/* Robot image */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src="/robot/F6/f6_tech_spec.webp"
            alt="1ROLLO technical specifications"
            className="max-w-[480px] w-full h-auto opacity-95"
            style={{ mixBlendMode: "lighten" }}
            loading="lazy"
          />
        </div>

        {/* Left specs - arc-based anchors wrap around robot */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-12 right-[50%] mr-[280px] pr-2">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mono-spec text-[#B4FF33] text-xs mb-2 text-right"
          >
            {leftCategory.category}
          </motion.p>
          {leftCategory.specs.map((spec, i) => (
            <SpecLabel key={spec.label} spec={spec} side="left" index={i} />
          ))}
        </div>

        {/* Right specs - arc-based anchors wrap around robot */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-12 left-[50%] ml-[330px] pl-2">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mono-spec text-[#B4FF33] text-xs mb-2 text-left"
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
          <CarouselContent className="-ml-4">
            {allSpecs.map((spec) => (
              <CarouselItem key={spec.label} className="pl-4 basis-[87vw]">
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

      {/* Info row - mobile: vertical stack, desktop: horizontal */}
      <div className="mono-spec text-white/40 text-center tracking-[0.45em] text-sm mt-16 md:mt-24">
        <div className="flex flex-col md:hidden gap-3">
          <p>24/7 AUTONOMOUS</p>
          <p>SELF-CHARGING</p>
          <p>CONNECTED</p>
          <p>ALL-TERRAIN</p>
        </div>
        <p className="hidden md:block" style={{ wordSpacing: '0.8em' }}>
          24/7 AUTONOMOUS  •  SELF-CHARGING  •  CONNECTED  •  ALL-TERRAIN
        </p>
      </div>
    </div>
  );
}
