import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = JSON.parse(readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8"));

const app = express();
const PORT = process.env.PORT;

// ─── Middleware Globais ──────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true, // Permite envio de cookies (refreshToken)
  })
);
app.use(express.json());
app.use(cookieParser());

// ─── Rotas ───────────────────────────────────────────────────────────────────
app.use("/api", routes);

// ─── Documentação da API (Swagger UI) ────────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ─── Catch-all / Global Error Handler (Básico) ───────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Rota não encontrada." });
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Servidor backend a correr na porta ${PORT}`);
});
