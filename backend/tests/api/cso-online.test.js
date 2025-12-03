// tests/api/cso-online.test.js
import { vi, test, expect } from "vitest";
import request from "supertest";

// Definimos la respuesta mock como constante
const mockCSOResponse = [
  {
    titulo: "Noticia CSO de ejemplo",
    autor: "Autor CSO",
    fecha: "2025-12-03",
    palabrasClave: ["seguridad", "ciber", "CSO"],
    url: "https://example.com/cso-online",
    source: "CSO Online",
  },
];

// MOCK antes de importar app
vi.mock("../../src/scrapers/cso-online.js", () => ({
  scrapeCSO: async (n) => mockCSOResponse,
  default: async (n) => mockCSOResponse,
}));

// Ahora sí importamos app
import app from "../../src/app";

test("GET /scrape/cso devuelve status 200", async () => {
  const res = await request(app).get("/scrape/cso?n=1");
  expect(res.status).toBe(200);
  expect(res.body).toEqual(mockCSOResponse);
});
