import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join, parse } from 'path';
import { existsSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Generate responsive width variants (e.g. -640.webp, -960.webp) next to each
// listed source image. Used by OptimizedImage's `localVariants` srcset.
const targets = [
  // Use case images (rendered ~190-380px on mobile/tablet)
  { src: 'public/robot/rollo-futu.jpg',     widths: [640, 960], format: 'webp' },
  { src: 'public/robot/rollo-des.webp',     widths: [640, 960] },
  { src: 'public/robot/rollo-tunnel.webp',  widths: [640, 960] },
  { src: 'public/robot/rollo-park.webp',    widths: [640, 960] },
  { src: 'public/robot/rollo-city.webp',    widths: [640, 960] },
  { src: 'public/robot/rollo-marine.webp',  widths: [640, 960] },
  { src: 'public/robot/rollo-milit.webp',   widths: [640, 960] },
  { src: 'public/hero/rollo-street.webp',   widths: [640, 960] },
  { src: 'public/graph/pilt-1.jpg',         widths: [640, 960], format: 'webp' },
];

const QUALITY = 80;

async function run() {
  let savedBytes = 0;
  for (const t of targets) {
    const inputPath = join(projectRoot, t.src);
    if (!existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${t.src} — not found`);
      continue;
    }

    const parsed = parse(t.src);
    const ext = t.format ? `.${t.format}` : parsed.ext;
    const baseName = parsed.name;

    for (const w of t.widths) {
      const outRel = join(parsed.dir, `${baseName}-${w}${ext}`);
      const outPath = join(projectRoot, outRel);
      try {
        const pipeline = sharp(inputPath).resize({ width: w, withoutEnlargement: true });
        const ready = ext === '.webp'
          ? pipeline.webp({ quality: QUALITY, effort: 6 })
          : pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
        const info = await ready.toFile(outPath);
        const origSize = statSync(inputPath).size;
        savedBytes += Math.max(0, origSize - info.size);
        console.log(`✅ ${outRel} → ${(info.size / 1024).toFixed(1)} KB`);
      } catch (err) {
        console.error(`❌ ${outRel}:`, err.message);
      }
    }
  }
  console.log(`\n📊 Approx total savings vs originals (per request): ${(savedBytes / 1024).toFixed(0)} KB`);
}

run().catch(console.error);
