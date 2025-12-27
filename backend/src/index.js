import app from "./app.js";
import i18next from "./i18n.js";

const PORT = parseInt(process.env.BACKEND_PORT || '3000', 10);

app.listen(PORT, () => {
    // Usamos i18next para traducir el mensaje
    console.log(i18next.t("common:server_listening", { port: PORT }));
});
