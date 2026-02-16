import { motion } from "framer-motion";
import rollo1 from "@/assets/rollo1.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden section section-dark">
      {/* Background / stage */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top soft lift */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_0%,rgba(255,255,255,0.07),transparent_60%)]" />

        {/* Main halo behind robot (anchored, NOT moving) */}
        <motion.div
          className="absolute left-1/2 top-[46%] h-[920px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(153,255,0,0.20), rgba(255,255,255,0.12), transparent 62%)",
          }}
          animate={{ opacity: [0.22, 0.30, 0.22] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sub halo to add depth */}
        <motion.div
          className="absolute left-1/2 top-[56%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), transparent 62%)",
          }}
          animate={{ opacity: [0.10, 0.16, 0.10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bottom stage (prevents harsh cut) */}
        <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

        {/* Section transition fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/10" />
      </div>

      {/* Content */}
      <div className="container-premium relative z-10 flex min-h-[88vh] flex-col items-center justify-center pt-24 md:pt-28">
        {/* Robot */}
        <motion.div
          className="relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.img
            src={rollo1}
            alt="ROLLO Robot"
            className="h-[320px] sm:h-[380px] md:h-[520px] object-contain brightness-[1.12] contrast-[1.06] drop-shadow-[0_70px_140px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className="mt-10 md:mt-14 text-center max-w-2xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.75 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            ROLLO
          </h1>

          <p className="mt-3 text-base sm:text-lg md:text-xl text-white/75">
            Autonomous security robotics.
          </p>

          <p className="mt-5 text-sm sm:text-base text-white/65 leading-relaxed">
            Intelligent robotic security at{" "}
            <span className="text-[#99FF00] font-semibold">1/10th the cost</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
