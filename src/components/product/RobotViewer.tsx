import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

// Robot images in logical rotation order (front-right → front → front-left → side → back)
const ROBOT_IMAGES = [
  "/robot/product/f6-front-right.webp",
  "/robot/product/f6-front.webp",
  "/robot/product/f6-front-left.webp",
  "/robot/product/f6-side-left-1.webp",
  "/robot/product/f6-side-left-2.webp",
  "/robot/product/f6-back-left.webp",
  "/robot/product/f6-back.webp",
];

const AUTO_ROTATION_INTERVAL = 3500; // 3.5 seconds
const PAUSE_AFTER_INTERACTION = 5000; // 5 seconds pause after manual interaction

export const RobotViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set([0]));
  const [isHovering, setIsHovering] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoRotationPausedUntil = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload current and next images
  useEffect(() => {
    const preloadImages = (indices: number[]) => {
      indices.forEach((idx) => {
        if (!imagesLoaded.has(idx)) {
          const img = new Image();
          img.src = ROBOT_IMAGES[idx];
          img.onload = () => {
            setImagesLoaded((prev) => new Set([...prev, idx]));
          };
        }
      });
    };

    const nextIndex = (currentIndex + 1) % ROBOT_IMAGES.length;
    const prevIndex = (currentIndex - 1 + ROBOT_IMAGES.length) % ROBOT_IMAGES.length;

    preloadImages([currentIndex, nextIndex, prevIndex]);
  }, [currentIndex, imagesLoaded]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ROBOT_IMAGES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ROBOT_IMAGES.length) % ROBOT_IMAGES.length);
  }, []);

  const pauseAutoRotation = useCallback(() => {
    autoRotationPausedUntil.current = Date.now() + PAUSE_AFTER_INTERACTION;
  }, []);

  // Desktop scroll-to-rotate handler
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isMobile) return;

    const now = Date.now();
    const timeSinceLastScroll = now - lastScrollTime.current;

    // Throttle: min 150ms between scroll actions
    if (timeSinceLastScroll < 150) return;

    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    // At boundaries: allow normal page scroll
    if ((currentIndex === 0 && scrollingUp) || (currentIndex === ROBOT_IMAGES.length - 1 && scrollingDown)) {
      return; // Let page scroll normally
    }

    // Prevent page scroll while rotating images
    e.preventDefault();

    lastScrollTime.current = now;
    setIsScrolling(true);
    pauseAutoRotation();

    if (scrollingDown) {
      goToNext();
    } else if (scrollingUp) {
      goToPrev();
    }

    // Clear scrolling state after animation
    setTimeout(() => setIsScrolling(false), 300);
  }, [isMobile, currentIndex, goToNext, goToPrev, pauseAutoRotation]);

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Don't rotate if hovering, scrolling, or recently interacted
      if (!isHovering && !isScrolling && Date.now() > autoRotationPausedUntil.current) {
        goToNext();
      }
    }, AUTO_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isHovering, isScrolling, goToNext]);

  // Attach wheel event listener for scroll-to-rotate (desktop only)
  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container || isMobile) return;

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel, isMobile]);

  // Mobile swipe handler
  const handleMobileSwipe = (_: any, info: PanInfo) => {
    if (!isMobile) return;

    const threshold = 50;
    const velocity = Math.abs(info.velocity.x);

    if (Math.abs(info.offset.x) > threshold || velocity > 300) {
      if (info.offset.x > 0) {
        goToPrev();
      } else {
        goToNext();
      }
      pauseAutoRotation();
    }
  };

  // Manual dot click handler
  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
    pauseAutoRotation();
  }, [pauseAutoRotation]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="relative w-full">
      {/* Top label */}
      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Product Experience
        </h3>
      </div>

      {/* Viewer stage */}
      <div className="relative w-full" style={{ height: isMobile ? "60vh" : "70vh" }}>
        {/* Subtle ambient glow behind robot - no visible edges */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div
            className="w-[60%] h-[50%] rounded-full blur-3xl"
            style={{
              background: "radial-gradient(ellipse, rgba(153, 255, 0, 0.18) 0%, rgba(153, 255, 0, 0.08) 40%, transparent 75%)",
              opacity: 0.8,
            }}
          />
        </div>

        {/* Soft floor shadow/reflection under robot */}
        <div className="absolute inset-x-0 bottom-0 h-32 md:h-40 flex items-end justify-center pointer-events-none">
          <div
            className="w-[55%] md:w-[45%] h-12 md:h-20 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(ellipse, rgba(153, 255, 0, 0.25) 0%, rgba(153, 255, 0, 0.1) 50%, transparent 80%)",
              opacity: 0.7,
            }}
          />
        </div>

        {/* Image container */}
        <motion.div
          ref={imageContainerRef}
          className="relative w-full h-full flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={isMobile ? handleMobileSwipe : undefined}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={currentIndex}
              src={ROBOT_IMAGES[currentIndex]}
              alt={`1ROLLO robot view ${currentIndex + 1}`}
              className="max-w-full max-h-full w-auto h-auto object-contain select-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Instruction text */}
      <div className="text-center mt-6 md:mt-8 mb-8">
        <p className="text-xs md:text-sm text-slate-400 tracking-wide">
          {isMobile ? (
            <>
              <span className="inline-block mr-2">&larr;</span>
              Swipe to explore
              <span className="inline-block ml-2">&rarr;</span>
            </>
          ) : (
            <>
              <span className="inline-block mr-2">↕</span>
              Scroll to rotate
            </>
          )}
        </p>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 md:gap-3">
        {ROBOT_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className="group relative w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300"
            style={{
              background: idx === currentIndex
                ? "#99FF00"
                : "rgba(153, 255, 0, 0.2)",
              boxShadow: idx === currentIndex
                ? "0 0 12px rgba(153, 255, 0, 0.6), 0 0 24px rgba(153, 255, 0, 0.3)"
                : "none",
            }}
            aria-label={`View ${idx + 1}`}
          >
            {/* Touch target expansion for mobile */}
            <span className="absolute inset-0 -m-3 md:-m-2" />
          </button>
        ))}
      </div>
    </div>
  );
};
