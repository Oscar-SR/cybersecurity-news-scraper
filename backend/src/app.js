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

app.get("/health", (req, res) => {
    res.json({ message: i18next.t("common:backend_working") });
});

app.get("/scrape/hn", async (req, res) => {
    try {
        let numNoticias = parseInt(req.query.n, 10);
        if (isNaN(numNoticias)) numNoticias = DEFAULT_NUM_NOTICIAS;

        const noticia = await scrapeTheHackerNews(numNoticias);
        res.json(noticia);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear CSO Online" });
    }
});

app.get("/scrape/all", async (req, res) => {
    try {
        const [hn, bc, cso] = await Promise.all([scrapeTheHackerNews(10), scrapeBleepingComputer(10), scrapeCSO(10)]);

        res.json([...hn, ...bc, ...cso]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error scraping sources" });
    }
});

export default app;
