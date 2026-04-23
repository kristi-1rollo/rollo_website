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
      className="group relative w-full max-w-[24rem] cursor-pointer sm:max-w-[26rem] lg:max-w-[28rem]"
      onClick={showReplay ? handleReplay : undefined}
    >
      <div className="relative mx-auto w-full">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[10%] bottom-[-4%] top-[6%] -z-10 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.14) 0%, hsl(var(--ring) / 0.08) 34%, transparent 72%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-[14%] inset-y-[18%] -z-20 blur-[72px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, hsl(var(--foreground) / 0.08) 0%, transparent 72%)",
          }}
        />

        <div
          className="relative overflow-hidden rounded-[4px] border p-[10px] shadow-2xl"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--card) / 0.68) 0%, hsl(var(--background) / 0.42) 100%)",
            borderColor: "hsl(var(--foreground) / 0.08)",
            boxShadow:
              "0 30px 80px hsl(var(--background) / 0.55), inset 0 1px 0 hsl(var(--foreground) / 0.08), inset 0 0 0 1px hsl(var(--primary) / 0.05)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[1px] rounded-[3px]"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--foreground) / 0.04) 0%, transparent 18%, transparent 82%, hsl(var(--primary) / 0.05) 100%)",
            }}
          />

          <div className="relative overflow-hidden rounded-[2px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--background) / 0.22) 0%, transparent 18%, transparent 82%, hsl(var(--background) / 0.44) 100%), linear-gradient(90deg, hsl(var(--background) / 0.2) 0%, transparent 14%, transparent 86%, hsl(var(--background) / 0.2) 100%)",
              }}
            />

            <video
              ref={videoRef}
              className={`relative z-10 aspect-[9/16] w-full h-auto object-cover ${className}`}
              muted
              playsInline
              preload="metadata"
              style={{
                maskImage:
                  "linear-gradient(180deg, transparent 0%, black 7%, black 93%, transparent 100%), linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, transparent 0%, black 7%, black 93%, transparent 100%), linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
              }}
            >
              <source src={src} type="video/mp4" />
            </video>

            {showReplay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-30 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(var(--background) / 0.26) 0%, hsl(var(--background) / 0.58) 100%)",
                }}
              >
                <div className="text-center">
                  <div
                    className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border backdrop-blur-md transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "hsl(var(--background) / 0.4)",
                      borderColor: "hsl(var(--foreground) / 0.14)",
                      boxShadow: "0 0 30px hsl(var(--primary) / 0.14)",
                    }}
                  >
                    <svg className="h-8 w-8 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-foreground">Click to replay</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
