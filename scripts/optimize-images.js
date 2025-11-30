
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const inputFile = path.join(publicDir, 'hero.jpg');
const outputFile = path.join(publicDir, 'hero.webp');

async function optimize() {
    try {
        if (!fs.existsSync(inputFile)) {
            console.error('Input file not found:', inputFile);
            return;
        }

        console.log('Optimizing hero.jpg...');

        await sharp(inputFile)
            .resize(1200, null, { // Resize to 1200px width, auto height
                withoutEnlargement: true
            })
            .webp({ quality: 80 })
            .toFile(outputFile);

        console.log('Successfully created hero.webp');

        // Get file sizes for comparison
        const originalStats = fs.statSync(inputFile);
        const newStats = fs.statSync(outputFile);

        console.log(`Original size: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`New size: ${(newStats.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Reduction: ${((1 - newStats.size / originalStats.size) * 100).toFixed(2)}%`);

    } catch (error) {
        console.error('Error optimizing image:', error);
    }
}

optimize();
