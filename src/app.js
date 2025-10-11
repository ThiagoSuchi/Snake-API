import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scoreRoutes from "./routes/scoreRoutes.js"; 
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/DbConnect.js";

console.log('🔧 [APP] Carregando módulos Express...');

// Carregar variáveis de ambiente
dotenv.config();
console.log('📦 [APP] Variáveis de ambiente carregadas');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar Swagger apenas se o arquivo existir
let swaggerDocument;
try {
  swaggerDocument = YAML.load(join(__dirname, "..", "swagger.yaml"));
  console.log('📄 [APP] Swagger carregado com sucesso');
} catch (error) {
  console.warn("⚠️ [APP] Swagger YAML não encontrado, continuando sem documentação");
}

console.log('🏗️ [APP] Criando aplicação Express...');
const app = express();

// Middlewares
console.log('🔌 [APP] Configurando middlewares...');
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
console.log('✅ [APP] Middlewares configurados');

// Conectar ao banco de dados (não bloqueia)
console.log('🔗 [APP] Iniciando conexão com MongoDB...');
connectDB()
  .then(() => console.log('✅ [APP] Conexão MongoDB estabelecida'))
  .catch(err => console.error("⚠️ [APP] Erro na conexão inicial com MongoDB:", err.message));

// Rotas
console.log('🛣️ [APP] Configurando rotas...');

app.get("/", (req, res) => {
  console.log('📥 [ROTA /] Requisição recebida');
  res.json({ 
    message: "API Snake funcionando!",
    version: "1.0.0",
    endpoints: ["/jogadores", "/ranking", "/api-docs"],
    timestamp: new Date().toISOString()
  });
  console.log('📤 [ROTA /] Resposta enviada');
});

app.use("/", scoreRoutes);
console.log('✅ [APP] Rotas de score configuradas');

// Swagger (se disponível)
if (swaggerDocument) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('📚 [APP] Swagger UI configurado em /api-docs');
}

// Rota 404
app.use((req, res) => {
  console.log(`❓ [404] Rota não encontrada: ${req.method} ${req.path}`);
  res.status(404).json({ error: "Rota não encontrada" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ [ERROR HANDLER] Erro capturado:', err.stack);
  res.status(500).json({ 
    error: "Erro interno do servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

console.log('✅ [APP] Aplicação Express configurada completamente');

export default app;
