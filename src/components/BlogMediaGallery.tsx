import { useState } from "react";
import type { MediaGalleryItem } from "@/hooks/useBlogPosts";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  items: MediaGalleryItem[];
}

const BlogMediaGallery = ({ items }: Props) => {
  const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!items.length) return null;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const next = () => setLightboxIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : i));

  const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <>
      {/* Carousel thumbnails */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 h-28 rounded-[4px] border border-border overflow-hidden bg-card cursor-pointer hover:border-primary/40 transition group"
              onClick={() => openLightbox(i)}
            >
              {item.type === "video" ? (
                <video src={item.url} className="w-full h-full object-cover" muted />
              ) : (
                <img
                  src={item.url}
                  alt={item.caption || `Gallery image ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{
                    objectPosition: item.focal_x != null && item.focal_y != null
                      ? `${item.focal_x}% ${item.focal_y}%`
                      : undefined,
                  }}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-background/95 border-border overflow-hidden [&>button]:hidden">
          {currentItem && (
            <div className="relative flex items-center justify-center min-h-[50vh]">
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 z-20 p-2 rounded-[4px] bg-background/80 text-foreground hover:bg-background transition"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Prev */}
              {lightboxIndex !== null && lightboxIndex > 0 && (
                <button
                  onClick={prev}
                  className="absolute left-3 z-20 p-2 rounded-[4px] bg-background/80 text-foreground hover:bg-background transition"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* Next */}
              {lightboxIndex !== null && lightboxIndex < items.length - 1 && (
                <button
                  onClick={next}
                  className="absolute right-3 z-20 p-2 rounded-[4px] bg-background/80 text-foreground hover:bg-background transition"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}

              {/* Content */}
              {currentItem.type === "video" ? (
                <video src={currentItem.url} controls className="max-w-full max-h-[85vh] rounded-[4px]" />
              ) : (
                <img
                  src={currentItem.url}
                  alt={currentItem.caption || ""}
                  className="max-w-full max-h-[85vh] object-contain rounded-[4px]"
                />
              )}

              {/* Caption */}
              {currentItem.caption && (
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground bg-background/80 px-4 py-2 rounded-[4px]">
                  {currentItem.caption}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogMediaGallery;
