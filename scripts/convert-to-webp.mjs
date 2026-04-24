import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, statSync, unlinkSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Critical images that need WebP conversion. Set deleteOriginal=true after
// confirming all code references have been updated to the .webp variant.
const imagesToConvert = [
  // Source-controlled assets
  { input: 'src/assets/robot/rollo-render-p013.png', output: 'src/assets/robot/rollo-render-p013.webp', deleteOriginal: true },
  { input: 'src/assets/robot/1rollo_orbital_2.png',  output: 'src/assets/robot/1rollo_orbital_2.webp',  deleteOriginal: true },

  // Public/robot — use cases & hero
  { input: 'public/robot/rollo-park.png',     output: 'public/robot/rollo-park.webp',     deleteOriginal: true },
  { input: 'public/robot/rollo-des.png',      output: 'public/robot/rollo-des.webp',      deleteOriginal: true },
  { input: 'public/robot/rollo-milit.png',    output: 'public/robot/rollo-milit.webp',    deleteOriginal: true },
  { input: 'public/robot/rollo-tunnel.png',   output: 'public/robot/rollo-tunnel.webp',   deleteOriginal: true },
  { input: 'public/robot/rollo-city.png',     output: 'public/robot/rollo-city.webp',     deleteOriginal: true },

  // Public/robot/F6
  { input: 'public/robot/F6/1rollo_auto_sec.png',     output: 'public/robot/F6/1rollo_auto_sec.webp',     deleteOriginal: true },
  { input: 'public/robot/F6/1rollo_close.png',        output: 'public/robot/F6/1rollo_close.webp',        deleteOriginal: true },
  { input: 'public/robot/F6/1rollo_market_scale.png', output: 'public/robot/F6/1rollo_market_scale.webp', deleteOriginal: true },
  { input: 'public/robot/F6/1rollo_tll.png',          output: 'public/robot/F6/1rollo_tll.webp',          deleteOriginal: true },
  { input: 'public/robot/F6/f6_tech_spec.png',        output: 'public/robot/F6/f6_tech_spec.webp',        deleteOriginal: true },
  { input: 'public/robot/F6/1rollo_orbital_2.png',    output: 'public/robot/F6/1rollo_orbital_2.webp',    deleteOriginal: true },

  // Team
  { input: 'public/team/team-hero.png',            output: 'public/team/team-hero.webp',            deleteOriginal: true },
  { input: 'public/robot/team/1rollo_team_3.png',  output: 'public/robot/team/1rollo_team_3.webp',  deleteOriginal: true },

  // Hero (legacy png already deleted; keep this entry harmless if missing)
  { input: 'public/hero/rollo-street.png', output: 'public/hero/rollo-street.webp', deleteOriginal: true },
];

const QUALITY = 82;
const MAX_WIDTH = 1920;

async function convertToWebP() {
  console.log('🎨 Converting images to WebP format...\n');
  let totalOriginal = 0;
  let totalNew = 0;

  for (const item of imagesToConvert) {
    const input = join(projectRoot, item.input);
    const output = join(projectRoot, item.output);

    if (!existsSync(input)) {
      console.log(`⚠️  Skipping ${item.input} — file not found`);
      continue;
    }

    try {
      const originalSize = statSync(input).size;
      const meta = await sharp(input).metadata();
      const pipeline = sharp(input);

      if (meta.width && meta.width > MAX_WIDTH) {
        pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }

      const info = await pipeline
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(output);

      const newSize = info.size;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      totalOriginal += originalSize;
      totalNew += newSize;

      console.log(`✅ ${item.input}`);
      console.log(`   ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(newSize / 1024 / 1024).toFixed(2)} MB  (${savings}% smaller)`);

      if (item.deleteOriginal && input !== output) {
        unlinkSync(input);
        console.log(`   🗑️  Removed original ${item.input}`);
      }
      console.log('');
    } catch (err) {
      console.error(`❌ Error converting ${item.input}:`, err.message);
    }
  }

  if (totalOriginal > 0) {
    const totalSavings = ((1 - totalNew / totalOriginal) * 100).toFixed(1);
    console.log(`\n📊 Total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB → ${(totalNew / 1024 / 1024).toFixed(2)} MB  (${totalSavings}% saved)`);
  }
  console.log('\n💡 Run `npm run optimize:images` only when new large source images are added.');
  console.log('✨ Conversion complete!');
}

convertToWebP().catch(console.error);
