import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({
    path: path.resolve(__dirname, "../../../../.env"),
});

const envSchema = z.object({});

export const env = envSchema.parse(process.env);
