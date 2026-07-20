import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({
    path: path.resolve(__dirname, "../../../../.env"),
});

const envSchema = z.object({
    ALLOWED_ORIGINS: z
        .string()
        .default("")
        .transform((value) =>
            value
                .split(",")
                .map((origin) => origin.trim())
                .filter(Boolean),
        ),
});

export const env = envSchema.parse(process.env);
