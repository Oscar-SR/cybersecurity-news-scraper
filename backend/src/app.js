import express from "express";
import cors from "cors";
import scrapeTheHackerNews from "./scrapers/the-hacker-news.js";
import scrapeBleepingComputer from "./scrapers/bleeping-computer.js";
import scrapeCSO from "./scrapers/cso-online.js";
import i18next from "./i18n.js";

const app = express();

const DEFAULT_NUM_NOTICIAS = 10;

app.use(
    cors({
        origin: "http://localhost:5173", // Dirección del frontend
    }),
);

/*
// DETECTOR DE IDIOMA EN FUNCIÓN DE LOS HEADERS HTTP
app.use((req, res, next) => {
    const headerLang = req.headers["accept-language"];

    if (headerLang) {
        // Ejemplo: "es-ES,es;q=0.9" -> "es"
        const lang = headerLang.split(",")[0].split("-")[0];
        i18next.changeLanguage(lang);
    }

    next();
});
*/

app.get("/health", (req, res) => {
    res.json({ message: "Cybersecurity News Scraper backend working" });
});

app.get("/scrape/hn", async (req, res) => {
    try {
        let numNoticias = parseInt(req.query.n, 10);
        if (isNaN(numNoticias)) numNoticias = DEFAULT_NUM_NOTICIAS;

        const noticia = await scrapeTheHackerNews(numNoticias);
        res.json(noticia);

        console.log(numNoticias + " news scraped from The Hacker News");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear The Hacker News" });
    }
});

app.get("/scrape/bc", async (req, res) => {
    try {
        let numNoticias = parseInt(req.query.n, 10);
        if (isNaN(numNoticias)) numNoticias = DEFAULT_NUM_NOTICIAS;

        const noticia = await scrapeBleepingComputer(numNoticias);
        res.json(noticia);

        console.log(numNoticias + " news scraped from Bleeping Computer");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear Bleeping Computer" });
    }
});

app.get("/scrape/cso", async (req, res) => {
    try {
        let numNoticias = parseInt(req.query.n, 10);
        if (isNaN(numNoticias)) numNoticias = DEFAULT_NUM_NOTICIAS;

        const noticia = await scrapeCSO(numNoticias);
        res.json(noticia);

        console.log(numNoticias + " news scraped from CSO Online");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear CSO Online" });
    }
});

app.get("/scrape/all", async (req, res) => {
    try {
        const [hn, bc, cso] = await Promise.all([scrapeTheHackerNews(10), scrapeBleepingComputer(10), scrapeCSO(10)]);

        res.json([...hn, ...bc, ...cso]);

        console.log("10 news scraped from all sources");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error scraping sources" });
    }
});

export default app;
