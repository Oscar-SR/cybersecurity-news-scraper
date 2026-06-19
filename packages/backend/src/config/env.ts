import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({
  path: path.resolve(__dirname, "../../../../.env"),
});

const envSchema = z.object({
  BACKEND_PORT: z.coerce.number().default(3000),
  FRONTEND_PORT: z.coerce.number().default(3001),
  FRONTEND_URL: z.string().default("http://localhost:3001"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export const env = envSchema.parse(process.env);
