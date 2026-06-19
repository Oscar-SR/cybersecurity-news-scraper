import cors from "cors";
import { env } from "../config/env";

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (
      env.ALLOWED_ORIGINS.length === 0 ||
      !origin ||
      env.ALLOWED_ORIGINS.includes(origin)
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
});