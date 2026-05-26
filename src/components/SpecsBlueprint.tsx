import { motion } from "framer-motion";
import { Zap, Battery, Eye, Navigation, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
    { label: "SPEED", value: "Up to 30 km/h / 19 mph", icon: Zap },
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
  const normalizedIndex = index % 6;

  const getAnchorOffset = (idx: number) => {
    const offsets = { 0: 0, 1: 30, 2: 85, 3: 85, 4: 30, 5: 0 };
    return offsets[idx as keyof typeof offsets] || 0;
  };

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
          <div className="text-right mr-3 max-w-[240px]">
            <p className="mono-spec text-[#B4FF33] text-base">{spec.label}</p>
            <p className="text-[22px] font-bold text-white leading-tight">{spec.value}</p>
            {spec.subValue && (
              <p className="text-lg text-white/60 leading-tight">{spec.subValue}</p>
            )}
          </div>

          <div className="relative flex items-center" style={{ width: `${totalLineLength}px` }}>
            <div className="absolute inset-y-0 left-0 right-0 h-[1px] top-1/2 -translate-y-1/2 bg-white/10" />
            <div
              className="absolute right-0 h-[1px] top-1/2 -translate-y-1/2 bg-[#B4FF33] color-dodge-glow"
              style={{ width: "30%" }}
            />
          </div>

          <div className="w-1.5 h-1.5 rounded-full bg-[#B4FF33] shrink-0" />
        </>
      ) : (
        <>
          <div className="w-1.5 h-1.5 rounded-full bg-[#B4FF33] shrink-0" />

          <div className="relative flex items-center" style={{ width: `${totalLineLength}px` }}>
            <div className="absolute inset-y-0 left-0 right-0 h-[1px] top-1/2 -translate-y-1/2 bg-white/10" />
            <div
              className="absolute left-0 h-[1px] top-1/2 -translate-y-1/2 bg-[#B4FF33] color-dodge-glow"
              style={{ width: "30%" }}
            />
          </div>

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

/* ── Mobile: compact grid card ── */
function SpecGridCard({ spec }: { spec: Spec }) {
  const Icon = spec.icon;
  return (
    <div className="glass border-[#B4FF33]/15 rounded-[4px] p-3 flex flex-col gap-1.5 min-h-[96px]">
      <div className="flex items-center gap-1.5 text-[#B4FF33]">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <p className="mono-spec text-[9px] leading-none truncate">{spec.label}</p>
      </div>
      <p className="text-sm font-bold text-white leading-tight">{spec.value}</p>
      {spec.subValue && (
        <p className="text-[10px] text-white/55 leading-tight">{spec.subValue}</p>
      )}
    </div>
  );
}

/* ── Main export ── */
export function SpecsBlueprint() {
  return (
    <div>
      {/* Section header */}
      <div className="text-center px-6 md:px-0 mb-12 md:mb-24">
        <p className="mono-spec text-[#B4FF33] mb-3">SYSTEM ARCHITECTURE</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Technical Specifications
        </h2>
      </div>

      {/* ── Desktop blueprint ── */}
      <div className="hidden md:block relative min-h-[1000px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B4FF33]/15 blur-[80px] animate-pulse color-dodge-glow" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/8 blur-[100px]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src="/robot/F6/f6_tech_spec.webp"
            alt="1ROLLO technical specifications"
            className="max-w-[480px] w-full h-auto opacity-95"
            style={{ mixBlendMode: "lighten" }}
            loading="lazy"
          />
        </div>

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
            <SpecLabel key={spec.label} spec={spec} side="right" index={i + 6} />
          ))}
        </div>
      </div>

      {/* ── Mobile: sticky robot in background, cards scroll over ── */}
      <div className="md:hidden relative">
        {/* Sticky robot — fixed size, sits behind cards */}
        <div className="sticky top-20 z-0 flex justify-center pointer-events-none h-0">
          <div className="relative flex items-center justify-center -translate-y-4">
            {/* Ambient glow behind robot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#B4FF33]/12 blur-[70px]" />
            <img
              src="/robot/F6/f6_tech_spec.webp"
              alt="1ROLLO technical specifications"
              style={{ mixBlendMode: "lighten", width: 260 }}
              className="h-auto relative opacity-90"
              loading="lazy"
            />
          </div>
        </div>

        {/* Specs grid — scrolls over the robot */}
        <div className="relative z-10 px-4 pt-[280px] space-y-8">
          {[leftCategory, rightCategory].map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px flex-1 bg-white/10" />
                <p className="mono-spec text-[#B4FF33] text-[10px] tracking-widest">
                  {cat.category}
                </p>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {cat.specs.map((spec) => (
                  <SpecGridCard key={spec.label} spec={spec} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
