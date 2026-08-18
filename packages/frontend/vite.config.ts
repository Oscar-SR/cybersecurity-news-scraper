import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        // Debe coincidir con reverse_proxy "frontend" en infra/reverse-proxy/Caddyfile.dev
        port: 5173,
        hmr: {
            host: "localhost",
            clientPort: Number(process.env.PROXY_PORT) || 3001,
            protocol: "ws",
        },
    },
    preview: {
        port: 5173,
    },
});
