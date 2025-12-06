import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: pluginReact
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended
    ],
    languageOptions: {
      globals: globals.browser
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // React moderno: ya no hace falta importar React para JSX
      "react/react-in-jsx-scope": "off",

      // No queremos usar PropTypes (solo usarlo si tú quieres)
      "react/prop-types": "off"
    }
  }
]);
