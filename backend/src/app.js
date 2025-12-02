const express = require("express");
const scrapeTheHackerNews = require("./scrapers/the-hacker-news");
const scrapeBleepingComputer = require("./scrapers/bleeping-computer");
const scrapeCSO = require("./scrapers/cso-online");

const app = express();

const DEFAULT_NUM_NOTICIAS = 10;

app.get("/health", (req, res) => {
    res.json({ message: "Cybersecurity News Scraper API working" });
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

/*
app.get("/scrape/all", async (req, res) => {
    try {
        const data = await scrapeNYT();
        res.json({ source: "New York Times", results: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear NYT" });
    }
});
*/

module.exports = app;
