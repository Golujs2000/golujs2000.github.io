const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuration
const demos = [
    { name: 'modern-dental', url: 'demos/standard/medical/index.html', output: 'assets/portfolio/modern-dental.jpg' },
    { name: 'nova-dental', url: 'demos/standard/nova/index.html', output: 'assets/portfolio/nova-dental.jpg' },
    { name: 'aura-skin', url: 'demos/standard/aura/index.html', output: 'assets/portfolio/aura-skin.jpg' },
    { name: 'luminous-skin', url: 'demos/standard/derma/index.html', output: 'assets/portfolio/luminous-skin.jpg' },
    { name: 'verde-aesthetics', url: 'demos/standard/verde/index.html', output: 'assets/portfolio/verde-aesthetics.jpg' },
];

const BASE_DIR = __dirname; // Assuming script is in root
const VIEWPORT = { width: 1280, height: 800 };

(async () => {
    console.log('Starting screenshot capture...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const demo of demos) {
        const page = await browser.newPage();
        await page.setViewport(VIEWPORT);

        // Construct absolute file URL
        const fileUrl = 'file://' + path.join(BASE_DIR, demo.url).replace(/\\/g, '/');
        console.log(`Capturing ${demo.name} from ${fileUrl}...`);

        try {
            await page.goto(fileUrl, { waitUntil: 'networkidle0' });

            // Wait a bit for any entrance animations
            await new Promise(r => setTimeout(r, 2000));

            // Ensure output directory exists
            const outputPath = path.join(BASE_DIR, demo.output);
            const outputDir = path.dirname(outputPath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            await page.screenshot({
                path: outputPath,
                type: 'jpeg', // Optimize as JPEG
                quality: 80,  // Good balance of quality and size
                fullPage: false // Capture viewport (above the fold) as a thumbnail often looks better, or true if we want full page? 
                // User asked for "homepage", usually implies the hero/design vibe. 
                // Given typical portfolio thumbnails, top section is best. 
                // But let's stick to viewport capture for a "thumbnail". 
                // Actually, let's do a slightly taller capture to get more context?
                // Let's stick to the 1280x800 viewport which gives a good "laptop view".
            });
            console.log(`Saved to ${demo.output}`);
        } catch (error) {
            console.error(`Failed to capture ${demo.name}:`, error);
        } finally {
            await page.close();
        }
    }

    await browser.close();
    console.log('All done!');
})();
