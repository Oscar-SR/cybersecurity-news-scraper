import app from "./app";

// Puerto fijo (3000): debe coincidir con reverse_proxy "backend" en
// infra/reverse-proxy/Caddyfile(.dev) y con el healthcheck en compose.yml
const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server listening on port " + PORT);
});
