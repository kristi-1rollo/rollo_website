import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  type?: string;
  poster?: string;
  className?: string;
  /** Distance (in px or %) before viewport at which to start loading */
  rootMargin?: string;
}

/**
 * Performance-optimized video component:
 * - Does not download anything until scrolled near viewport (IntersectionObserver)
 * - Uses preload="none" so initial page load is unaffected
 * - Auto-plays muted/looped/inline once it becomes visible
 */
export function LazyVideo({
  src,
  type = "video/mp4",
  poster,
  className,
  rootMargin = "200px",
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad, rootMargin]);

  // Once shouldLoad flips, kick off play (autoplay attribute alone may be deferred)
  useEffect(() => {
    if (!shouldLoad) return;
    const el = videoRef.current;
    if (!el) return;
    el.load();
    const playPromise = el.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        /* autoplay may be blocked; ignore */
      });
    }
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      autoPlay={shouldLoad}
    >
      {shouldLoad && <source src={src} type={type} />}
    </video>
  );
}
