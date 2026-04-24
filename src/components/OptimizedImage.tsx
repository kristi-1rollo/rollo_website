import { ImgHTMLAttributes } from "react";

const SUPABASE_STORAGE_HOST = "igdxbtuaajrhvuqtwhmm.supabase.co/storage";
const WIDTHS = [320, 640, 960, 1280, 1920];

function isSupabaseStorageUrl(src: string): boolean {
  return src.includes(SUPABASE_STORAGE_HOST);
}

function buildSupabaseSrcSet(src: string): string | undefined {
  if (!isSupabaseStorageUrl(src)) return undefined;
  const renderSrc = src.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/");
  return WIDTHS.map((w) => {
    const sep = renderSrc.includes("?") ? "&" : "?";
    return `${renderSrc}${sep}width=${w}&format=webp ${w}w`;
  }).join(", ");
}

/**
 * Builds srcset for local public images that have generated -640 / -960 width variants
 * as .webp files alongside the original.
 * E.g. /robot/rollo-futu.jpg -> rollo-futu-640.webp 640w, rollo-futu-960.webp 960w, rollo-futu.jpg 1920w
 */
function buildLocalVariantSrcSet(src: string, variants: number[] = []): string | undefined {
  if (!variants.length) return undefined;
  const match = src.match(/^(.*)\.(webp|jpg|jpeg|png)$/i);
  if (!match) return undefined;
  const base = match[1];
  const set = variants.map((w) => `${base}-${w}.webp ${w}w`);
  set.push(`${src} 1920w`);
  return set.join(", ");
}

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Set true for above-the-fold images (disables lazy loading, sets high priority) */
  priority?: boolean;
  /** Local responsive variants available, e.g. [640, 960] */
  localVariants?: number[];
}

export default function OptimizedImage({
  priority = false,
  src,
  alt = "",
  sizes,
  localVariants,
  ...rest
}: OptimizedImageProps) {
  const srcSet =
    src
      ? buildSupabaseSrcSet(src) ?? buildLocalVariantSrcSet(src, localVariants)
      : undefined;
  const sizesAttr = srcSet ? (sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw") : undefined;

  return (
    <img
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizesAttr}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      {...rest}
    />
  );
}
