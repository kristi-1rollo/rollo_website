import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ScrollControlledVideoProps {
  src: string;
  className?: string;
}

export function ScrollControlledVideo({ src, className = "" }: ScrollControlledVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intersection Observer for viewport trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            // Play video when it enters viewport
            video.play().catch(() => {
              // Autoplay blocked, that's ok
            });
            setHasPlayed(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);

    // Show replay overlay when video ends
    const handleEnded = () => {
      setShowReplay(true);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", handleEnded);
    };
  }, [hasPlayed]);

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;

    setShowReplay(false);
    video.currentTime = 0;
    video.play();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative cursor-pointer"
      onClick={showReplay ? handleReplay : undefined}
    >
      {/* Video wrapper with heavy blur edges */}
      <div className="relative max-w-2xl mx-auto">
        {/* Heavy vignette overlay - blends black edges to background */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,6,15,0.3) 55%, rgba(0,6,15,0.7) 75%, rgba(0,6,15,0.95) 90%, rgba(0,6,15,1) 100%)
            `,
            filter: 'blur(20px)',
          }}
        />

        {/* Video with softer mask */}
        <video
          ref={videoRef}
          className={`relative z-10 w-full h-auto object-contain ${className}`}
          muted
          playsInline
          preload="metadata"


          style={{
            maskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 40%, rgba(0,0,0,0.5) 70%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 40%, rgba(0,0,0,0.5) 70%, transparent 100%)',
          }}
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Replay overlay */}
        {showReplay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-30"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z"/>
                </svg>
              </div>
              <p className="text-white text-sm font-medium">Click to replay</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
