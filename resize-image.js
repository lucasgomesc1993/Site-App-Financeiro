import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'public', 'hero.webp');
const outputPathMobile = path.join(__dirname, 'public', 'hero-mobile.webp');
const outputPathMedium = path.join(__dirname, 'public', 'hero-medium.webp');

sharp(inputPath)
    .resize(600)
    .toFile(outputPathMobile)
    .then(info => {
        console.log('Mobile image resized successfully:', info);
        return sharp(inputPath)
            .resize(900)
            .toFile(outputPathMedium);
    })
    .then(info => {
        console.log('Medium image resized successfully:', info);
    })
    .catch(err => {
        console.error('Error resizing image:', err);
        process.exit(1);
    });
