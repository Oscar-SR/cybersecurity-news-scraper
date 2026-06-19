import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
    plugins: [react()],
    server: {
        port: Number(process.env.FRONTEND_PORT) || 3001,
    },
    preview: {
        port: Number(process.env.FRONTEND_PORT) || 3001,
    },
});
