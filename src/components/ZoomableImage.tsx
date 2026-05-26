import { useRef, useState, useEffect, type MouseEvent, type TouchEvent } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomIn, X } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Zoom factor inside the modal. Default 2.5. */
  zoom?: number;
}

/**
 * Product-catalog style zoom: click/tap a point on the image and a modal opens
 * showing that area magnified. Drag inside the modal to pan around.
 */
export default function ZoomableImage({
  src,
  alt,
  className = "",
  zoom = 2.5,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  // origin = clicked point in 0..1 coordinates relative to the source image
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.querySelector("img");
    if (target) {
      const rect = target.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setOrigin({ x: clamp01(x), y: clamp01(y) });
    }
    setOpen(true);
  };

  // Pan handlers (mouse + touch)
  const startDrag = (clientX: number, clientY: number) => {
    if (!viewportRef.current) return;
    dragState.current = {
      startX: clientX,
      startY: clientY,
      ox: origin.x,
      oy: origin.y,
    };
  };
  const moveDrag = (clientX: number, clientY: number) => {
    if (!dragState.current || !viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const dx = (clientX - dragState.current.startX) / rect.width;
    const dy = (clientY - dragState.current.startY) / rect.height;
    // Moving finger right should reveal content on the right → origin shifts right
    setOrigin({
      x: clamp01(dragState.current.ox - dx / zoom),
      y: clamp01(dragState.current.oy - dy / zoom),
    });
  };
  const endDrag = () => {
    dragState.current = null;
  };

  useEffect(() => {
    if (!open) return;
    const onMove = (e: MouseEvent | any) => moveDrag(e.clientX, e.clientY);
    const onTouchMove = (e: any) => {
      if (e.touches[0]) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onUp = () => endDrag();
    window.addEventListener("mousemove", onMove as any);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove as any);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove as any);
      window.removeEventListener("touchend", onUp);
    };
  }, [open, zoom]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Zoom image"
          className={`group relative block cursor-zoom-in ${className}`}
        >
          <img src={src} alt={alt} className="w-full h-auto object-contain" loading="lazy" />
          <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/85">
            <ZoomIn className="h-3 w-3" />
            Zoom
          </span>
        </button>

        <DialogContent className="max-w-[96vw] sm:max-w-3xl bg-black/95 border-white/10 p-0 overflow-hidden">
          <div
            ref={viewportRef}
            className="relative w-full aspect-square sm:aspect-[4/3] overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none"
            onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
            onTouchStart={(e) => {
              if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY);
            }}
          >
            <img
              src={src}
              alt={`${alt} — zoomed`}
              draggable={false}
              className="absolute top-1/2 left-1/2 max-w-none w-auto h-auto pointer-events-none"
              style={{
                width: `${zoom * 100}%`,
                height: `${zoom * 100}%`,
                objectFit: "contain",
                transform: `translate(${-origin.x * 100}%, ${-origin.y * 100}%)`,
              }}
            />
            <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/70">
              Drag to pan
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}
