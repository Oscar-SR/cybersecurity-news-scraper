import { defineConfig } from "i18next-cli";

export default defineConfig({
    locales: ["en", "es"],
    extract: {
        input: ["src/**/*.{js,jsx,ts,tsx}"],
        output: "public/locales/{{language}}/{{namespace}}.json",
        ignore: ["src/i18n.js"],
        sort: true,
        removeUnusedKeys: true,
        defaultNS: "home",
        keySeparator: ".",
        nsSeparator: ":",
        functions: ["t", "i18next.t"],
    },
});
