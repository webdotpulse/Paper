
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the local server
  // Assuming the server is running on port 8080 (http-server defaults to 8080)
  // or use the port from python3 -m http.server
  try {
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

    // Set viewport to capture a good amount of content
    await page.setViewportSize({ width: 1280, height: 800 });

    const assetsDir = path.join(__dirname, '../assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir);
    }

    // Capture full page screenshot
    await page.screenshot({ path: path.join(assetsDir, 'demo-page.png'), fullPage: true });

    // Capture hero section only
    const heroElement = await page.$('section.container.my-5');
    if (heroElement) {
        await heroElement.screenshot({ path: path.join(assetsDir, 'demo-hero.png') });
    }

    console.log('Screenshots saved to assets/');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
})();
