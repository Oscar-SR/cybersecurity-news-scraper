import request from "supertest";
import { test, expect } from "vitest";
import app from "../../src/app";

test(
  "GET /scrape/hn devuelve status 200",
  async () => {
    const res = await request(app).get("/scrape/hn?n=3");
    expect(res.status).toBe(200);
  }
);