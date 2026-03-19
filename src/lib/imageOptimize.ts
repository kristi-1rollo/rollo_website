/** Optimize image before upload — resize to max dimensions and compress to WebP */
export async function optimizeImage(
  file: File,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.85
): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file;
  if (file.size < 200 * 1024) return file;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { naturalWidth: w, naturalHeight: h } = img;

      if (w <= maxWidth && h <= maxHeight) {
        URL.revokeObjectURL(img.src);
        resolve(file);
        return;
      }

      const ratio = Math.min(maxWidth / w, maxHeight / h);
      w = Math.round(w * ratio);
      h = Math.round(h * ratio);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(img.src);

      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          const optimized = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
            type: "image/webp",
          });
          resolve(optimized.size < file.size ? optimized : file);
        },
        "image/webp",
        quality
      );
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}
