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
        proxy: {
            "/api": {
                target: process.env.API_PROXY_TARGET || "http://localhost:3000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    preview: {
        port: Number(process.env.FRONTEND_PORT) || 3001,
    },
});
