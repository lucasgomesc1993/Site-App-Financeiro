
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

        // Define sizes
        const sizes = [
            { name: 'hero.webp', width: 1200, height: 563 },
            { name: 'hero-medium.webp', width: 900 }, // Height will be auto-calculated to maintain aspect ratio
            { name: 'hero-mobile.webp', width: 600 }
        ];

        // Process main image first to establish aspect ratio
        const mainImageBuffer = await sharp(inputFile)
            .resize(1200, 563, {
                fit: 'cover', // Force crop to exact dimensions
                position: 'center'
            })
            .webp({ quality: 80 })
            .toBuffer();

        // Save main image
        fs.writeFileSync(outputFile, mainImageBuffer);
        console.log('Created hero.webp (1200x563)');

        // Generate variants from the processed buffer (to ensure consistent crop)
        for (const size of sizes) {
            if (size.name === 'hero.webp') continue; // Already done

            const variantPath = path.join(publicDir, size.name);

            await sharp(mainImageBuffer)
                .resize(size.width, null, {
                    withoutEnlargement: true
                })
                .webp({ quality: 80 })
                .toFile(variantPath);

            console.log(`Created ${size.name} (${size.width}w)`);
        }

        // Get file sizes for comparison
        const originalStats = fs.statSync(inputFile);
        const newStats = fs.statSync(outputFile);

        console.log(`Original size: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`New main image size: ${(newStats.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Reduction: ${((1 - newStats.size / originalStats.size) * 100).toFixed(2)}%`);

    } catch (error) {
        console.error('Error optimizing image:', error);
    }
}

optimize();
