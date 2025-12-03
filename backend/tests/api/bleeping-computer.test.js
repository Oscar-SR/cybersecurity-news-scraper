// tests/api/bleeping-computer.test.js
import { vi, test, expect } from "vitest";
import request from "supertest";

// Definimos la respuesta mock como constante
const mockBleepingComputerResponse = [
  {
    title: "Noticia de ejemplo",
    author: "Autor Ejemplo",
    date: "2025-12-03",
    keywords: ["seguridad", "ciber", "noticia"],
    url: "https://example.com/bleeping-computer",
    source: "Bleeping Computer",
  },
];

// MOCK antes de importar app
vi.mock("../../src/scrapers/bleeping-computer.js", () => ({
  scrapeBleepingComputer: async (n) => mockBleepingComputerResponse,
  default: async (n) => mockBleepingComputerResponse,
}));

// Ahora sí importamos app
import app from "../../src/app";

test("GET /scrape/bc devuelve status 200", async () => {
  const res = await request(app).get("/scrape/bc?n=1");
  expect(res.status).toBe(200);
  expect(res.body).toEqual(mockBleepingComputerResponse);
});
