import express from "express";
import cors from "cors";
import scrapeTheHackerNews from "./scrapers/the-hacker-news";
import scrapeBleepingComputer from "./scrapers/bleeping-computer";
import scrapeCSO from "./scrapers/cso-online";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';

const DEFAULT_NUM_NOTICIAS = 10;

app.use(
    cors({
        origin: FRONTEND_URL, // Dirección del frontend
    }),
);

app.get("/health", (req, res) => {
    res.json({ message: "Cybersecurity News Scraper backend working" });
});

app.get("/scrape/hn", async (req, res) => {
    try {
        const queryN = req.query.n;

        // Si es un string, lo parseamos. Si no, usamos 1 por defecto.
        const n = typeof queryN === 'string' ? parseInt(queryN, 10) : DEFAULT_NUM_NOTICIAS;
        const numNoticias = !isNaN(n) && n >= 0 ? n : DEFAULT_NUM_NOTICIAS;

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
        const queryN = req.query.n;

        // Si es un string, lo parseamos. Si no, usamos 1 por defecto.
        const n = typeof queryN === 'string' ? parseInt(queryN, 10) : DEFAULT_NUM_NOTICIAS;
        const numNoticias = !isNaN(n) && n >= 0 ? n : DEFAULT_NUM_NOTICIAS;

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
        const queryN = req.query.n;

        // Si es un string, lo parseamos. Si no, usamos 1 por defecto.
        const n = typeof queryN === 'string' ? parseInt(queryN, 10) : DEFAULT_NUM_NOTICIAS;
        const numNoticias = !isNaN(n) && n >= 0 ? n : DEFAULT_NUM_NOTICIAS;

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
        const queryN = req.query.n;

        // Si es un string, lo parseamos. Si no, usamos 1 por defecto.
        const n = typeof queryN === 'string' ? parseInt(queryN, 10) : DEFAULT_NUM_NOTICIAS;
        const numNoticias = !isNaN(n) && n >= 0 ? n : DEFAULT_NUM_NOTICIAS;

        const [hn, bc, cso] = await Promise.all([scrapeTheHackerNews(numNoticias), scrapeBleepingComputer(numNoticias), scrapeCSO(numNoticias)]);
        res.json([...hn, ...bc, ...cso]);

        console.log(numNoticias + " news scraped from all sources");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error scraping sources" });
    }
});

export default app;
