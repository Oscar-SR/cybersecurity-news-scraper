import express from "express";
import scrapeTheHackerNews from "./scrapers/the-hacker-news";
import scrapeBleepingComputer from "./scrapers/bleeping-computer";
import scrapeCSO from "./scrapers/cso-online";

const app = express();
app.disable("x-powered-by");

const apiRouter = express.Router();

const DEFAULT_NUM_NOTICIAS = 10;

apiRouter.get("/health", (_req, res) => {
    res.json({ message: "Cybersecurity News Scraper backend working" });
});

apiRouter.get("/scrape/hn", async (req, res) => {
    try {
        const queryN = req.query.n;

        const n = typeof queryN === "string" ? Number.parseInt(queryN, 10) : DEFAULT_NUM_NOTICIAS;
        const numNoticias = !Number.isNaN(n) && n >= 0 ? n : DEFAULT_NUM_NOTICIAS;

        const noticia = await scrapeTheHackerNews(numNoticias);
        res.json(noticia);

        console.log(numNoticias + " news scraped from The Hacker News");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear The Hacker News" });
    }
});

apiRouter.get("/scrape/bc", async (req, res) => {
    try {
        const queryN = req.query.n;

        const n = typeof queryN === "string" ? Number.parseInt(queryN, 10) : DEFAULT_NUM_NOTICIAS;
        const numNoticias = !Number.isNaN(n) && n >= 0 ? n : DEFAULT_NUM_NOTICIAS;

        const noticia = await scrapeBleepingComputer(numNoticias);
        res.json(noticia);

        console.log(numNoticias + " news scraped from Bleeping Computer");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear Bleeping Computer" });
    }
});

apiRouter.get("/scrape/cso", async (req, res) => {
    try {
        const queryN = req.query.n;

        const n = typeof queryN === "string" ? Number.parseInt(queryN, 10) : DEFAULT_NUM_NOTICIAS;
        const numNoticias = !Number.isNaN(n) && n >= 0 ? n : DEFAULT_NUM_NOTICIAS;

        const noticia = await scrapeCSO(numNoticias);
        res.json(noticia);

        console.log(numNoticias + " news scraped from CSO Online");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear CSO Online" });
    }
});

apiRouter.get("/scrape/all", async (req, res) => {
    try {
        const queryN = req.query.n;

        const n = typeof queryN === "string" ? Number.parseInt(queryN, 10) : DEFAULT_NUM_NOTICIAS;
        const numNoticias = !Number.isNaN(n) && n >= 0 ? n : DEFAULT_NUM_NOTICIAS;

        const [hn, bc, cso] = await Promise.all([
            scrapeTheHackerNews(numNoticias),
            scrapeBleepingComputer(numNoticias),
            scrapeCSO(numNoticias),
        ]);
        res.json([...hn, ...bc, ...cso]);

        console.log(numNoticias + " news scraped from all sources");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error scraping sources" });
    }
});

app.use("/api", apiRouter);

export default app;
