import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const interactiveSelector =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor='interactive']";
const ARROW_PATH = "M2 2L2 22L7.4 16.8L11.2 24L15.2 22L11.4 14.8L19.6 14.6Z";
const HAND_PATH =
  "M11 3a2 2 0 0 1 4 0v7h1V6a2 2 0 0 1 4 0v4h1V8a2 2 0 0 1 4 0v8a7 7 0 0 1-7 7h-3a5 5 0 0 1-4.4-2.6l-2-3.6a1.8 1.8 0 0 1 3-1.9L11 16V3z";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const hoverRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canEnable = finePointer && !reduceMotion;
    setEnabled(canEnable);

    if (!canEnable) return;

    const originalCursor = document.body.style.cursor;
    const originalHtmlCursor = document.documentElement.style.cursor;
    const hadCursorClass = document.documentElement.classList.contains("custom-cursor-active");
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";
    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const nextHover = Boolean(target?.closest(interactiveSelector));
      if (nextHover !== hoverRef.current) {
        hoverRef.current = nextHover;
        setIsHoveringInteractive(nextHover);
      }
    };

    const onMouseLeave = () => {
      mouseX.set(-100);
      mouseY.set(-100);
      if (hoverRef.current) {
        hoverRef.current = false;
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);

    return () => {
      document.body.style.cursor = originalCursor;
      document.documentElement.style.cursor = originalHtmlCursor;
      if (!hadCursorClass) {
        document.documentElement.classList.remove("custom-cursor-active");
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const isHand = isHoveringInteractive;
  const cursorPath = isHand ? HAND_PATH : ARROW_PATH;
  const viewBox = isHand ? "0 0 30 30" : "0 0 26 26";
  const backSize = isHand ? 30 : 26;
  const frontSize = isHand ? 25 : 22;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-[3px] -translate-y-[3px]"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHand ? 1.03 : 1,
          opacity: 0.82,
        }}
      >
        <svg width={backSize} height={backSize} viewBox={viewBox} aria-hidden>
          <path
            d={cursorPath}
            fill="#0a0a0a"
            fillOpacity="0.88"
            stroke="#99ff00"
            strokeOpacity="0.72"
            strokeWidth={isHand ? "1.2" : "1"}
          />
        </svg>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[201]"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHand ? 1.06 : 1,
        }}
      >
        <svg width={frontSize} height={frontSize} viewBox={viewBox} aria-hidden>
          <path
            d={cursorPath}
            fill="#0a0a0a"
            stroke="#99ff00"
            strokeOpacity="1"
            strokeWidth={isHand ? "1.35" : "1.15"}
          />
        </svg>
      </motion.div>
    </>
  );
};

export default CustomCursor;
