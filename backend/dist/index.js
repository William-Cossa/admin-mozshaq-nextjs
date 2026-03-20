import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 3001;
// ─── Middleware Globais ──────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true, // Permite envio de cookies (refreshToken)
}));
app.use(express.json());
app.use(cookieParser());
// ─── Rotas ───────────────────────────────────────────────────────────────────
app.use("/api", routes);
// ─── Catch-all / Global Error Handler (Básico) ───────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Rota não encontrada." });
});
// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Servidor backend a correr na porta ${PORT}`);
});
