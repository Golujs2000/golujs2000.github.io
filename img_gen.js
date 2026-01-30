const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const demos = [
    { src: 'demos/standard/medical/index.html', dest: 'assets/portfolio/modern-dental.jpg' },
    { src: 'demos/standard/nova/index.html', dest: 'assets/portfolio/nova-dental.jpg' },
    { src: 'demos/standard/aura/index.html', dest: 'assets/portfolio/aura.png' },
    { src: 'demos/standard/derma/index.html', dest: 'assets/portfolio/luminous.png' },
    { src: 'demos/standard/verde/index.html', dest: 'assets/portfolio/verde.png' },
    { src: 'demos/standard/lumina/index.html', dest: 'assets/portfolio/lumina.png' },
    { src: 'demos/standard/elite/index.html', dest: 'assets/portfolio/elite.png' }
];

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1200,900']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 900 });

    const rootDir = "C:\\Users\\hp\\Desktop\\CGP360";

    for (const demo of demos) {
        const fileUrl = 'file://' + path.join(rootDir, demo.src);
        const outputPath = path.join(rootDir, demo.dest);

        console.log(`Capturing ${demo.src} -> ${demo.dest}...`);

        try {
            await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

            // Ensure directory exists
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            await page.screenshot({ path: outputPath });
            console.log(`Saved to ${outputPath}`);
        } catch (e) {
            console.error(`Failed to capture ${demo.src}:`, e);
        }
    }

    await browser.close();
})();
