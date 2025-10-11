import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scoreRoutes from "./routes/scoreRoutes.js"; 
import connectDB from "./config/DbConnect.js";

// Carregar variáveis de ambiente
dotenv.config();

console.log("🚀 [APP] Iniciando aplicação Express (versão simplificada)");

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

console.log("✅ [APP] Middlewares configurados");

// Conectar ao banco de dados (não bloqueia)
connectDB().catch(err => console.error("⚠️ Erro MongoDB:", err.message));

// Rota principal
app.get("/", (req, res) => {
  console.log("📥 [/] Request recebido");
  res.json({ 
    message: "Snake API Online",
    version: "1.0.0",
    status: "running",
    endpoints: {
      jogadores: "/jogadores (GET, POST)",
      ranking: "/ranking (GET)",
      updateScore: "/jogadores/:id/score (PUT)"
    }
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// Rotas de score
app.use("/", scoreRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

console.log("✅ [APP] App configurado e pronto");

export default app;
