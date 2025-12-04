module.exports = {
  input: [
    'src/**/*.{js,ts,jsx,tsx}', // archivos a escanear
  ],
  output: './',
  options: {
    debug: true,
    removeUnusedKeys: true,
    sort: true,
    func: {
      list: ['t', '__'],
      extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    lngs: ['en', 'es'],
    defaultLng: 'en',
    ns: ['common'],
    defaultNs: 'common',
    resource: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2
    }
  }
};
