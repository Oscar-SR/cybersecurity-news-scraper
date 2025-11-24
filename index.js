const express = require("express");
const scrapeTheHackerNews = require("./scrapers/the-hacker-news");
const scrapeBleepingComputer = require("./scrapers/bleeping-computer");
const scrapeCSO = require("./scrapers/cso-online");
const app = express();

const PORT = 3000;

// Ruta simple para comprobar que funciona la API
app.get("/health", (req, res) => {
    res.json({ message: "Cybersecurity News Scraper API working" });
});

// Endpoint para scrapear The Hacker News
app.get("/scrape/hn", async (req, res) => {
    try {
        // Llamamos a la función que scrapea la noticia
        const noticia = await scrapeTheHackerNews();

        // Devolver un objeto combinado: source + campos de la noticia
        res.json({
            source: "The Hacker News",
            ...noticia // esto agrega titulo, autor, fecha directamente
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear The Hacker News" });
    }
});

// Endpoint para scrapear Bleeping Computer
app.get("/scrape/bc", async (req, res) => {
    try {
        // Llamamos a la función que scrapea la noticia
        const noticia = await scrapeBleepingComputer();

        // Devolver un objeto combinado: source + campos de la noticia
        res.json({
            source: "Bleeping Computer",
            ...noticia // esto agrega titulo, autor, fecha directamente
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear Bleeping Computer" });
    }
});

// Endpoint para scrapear CSO Online
app.get("/scrape/cso", async (req, res) => {
    try {
        // Llamamos a la función que scrapea la noticia
        const noticia = await scrapeCSO();

        // Devolver un objeto combinado: source + campos de la noticia
        res.json({
            source: "CSO",
            ...noticia // esto agrega titulo, autor, fecha directamente
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear CSO" });
    }
});

// Endpoint: /scrape/all
app.get("/scrape/all", async (req, res) => {
    try {
        const data = await scrapeNYT();
        res.json({ source: "New York Times", results: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al scrapear NYT" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`API escuchando en http://localhost:${PORT}`);
});
