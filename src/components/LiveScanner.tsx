import { motion } from "framer-motion";

interface Detection {
  name: string;
  telemetry: string;
  delay: string;
}

const detections: Detection[] = [
  { name: "Vehicles", telemetry: "SCAN_MATCH: 99.2%", delay: "0s" },
  { name: "People", telemetry: "CONFIDENCE: 97.8%", delay: "1.2s" },
  { name: "Animals", telemetry: "CLASSIFY: ACTIVE", delay: "2.4s" },
  { name: "Fire Hazards", telemetry: "THERMAL_ALERT: STANDBY", delay: "3.6s" },
  {
    name: "Unauthorized Activity",
    telemetry: "THREAT_LEVEL: LOW",
    delay: "4.8s",
  },
];

export function LiveScanner() {
  return (
    <div className="relative overflow-hidden geo-grid rounded-xl py-12 px-4 sm:px-8">
      {/* Scanner line */}
      <div
        className="absolute top-0 w-[2px] h-full bg-[#B4FF33] z-10"
        style={{
          animation: "scanner-sweep 6s linear infinite",
        }}
      />

      {/* Scanner glow (wider blur behind the line) */}
      <div
        className="absolute top-0 w-20 h-full bg-[#B4FF33]/20 blur-xl z-[5] color-dodge-glow"
        style={{
          animation: "scanner-sweep 6s linear infinite",
        }}
      />

      {/* Detection labels */}
      <div className="relative z-20 flex flex-wrap gap-4 justify-center">
        {detections.map((det) => (
          <motion.div
            key={det.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="border border-[#B4FF33]/30 bg-black/40 backdrop-blur-sm px-5 py-4 min-w-[160px]"
            style={{
              animation: `scanner-glow 6s linear infinite`,
              animationDelay: det.delay,
            }}
          >
            <p className="text-white font-semibold text-sm mb-1">{det.name}</p>
            <p className="mono-spec text-[#B4FF33]/70 text-[10px]">
              {det.telemetry}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
