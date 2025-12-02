import request from "supertest";
import { test, expect } from "vitest";
import app from "../../src/app";

test(
  "GET /scrape/bc devuelve status 200",
  async () => {
    const res = await request(app).get("/scrape/bc?n=3");
    expect(res.status).toBe(200);
  },
  10000
);

/*
import scrapeBC from "../../src/scrapers/bleeping-computer";

beforeEach(() => {
  vi.clearAllMocks();
});

test("GET /scrape/bc returns mocked BC news", async () => {
  const res = await request(app).get("/scrape/bc?n=3");
  expect(res.status).toBe(200);
  expect(res.body).toEqual([
    {
      titulo: "Nuevo malware detectado",
      autor: "Ana López",
      fecha: "2025-12-02",
      palabrasClave: ["malware", "seguridad"],
      url: "https://bleepingcomputer.com/noticia1",
      source: "Bleeping Computer"
    }
  ]);
  expect(scrapeBC).toHaveBeenCalledWith(3);
});

test("GET /scrape/bc uses default number when n is invalid", async () => {
  await request(app).get("/scrape/bc?n=abc");
  expect(scrapeBC).toHaveBeenCalledWith(10);
});

test("GET /scrape/bc handles scraper error", async () => {
  scrapeBC.mockRejectedValueOnce(new Error("Scraper error"));
  const res = await request(app).get("/scrape/bc");
  expect(res.status).toBe(500);
  expect(res.body).toEqual({ error: "Error al scrapear Bleeping Computer" });
});
*/
