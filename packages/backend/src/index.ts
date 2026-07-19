import app from "./app";
import { env } from "./config/env";

app.listen(env.BACKEND_PORT, "0.0.0.0", () => {
    console.log("Server listening on port " + env.BACKEND_PORT);
});
