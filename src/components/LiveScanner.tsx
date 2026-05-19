import { motion } from "framer-motion";

interface Detection {
  name: string;
  telemetry: string;
  delay: string;
}

const detections: Detection[] = [
  { name: "Thermal Cameras", telemetry: "LOW-LIGHT IMAGING READY", delay: "0s" },
  { name: "PTZ Cameras", telemetry: "EXTENDED COVERAGE ACTIVE", delay: "1.2s" },
  { name: "Night Vision Systems", telemetry: "DARKNESS PATROL ENABLED", delay: "2.4s" },
  {
    name: "Custom Sensors & Payloads",
    telemetry: "MODULAR ARCHITECTURE",
    delay: "3.6s",
  },
  {
    name: "RFID / Transponders",
    telemetry: "ID TRACKING SUPPORT",
    delay: "4.8s",
  },
];

export function LiveScanner() {
  return (
    <div className="relative overflow-hidden geo-grid rounded-xl py-12">
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
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-7 px-6 md:px-0">
        {detections.map((det) => (
          <motion.div
            key={det.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="border border-[#B4FF33]/30 bg-black/40 backdrop-blur-sm px-6 py-6 min-h-[100px] md:min-h-[150px] md:px-8 md:py-8 flex flex-col items-center justify-center text-center"
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
