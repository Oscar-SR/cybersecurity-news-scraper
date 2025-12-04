import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true, // Permite usar test(), expect() sin importarlos
        environment: "node", // Usa Node.js como entorno (no navegador)
        include: ["tests/**/*.test.js"], // Busca los tests en la carpeta tests/
    },
});
