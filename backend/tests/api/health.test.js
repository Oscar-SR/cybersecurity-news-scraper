import { test, expect } from "vitest";
import request from "supertest";
import app from "../../src/app";

test("GET /health returns status 200 and message", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
        message: "Cybersecurity News Scraper API working",
    });
});
