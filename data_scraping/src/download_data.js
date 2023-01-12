const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
const { executablePath } = require('puppeteer')

const file_URL = "https://www.facebook.com/dyi/";

function delay(milliseconds) {
    return new Promise(r => setTimeout(r, milliseconds));
}

(async () => {
    const browser = await puppeteer.launch({ headless: true, executablePath: executablePath() });
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", ["geolocation", "notifications"]);
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
    })
    page.setDefaultTimeout(120_000);
    await page.setViewport({
        width: 1_440,
        height: 900
    });
    await page.goto(file_URL, { waitUntil: 'networkidle2' });
    if (await page.$('button[data-testid="cookie-policy-manage-dialog-accept-button"]') !== null) {
        await page.click('button[data-testid="cookie-policy-manage-dialog-accept-button"]');
    }
    await page.waitForSelector('button[id="loginbutton"]');
    await page.type('input[id="email"]', process.env.FACEBOOK_EMAIL);
    await page.type('input[id="pass"]', process.env.FACEBOOK_PASS);
    await delay(1_000);
    await page.click('button[id="loginbutton"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Go to download tab
    if (await page.$('button[id="checkpointSubmitButton"]') !== null) {
        await page.click('button[id="checkpointSubmitButton"]');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
    }
    await page.waitForSelector('[aria-selected="false"][role="tab"]');
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
