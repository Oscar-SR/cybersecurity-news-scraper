import request from "supertest";
import { test, expect } from "vitest";
import app from "../../src/app";

test(
  "GET /scrape/cso devuelve status 200",
  async () => {
    const res = await request(app).get("/scrape/cso?n=1");
    expect(res.status).toBe(200);
  }
);