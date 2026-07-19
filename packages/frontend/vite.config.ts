import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        // Debe coincidir con upstream "frontend" en infra/nginx-gateway/nginx.dev.conf
        port: 5173,
        hmr: {
            host: "localhost",
            clientPort: 3001,
            protocol: "ws",
        },
    },
    preview: {
        port: 5173,
    },
});
