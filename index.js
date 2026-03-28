const puppeteer = require("puppeteer");
require("dotenv").config();

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH ||
        "/usr/bin/google-chrome-stable",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required in cloud environments
    });

    const page = await browser.newPage();
    await page.goto(process.env.TEST_URL || "https://example.com");

    const title = await page.title();
    console.log("Page title is:", title);

    await browser.close();
  } catch (err) {
    console.error("Puppeteer failed:", err);
  }
})();
