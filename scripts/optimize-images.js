
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');

// Configuration for images to optimize
const images = [
    {
        name: 'hero',
        input: 'hero.jpg',
        url: null, // Local file
        sizes: [
            { name: 'hero.webp', width: 1200, height: 563 },
            { name: 'hero-medium.webp', width: 900 },
            { name: 'hero-mobile.webp', width: 600 }
        ],
        mainOptions: {
            width: 1200,
            height: 563,
            fit: 'cover',
            position: 'center'
        }
    },
    {
        name: 'author',
        input: 'author.jpg',
        // High-res URL from Unsplash (removed w=256 limitation)
        url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90',
        sizes: [
            { name: 'author.webp', width: 400, height: 400 }, // Main avatar
            { name: 'author-small.webp', width: 128, height: 128 } // Tiny placeholder/thumbnail
        ],
        mainOptions: {
            width: 400,
            height: 400,
            fit: 'cover',
            position: 'top' // Focus on face usually at top
        }
    }
];

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download: ${res.statusCode}`));
                return;
            }
            const stream = fs.createWriteStream(filepath);
            res.pipe(stream);
            stream.on('finish', () => {
                stream.close();
                resolve();
            });
            stream.on('error', reject);
        }).on('error', reject);
    });
}

async function optimize() {
    for (const img of images) {
        console.log(`\nProcessing ${img.name}...`);

        const inputFile = path.join(publicDir, img.input);

        // Download if it's a remote image and doesn't exist
        if (img.url && !fs.existsSync(inputFile)) {
            console.log(`Downloading ${img.input} from ${img.url}...`);
            try {
                await downloadImage(img.url, inputFile);
                console.log('Download complete.');
            } catch (error) {
                console.error(`Error downloading ${img.input}:`, error);
                continue;
            }
        }

        if (!fs.existsSync(inputFile)) {
            console.error(`Input file not found: ${inputFile}`);
            continue;
        }

        try {
            // Process main image
            const mainOutput = path.join(publicDir, img.sizes[0].name);

            const mainImageBuffer = await sharp(inputFile)
                .resize(img.mainOptions.width, img.mainOptions.height, {
                    fit: img.mainOptions.fit,
                    position: img.mainOptions.position
                })
                .webp({ quality: 80 })
                .toBuffer();

            // Save main image
            fs.writeFileSync(mainOutput, mainImageBuffer);
            console.log(`Created ${img.sizes[0].name} (${img.mainOptions.width}x${img.mainOptions.height || 'auto'})`);

            // Generate variants
            for (const size of img.sizes) {
                if (size.name === img.sizes[0].name) continue; // Skip main

                const variantPath = path.join(publicDir, size.name);

                await sharp(mainImageBuffer)
                    .resize(size.width, size.height || null, {
                        withoutEnlargement: true,
                        fit: size.height ? 'cover' : 'inside'
                    })
                    .webp({ quality: 80 })
                    .toFile(variantPath);

                console.log(`Created ${size.name} (${size.width}w)`);
            }

            // Stats
            const originalStats = fs.statSync(inputFile);
            const newStats = fs.statSync(mainOutput);
            console.log(`Original: ${(originalStats.size / 1024).toFixed(2)} KB`);
            console.log(`Optimized: ${(newStats.size / 1024).toFixed(2)} KB`);
            console.log(`Reduction: ${((1 - newStats.size / originalStats.size) * 100).toFixed(2)}%`);

        } catch (error) {
            console.error(`Error processing ${img.name}:`, error);
        }
    }
}

optimize();
