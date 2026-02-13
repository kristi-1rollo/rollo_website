import { useEffect, useMemo, useRef, useState } from "react";

type Phase = "farBlink" | "approach" | "redBlink";

function srcFromPublic(path: string) {
  // Sinu failinimed sisaldavad tühikuid → encode on MUST
  const parts = path.split("/").map((p) => encodeURIComponent(p));
  return "/" + parts.join("/");
}

export default function HeroRobotSprite() {
  const [phase, setPhase] = useState<Phase>("farBlink");
  const [frame, setFrame] = useState(0);

  // ✅ Pane siia sinu tegelikud failinimed (täpselt nii nagu kaustas)
  // Kauguse “vilgutamine”: vali 2–3 kaadrit, kus tuled erinevad
  const farBlinkFrames = useMemo(
    () => [
      "robot/1Rollo Proto render P017.png",
      "robot/1Rollo Proto render P018.png",
    ],
    []
  );

  // “Sõidab ette”: kasuta järjestust (turntable/angle swap) – vali sobivad P00x
  const approachFrames = useMemo(
    () => [
      "robot/1Rollo Proto P001.png",
      "robot/1Rollo Proto P002.png",
      "robot/1Rollo Proto P003.png",
      "robot/1Rollo Proto P004.png",
      "robot/1Rollo Proto P005.png",
      "robot/1Rollo Proto P006.png",
      "robot/1Rollo Proto P007.png",
      "robot/1Rollo Proto P008.png",
      "robot/1Rollo Proto P009.png",
      "robot/1Rollo Proto P010.png",
      "robot/1Rollo Proto P011.png",
      "robot/1Rollo Proto P012.png",
      "robot/1Rollo Proto P013.png",
    ],
    []
  );

  // Punase vilgutamise kaadrid: vali need PNG-d, kus punane on sees (sul on need olemas)
  const redBlinkFrames = useMemo(
    () => [
      // asenda siia need, kus punane glow/tuli on
      "robot/1Rollo Proto P013.png",
      "robot/1Rollo Proto render P013.png",
    ],
    []
  );

  const phaseStartRef = useRef<number>(0);

  useEffect(() => {
    phaseStartRef.current = performance.now();
    setFrame(0);

    // ajastused (ms)
    const FAR_BLINK_MS = 1600;   // kauguses vilgub
    const APPROACH_MS = 1800;    // sõidab ette
    const RED_BLINK_MS = 2400;   // punased vilguvad

    const id = window.setInterval(() => {
      const t = performance.now() - phaseStartRef.current;

      if (phase === "farBlink") {
        // vilgutamine: 2 kaadrit edasi-tagasi
        setFrame((f) => (f + 1) % farBlinkFrames.length);
        if (t > FAR_BLINK_MS) {
          setPhase("approach");
          phaseStartRef.current = performance.now();
          setFrame(0);
        }
      }

      if (phase === "approach") {
        // liikumise illusioon: kaadrid järjest
        setFrame((f) => (f + 1) % approachFrames.length);
        if (t > APPROACH_MS) {
          setPhase("redBlink");
          phaseStartRef.current = performance.now();
          setFrame(0);
        }
      }

      if (phase === "redBlink") {
        // punane blink
        setFrame((f) => (f + 1) % redBlinkFrames.length);
        // kui tahad lõputult punast blinkimist, jäta nii.
        // kui tahad peatada, siis lisa if (t>RED_BLINK_MS) clearInterval...
      }
    }, 120); // kiirus: 80–140ms annab “mehaanilise” tunde

    return () => window.clearInterval(id);
  }, [phase, farBlinkFrames.length, approachFrames.length, redBlinkFrames.length]);

  // Valime, millisest listist hetkel src tuleb
  const currentSrc = useMemo(() => {
    if (phase === "farBlink") return srcFromPublic(farBlinkFrames[frame] ?? farBlinkFrames[0]);
    if (phase === "approach") return srcFromPublic(approachFrames[frame] ?? approachFrames[0]);
    return srcFromPublic(redBlinkFrames[frame] ?? redBlinkFrames[0]);
  }, [phase, frame, farBlinkFrames, approachFrames, redBlinkFrames]);

  // Kaugus→lähedus: skaleeri + nihuta. (See on “sõidab ette” simulatsioon.)
  const motionClass =
    phase === "farBlink"
      ? "scale-[0.55] opacity-90 translate-y-6 blur-[0.2px]"
      : phase === "approach"
      ? "scale-[0.85] opacity-100 translate-y-2"
      : "scale-[0.95] opacity-100 translate-y-0";

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      {/* glow taust, et robot “elaks” */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_50%_30%,rgba(160,255,0,0.12),transparent_55%)]" />
      <img
        src={currentSrc}
        alt="ROLLO robot"
        className={[
          "mx-auto select-none",
          "transition-transform duration-700 ease-out",
          "drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]",
          motionClass,
        ].join(" ")}
        draggable={false}
      />
    </div>
  );
}
