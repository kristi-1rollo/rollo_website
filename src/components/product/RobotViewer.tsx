import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

// Robot images in logical rotation order
const ROBOT_IMAGES = [
  "/robot/product/f6-front.webp",
  "/robot/product/f6-front-right.webp",
  "/robot/product/f6-side-left-1.webp",
  "/robot/product/f6-back.webp",
  "/robot/product/f6-back-left.webp",
  "/robot/product/f6-front-left.webp",
  "/robot/product/f6-side-left-2.webp",
];

const AUTO_ROTATION_INTERVAL = 3500; // 3.5 seconds
const PAUSE_AFTER_INTERACTION = 5000; // 5 seconds pause after manual interaction

export const RobotViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set([0]));
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({
    containerX: 0,
    containerY: 0,
    relX: 0,
    relY: 0,
    imgWidth: 0,
    imgHeight: 0
  });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const autoRotationPausedUntil = useRef<number>(0);

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

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Don't rotate if hovering (desktop) or recently interacted
      if (!isHovering && Date.now() > autoRotationPausedUntil.current) {
        goToNext();
      }
    }, AUTO_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isHovering, goToNext]);

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

  // Magnifier mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !imageRef.current || !imageContainerRef.current) return;

    const imgRect = imageRef.current.getBoundingClientRect();
    const containerRect = imageContainerRef.current.getBoundingClientRect();

    // Check if mouse is inside the actual rendered image
    if (
      e.clientX < imgRect.left ||
      e.clientX > imgRect.right ||
      e.clientY < imgRect.top ||
      e.clientY > imgRect.bottom
    ) {
      setShowMagnifier(false);
      return;
    }

    // Mouse position relative to actual image
    const relX = e.clientX - imgRect.left;
    const relY = e.clientY - imgRect.top;

    // Mouse position relative to container (for lens positioning)
    const containerX = e.clientX - containerRect.left;
    const containerY = e.clientY - containerRect.top;

    setMousePos({
      containerX,
      containerY,
      relX,
      relY,
      imgWidth: imgRect.width,
      imgHeight: imgRect.height
    });
    setShowMagnifier(true);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowMagnifier(false);
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
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={isMobile ? handleMobileSwipe : undefined}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              ref={imageRef}
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

          {/* Magnifier lens - desktop only */}
          {!isMobile && showMagnifier && isHovering && (
            (() => {
              const zoom = 2;
              const lensSize = 180;
              const currentImageUrl = encodeURI(ROBOT_IMAGES[currentIndex]);

              console.log("magnifier bg", currentImageUrl);

              return (
                <div
                  style={{
                    position: "absolute",
                    left: mousePos.containerX - lensSize / 2,
                    top: mousePos.containerY - lensSize / 2,
                    width: `${lensSize}px`,
                    height: `${lensSize}px`,
                    borderRadius: "50%",
                    border: "3px solid rgba(153, 255, 0, 0.8)",
                    boxShadow: "0 0 20px rgba(153, 255, 0, 0.5)",
                    backgroundImage: `url("${currentImageUrl}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${mousePos.imgWidth * zoom}px ${mousePos.imgHeight * zoom}px`,
                    backgroundPosition: `${lensSize / 2 - mousePos.relX * zoom}px ${lensSize / 2 - mousePos.relY * zoom}px`,
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />
              );
            })()
          )}
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
            "Hover to inspect • Auto-rotating"
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
