import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // 1. Ignorar carpetas
  { ignores: ["dist"] },

  // 2. Configuración recomendada de JS
  js.configs.recommended,

  // 3. Configuración recomendada de TS (es un array, así que lo expandimos)
  ...tseslint.configs.recommended,

  // 4. Tu configuración personalizada
  {
    files: ["**/*.ts"], // Aplica solo a archivos TS
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "off", // Permitir console.log en backend
      // "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  
  // 5. Configuración para archivos JS (para que no se queje en scripts de config)
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Esto apaga todas las reglas de ESLint que podrían chocar con Prettier
  eslintConfigPrettier
];