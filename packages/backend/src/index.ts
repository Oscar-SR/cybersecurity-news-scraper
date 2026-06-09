import app from "./app";

const PORT = parseInt(process.env.BACKEND_PORT || '3000', 10);

app.listen(PORT, () => {
    // Usamos i18next para traducir el mensaje
    console.log("Server listening at http://localhost:" + PORT);
});
