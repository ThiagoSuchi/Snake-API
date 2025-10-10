import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scoreRoutes from "./routes/scoreRoutes.js"; 
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/DbConnect.js";

// Carregar variáveis de ambiente
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar Swagger apenas se o arquivo existir
let swaggerDocument;
try {
  swaggerDocument = YAML.load(join(__dirname, "..", "swagger.yaml"));
} catch (error) {
  console.warn("⚠️ Swagger YAML não encontrado, continuando sem documentação");
}

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Conectar ao banco de dados (não bloqueia)
connectDB().catch(err => console.error("⚠️ Erro na conexão inicial com MongoDB:", err.message));

// Rotas
app.get("/", (req, res) => {
  res.json({ 
    message: "API Snake funcionando!",
    version: "1.0.0",
    endpoints: ["/jogadores", "/ranking", "/api-docs"]
  });
});

app.use("/", scoreRoutes);

// Swagger (se disponível)
if (swaggerDocument) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Rota 404
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Erro interno do servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

export default app;
