import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { ZoomIn } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Product-catalog style zoom: click opens a fullscreen lightbox where users
 * can pinch-to-zoom on mobile, scroll/double-click to zoom on desktop, and
 * drag to pan. Powered by yet-another-react-lightbox + Zoom plugin.
 */
export default function ZoomableImage({ src, alt, className = "" }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open zoom view"
        className={`group relative block cursor-zoom-in ${className}`}
      >
        <img src={src} alt={alt} className="w-full h-auto object-contain" loading="lazy" />
        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/85">
          <ZoomIn className="h-3 w-3" />
          Zoom
        </span>
      </button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
        plugins={[Zoom]}
        carousel={{ finite: true }}
        render={{ buttonPrev: () => null, buttonNext: () => null }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        styles={{
          container: { backgroundColor: "rgba(5, 5, 5, 0.96)" },
        }}
      />
    </>
  );
}
