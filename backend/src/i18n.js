// src/i18n.js
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await i18next.use(Backend).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  backend: {
    loadPath: path.join(__dirname, '..', 'locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(__dirname, '..', 'locales/{{lng}}/{{ns}}.missing.json')
  },
  interpolation: { escapeValue: false }
});

export default i18next;
