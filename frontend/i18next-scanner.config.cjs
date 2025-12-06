module.exports = {
  input: [
    "src/**/*.{js,jsx,ts,tsx}", 
    "!src/i18n.js"
  ],
  output: "./",
  options: {
    debug: false,
    sort: true,
    removeUnusedKeys: true,
    func: {
      list: ["i18next.t", "t"],
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    lngs: ["en", "es"],
    defaultLng: "en",
    ns: ["home"],
    defaultNs: "home",
    resource: {
      loadPath: "./public/locales/{{lng}}/{{ns}}.json",
      savePath: "./public/locales/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
    },
    keySeparator: ".",
    nsSeparator: ":",
  },
};
