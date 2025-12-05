/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import "dotenv/config";
import express from "express";
import * as path from "path";
import internalAdRoutes from "./routes/internal-ad.routes";
import { validateEnv } from "./config/env.config";

// Validate environment variables
const env = validateEnv();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// CORS configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", env.FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.get("/api", (req, res) => {
  res.send({ message: "API Petites Annonces Internes" });
});

app.use("/api/ads", internalAdRoutes);

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: "Erreur interne du serveur",
    });
  }
);

const server = app.listen(env.PORT, () => {
  console.log(`✅ API démarrée sur http://localhost:${env.PORT}/api`);
  console.log(`🌐 CORS configuré pour: ${env.FRONTEND_URL}`);
});
server.on("error", console.error);
