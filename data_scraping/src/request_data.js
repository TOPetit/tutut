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
    page.setDefaultTimeout(60_000);
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

    // Select JSON
    await page.waitForSelector('label[aria-label="Format"]');
    await page.click('label[aria-label="Format"]');
    await page.evaluate(() => {
        [...document.querySelectorAll('span')].find(element => element.textContent === 'JSON').click();
    });

    // Select low quality media
    await page.click('[aria-label="Qualité du contenu multimédia"]');
    await page.evaluate(() => {
        [...document.querySelectorAll('span')].find(element => element.textContent === 'Faible').click();
    });

    // Select time period
    await page.click('[aria-label="Période (obligatoire)"]');
    await page.evaluate(() => {
        [...document.querySelectorAll('span')].find(element => element.textContent === 'Semaine dernière').click();
    });

    // Unselect everything
    await page.evaluate(() => {
        [...document.querySelectorAll('span')].find(element => element.textContent === 'Tout désélectionner').click();
    });

    // Select messages
    await page.evaluate(() => {
        [...document.querySelectorAll('span')].find(element => element.textContent === 'Messages').click();
    });

    // Request download
    await page.click('[aria-label="Demander un téléchargement"]');

    await delay(10_000)

    //Wait for download
    await page.click('[aria-selected="false"][role="tab"]');

    await browser.close();
})();
