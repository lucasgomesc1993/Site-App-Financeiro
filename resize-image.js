import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'public', 'hero.webp');
const outputPath = path.join(__dirname, 'public', 'hero-mobile.webp');

sharp(inputPath)
    .resize(600)
    .toFile(outputPath)
    .then(info => {
        console.log('Image resized successfully:', info);
    })
    .catch(err => {
        console.error('Error resizing image:', err);
        process.exit(1);
    });
