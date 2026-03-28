const puppeteer = require("puppeteer");
require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH ||
        "/usr/bin/google-chrome-stable",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(process.env.TEST_URL || "https://example.com");
    const title = await page.title();

    await browser.close();

    res.send(`Page title is: ${title}`);
  } catch (err) {
    console.error("Puppeteer failed:", err);
    res.status(500).send("Error running Puppeteer");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
