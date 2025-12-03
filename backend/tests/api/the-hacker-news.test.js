// tests/api/the-hacker-news.test.js
import { vi, test, expect } from "vitest";
import request from "supertest";

// Definimos la respuesta mock como constante
const mockHNResponse = [
  {
    titulo: "Noticia HN de ejemplo",
    autor: "Autor HN",
    fecha: "2025-12-03",
    palabrasClave: ["seguridad", "ciber", "HN"],
    url: "https://example.com/the-hacker-news",
    source: "The Hacker News",
  },
];

// MOCK antes de importar app
vi.mock("../../src/scrapers/the-hacker-news.js", () => ({
  scrapeTheHackerNews: async (n) => mockHNResponse,
  default: async (n) => mockHNResponse,
}));

// Ahora sí importamos app
import app from "../../src/app";

test("GET /scrape/hn devuelve status 200", async () => {
  const res = await request(app).get("/scrape/hn?n=1");
  expect(res.status).toBe(200);
  expect(res.body).toEqual(mockHNResponse);
});
