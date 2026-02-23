import type { MediaGalleryItem } from "@/hooks/useBlogPosts";

interface Props {
  items: MediaGalleryItem[];
}

const BlogMediaGallery = ({ items }: Props) => {
  if (!items.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-[4px] border border-border overflow-hidden bg-card">
          {item.type === "video" ? (
            <video
              src={item.url}
              controls
              className="w-full"
              style={{
                maxWidth: item.width ? `${item.width}px` : undefined,
                aspectRatio: item.width && item.height ? `${item.width}/${item.height}` : undefined,
              }}
            />
          ) : (
            <img
              src={item.url}
              alt={item.caption || `Gallery image ${i + 1}`}
              className="w-full object-cover"
              style={{
                maxWidth: item.width ? `${item.width}px` : undefined,
                maxHeight: item.height ? `${item.height}px` : undefined,
              }}
              loading="lazy"
            />
          )}
          {item.caption && (
            <p className="text-xs text-muted-foreground px-3 py-2">{item.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogMediaGallery;
