import { ImgHTMLAttributes } from "react";

const SUPABASE_STORAGE_HOST = "igdxbtuaajrhvuqtwhmm.supabase.co/storage";
const WIDTHS = [320, 640, 960, 1280, 1920];

function isSupabaseStorageUrl(src: string): boolean {
  return src.includes(SUPABASE_STORAGE_HOST);
}

function buildSrcSet(src: string): string | undefined {
  if (!isSupabaseStorageUrl(src)) return undefined;

  // Supabase render endpoint: /storage/v1/render/image/public/<bucket>/<path>
  // Original public URL: /storage/v1/object/public/<bucket>/<path>
  const renderSrc = src.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/");

  return WIDTHS.map((w) => {
    const sep = renderSrc.includes("?") ? "&" : "?";
    return `${renderSrc}${sep}width=${w}&format=webp ${w}w`;
  }).join(", ");
}

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Set true for above-the-fold images (disables lazy loading, sets high priority) */
  priority?: boolean;
}

export default function OptimizedImage({
  priority = false,
  src,
  alt = "",
  sizes,
  ...rest
}: OptimizedImageProps) {
  const srcSet = src ? buildSrcSet(src) : undefined;

  return (
    <img
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      {...rest}
    />
  );
}
