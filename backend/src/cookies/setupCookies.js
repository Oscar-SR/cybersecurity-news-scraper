import { chromium } from "playwright";

(async () => {
    // Capturar la URL desde los argumentos
    const url = process.argv[2];

    if (!url) {
        console.error("Debes pasar una URL como argumento.");
        console.error("Ejemplo: node setupCookies.js https://www.ejemplo.com");
        process.exit(1); // Salir del script
    }

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded" });

    console.log("Acepta o rechaza cookies manualmente...");
    await page.waitForTimeout(10000);

    await context.storageState({ path: "cookies.json" });
    console.log("Estado guardado en cookies.json");

    await browser.close();
})();
