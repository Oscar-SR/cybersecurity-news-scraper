import app from "./app.js";
import i18next from "./i18n.js";

const PORT = 3000;

app.listen(PORT, () => {
    // Usamos i18next para traducir el mensaje
    console.log(i18next.t('server_listening', { port: PORT }));
});
