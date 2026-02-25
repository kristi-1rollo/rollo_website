import { useState, useRef, useCallback, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Move } from "lucide-react";

interface CropValues {
  focalX: number;
  focalY: number;
  zoom: number;
}

interface Props {
  src: string;
  width: number;
  height: number;
  initial?: Partial<CropValues>;
  onChange: (values: CropValues) => void;
}

const ImageCropPositioner = ({ src, width, height, initial, onChange }: Props) => {
  const [zoom, setZoom] = useState(initial?.zoom ?? 1);
  const [focalX, setFocalX] = useState(initial?.focalX ?? 50);
  const [focalY, setFocalY] = useState(initial?.focalY ?? 50);
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const emit = useCallback(
    (x: number, y: number, z: number) => {
      onChange({ focalX: x, focalY: y, zoom: z });
    },
    [onChange]
  );

  const clamp = (v: number) => Math.max(0, Math.min(100, v));

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = ((e.clientX - lastPos.current.x) / rect.width) * 100;
    const dy = ((e.clientY - lastPos.current.y) / rect.height) * 100;
    lastPos.current = { x: e.clientX, y: e.clientY };

    // Moving the image right means focal point moves left
    const sensitivity = zoom;
    setFocalX((prev) => {
      const next = clamp(prev - dx / sensitivity);
      return next;
    });
    setFocalY((prev) => {
      const next = clamp(prev - dy / sensitivity);
      return next;
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Emit on changes (debounced via effect)
  useEffect(() => {
    emit(focalX, focalY, zoom);
  }, [focalX, focalY, zoom, emit]);

  const handleZoom = (value: number[]) => {
    setZoom(value[0]);
  };

  // Aspect ratio for preview container
  const aspectRatio = width && height ? `${width}/${height}` : "16/9";

  return (
    <div className="space-y-3">
      {/* Preview container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-[4px] border border-border cursor-grab active:cursor-grabbing select-none"
        style={{ aspectRatio, maxWidth: `${Math.min(width || 400, 400)}px` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <img
          src={src}
          alt="Crop preview"
          className="w-full h-full pointer-events-none"
          draggable={false}
          style={{
            objectFit: "cover",
            objectPosition: `${focalX}% ${focalY}%`,
            transform: `scale(${zoom})`,
            transformOrigin: `${focalX}% ${focalY}%`,
          }}
        />
        {/* Drag hint overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-background/20">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-background/70 rounded text-[10px] text-foreground">
            <Move className="h-3 w-3" />
            Lohista positsioneerimiseks
          </div>
        </div>
      </div>

      {/* Zoom slider */}
      <div className="flex items-center gap-3 max-w-[400px]">
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">1×</span>
        <Slider
          value={[zoom]}
          onValueChange={handleZoom}
          min={1}
          max={3}
          step={0.05}
          className="flex-1"
        />
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">3×</span>
        <span className="text-[10px] text-muted-foreground ml-1 tabular-nums w-8">
          {zoom.toFixed(1)}×
        </span>
      </div>
    </div>
  );
};

export default ImageCropPositioner;
