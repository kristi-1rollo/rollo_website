import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Critical images that need WebP conversion
const imagesToConvert = [
  {
    input: join(projectRoot, 'src/assets/robot/rollo-render-p013.png'),
    output: join(projectRoot, 'src/assets/robot/rollo-render-p013.webp'),
  },
  {
    input: join(projectRoot, 'public/hero/rollo-street.png'),
    output: join(projectRoot, 'public/hero/rollo-street.webp'),
  },
  {
    input: join(projectRoot, 'public/graph/pilt-1.jpg'),
    output: join(projectRoot, 'public/graph/pilt-1.webp'),
  },
];

async function convertToWebP() {
  console.log('🎨 Converting images to WebP format...\n');

  for (const { input, output } of imagesToConvert) {
    if (!existsSync(input)) {
      console.log(`⚠️  Skipping ${input} - file not found`);
      continue;
    }

    try {
      const info = await sharp(input)
        .webp({ quality: 85, effort: 6 })
        .toFile(output);

      const originalSize = (await sharp(input).metadata()).size || 0;
      const newSize = info.size;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(`✅ Converted: ${input}`);
      console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   WebP: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Savings: ${savings}%\n`);
    } catch (err) {
      console.error(`❌ Error converting ${input}:`, err.message);
    }
  }

  console.log('\n💡 Build speed tip: run `npm run optimize:images` only when new large source images are added.');
  console.log('✨ Conversion complete!');
}

convertToWebP().catch(console.error);
