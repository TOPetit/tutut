import { launch } from 'puppeteer';

const file_URL = "https://www.facebook.com/dyi/";

function delay(milliseconds) {
    return new Promise(r => setTimeout(r, milliseconds));
}

(async () => {
    const browser = await launch({ headless: true });
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", ["geolocation", "notifications"]);
    const page = await browser.newPage();
    await page.setViewport({
        width: 1_440,
        height: 900
    });
    await page.goto(file_URL, { waitUntil: 'networkidle2' });
    await page.waitForSelector('button[data-testid="cookie-policy-manage-dialog-accept-button"]');
    await page.click('button[data-testid="cookie-policy-manage-dialog-accept-button"]');
    await page.waitForSelector('button[id="loginbutton"]');
    await page.type('input[id="email"]', process.env.FACEBOOK_EMAIL);
    await page.type('input[id="pass"]', process.env.FACEBOOK_PASS);
    await delay(1_000);
    await page.click('button[id="loginbutton"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Go to download tab
    await page.click('[aria-selected="false"][role="tab"]');

    const client = await page.target().createCDPSession()
    await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: './downloads',
    })
    await page.click('[aria-label="Télécharger"]');

    await delay(60_000);
    await browser.close();
})();
